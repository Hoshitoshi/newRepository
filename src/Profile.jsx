import React from 'react'
import "./Profile.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Timeline from '../../components/timeline/Timeline';
import Lesson1 from '../lesson/lesson1/Lesson1';
import Lesson2 from '../lesson/lesson2/Lesson2';
import Lesson3 from '../lesson/lesson3/Lesson3';

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <>
    <Topbar/>
    <div className="profile">
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img src={PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className='profileCoverImg'/>
          <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className='profileUserImg'/>
        </div>
        <div className="profileInfo">
          <h4 className='profileInfoName'>Toshi</h4>
          <span className='profileInfoDesc'>英語学習がんばってます！</span>
        </div>
      </div>
      <div className="profileRightButtom">
    
    <Rightbar profile/>
    {/* <Sidebar/> */}
    {/* <Lesson1/>
    <Lesson2/>
    <Lesson3/> */}
      </div>
    </div>
    </div>
    </>
  )
}

export default Profile
