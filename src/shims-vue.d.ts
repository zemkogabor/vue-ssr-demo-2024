import type { PageContext } from '@/types/pageContext'
import type { ComposerTranslation } from 'vue-i18n'

// https://stackoverflow.com/questions/64175742/using-globalproperties-in-vue-3-and-typescript
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * @deprecated A $t használata deprecated lett: https://vue-i18n.intlify.dev/guide/migration/vue3#migration-to-composition-api-from-legacy-api
     */
    $t: ComposerTranslation;
    $pageContext: PageContext;
  }
}

export {}
