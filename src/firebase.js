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


export const createName = (item) => {
  setDoc(doc(db, "names", item.name), item)

};

export async function searchName(name, pass) {
  let obj 

  await getDocs(collection(db, "names")).then((response) => {
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
export async function deleteNames(name) {

  await deleteDoc(doc(db, "names", name));

};


