import { defineStore } from 'pinia'
import { ref } from 'vue'
import Axios from 'axios'
import type { StarWarsMovie } from '@/types/StarWarsMovie'

export const useStartWarsMovieList = defineStore('starWarsMovieList', () => {
  const movies = ref([] as StarWarsMovie[])
  const isLoaded = ref(false as boolean)
  const isLoading = ref(false as boolean)
  const loadPromise = ref(null as Promise<void> | null)

  async function load() {
    if (loadPromise.value !== null) {
      return loadPromise.value
    }

    if (isLoaded.value) {
      return Promise.resolve()
    }

    isLoading.value = true

    loadPromise.value = Axios.get('https://brillout.github.io/star-wars/api/films.json')
    .then((response) => {
      movies.value = response.data
      isLoaded.value = true
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      isLoading.value = false
      loadPromise.value = null
    })

    return loadPromise.value
  }

  return { isLoaded, isLoading, movies, load }
})
