'use client';

import React from 'react';
import './tag.css';

function Tag({ index, tag, onRemove }) {
  return (
    <div className="tag-wrapper" onClick={() => onRemove(tag)}>
      {tag}
      <div className="tag-remove-button">
        <img src="/asset/ic_X.png" alt="x" />
      </div>
    </div>
  );
}

export default Tag;
