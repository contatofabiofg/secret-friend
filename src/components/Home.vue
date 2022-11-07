<script setup>
import { ref } from "vue";
import {createName, deleteNames} from '../firebase'

const nameInput = ref("");
const nameList = ref([]);
const secondNameList = ref([]);
const result = ref([]);

function addToList() {
if(secondNameList.value.length > 0) {
  deleteAll()
}

  if(nameInput.value != '') {
    nameList.value.push(nameInput.value);
  nameInput.value = "";
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

function deleteAll() {
  result.value = [];
  secondNameList.value = [];
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    deleteNames(nameList.value[i])
    }
    nameList.value = [];
  
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">

    <label for="name">Insira aqui um dos nomes</label>
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
 

    <div v-if="nameList.length > 0">
      <ul v-for="(name, index) in nameList" :key="index">
        <li @click="eraseName(index)" class="select-none cursor-pointer">{{ name }} <span>❌</span></li>
      </ul>
    </div>


    <button @click="sort()" class="mt-3">Sortear</button>

     
     
    <div v-if="result.length > 0" class="flex flex-col">
      <h2>Nomes e senhas (encaminhe para os nomes da lista)</h2>
      <div v-for="(item, index) in result" :key="index">
        <p><b>Nome:</b> {{ item.name }} <b>senha:</b> {{item.pass}}</p>
      </div>
      <button @click="deleteAll()">Resetar sorteio</button>
    </div>
    
  </div>
</template>

<style scoped></style>
