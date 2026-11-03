'use client';

import { useState, useRef } from 'react';
import './uploadpage.css';
import Tag from '@/components/Tag';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();

    const [articleName, setArticleName] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        if (previewUrl) {
            // 이미 선택된 상태에서 클릭 시 취소하여 원래대로 리셋
            setPreviewUrl('');
            setImageUrl('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            // 선택되지 않은 상태에서는 파일 선택창 열기
            fileInputRef.current?.click();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setImageUrl(file.name); // url은 파일명을 그대로 사용
        }
    };

   
    // 등록 API 연결
    const handleRegister = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            const res = await axios.post(
                `${apiUrl}/api/articles`,
                {
                    title: articleName,
                    content: articleContent,
                    imageUrl: imageUrl
                   
                }
            );
            alert('게시글을 등록했습니다');
            console.log('등록 성공:', res.data);

            router.push('/article');
        } catch (error) {
            console.error('게시글 등록 실패:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };




    return (
        <div className="upload-wrapper">
            <div className="upload-section-center">
                <div className="upload-header">
                    <p className="upload-header-title">게시글 쓰기</p>
                    <button
                        className="upload-confirm-button"
                        disabled={!articleName || !articleContent}
                        onClick={handleRegister}
                    >
                        등록
                    </button>
                </div>

                <div className="upload-body">
                    <p className="upload-subtag">제목</p>
                    <input
                        type="text"
                        value={articleName}
                        className="upload-input-oneline"
                        placeholder="제목을 입력해주세요"
                        onChange={(e) => setArticleName(e.target.value)}
                    />
                    <p className="upload-subtag">내용</p>
                    <textarea
                        value={articleContent}
                        className="upload-input-textbox"
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => setArticleContent(e.target.value)}
                    />
                    <p className="upload-subtag">이미지</p>

                    <div className="upload-image-section" onClick={handleImageClick}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <div className="upload-image-none">
                            <img
                                className="upload-image-none"
                                src={previewUrl || '/asset/image_none.png'}
                                alt="게시글 이미지"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

