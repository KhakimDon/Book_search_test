<script setup lang="ts">
import { onMounted, ref } from 'vue'
let errorToTop = ref(false)
let errorOut = ref(false)

const props = defineProps(['errorText'])
onMounted(() => {
  setTimeout(() => (errorToTop.value = true), 100)
  setTimeout(() => (errorOut.value = true), 1500)
})
</script>

<template>
  <div
    :class="{ errorToTop: errorToTop, errorOut: errorOut }"
    class="fixed z-[9999] s:max-w-[90%] duration-[1s] right-[20px] rounded-[10px] bottom-[-100%] flex items-center bg-[red] alert-info px-[30px] h-[70px]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 mr-[10px] text-white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>

    <span class="text-[17px] s:text-[14px] text-white">{{ props.errorText }}</span>
  </div>
</template>

<style scoped>
.errorToTop {
  bottom: 20px;
  right: 20px;
  transition-duration: 0.5s;
}
.errorOut {
  transition-duration: 0.5s;
  bottom: 20px;
  right: -100%;
}
</style>
