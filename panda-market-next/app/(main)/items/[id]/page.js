'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import './productdetailpage.css';
import CommentProductCard from '@/components/CommentProductCard';
export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [isPendingFavorite, setIsPendingFavorite] = useState(false);

    const handleEdit = () => {
        router.push(`/register?editId=${id}`);
    };

    const handleFavorite = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            router.push('/login');
            return;
        }

        if (isPendingFavorite) return;
        setIsPendingFavorite(true);

        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';

        try {
            if (!isFavorite) {
                await axios.post(
                    `${apiUrl}/products/${id}/favorite`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setIsFavorite(true);
                setFavoriteCount((prev) => prev + 1);
            } else {
                await axios.delete(
                    `${apiUrl}/products/${id}/favorite`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setIsFavorite(false);
                setFavoriteCount((prev) => (prev - 1));
            }
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
            if (error.response?.status === 401) {
                alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
                router.push('/login');
                return;
            }
            alert('좋아요 처리에 실패했습니다.');
        } finally {
            setIsPendingFavorite(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 이 상품을 삭제하시겠습니까?')) return;
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            router.push('/login');
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.delete(`${apiUrl}/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('상품이 삭제되었습니다.');
            router.push('/items');
        } catch (error) {
            console.error('상품 삭제 실패:', error);
            if (error.response?.status === 401) {
                alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
                router.push('/login');
                return;
            }
            alert('상품 삭제에 실패했습니다.');
        }
    };

    const fetchComments = async () => {
        if (!id) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            const res = await axios.get(`${apiUrl}/products/${id}/comments`, {
                params: {
                    productId: id,
                    limit: 10,
                    cursor: 0,
                },
            });
            setCommentList(res.data.list || res.data || []);
        } catch (error) {
            console.error('댓글 목록 불러오기 실패:', error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim() || !id) return;

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            router.push('/login');
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.post(
                `${apiUrl}/products/${id}/comments`,
                {
                    content: comment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setComment('');
            fetchComments();
        } catch (error) {
            console.error('댓글 등록 실패:', error);
            console.error('서버 에러 상세:', error.response?.data);
            if (error.response?.status === 401) {
                alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
                router.push('/login');
                return;
            }
            alert('댓글 등록에 실패했습니다.');
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
                const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get(`${apiUrl}/products/${id}`, { headers });
                console.log('상품 상세 정보:', res.data);
                setProduct(res.data);
                setIsFavorite(res.data.isFavorite || false);
                setFavoriteCount(res.data.favoriteCount ?? 0);
            } catch (error) {
                console.error('상품 상세 정보 불러오기 실패:', error);
            }
        };

        fetchProduct();
        fetchComments();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    const imageUrl =
        product?.images && product.images.length > 0
            ? product.images[0]
            : product?.image || '/asset/img_default.svg';

    return (
        <div className="product-detail-page-wrapper">
            <div className="product-detail-page-center">
                <div className="product-detail-page-top-info">
                    <img
                        className="product-detail-page-image"
                        src={imageUrl}
                        alt={product?.name || "상품"}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/asset/img_default.svg";
                        }}
                    />

                    <div className="product-detail-page-right-section">
                        <div className="product-detail-title-header">
                            <p className="product-detail-page-title">{product?.name}</p>
                            <div
                                className="product-detail-button-pack"
                                onClick={() => setShowMenu((prev) => !prev)}
                            >
                                <img className="product-detail-buttonpack-icon" src="/asset/button_pack.png" alt="메뉴" />
                                {showMenu && (
                                    <div className="product-detail-dropdown-modal">
                                        <div
                                            className="product-detail-dropdown-option"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowMenu(false);
                                                handleEdit();
                                            }}
                                        >
                                            수정하기
                                        </div>
                                        <div
                                            className="product-detail-dropdown-option"
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
                        <p className="product-detail-page-price">{product?.price}원</p>
                        <p className="product-small-desc">상품 소개</p>
                        <p className="product-detail-page-description">{product?.description}</p>
                        <p className="product-small-desc">상품 태그</p>
                        <div className="product-detail-tag-container">
                            {product?.tags?.map((tag, index) => (<span className="product-detail-tag" key={index}> #{tag}</span>))}
                        </div>
                        <div className="product-detail-uploader-section">
                            <img
                                className="product-detail-pfp"
                                src={"/asset/ic_profile.png"}
                                alt="프사"
                            />
                            <div className="product-detail-uploader-innerslot">
                                <p className="product-detail-uploader-name">{product?.ownerNickname}</p>
                                <p className="product-detail-upload-date">{formatDate(product?.updatedAt || product?.createdAt)}</p>
                            </div>
                            <div className='product-detail-like-button' onClick={handleFavorite}>
                                <img
                                    className="product-detail-like-icon"
                                    src={"/asset/ic_heart.png"}
                                    alt="좋아요"
                                />
                                <p className="product-detail-likeCount">{favoriteCount}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="product-detail-page-bottom">
                    <div className="product-detail-commentbox-title">문의하기</div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="product-comment-textbox"
                        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."

                    />
                    <button
                        className="product-comment-upload-button"
                        onClick={handleCommentSubmit}
                        disabled={!comment.trim()}
                    >
                        등록
                    </button>
                    <div className="product-detail-commentList">
                        {commentList && commentList.map((p) => (
                            <CommentProductCard
                                key={p.id}
                                id = {p.id}
                                content = {p.content}
                                createdAt = {p.createdAt}
                                writer = {p.writer}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-footer">
                    <Link href="/items" className="product-back">
                        목록으로 돌아가기
                    </Link>
                </div>

            </div>
        </div>
    );
}
