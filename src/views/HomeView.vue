<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '../stores/products'
import Error from '../components/Error.vue'

const products = useProductsStore()
const search = ref('')
const empty = ref(false)
const searchFunc = async () => {
  await products.fetch(search.value)
  products.products.length == 0 ? (empty.value = true) : (empty.value = false)
}
</script>

<template>
  <main class="overflow-y-auto h-[100vh]">
    <div class="min-h-[250px] pt-[120px] max-w-[1200px] m:max-w-[100%] m:w-[100%] mx-auto">
      <h2 class="text-[37px] font-[1000] m:text-[26px] text-center text-white">
        Удачи в поисках любимой книги.
      </h2>
      <form
        @submit.prevent="searchFunc"
        class="flex max-w-[700px] m:max-w-[90%] m:flex-col m:gap-[5px] mx-auto gap-[20px] mt-[10px]"
      >
        <input
          v-model="search"
          type="text"
          placeholder="пример поиска: programming"
          class="grow focus:border-[2px] border-[2px] border-[transparent] duration-[.3s] focus:border-[orangered] text-[20px] placeholder:font-[400] outline-none font-[1000] px-[20px] h-[48px] rounded-[8px]"
        />
        <button class="btn bg-[orangered] text-white">Поиск</button>
      </form>
    </div>

    <div class="min-h-[300px] mb-[200px] h-[100vh] max-w-[1200px] mx-auto">
      <div v-if="products.products" class="overflow-x-auto max-w-[700px] mx-auto">
        <table v-if="products.products.length > 0" class="table h-[initial]">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th class="text-center">Название книги</th>
              <th class="text-right">Автор</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              v-for="item of products.products"
              @click="$router.push(`/book/${item.id}`)"
              :key="item.id"
              class="hover:bg-[orangered] cursor-pointer duration-[.3s] overflow-y-scroll"
            >
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        v-if="item.volumeInfo.imageLinks"
                        :src="item.volumeInfo.imageLinks.thumbnail"
                        :alt="item.volumeInfo.title"
                      />
                      <div
                        v-else
                        class="h-[100%] flex items-center justify-center w-[100%] bg-[#333]"
                      >
                        <span class="text-white mt-[-5px]">none</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center text-white">{{ item.volumeInfo.title }}</td>
              <td class="text-right text-white">
                <span class="block" v-for="author of item.volumeInfo.authors" :key="author.id">{{
                  author
                }}</span>
                <span v-if="item.volumeInfo && !item.volumeInfo.authors">Автор не указан</span>
              </td>
            </tr>
          </tbody>
          <!-- foot -->
        </table>
        <div v-else-if="!empty" class="flex justify-center pt-[30px]">
          <span class="text-[white] opacity-[0.5] text-[20px]">Тут пока пусто.</span>
        </div>
        <div v-else-if="empty" class="flex justify-center pt-[30px]">
          <span class="text-[white] text-[20px]">По вашему запросу ничего не найдено😥</span>
        </div>
      </div>
    </div>

    <Error errorText="Не удалось загрузить книгу 😥" v-if="products.fetchError" />
  </main>
</template>

<style>
.errorActive {
  animation-name: errors;
  animation-duration: 3s;
}

@keyframes errors {
  0% {
    margin-bottom: -300px;
    opacity: 0;
    background: blue;
  }
  50% {
    margin-bottom: 0;
    opacity: 1;
    background: yellow;
  }
  100% {
    transform: translateX(100px) !important;
    opacity: 0;
    background: green;
  }
}
</style>