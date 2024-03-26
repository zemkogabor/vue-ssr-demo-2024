// "document" írás, olvasást tartalmaz, csak kliens oldalon húzható be a bootstrap js
import 'bootstrap'

import { createApp } from './main'
import { parse } from 'devalue'
import { PAGE_CONTEXT_HTML_ID } from '@/constants'
import type { PageContext } from '@/types/pageContext'

const { app, router } = createApp(getPageContextFromHtml())

// Amikor a router készen áll, akkor mountoljuk az alkalmazást (hydrate fázis)
router.isReady().then(() => {
  app.mount('#app')
})

/**
 * Kinyeri a HTML-ből (script tagből) a kezdő állapotot (amit a szerver oldal generált)
 */
function getPageContextFromHtml(): PageContext {
  const pageContextElement = document.getElementById(PAGE_CONTEXT_HTML_ID)
  if (pageContextElement === null) {
    throw Error(`Element with id ${PAGE_CONTEXT_HTML_ID} not found!`)
  }

  const pageContextSerialized = pageContextElement.textContent as string
  return parse(pageContextSerialized)
}
