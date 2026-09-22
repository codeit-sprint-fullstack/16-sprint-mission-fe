

import '../css/reset.css';
import '../css/variables.css';
import '../css/pandaroot.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Landing() {



  return (
    <>
      <div>
      
        <Header/>
        
        <div class="main-wrapper">

          <div class="section1">
            <div class="banner-frame">
              <div class="frame-left">
                <span class="left-comment">
                  일상의 모든 물건을
                </span>
                <span class="left-comment">
                  거래해 보세요
                </span>
                <a href="items">
                  <button class="button-gomarket">
                    구경하러 가기
                  </button>
                </a>

              </div>
              <div class="frame-right">
                <img src="./asset/Group 33680.png" alt="판다인사" />
              </div>
            </div>
          </div>

          <div class="section2">
            <div class="introshot">
              <div class="introshot-image">
                <img src="./asset/Img_home_01.png" alt="판다옷구경" />
              </div>
              <div class="introshot1-desc">
                <span class="i1-desc1">Hot item</span>
                <span class="i1-desc2">인기 상품을</span>
                <span class="i1-desc2">확인해 보세요</span>
                <span class="i1-desc3">가장 HOT한 중고거래 물품을</span>
                <span class="i1-desc3">판다 마켓에서 확인해 보세요</span>
              </div>
            </div>
          </div>
          <div class="section3">
            <div class="introshot">
              <div class="introshot1-desc desc-rightfix">
                <span class="i1-desc1 text-rightfix">Search</span>
                <span class="i1-desc2 text-rightfix">구매를 원하는</span>
                <span class="i1-desc2 text-rightfix">상품을 검색하세요</span>
                <span class="i1-desc3 text-rightfix">구매하고 싶은 물품은</span>
                <span class="i1-desc3 text-rightfix">검색해서 쉽게 찾아보세요</span>
              </div>
              <div class="introshot-image">
                <img src="./asset/Img_home_02.png" alt="판다검색소개" />
              </div>
            </div>
          </div>
          <div class="section2">
            <div class="introshot">
              <div class="introshot-image">
                <img src="./asset/Img_home_03.png" alt="상품등록소개이미지" />
              </div>
              <div class="introshot1-desc">
                <span class="i1-desc1">Register</span>
                <span class="i1-desc2">판매를 원하는</span>
                <span class="i1-desc2">상품을 등록하세요</span>
                <span class="i1-desc3">어떤 물건이든 판매하고 싶은 상품을</span>
                <span class="i1-desc3">쉽게 등록하세요</span>
              </div>
            </div>
          </div>

          <div class="section5">
            <div class="banner-frame">
              <div class="frame-left">
                <span class="left-comment">
                  믿을 수 있는
                </span>
                <span class="left-comment">
                  판다마켓 중고 거래
                </span>
              </div>
              <div class="frame-right">
                <img src="./asset/Img_home_bottom.png" alt="판다작별" />
              </div>
            </div>
          </div>

        </div>
        
        <Footer/>

      </div>


    </>
  )
}

export default Landing
