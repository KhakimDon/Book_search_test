import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const book = ref([])
  const fetchError = ref(false)

  async function fetch(item: String) {
    products.value = []
    await axios.get(import.meta.env.VITE_API.toString() + item)
      .then(response => response.data.items ? products.value = response.data.items : false)
      .catch(error => console.log(error))
    console.log(products.value);

  }

  async function bookFetch(item: String) {
    book.value = []
    await axios.get(import.meta.env.VITE_API.toString() + item)
      .then(response => response.data.items ? book.value = response.data.items[0] : false)
      .catch(error => console.log(error))
    console.log(book.value);

  }

  function error() {
    fetchError.value = true
    setTimeout(() => {
      fetchError.value = false
    }, 3000);

  }


  return { products, fetch, bookFetch, book, error, fetchError }
})
