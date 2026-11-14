'use client';

import { useState, useEffect } from 'react';
import './registerpage.css';
import Tag from '@/components/Tag';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');
  const isEditMode = Boolean(editId);

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);

  // 수정 모드일 때 기존 상품 데이터 불러와서 채우기
  useEffect(() => {
    if (!editId) return;

    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
        const res = await axios.get(`${apiUrl}/products/${editId}`);
        const data = res.data;
        if (data) {
          setProductName(data.name || '');
          setProductDesc(data.description || '');
          setPrice(data.price !== undefined ? String(data.price) : '');
          setTagList(data.tags || []);
        }
      } catch (error) {
        console.error('기존 상품 정보 불러오기 실패:', error);
        alert('상품 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchProduct();
  }, [editId]);

  // 등록 및 수정 API 연결
  const handleRegister = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/login');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';

      if (isEditMode) {
        // 수정 API
        await axios.patch(
          `${apiUrl}/products/${editId}`,
          {
            name: productName,
            description: productDesc,
            price: Number(price),
            tags: tagList,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('상품을 수정했습니다.');
        router.push(`/items/${editId}`);
      } else {
        // 등록 API
        const res = await axios.post(
          `${apiUrl}/products`,
          {
            name: productName,
            description: productDesc,
            price: Number(price),
            tags: tagList,
            images: "https://example.com/"
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('상품을 등록했습니다');
        console.log('등록 성공:', res.data);
        router.push('/items');
      }
    } catch (error) {
      console.error(isEditMode ? '상품 수정 실패:' : '상품 등록 실패:', error);
      console.error('서버 에러 상세:', error.response?.data);
      if (error.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
        localStorage.removeItem('accessToken');
        router.push('/login');
        return;
      }

      alert(isEditMode ? '상품 수정에 실패했습니다.' : '상품 등록에 실패했습니다.');
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
          <p className="register-header-title">{isEditMode ? '상품 수정하기' : '상품 등록하기'}</p>
          <button
            className="register-confirm-button"
            disabled={!productName || !productDesc || !price}
            onClick={handleRegister}
          >
            {isEditMode ? '수정' : '등록'}
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

