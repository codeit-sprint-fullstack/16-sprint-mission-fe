import { useEffect, useState } from "react";

function getProductPageSize() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 10;
  }

  if (width >= 744) {
    return 6;
  }

  return 6;
}

function usePageSize() {
  const [productPageSize, setProductPageSize] = useState(getProductPageSize());

  useEffect(() => {
    const handleResize = () => {
      setProductPageSize(getProductPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { productPageSize };
}

export default usePageSize;
