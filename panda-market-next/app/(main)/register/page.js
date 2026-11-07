'use client';

import { useState } from 'react';
import './registerpage.css';
import Tag from '@/components/Tag';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);

  // 등록 API 연결
  const handleRegister = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
      const res = await axios.post(
        `${apiUrl}/api/products`,
        {
          name: productName,
          description: productDesc,
          price: Number(price),
          tags: tagList,
        }
      );
      alert('상품을 등록했습니다');
      console.log('등록 성공:', res.data);

      router.push('/items');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  // 태그 추가
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();

      const trimmedValue = tag.trim();
      if (trimmedValue && !tagList.includes(trimmedValue)) {
        setTagList([...tagList, trimmedValue]);
        setTag('');
      }
    }
  };

  // 태그 삭제
  const handleRemoveTag = (target) => {
    setTagList(tagList.filter((t) => t !== target));
  };

  return (
    <div className="register-wrapper">
      <div className="register-section-center">
        <div className="register-header">
          <p className="register-header-title">상품 등록하기</p>
          <button
            className="register-confirm-button"
            disabled={!productName || !productDesc || !price}
            onClick={handleRegister}
          >
            등록
          </button>
        </div>

        <div className="register-body">
          <p className="register-subtag">상품명</p>
          <input
            type="text"
            value={productName}
            className="register-input-oneline"
            placeholder="상품명을 입력해주세요"
            onChange={(e) => setProductName(e.target.value)}
          />

          <p className="register-subtag">상품 소개</p>
          <textarea
            value={productDesc}
            className="register-input-textbox"
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => setProductDesc(e.target.value)}
          />

          <p className="register-subtag">판매가격</p>
          <input
            type="text"
            value={price}
            className="register-input-oneline"
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => setPrice(e.target.value)}
          />

          <p className="register-subtag">태그</p>
          <input
            type="text"
            value={tag}
            className="register-input-oneline"
            placeholder="태그를 입력해주세요"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="register-tag-collection">
          {tagList.map((tagItem, index) => (
            <Tag key={index} tag={tagItem} onRemove={handleRemoveTag} />
          ))}
        </div>
      </div>
    </div>
  );
}

