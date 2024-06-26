<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import { useRouter } from 'vue-router'
const router = useRouter()
const products = useProductsStore()
const loading = ref(true)
const frame = ref()
const loaded = ref(false)

onMounted(async () => {
  await products.bookFetch(router.currentRoute._rawValue.params.id)
  if (products.book.id == undefined) {
    products.error()
    router.push('/')
  } else loading.value = false

  if (products.book.volumeInfo && products.book.volumeInfo.previewLink) {
    frame.value.onload = () => {
      loaded.value = true
    }
  }
})
</script>

<template>
  <main class="pt-[100px] x:pt-[130px] min-h-[200px] overflow-y-auto h-[100vh] pb-[100px]">
    <div class="min-h-[200px] w-[100%] x:max-w-[95%] max-w-[800px] w-[100%] mx-auto">
      <div class="flex gap-[20px] x:flex-col x:items-center w-[100%]">
        <div class="min-w-[max-content]">
          <img
            v-if="!loading && products.book.volumeInfo.imageLinks"
            class="h-[150px] border-[2px] border-[orangered] rounded-[8px]"
            :src="products.book.volumeInfo.imageLinks.thumbnail"
            alt="image"
          />
          <figure
            v-if="!loading && !products.book.volumeInfo.imageLinks"
            class="h-[150px] min-w-[120px] flex items-center justify-center w-[100%] bg-[gray] font-[600] border-[orangered] rounded-[8px]"
          >
            Картинки нет
          </figure>
          <figure
            v-if="loading"
            class="h-[150px] skeleton min-w-[120px] flex items-center justify-center w-[100%] font-[600] border-[orangered] rounded-[8px]"
          ></figure>
          <div class="mt-[10px]">
            <p class="font-[600]">Авторы:</p>
            <ul v-if="!loading && products.book.volumeInfo">
              <li
                v-for="author of products.book.volumeInfo.authors"
                :key="author.id"
                class="text-white"
              >
                {{ author }}
              </li>
            </ul>
            <ul v-if="loading">
              <li class="text-white skeleton text-[transparent]">Lorem ips</li>
            </ul>
            <ul v-if="products.book.volumeInfo && !products.book.volumeInfo.authors">
              <li>Автор не указан</li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col w-[100%]">
          <span class="font-[600]">Название книги:</span>
          <div
            v-if="!loading && products.book.volumeInfo"
            class="text-[20px] x:flex-col x:items-left gap-[20px] flex justify-between mb-[20px] font-[1000] leading-[27px] text-[white]"
          >
            <span>{{ products.book.volumeInfo.title }}</span>
            <a
              href="#preview"
              v-if="products.book.volumeInfo && products.book.volumeInfo.previewLink"
              class="btn bg-[orangered] text-white border-[orangered]"
            >
              Читать Бесплатно !
            </a>
          </div>

          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-28 mb-[20px]"></div>

          <span class="font-[600]">Описание:</span>
          <p v-if="!loading && products.book.volumeInfo" class="pb-[10px]">
            {{ products.book.volumeInfo.description }}
          </p>

          <p v-if="!loading && !products.book.volumeInfo.description" class="pb-[10px]">
            Описание отсуствует
          </p>

          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div v-if="loading" class="skeleton h-[22px] mt-[5px] w-[100%] mb-[5px]"></div>
          <div
            v-if="!loading"
            class="flex x:flex-col x:gap-[10px] gap-[50px] justify-between w-[100%] mt-[10px] border-t"
          >
            <div class="mt-[10px] flex flex-col items-center">
              <p class="font-[600]">Cтраниц:</p>
              <span v-if="products.book.volumeInfo.pageCount" class="text-[white]">{{
                products.book.volumeInfo.pageCount
              }}</span>
              <span v-else class="text-[white]">Неизвестно</span>
            </div>
            <div class="mt-[10px] flex flex-col items-center">
              <p class="font-[600]">Опубликовано:</p>
              <span v-if="products.book.volumeInfo.publishedDate" class="text-[white]">{{
                products.book.volumeInfo.publishedDate
              }}</span>
              <span v-else class="text-[white]">Неизвестно</span>
            </div>
            <div class="mt-[10px] items-center flex flex-col">
              <span
                >Рейтинг
                <span v-if="products.book.volumeInfo.averageRating"
                  >({{ products.book.volumeInfo.ratingsCount }})</span
                ></span
              >

              <div
                v-if="products.book.volumeInfo.averageRating"
                class="rating rating-md rating-half"
              >
                <!-- "averageRating": 5, -->
                <!-- "ratingsCount": 1, -->
                <input type="radio" name="rating-10" class="rating-hidden" />
                <div
                  v-for="input of Math.round(products.book.volumeInfo.averageRating)"
                  :key="input.key"
                >
                  <input
                    disabled
                    type="radio"
                    name="rating-10"
                    class="bg-orange-500 mask mask-star-2 mask-half-1"
                  />
                  <input
                    disabled
                    type="radio"
                    name="rating-10"
                    class="bg-orange-500 mask mask-star-2 mask-half-2"
                  />
                </div>
              </div>
              <span class="text-white" v-else>Неизвестно</span>
            </div>
          </div>
        </div>
      </div>

      <div id="preview" v-if="products.book.volumeInfo && products.book.volumeInfo.previewLink">
        <h3 class="text-[26px] pb-[10px] font-[1000] text-white pt-[90px]">Прочитать</h3>
        <div class="min-h-[500px] x:min-h-[400px] w-[100%] border-[1px]">
          <iframe
            ref="frame"
            frameborder="0"
            scrolling="no"
            style="border: 0px"
            :src="`https://books.google.co.uz/books?id=${products.book.id}&lpg=PP1&dq=${products.book.id}=ru&pg=PP1&output=embed`"
            class="w-[100%] h-[500px] x:h-[400px]"
          ></iframe>
        </div>
      </div>
      <!-- averageRating -->
    </div>
  </main>
</template>

<style scoped>
* {
  scroll-behavior: smooth;
}
</style>
