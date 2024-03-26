<template>
  <div class="container p-3 pb-8">
    <h1 class="text-center mb-5">
      {{ $t('home.title') }}
    </h1>
    <h2>
      Star Wars movies
    </h2>
    <div class="mb-5">
      <div
        v-if="startWarsMovieListStore.isLoaded && !startWarsMovieListStore.isLoading"
        class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"
      >
        <div v-for="movie in startWarsMovieListStore.movies" class="col">
          <div class="card h-100 text-bg-light">
            <div class="card-body">
              <h5 class="card-title" v-text="movie.title" />
              <div class="card-text">
                <p v-text="movie.opening_crawl" />
                <p>
                  <strong>Director:</strong> <span v-text="movie.director" />
                </p>
                <p class="mb-0">
                  <strong>Producer:</strong> <span v-text="movie.producer" />
                </p>
              </div>
            </div>
            <div class="card-footer small fst-italic text-end">
              Release date: {{ movie.release_date }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div class="spinner-border spinner-border-sm" />
      </div>
    </div>
    <h2>
      Counter
    </h2>
    <button class="btn btn-lg btn-success" @click="counterStore.increment()">
      {{ counterStore.count }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStartWarsMovieList } from '@/stores/StarWarsMovieList'
import { useCounter } from '@/stores/Counter'

export default defineComponent({
  name: 'Home',
  setup() {
    const startWarsMovieListStore = useStartWarsMovieList()
    const counterStore = useCounter()
    return {
      startWarsMovieListStore,
      counterStore,
    }
  },
  async serverPrefetch() {
    await this.startWarsMovieListStore.load()
    this.counterStore.increment()
  },
  mounted() {
    this.startWarsMovieListStore.load()
  },
})
</script>

<style scoped lang="scss">
</style>
