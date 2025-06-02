import { basename } from 'node:path'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { stringify } from 'devalue'
import type { PageContext } from '@/types/pageContext'
import { PAGE_CONTEXT_HTML_ID, TITLE_SUFFIX } from '@/constants'
import type { SSRContext } from '@vue/server-renderer'

export interface Manifest {
  [key: string]: string[];
}

export interface RenderResult {
  title: string;
  html: string;
  preloadLinks: string;
  preloadScripts: string;
  statusCode: number;
}

export async function render(url: string, manifest: Manifest): Promise<RenderResult> {
  const pageContext = {} as PageContext
  const { app, router } = createApp(pageContext)

  await router.push(url)
  await router.isReady()

  let titleFromRoute = ''
  if (router.currentRoute.value.meta && router.currentRoute.value.meta.title) {
    titleFromRoute = router.currentRoute.value.meta.title as string
  } else {
    console.error('No title found in the route')
  }

  const ctx = {} as SSRContext
  const title = `<title>${titleFromRoute}${TITLE_SUFFIX}</title>`
  const html = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  const preloadScripts = renderPreloadScripts(pageContext)
  const statusCode = pageContext.statusCode || 200

  return {
    title,
    html,
    preloadLinks,
    preloadScripts,
    statusCode,
  }
}

/**
 * Kezdő állapotot tartalmazó script taget generál (a kliens oldal ebből fogja kinyerni az adatot, hydrate fázisban)
 */
function renderPreloadScripts(pageContext: PageContext) {
  const pageContextSerialized = stringify(pageContext)
  return `<script type="application/json" id="${PAGE_CONTEXT_HTML_ID}">${pageContextSerialized}</script>`
}

/**
 * A szükséges fájlokból generálja a preload linkeket
 * https://blog.logrocket.com/adding-ssr-existing-vue-3-app/
 */
function renderPreloadLinks(modules: string[], manifest: Manifest): string {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

/**
 * A fájlnév alapján visszaadja a megfelelő preload linket
 */
function renderPreloadLink(file: string): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    return ''
  }
}
