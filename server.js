import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p) => path.resolve(__dirname, p)

  const manifest = isProd
    ? JSON.parse(
      fs.readFileSync(resolve('dist/client/.vite/ssr-manifest.json'), 'utf-8'),
    )
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      base: process.env.BASE_URL,
      root,
      logLevel: 'error',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    app.use(compression())
    app.use(
      '/',
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    )
  }

  app.use(async (req, res) => {
    try {
      const url = req.originalUrl

      let template
      let render

      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { title, html: appHtml, preloadLinks, preloadScripts, statusCode } = await render(url, manifest)

      const html = template
        .replace('<!--title-->', title)
        .replace('<!--preload-scripts-->', preloadScripts)
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)

      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (e instanceof Error) {
        vite && vite.ssrFixStacktrace(e)
        console.error(e.stack)
        res.status(500).end(e.stack)
      } else {
        res.status(500).end('Unknown error')
      }
    }
  })

  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(6173, () => {
    console.log('http://localhost:6173')
  }),
)
