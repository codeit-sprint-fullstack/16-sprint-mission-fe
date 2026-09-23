import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './footer.css'
import '../css/reset.css'
import '../css/variables.css'


function Footer() {


    return (
        <footer>
            <div class="footer-wrapper">
                <a className = "codeit" href="">ⓒcodeit-2024</a>
                <div class="footer-center">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div class="footer-icons">
                    <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
                        <div class="footer-icon-link">
                            <img src="./asset/facebook.png" alt="페이스북" />
                        </div>

                    </a>
                    <a href="https://www.youtube.com/?app=desktop&hl=ko&gl=KR" target="_blank">
                        <div class="footer-icon-link">
                            <img src="./asset/youtube.png" alt="유튜브" />
                        </div>

                    </a>
                    <a href="https://x.com/?lang=ko" target="_blank">
                        <div class="footer-icon-link">
                            <img src="./asset/twitter.png" alt="트위터" />
                        </div>

                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <div class="footer-icon-link">
                            <img src="./asset/instagram.png" alt="인스타" />
                        </div>

                    </a>
                </div>
            </div>
        </footer>
    )

}
export default Footer