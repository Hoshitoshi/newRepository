import React from "react";
import "./Initial.css";
import { Link } from 'react-router-dom';

export const Initial = () => {
    return (
        <div className="initial">
            <div className="frame-wrapper">
                <div className="frame">
                    <div className="div">
                        <div className="text-wrapper">TrueD</div>
                        <img className="image" alt="Image" src="/image/InitialPage.gif" />
                        <p className="p">
                            <span className="span">
                                楽しく無料で
                                <br />
                                英単語の
                            </span>
                            <span className="text-wrapper-2">レベル上げ</span>
                            <span className="span">をしよう</span>
                        </p>
                        <div className="frame-2">
                        <Link to ="/home" style={{textDecoration: "none", color:"black"}}>
                            <button className="div-wrapper">
                                <p className="text-wrapper-3">スタート</p>
                            </button>
                            </Link>
                            <div className="frame-3">
                                <div className="text-wrapper-4">ログイン</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

