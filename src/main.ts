import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { createRouter } from './router'
import type { PageContext } from '@/types/pageContext'
import messages from '@/messages/index'
import './assets/scss/main.scss'

export function createApp(pageContext: PageContext) {
  const app = createSSRApp(App)

  const pinia = createPinia()
  app.use(pinia)

  const i18n = createI18n({ locale: 'en', messages, legacy: false })
  app.use(i18n)

  const router = createRouter(i18n.global.t)
  app.use(router)

  // https://pinia.vuejs.org/ssr/#State-hydration
  if (import.meta.env.SSR) {
    pageContext.piniaInitialState = pinia.state.value
  } else {
    pinia.state.value = pageContext.piniaInitialState || {}
  }

  app.config.globalProperties.$pageContext = pageContext

  return { app, router }
}
