<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { searchName } from '../firebase'

const router = useRouter()
const nameInput = ref('')
const passInput = ref('')
const result = ref(null)
const collection = ref(window.location.pathname.slice(11))

async function searchResult() {
  result.value = await searchName(
    nameInput.value,
    passInput.value,
    collection.value
  )
}
</script>

<template>
  <div>
    <label for="collection" class="text-xs text-slate-600"
      >Código do sorteio</label
    >
    <p class="text-xs text-slate-600 mb-3">{{ collection }}</p>

    <h1>Descubra quem você tirou!</h1>

    <label for="name">Escreva aqui o seu nome</label>
    <input type="text" id="name" v-model="nameInput" />
    <label for="pass">Escreva aqui a sua senha</label>
    <input type="text" id="pass" v-model="passInput" />
    <button @click="searchResult()" class="w-full">Resultado</button>
    <button @click="router.push('/')" class="w-full">Ir para a Home</button>

    <div v-if="result">
      <p class="mt-3">
        Olá, <b>{{ result.name }}</b
        >! Seu amigo ou amiga secreto(a) é... <b>{{ result.friend }}</b
        >!
      </p>
    </div>
  </div>
</template>

<style scoped></style>
