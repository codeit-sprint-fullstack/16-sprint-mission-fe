import './ProductToolbar.scss';

let timer;

const ProductToolbar = ({
    hasProducts,
    isLoading,
    onSetPage,
    onSetOrder,
    onSetKeyword,
    onSetIsSearch
  }) => {
  
  const handleInput = (event) => {
    onSetIsSearch(true);
    clearTimeout(timer);

    timer = setTimeout(() => {
      onSetPage(1);
      onSetKeyword(event.target.value.trim());
      onSetIsSearch(false);
    }, 500);
  };

  const handleSelect = (event) => {
    onSetPage(1);
    onSetOrder(event.target.value);
  };

  return (
    <form className='toolbar'>
      <input
        id='searchInput'
        type='text'
        placeholder='검색할 상품을 입력해주세요'
        // value={keyword}
        onChange={(event) => handleInput(event)}
      />
      <button className='open-modal-btn' type='button'>상품 등록하기</button>
      <select
        id='sort'
        onChange={(event) => handleSelect(event)}
        disabled={!hasProducts || isLoading}
      >
        <option value='recent'>최신순</option> 
        <option value='favorite'>좋아요순</option>
      </select>
    </form>
  )
}

export default ProductToolbar;