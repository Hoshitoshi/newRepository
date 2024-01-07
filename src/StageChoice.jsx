import React from "react";
import styles from "./StageChoice.module.css";
import { Link } from 'react-router-dom';

export default function StageChoice(){

  return (
    <div className={styles.initial}>
      <div className={styles.frameWrapper}>
        <div className={styles.frame}>
          <div className={styles.div}>
            {/* ボタン */}
            <Link to ="/Home" style={{textDecoration: "none", color:"black"}}>
            <div className={styles.textWrapper}>TrueD</div>
            </Link>

            <div className={styles.overlap}>
              <img className={styles.initialTop} alt="Initial top" src="https://c.animaapp.com/l9dZ4bxd/img/initialtop.png" />
              <img
                className={styles.characterCat}
                alt="Character cat"
                src="https://c.animaapp.com/l9dZ4bxd/img/charactercat@2x.png"
              />
              <img className={styles.fukidashi} alt="Fukidashi" src="https://c.animaapp.com/l9dZ4bxd/img/fukidashi-1.png" />
              
                {/* ボタン */}
                <Link to ="/lessonChoice" style={{textDecoration: "none", color:"black"}}>
              <div className={styles.overlapGroupWrapper}>
                <div className={styles.overlapGroup}>
                  <img
                    className={styles.mapforeiken}
                    alt="Mapforeiken"
                    src="https://c.animaapp.com/l9dZ4bxd/img/mapforeiken3-1@2x.png"
                  />
                  <img
                    className={styles.titleframe}
                    alt="Titleframe"
                    src="https://c.animaapp.com/l9dZ4bxd/img/titleframe-1-3@2x.png"
                  />
                  <div className={styles.textWrapper2}>Eiken 3</div>
                </div>
              </div>
              </Link>

              {/* ボタン */}
              <div className={styles.overlapWrapper}>
                <div className={styles.overlapGroup}>
                  <img
                    className={styles.img}
                    alt="Mapforeiken"
                    src="https://c.animaapp.com/l9dZ4bxd/img/mapforeiken3-3@2x.png"
                  />
                  <img
                    className={styles.titleframe}
                    alt="Titleframe"
                    src="https://c.animaapp.com/l9dZ4bxd/img/titleframe-1-3@2x.png"
                  />
                  <div className={styles.textWrapper2}>Eiken 2</div>
                </div>
              </div>
              <img
                className={styles.mapforeiken2}
                alt="Mapforeiken"
                src="https://c.animaapp.com/l9dZ4bxd/img/mapforeiken3-4@2x.png"
              />
              <div className={styles.divWrapper}>
                <div className={styles.textWrapper3}>Eiken Pre1</div>
              </div>
              <img
                className={styles.mapforeiken3}
                alt="Mapforeiken"
                src="https://c.animaapp.com/l9dZ4bxd/img/mapforeiken3-2@2x.png"
              />
              <div className={styles.frame2}>
                <div className={styles.textWrapper3}>Eiken Pre2</div>
              </div>
              <div className={styles.textWrapper4}>
                レベル上げをするステージを
                <br />
                選択しよう！
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
