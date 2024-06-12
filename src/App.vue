<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let checkAuth = () => (window.localStorage.token ? true : router.push('/auth'))
onMounted(() => checkAuth())
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped></style>
