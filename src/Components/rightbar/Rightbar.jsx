import React from 'react'
import "./Rightbar.css"

export default function Rightbar({profile}){
    
  const HomeRightbar = ()=>{
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    return(
   <>
<div className="eventContainer">
  <img src="assets/star.png" alt=""
  className='starImg' />
  <span className='eventText'><b>フォロワー限定</b>イベント開催中！</span>
</div>
<img src="assets/ad.jpeg" alt="" className='eventImg' />
<h4>オンラインの友達</h4>
<ul className="rightbarFriendList">
  <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className='rightbarProfileImg'/>
      <span className='rightbarOnline'></span>
    </div>
    <span className="rightbarUserName">Shin Code</span>
  </li>
  <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
      <img src="assets/person/2.jpeg" alt="" className='rightbarProfileImg'/>
      <span className='rightbarOnline'></span>
    </div>
    <span className="rightbarUserName">tanaka</span>
  </li>
</ul>
</>
    )
  }

   const ProfileRightbar = () =>{
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    return<>
      <h4 className='rightbarTitle'>ユーザー情報</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className='rightbarInfoKey'>出身：</span>
          <span className='rightbarInfoKey'>福岡</span>
        </div>
        <h4 className='rightbarTitle'>あなたの友達</h4>
        <div className="rightbarFollowings">

          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/2.jpeg"} alt="" className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Toshi</span>
          </div>
      
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/3.jpeg"} alt="" className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Hoshino</span>
          </div>
       
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/4.jpeg"} alt="" className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Suzuki</span>
          </div>
     
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/5.jpeg"} alt="" className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Satou</span>
          </div>
      
          <div className="rightbarFollowing">
            <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className='rightbarFollowingImg'/>
            <span className='rightbarFollowingName'>Yamada</span>
          </div>
        </div>
      </div>
      </>
    
   }
    return(
        <div className='rightbar'>
          <div className="rightbarWrapper">
          {profile ? <ProfileRightbar/>:<HomeRightbar/>}
          </div>
        </div>
    );
}
