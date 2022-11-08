<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
<div class="w-full h-screen flex justify-center items-center">
    <div class="w-[350px] max-w-[95%] flex flex-col justify-center items-center bg-white py-3 rounded-lg">
    <h1>Amigo Secreto</h1>
    <div class="flex mb-5">
      <a @click="router.push('/')" >Home</a>
      |
      <a @click="router.push('/resultado')">Resultado</a>
      
     </div>
     <div class="w-full px-3">
      <router-view></router-view>
     </div>
    
  </div>
</div>
  
</template>

<style scoped></style>
