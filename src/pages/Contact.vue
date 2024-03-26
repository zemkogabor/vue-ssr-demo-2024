<template>
  <div class="container">
    <h1 class="text-center mb-5">
      {{ $t('contact.title') }}
    </h1>
    <h2>
      Gabor Zemko
    </h2>
    <div>
      <i class="bi bi-geo-alt-fill me-2" />Szeged, Hungary
    </div>
    <div>
      <i class="bi bi-github me-2" />
      <a href="https://github.com/zemkogabor" target="_blank">@zemkogabor</a>
    </div>
    <div>
      <i class="bi bi-building me-2" />Aventail Ltd.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Contact',
})
</script>

<style scoped lang="scss">
</style>
