import { useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import useProducts from '../hooks/useProducts'
import useResponsiveProductLayout from '../hooks/useResponsiveProductLayout'

const sortOptions = [
  { label: '최신순', value: 'recent' },
  { label: '좋아요순', value: 'favorite' },
]

function MarketPage() {
  const { bestPageSize, productPageSize } = useResponsiveProductLayout()
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [orderBy, setOrderBy] = useState('recent')
  const [page, setPage] = useState(1)

  const bestProducts = useProducts({
    page: 1,
    pageSize: bestPageSize,
    orderBy: 'favorite',
    keyword: '',
  })
  const productList = useProducts({
    page,
    pageSize: productPageSize,
    orderBy,
    keyword,
  })
  const totalPages = Math.max(1, Math.ceil(productList.totalCount / productPageSize))
  const firstPageNumber = Math.min(Math.max(1, page - 2), Math.max(1, totalPages - 4))
  const visiblePageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => firstPageNumber + index,
  )

  const handleSearch = (event) => {
    event.preventDefault()
    setKeyword(keywordInput.trim())
    setPage(1)
  }

  return (
    <>
      <Header />
      <main className="market-page">
        <section className="market-section">
          <div className="section-heading">
            <h1>베스트 상품</h1>
          </div>
          {bestProducts.error && <p className="load-message">{bestProducts.error}</p>}
          <div className="best-products-grid">
            {bestProducts.isLoading
              ? Array.from({ length: bestPageSize }).map((_, index) => (
                  <div className="product-card product-card--loading" key={index} />
                ))
              : bestProducts.products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
          </div>
        </section>

        <section className="market-section">
          <div className="section-heading section-heading--products">
            <h2>판매 중인 상품</h2>
            <a className="add-product-button" href="/additem">
              상품 등록하기
            </a>
          </div>
          <div className="market-controls">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                aria-label="상품 검색"
                placeholder="검색할 상품을 입력해주세요"
                value={keywordInput}
                onChange={(event) => setKeywordInput(event.target.value)}
              />
            </form>
            <select
              aria-label="상품 정렬"
              value={orderBy}
              onChange={(event) => {
                setOrderBy(event.target.value)
                setPage(1)
              }}
            >
              {sortOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {productList.error && <p className="load-message">{productList.error}</p>}
          <div className="products-grid">
            {productList.isLoading
              ? Array.from({ length: productPageSize }).map((_, index) => (
                  <div className="product-card product-card--loading" key={index} />
                ))
              : productList.products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
          </div>
          {!productList.isLoading && productList.products.length === 0 && (
            <p className="empty-message">검색 결과가 없습니다.</p>
          )}
          <div className="pagination" aria-label="페이지네이션">
            <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
              ‹
            </button>
            {visiblePageNumbers.map((pageNumber) => (
              <button
                className={page === pageNumber ? 'active' : ''}
                type="button"
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button type="button" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              ›
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default MarketPage
