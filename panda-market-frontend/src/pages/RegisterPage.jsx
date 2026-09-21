

import '../css/reset.css';
import '../css/variables.css';
import '../css/registerpage.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tag from '../components/Tag';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function RegisterPage() {

  const navigate = useNavigate();

  const [productName, setProductName] = useState(null);
  const [productDesc, setProductDesc] = useState(null);
  const [price, setPrice] = useState(null);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
//태그 추가
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      console.log("ENTER")
      e.preventDefault();


      const trimmedValue = tag.trim();

      if (trimmedValue && !tagList.includes(trimmedValue)) {
        setTagList([...tagList, trimmedValue]);
        setTag('');
      }

      console.log(tagList);

    }
  }

//태그 삭제
  const handleRemoveTag = (target) => {
    setTagList(tagList.filter(tag => tag !==target))
  }

  return (
    <>
      <div>
        <Header />

        <div className="register-wrapper">
          <div className="register-section-center">

            <div className="register-header">
              <p className="register-header-title">상품 등록하기</p>
              <button
                className="register-confirm-button"
                disabled={!productName && !productDesc && !price || tagList.length === 0}
                onClick={() => { navigate('/registration') }}
              >등록</button>
            </div>

            <div className="register-body">
              <p className="register-subtag">상품명</p>
              <input type="text"
                value={productName}
                className="register-input-oneline"
                placeholder='상품명을 입력해주세요'
                onChange={(e) => setProductName(e.target.value)} />

              <p className="register-subtag">상품 소개</p>
              <textarea type="text"
                value={productDesc}
                className="register-input-textbox"
                placeholder='상품 소개를 입력해주세요'
                onChange={(e) => setProductDesc(e.target.value)} />

              <p className="register-subtag">판매가격</p>
              <input type="text"
                value={price}
                className="register-input-oneline"
                placeholder='판매 가격을 입력해주세요'
                onChange={(e) => setPrice(e.target.value)} />

              <p className="register-subtag">태그</p>
              <input type="text"
                value={tag}
                className="register-input-oneline"
                placeholder='태그를 입력해주세요'
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown} />
            </div>

            <div className="register-tag-collection">
              {tagList.map((tag, index) => (
                <Tag
                  key={index}
                  tag={tag}
                  onRemove = {handleRemoveTag}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default RegisterPage
