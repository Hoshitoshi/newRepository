import React from 'react';
import "./Register.css";
import { Button } from '@mui/material';
import firebase from "firebase/compat/app";
import {auth} from "./firebase";
import { useState } from 'react';
import { signupWithEmailAndPassword } from './firebase';
import { Link} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import Home from "./Home"


export default function Register() {
function signInWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}
const [email, setEmail]= useState('');
const [password, setPassword]= useState('');

const signup = async (event) => {
 event.preventDefault();
 const user = await signupWithEmailAndPassword(email, password);
 console.log('User情報:', user);
}
const [user] = useAuthState(auth);


  return (
    <>
   {user? 
   <Home/>:
    <div className='login'>
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className='loginLogo'>TrueD</h3>
        <span className="loginDesc">楽しく単語マスターに。</span>
      </div>

      <div className="loginRight">
        <div className="loginBox">
          <p className="loginMeg">新規登録</p>
          {/* <input type="text" className="loginInput" placeholder='ユーザー名'></input> */}
          <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} className="loginInput" placeholder='Eメール'></input>
          
          <input type="text" value={password} onChange={(event)=>setPassword(event.target.value)} className="loginInput" placeholder='パスワード'></input>
          {/* <input type="text" className="loginInput" placeholder='確認用パスワード'></input> */}
          <button  onClick={signup} className='loginButton'>サインアップ</button>
          <p className='matawa'>-または-</p>
          <Button className="GoogleSignInButton" onClick = {signInWithGoogle}>Googleでログインする</Button>

          <Link to ="/login" style={{textDecoration: "none", color:"black"}}>
          <button className='loginRegisterButton'>アカウントを既にお持ちの方はこちら</button>
            </Link>

{/* <Link to ="/profile/shincode" style={{textDecoration: "none", color:"black"}}>
            <span className="sidebarListItemText">プロフィール</span>
            </Link> */}
        </div>
      </div>
    </div>
    </div>
  }
  </>
  )
          }
