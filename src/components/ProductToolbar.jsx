import { useRef } from 'react';
import './ProductToolbar.scss';

const ProductToolbar = ({
    onSetPage,
    onSetOrder,
    onSetKeyword
  }) => {
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const handleForm = (event) => {
    onSetPage(1);

    switch (event.target){
      case inputRef.current:
        onSetKeyword(event.target.value.trim());
        break;
      case selectRef.current:
        onSetOrder(event.target.value);
        break;
    }
  };

  return (
    <form className='toolbar' onChange={(event) => handleForm(event)}>
      <input
        id='searchInput'
        type='text'
        placeholder='검색할 상품을 입력해주세요'
        // value={keyword}
        ref={inputRef}
      />
      <button className='open-modal-btn' type='button'>상품 등록하기</button>
      <select id='sort' ref={selectRef}>
        <option value='recent'>최신순</option> 
        <option value='favorite'>좋아요순</option>
      </select>
    </form>
  )
}

export default ProductToolbar;