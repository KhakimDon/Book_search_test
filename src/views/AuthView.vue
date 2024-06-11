<script setup lang="ts">
 import NeuralNetwork from "../components/NeuralNetwork.vue"

</script>

<template>
  <main>
      <NeuralNetwork/>
      <section class="h-[100vh] flex items-center">
        <div class="h-[400px] w-[100%] max-w-[1200px] mx-auto">
          <h1 class="text-[36px] drop-shadow-xl	 text-white text-center font-[1000]">
            Добро пожаловать на наш сайт для поиска книг! Независимо от вашего вкуса или интересов, мы поможем вам найти идеальную книгу. Используйте наш удобный поиск, чтобы открывать новые миры и находить вдохновение на каждой странице.
          </h1>
          <div class="glass min-h-[200px] z-[999] sticky bottom-0 mt-[30px] bg-[red]">

          </div>
        </div>
      </section>
  </main>
</template>

<style scoped>
.glass{

}
</style>
