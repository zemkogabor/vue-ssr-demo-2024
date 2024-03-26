import type { PageContext } from '@/types/pageContext'

// https://stackoverflow.com/questions/64175742/using-globalproperties-in-vue-3-and-typescript
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $pageContext: PageContext;
  }
}

export {}
