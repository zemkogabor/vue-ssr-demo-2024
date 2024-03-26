<template>
  <main>
    <div class="container p-3  d-flex justify-content-center">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link :to="{ name: pageNames.HOME }" class="nav-link" active-class="active">
            {{ $t('home.title') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: pageNames.CONTACT }" class="nav-link" active-class="active">
            {{ $t('contact.title') }}
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import pageNames from "@/constants/pageNames";

export default defineComponent({
  computed: {
    pageNames() {
      return pageNames
    }
  },
  components: {
    RouterView,
  },
  mounted() {
    // FOUC elkerülése miatt, akkor látható az oldal, ha ténylegesen betöltött
    // https://en.wikipedia.org/wiki/Flash_of_unstyled_content
    document.querySelector('body')!.classList.remove('page-is-transitioning')
  },
})
</script>
