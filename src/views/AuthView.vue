<script setup lang="ts">
import { ref } from 'vue'
import NeuralNetwork from '../components/NeuralNetwork.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const token = ref('')
const loading = ref(false)
const tokenError = ref(false)
const error = ref('')

async function submitForm() {
  loading.value = true
  // Эмуляция вызова API с задержкой 3 секунды
  setTimeout(() => {
    if (token.value.match(/^[a-zA-Z]{16}$/) && token.value == 'aaaaaaaaaaaaaaaa') {
      // Ваша логика для успешной проверки токена
      window.localStorage.token = token.value
      loading.value = false
      router.push('/')
    } else {
      tokenError.value = true
      error.value = 'Неправильный токен. Пожалуйста, введите токен снова.'
      token.value = ''
      loading.value = false
    }
  }, 3000)
}
</script>

<template>
  <main>
    <NeuralNetwork />
    <section class="h-[100vh] flex items-center">
      <div class="h-[400px] w-[100%] max-w-[1200px] mx-auto">
        <h1 class="text-[36px] drop-shadow-xl text-white text-center font-[1000]">
          Добро пожаловать на наш сайт для поиска книг! Независимо от вашего вкуса или интересов, мы
          поможем вам найти идеальную книгу. Используйте наш удобный поиск, чтобы открывать новые
          миры и находить вдохновение на каждой странице.
        </h1>

        <div
          class="glass mx-auto max-w-[650px] p-[30px] min-h-[150px] pb-[40px] z-[999] sticky bottom-0 mt-[30px]"
        >
          <label for="tokenInput" class="text-[25px] text-white font-[arial] font-[600]">
            Введите ваш 16-значный имя пользователя.
          </label>
          <label class="mt-[20px] gap-[20px] input-bordered flex items-center gap-2">
            <form @submit.prevent="submitForm" class="flex gap-[20px] justify-between w-[100%]">
              <input
                class="block w-[100%] placeholder:font-[400] font-[1000] px-[20px] rounded-[8px] h-[50px] outline-none"
                id="tokenInput"
                type="text"
                maxlength="16"
                v-model="token"
                :disabled="loading"
                :class="{ invalid: tokenError }"
                placeholder="Введите токен"
                pattern="^[a-zA-Z]{16}$"
                title="Токен должен содержать ровно 16 букв латинского алфавита"
                required
              />
              <button
                class="btn w-[120px] bg-[orangered] text-white border h-[50px] rounded-[8px] px-[40px]"
                type="submit"
              >
                <span class="loading loading-dots loading-xs" v-if="loading"></span>
                <span v-else>Отправить</span>
              </button>
            </form>
          </label>
          <div class="error mt-[5px]">{{ error }}</div>
        </div>
      </div>
      <div v-if="error" class="error toast mb-[20px] mr-[20px]">
        <div class="alert flex items-center bg-[red] alert-info w-[500px] h-[70px]">
          <span class="text-[17px] text-white">{{ error }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.invalid {
  border: 1px solid red !important;
  color: red !important;
}

.error {
  color: red !important;
}

.glass {
  background: transparent;
  backdrop-filter: blur(5px);
  border: 1px solid white;
  border-radius: 15px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.132);
}
</style>
