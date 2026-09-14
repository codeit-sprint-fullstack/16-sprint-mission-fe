import './Pagination.scss';

const Pagination = ({
    page,
    indicators,
    onGoToPage
  }) => {
    
  return (
  <ul className='pagination'>
    <li className='prev-btn' onClick={(event) => onGoToPage(event, page - 1)}>
      <a href='#'>이전</a>
    </li>
    <ul className="indicators">
      {
        indicators
          .map(item =>
            item === page
            ? <li key={item} className='on' onClick={(event) => onGoToPage(event, item)}>
                <a href='#'>{item}</a>
              </li>
            : <li key={item} onClick={(event) => onGoToPage(event, item)}>
                <a href='#'>{item}</a>
              </li>
          )
      }
    </ul>
    <li className='next-btn' onClick={(event) => onGoToPage(event, page + 1)}>
      <a href='#'>다음</a>
    </li>
  </ul>
  );
};

export default Pagination;