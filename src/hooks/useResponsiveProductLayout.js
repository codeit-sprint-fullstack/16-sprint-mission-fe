import { useEffect, useState } from 'react'

function getLayout() {
  const width = window.innerWidth

  if (width >= 1200) {
    return { bestPageSize: 4, productPageSize: 10 }
  }

  if (width >= 744) {
    return { bestPageSize: 2, productPageSize: 6 }
  }

  return { bestPageSize: 1, productPageSize: 4 }
}

function useResponsiveProductLayout() {
  const [layout, setLayout] = useState(getLayout)

  useEffect(() => {
    const handleResize = () => {
      setLayout(getLayout())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return layout
}

export default useResponsiveProductLayout
