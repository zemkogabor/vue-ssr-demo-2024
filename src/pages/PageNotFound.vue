<template>
  <div class="h1 text-center p-5">
    {{ $t('page_not_found.title') }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageNotFound',
  serverPrefetch() {
    this.$pageContext.statusCode = 404
  },
})
</script>
