import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBGNktzCFUUCT5TTTx9HwpZX2L1BuFGvmQ",
  authDomain: "trued-97cce.firebaseapp.com",
  projectId: "trued-97cce",
  storageBucket: "trued-97cce.appspot.com",
  messagingSenderId: "767526623903",
  appId: "1:767526623903:web:3779a70cfad82c287e20aa"
  // appId: "1:767526623903:web:91a719e933ba07517e20aa"
});

// const firebaseConfig = {
//   apiKey: "AIzaSyBGNktzCFUUCT5TTTx9HwpZX2L1BuFGvmQ",
//   authDomain: "trued-97cce.firebaseapp.com",
//   projectId: "trued-97cce",
//   storageBucket: "trued-97cce.appspot.com",
//   messagingSenderId: "767526623903",
//   appId: "1:767526623903:web:3779a70cfad82c287e20aa"
// };

// const app = initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const signupWithEmailAndPassword = async (email, password) =>{
  try{
    const user = await firebase.auth().createUserWithEmailAndPassword(email,password);

    await firebase.auth().currentUser.sendEmailVerification();

    alert('登録成功')
    return user;
  } catch(error){
    // var errorCode = error.code;
    // var errorMessage = error.message;
    alert('登録失敗')
    console.log(error)
  }
}
  const loginWithEmailAndPassword = async (email, password) =>{
    try{
      const user = await firebase.auth().signInWithEmailAndPassword(email,password);
  
      // await firebase.auth().currentUser.sendEmailVerification();
  
      alert('ログイン成功')
      return user;
    } catch(error){
      // var errorCode = error.code;
      // var errorMessage = error.message;
      alert('ログイン失敗')
      console.log(error)
    }

}
export {db, auth, signupWithEmailAndPassword, loginWithEmailAndPassword};