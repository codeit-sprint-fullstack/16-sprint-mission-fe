import { useEffect, useState } from 'react'

const API_URL = 'https://panda-market-api.vercel.app/products'

function useProducts({ page, pageSize, orderBy, keyword }) {
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      const searchParams = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        orderBy,
      })

      if (keyword) {
        searchParams.set('keyword', keyword)
      }

      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_URL}?${searchParams.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('상품을 불러오지 못했습니다.')
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : data.list ?? [])
        setTotalCount(Array.isArray(data) ? data.length : data.totalCount ?? 0)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setProducts([])
          setTotalCount(0)
          setError(fetchError.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    return () => {
      controller.abort()
    }
  }, [page, pageSize, orderBy, keyword])

  return { products, totalCount, isLoading, error }
}

export default useProducts
