<script setup>
import { ref } from "vue";
import {searchName} from '../firebase'

const nameInput = ref("Fábio");
const passInput = ref('6732');
const result = ref(null);

async function searchResult() {
console.log( await searchName(nameInput.value, passInput.value))
result.value = await searchName(nameInput.value, passInput.value)

}


</script>

<template>
  <div>

    <h1>Descubra quem você tirou!</h1>

    <label for="name">Escreva aqui o seu nome</label>
    <input type="text" id="name" v-model="nameInput" />
    <label for="pass">Escreva aqui a sua senha</label>
    <input type="text" id="pass" v-model="passInput"/>
    <button @click="searchResult()">Resultado</button>

    <div v-if="result">
    <p>Olá, {{result.name}}! Seu amigo ou amiga secreto(a) é... {{result.friend}}!</p>
    </div>


  </div>
</template>

<style scoped></style>
