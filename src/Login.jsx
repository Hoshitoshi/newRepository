import React from 'react'
import "./Login.css"
import { useState } from 'react';
import { loginWithEmailAndPassword} from './firebase';
import {auth} from "./firebase";
import { Link} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import Home from "./Home"

export default function Login() {

    // function lognInWithGoogle(){
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   auth.signInWithPopup(provider);
    // }
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    
    const login = async (event) => {
     event.preventDefault();
     const user = await loginWithEmailAndPassword(email, password);
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
          <p className="loginMeg">ログインはこちら</p>
          <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}  className="loginInput" placeholder='Eメール'></input>
          <input type="text" value={password} onChange={(event)=>setPassword(event.target.value)}  className="loginInput" placeholder='パスワード'></input>
          <button onClick={login} className='loginButton'>ログイン</button>
          <span className="loginForgot">パスワードを忘れた方へ</span>
          <Link to ="/register" style={{textDecoration: "none", color:"black"}}>
          <button className='loginRegisterButton'>アカウント作成</button>
          </Link>
          
        </div>
      </div>
    </div>
    </div>
    }
    </>
  )
}
