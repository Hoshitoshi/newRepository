import React from 'react'
import { Bookmark, Home, MessageRounded, Person, Search, Settings } from '@mui/icons-material'
import { Notifications } from '@mui/icons-material'
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SignOut from '../SignOut';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";



function Sidebar() {
  const [user] = useAuthState(auth);
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Home className="sidebarIcon"/>
            <Link to ="/home" style={{textDecoration: "none", color:"black"}}>
            <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Search className="sidebarIcon"/>
            <Link to ="/stageChoice" style={{textDecoration: "none", color:"black"}}>
            <span className="sidebarListItemText">レベル上げ</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            <Notifications className="sidebarIcon"/>
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidebarListItem">
            <MessageRounded className="sidebarIcon"/>
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span className="sidebarListItemText">ブックマーク</span>
          </li> */}
          <li className="sidebarListItem">
            <Person className="sidebarIcon"/>
            <Link to ="/profile/shincode" style={{textDecoration: "none", color:"black"}}>
            <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Settings className="sidebarIcon"/>
            <span className="sidebarListItemText">設定</span>
          </li>
        </ul>
        <div className='timeline'>
      <div className="timelineWrapper">
        {/* <Share/> */}
        {/* <Post/> */}
      </div>
      {user? 
      <SignOut/>:
      <div>
        <Link to="/register" style={{color:"black"}}>
    <p>新規登録</p>
    </Link>
    <Link to="/login" style={{color:"black"}}>
    <p>ログイン</p>
    </Link>
    </div>}
    </div>
        <hr className="sidebarHr"/>
        {/* <ul className='sidebarFriendList'>
          <li className="sidebarFriend">
            <img src="/assets/person/2.jpeg" 
            alt=""
            className='sidebarFriendImg' />
            <span className="sidebarFriendName">Aさん</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/3.jpeg" 
            alt=""
            className='sidebarFriendImg' />
            <span className="sidebarFriendName">Bさん</span>
          </li>
          <li className="sidebarFriend">
            <img src="/assets/person/4.jpeg" 
            alt=""
            className='sidebarFriendImg' />
            <span className="sidebarFriendName">Cさん</span>
          </li>
        </ul> */}
      </div>
    </div>
  )
}

export default Sidebar
