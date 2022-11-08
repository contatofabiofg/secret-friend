<script setup>
import { ref } from "vue";
import {createName, deleteNames} from '../firebase'

const nameInput = ref("");
const nameList = ref([]);
const secondNameList = ref([]);
const result = ref([]);
const copyClicked = ref(false)

function addToList() {
if(secondNameList.value.length > 0) {
  deleteAll()
}

  if(nameInput.value != '') {
    if (nameList.value.length < 20) {
      nameList.value.push(nameInput.value);
      nameInput.value = "";
    } else {
      alert("Limite de 20 nomes por sorteio atingido")
    }
    
  }
 
}

function eraseName(index) {
  nameList.value.splice(index, 1);
}

function sort() {
  secondNameList.value = [];
  let backupList = [];
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10);
    if (number % 2 == 0) {
      backupList.push(nameList.value[i]);
    } else {
      backupList.unshift(nameList.value[i]);
    }
  }
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10);
    if (number % 2 == 0) {
      secondNameList.value.push(backupList[i]);
    } else {
      secondNameList.value.unshift(backupList[i]);
    }
  }

  checkValues();
}

function checkValues() {
  let pass = true;
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    if (nameList.value[i] == secondNameList.value[i]) {
      pass = false;
    }
  }
  if (pass) {
    generateResult();
  } else {
    sort();
  }
}

function generateResult() {

  result.value = [];
  for (let i = 0, j = nameList.value.length; i < j; i++) {
    let obj = { name: nameList.value[i], friend: secondNameList.value[i], pass: Math.random().toString().slice(3,7)};
    createName(obj)
    result.value.push(obj);
  }
}

function copy(name, pass) {
  copyClicked.value = true
  setTimeout(()=> {
    copyClicked.value = false
  },2000)
  navigator.clipboard.writeText(`Acesse o site https://secret-friend-phi.vercel.app/ e veja quem você tirou no Amigo Secreto! Basta incluir seu nome (${name}) e sua senha (${pass})`)
}

function deleteAll() {
  result.value = [];
  secondNameList.value = [];
  nameList.value = [];
  deleteNames()

}
</script>

<template>
  <div class="flex flex-col justify-center items-center">

    <label for="name" class="text-xs text-slate-600">Insira pelo menos três nomes</label>
    <div class="flex">
    <input
    
      type="text"
      id="name"
      v-model="nameInput"
      placeholder=""
      @keyup.enter="addToList()"
    />
    <button @click="addToList()">+</button>
  </div>
 

    <div v-if="nameList.length > 0" class="my-2">
      <ul v-for="(name, index) in nameList" :key="index">
        <li @click="eraseName(index)" class="select-none cursor-pointer">{{ name }} <span>❌</span></li>
      </ul>
    </div>


    <button v-if="nameList.length > 2" @click="sort()" class="mt-3">Sortear</button>

     
     
    <div v-if="result.length > 0" class="flex flex-col">
      <h2>Nomes e senhas (encaminhe para os nomes da lista)</h2>
      <div v-for="(item, index) in result" :key="index">
        <p class="my-1"><b>Nome:</b> {{ item.name }} <b>senha:</b> {{item.pass}} <img src="../assets/copy.png" alt="copy" class="w-5 cursor-pointer inline" @click="copy(item.name, item.pass)"></p>  
      </div>
      <button @click="deleteAll()">Resetar sorteio</button>
    </div>
    
  </div>

  <span :class="[copyClicked ? 'opacity-100' : 'opacity-0']" class="bg-white/75 p-2 text-xs fixed top-5 right-5 z-10 duration-100 select-none">Copiado!</span>
</template>

<style scoped></style>
