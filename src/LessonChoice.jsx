import React from "react";
import styles from "./LessonChoice.module.css";
import { Link } from 'react-router-dom';

export const LessonChoice = () => {
  return (
    <div className={styles.index}>
      <div className={styles.frameWrapper}>
        <div className={styles.frame}>
        <Link to ="/stageChoice" style={{textDecoration: "none", color:"black"}}>
          <div className={styles.textWrapper}>TrueD</div>
          </Link>
          <div className={styles.div}>
            <div className={styles.frame2}>
              <div className={styles.textWrapper2}>
                レベル上げながらゴールを目指そう！全問クリアすると、【宝の地図】が
                <br />
                手に入るよ！
              </div>
              <img
                className={styles.characterCat}
                alt="Character cat"
                src="https://cdn.animaapp.com/projects/653a87b84e89f359aa42b546/releases/653b891a42eb0b7565f26e83/img/charactercat.png"
              />
            </div>
            <div className={styles.ellipseWrapper}>

              {/* Eiken 3 ボタン */}
              <Link to ="/quizHandler" style={{textDecoration: "none", color:"black"}}>
              <div className={styles.ellipse} />
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LessonChoice;