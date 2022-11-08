import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, setDoc, getDocs,  deleteDoc  } from "firebase/firestore"; 
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyB61kMPm3s2bA6ggze9CElLzW9ol0W-5Cw",
  authDomain: "vue-secret-friend.firebaseapp.com",
  projectId: "vue-secret-friend",
  storageBucket: "vue-secret-friend.appspot.com",
  messagingSenderId: "330694535357",
  appId: "1:330694535357:web:8149ba347f807119c0efd4",
};

const firebaseApp = initializeApp(config);

const db = getFirestore(firebaseApp);


export const createName = (item, collection) => {
  setDoc(doc(db, collection, item.name), item)

};

export async function getAllDocs(collection) {
  await getDocs(collection(db, collection)).then((response) => {
  return response
  })
}

export async function searchName(name, pass, collection) {
  let obj 

  await getDocs(collection(db, collection)).then((response) => {
    response.forEach((element) => {
      if (element.data().name.toLowerCase() == name.toLowerCase() && element.data().pass == pass) {
        obj = {name: element.data().name, friend: element.data().friend}
        }
      })
    
  }
  )
 console.log(obj)
  return obj
};

/*

export const getName = async (id) => {
  const name = await namesCollection.doc(id).get();
  return name.exists ? name.data() : null;
};

export const updateName = (id, name) => {
  return namesCollection.doc(id).update(name);
};
*/
export async function deleteNames(collection) {

  let list = []

  await getDocs(collection(db, collection)).then( async (response) => {
    response.forEach((element) => {
       list.push(element.data().name)
    })
    for (let i = 0, j = list.length - 1; i <= j; i++) {
      await deleteDoc(doc(db, collection, list[i]));
    }
  }
  )
};


