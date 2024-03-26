import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounter = defineStore('counter', () => {
  const count = ref(0 as number)
  function increment() {
    count.value++
  }

  return { increment, count }
})
