'use client';

import { useState, useRef, useEffect } from 'react';
import './uploadpage.css';
import Tag from '@/components/Tag';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('editId');
    const isEditMode = Boolean(editId);

    const [articleName, setArticleName] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const fileInputRef = useRef(null);

    // 수정 모드일 때 기존 데이터 불러오기
    useEffect(() => {
        if (!editId) return;

        const fetchArticle = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
                const res = await axios.get(`${apiUrl}/api/articles/${editId}`);
                const data = res.data;
                if (data) {
                    setArticleName(data.title || '');
                    setArticleContent(data.content || '');
                    if (data.imageUrl) {
                        setImageUrl(data.imageUrl);
                        setPreviewUrl(data.imageUrl);
                    }
                }
            } catch (error) {
                console.error('기존 게시글 불러오기 실패:', error);
                alert('게시글 정보를 불러오는데 실패했습니다.');
            }
        };

        fetchArticle();
    }, [editId]);

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

    // 등록 및 수정 API 연결
    const handleRegister = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            
            if (isEditMode) {
                const res = await axios.patch(
                    `${apiUrl}/api/articles/${editId}`,
                    {
                        title: articleName,
                        content: articleContent,
                        imageUrl: imageUrl
                    }
                );
                alert('게시글을 수정했습니다');
                console.log('수정 성공:', res.data);
                router.push(`/article/${editId}`);
            } else {
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
            }
        } catch (error) {
            console.error(isEditMode ? '게시글 수정 실패:' : '게시글 등록 실패:', error);
            alert(isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div className="upload-wrapper">
            <div className="upload-section-center">
                <div className="upload-header">
                    <p className="upload-header-title">{isEditMode ? '게시글 수정' : '게시글 쓰기'}</p>
                    <button
                        className="upload-confirm-button"
                        disabled={!articleName || !articleContent}
                        onClick={handleRegister}
                    >
                        {isEditMode ? '수정' : '등록'}
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

