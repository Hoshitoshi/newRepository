import React from 'react'
import "./Home.css";
// import Topbar from '../../components/topbar/Topbar';
import Sidebar from './Components/sidebar/Sidebar';
// import Rightbar from '../../components/rightbar/Rightbar';
// import Timeline from '../../components/timeline/Timeline';
// import { Application } from '@splinetool/runtime';
import Register from './Register';
import Spline from '@splinetool/react-spline';
import { Initial } from './Initial';
import "./Initial.css"
// import { StageChoice } from './StageChoice';
// import { LessonChoice } from '../lessonChoice/LessonChoice';
// import Spline from '@splinetool/react-spline';


// import { Lesson1 } from '../lesson/lesson1/Lesson1';



export default function Home() {
//   const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/49e5ssIsbveARkYt/scene.splinecode');
  return (
    <>
    <Spline scene="https://prod.spline.design/49e5ssIsbveARkYt/scene.splinecode" />
    {/* <Spline scene="https://prod.spline.design/b54kCP10NXn3D6Fl/scene.splinecode" /> */}
    {/* <Spline scene="https://prod.spline.design/b54kCP10NXn3D6Fl/scene.splinecode" /> */}
    {/* <Lesson1/> */}

    <div>
    {/* <Topbar/> */}
    <div className="homeContainer">
    <Sidebar className="sidebar"/>
    {/* <Timeline/> */}
    {/* <Rightbar/> */}
    {/* <Timeline/> */}
    {/* <StageChoice/>
    <LessonChoice/> */}
    </div>
    </div>
    
    </>
  );
}





