'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import './articledetailpage.css';
import CommentArticleCard from '@/components/CommentArticleCard';

export default function ArticleDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const handleEdit = () => {
        router.push(`/upload?editId=${id}`);
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.delete(`${apiUrl}/api/articles/${id}`);
            alert('게시글이 삭제되었습니다.');
            router.push('/article');
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    const fetchComments = async () => {
        if (!id) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            const res = await axios.get(`${apiUrl}/api/comments/articles`, {
                params: { articleId: id },
            });
            setCommentList(res.data || []);
            console.log("댓글", res.data)
        } catch (error) {
            console.error('댓글 목록 불러오기 실패:', error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim() || !id) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.post(`${apiUrl}/api/comments/articles`, {
                content: comment,
                articleId: Number(id),
            });
            setComment('');
            fetchComments();
        } catch (error) {
            console.error('댓글 등록 실패:', error);
            alert('댓글 등록에 실패했습니다.');
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchArticle = async () => {
            try {
                setIsLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
                const res = await axios.get(`${apiUrl}/api/articles/${id}`);
                setArticle(res.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
        fetchComments();
    }, [id]);

    if (isLoading) {
        return (
            <div className="article-detail-wrapper">
                <div className="article-detail-center">
                    <p style={{ padding: '2rem 0', color: '#6B7280', fontSize: '1.6rem' }}>게시글을 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="article-detail-wrapper">
                <div className="article-detail-center">
                    <p style={{ padding: '2rem 0', color: '#6B7280', fontSize: '1.6rem' }}>존재하지 않는 게시글입니다.</p>
                </div>
            </div>
        );
    }

    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\s/g, '').replace(/\.$/, '')
        : '';

    return (
        <div className="article-detail-wrapper">
            <div className="article-detail-center">

                <div className="article-detail-header">
                    <div className="article-detail-title">{article.title}</div>
                    <div
                        className="article-detail-button-pack"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <img className="buttonpack-icon" src="/asset/button_pack.png" alt="메뉴"></img>
                        {showMenu && (
                            <div className="article-detail-dropdown-modal">
                                <div
                                    className="article-detail-dropdown-option"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(false);
                                        handleEdit();
                                    }}
                                >
                                    수정하기
                                </div>
                                <div
                                    className="article-detail-dropdown-option"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(false);
                                        handleDelete();
                                    }}
                                >
                                    삭제하기
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="article-detail-subheader">
                    <div className="article-detail-date">{formattedDate}</div>
                    <div className="article-detail-like-button">
                        <img className="article-detail-heart-icon" src="/asset/ic_heart.png" alt="..."></img>
                        <p className="article-detail-like-number">{article.favoriteCount ?? 0}</p>
                    </div>
                </div>

                <div className="article-detail-content">
                    {article.content}
                </div>

                <div className="article-detail-commentbox">
                    <div className="article-detail-commentbox-title">댓글 입력</div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="article-comment-textbox"
                        placeholder="댓글을 입력해주세요"
                    />
                    <button
                        className="article-comment-upload-button"
                        disabled={!comment.trim()}
                        onClick={handleCommentSubmit}
                    >
                        등록
                    </button>
                </div>

                <div className="article-detail-commentlist">
                    {commentList &&
                        commentList.map((p) => (
                            <CommentArticleCard
                                key={p.id}
                                id={p.id}
                                content={p.content}
                                createdAt={p.createdAt}
                                onRefresh={fetchComments}
                            />
                        ))}
                </div>

                {commentList.length === 0 && (
                    <div className="article-nocomment-section">
                        <div className="article-nocomment-image"><img src="/asset/Img_reply_empty.png" alt="..."></img></div>
                        <p className="article-nocomment-alert">아직 댓글이 없어요</p>
                        <p className="article-nocomment-alert">지금 댓글을 달아보세요!</p>
                    </div>
                )}

                <div className="article-detail-bottom">
                    <Link href="/article" className="article-back">
                        게시글로 돌아가기
                    </Link>
                </div>


            </div>
        </div>
    );
}
