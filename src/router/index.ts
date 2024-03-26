import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router'
import type { VueI18nTranslation } from 'vue-i18n'
import { TITLE_SUFFIX } from '@/constants'
import pageNames from '@/constants/pageNames'

export const createRouter = (t: VueI18nTranslation) => {
  const router = _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    /**
     * https://router.vuejs.org/guide/advanced/scroll-behavior
     * @param to
     * @param from
     * @param savedPosition
     */
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return {
          ...savedPosition,
          behavior: 'instant',
        }
      } else {
        return {
          top: 0,
          behavior: 'instant',
        }
      }
    },
    routes: [
      {
        path: '/',
        name: pageNames.HOME,
        component: () => import('@/pages/Home.vue'),
        meta: {
          title: t('home.title'),
        },
      },
      {
        path: '/contact',
        name: pageNames.CONTACT,
        component: () => import('@/pages/Contact.vue'),
        meta: {
          title: t('contact.title'),
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: pageNames.PAGE_NOT_FOUND,
        component: () => import('@/pages/PageNotFound.vue'),
        meta: {
          title: t('page_not_found.title'),
        },
      },
    ],
  })

  router.beforeEach(async (to) => {
    if (!import.meta.env.SSR) {
      if (!to.meta.title) {
        console.error('No title found in the route')
        return true
      }
      document.title = to.meta.title + TITLE_SUFFIX
    }

    return true
  })

  return router
}
