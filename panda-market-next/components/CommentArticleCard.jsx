'use client';

import React, { useState } from 'react';
import axios from 'axios';
import './commentArticleCard.css';

function CommentArticleCard({ id, content, createdAt, onRefresh }) {
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content || '');

    // 수정 모드 진입
    const handleStartEdit = () => {
        setEditContent(content || '');
        setIsEditing(true);
    };

    // 취소
    const handleCancelEdit = () => {
        setEditContent(content || '');
        setIsEditing(false);
    };

    // 댓글 수정 API 호출
    const handleSaveEdit = async () => {
        if (!editContent.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.patch(`${apiUrl}/api/comments/articles/${id}`, {
                content: editContent,
            });
            alert('댓글이 수정되었습니다.');
            setIsEditing(false);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('댓글 수정 실패:', error);
            alert('댓글 수정에 실패했습니다.');
        }
    };

    // 댓글 삭제 API 호출
    const handleDelete = async () => {
        if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            await axios.delete(`${apiUrl}/api/comments/articles/${id}`);
            alert('댓글이 삭제되었습니다.');
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="article-comment-cell-wrapper">
            <img
                className="buttonpack-icon-comment"
                src="/asset/button_pack.png"
                alt="메뉴"
                onClick={() => setShowMenu((prev) => !prev)}
            />

            {showMenu && (
                <div className="comment-dropdown-modal">
                    <div
                        className="comment-dropdown-option"
                        onClick={() => {
                            setShowMenu(false);
                            handleStartEdit();
                        }}
                    >
                        수정하기
                    </div>
                    <div
                        className="comment-dropdown-option"
                        onClick={() => {
                            setShowMenu(false);
                            handleDelete();
                        }}
                    >
                        삭제하기
                    </div>
                </div>
            )}

            {!isEditing ? (
                <div className="article-comment-section">
                    <p className="article-comment-text">{content}</p>
                </div>
            ) : (
                <>
                    <textarea
                        className="article-edit-textbox"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="article-edit-button-section">
                        <button className="article-edit-button" onClick={handleSaveEdit}>
                            수정
                        </button>
                        <button className="article-edit-button cancel" onClick={handleCancelEdit}>
                            취소
                        </button>
                    </div>
                </>
            )}

            <div className="article-comment-section">
                <p className="article-comment-date">{createdAt ? createdAt.split('T')[0] : ''}</p>
            </div>
        </div>
    );
}

export default CommentArticleCard;
