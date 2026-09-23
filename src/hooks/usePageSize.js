import { useEffect, useState } from "react";

function getPageSizes() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return {
      productPageSize: 10,
      bestPageSize: 4,
    };
  }

  if (width >= 744) {
    return {
      productPageSize: 6,
      bestPageSize: 2,
    };
  }

  return {
    productPageSize: 6,
    bestPageSize: 1,
  };
}

function usePageSize() {
  const [pageSizes, setPageSizes] = useState(getPageSizes());

  useEffect(() => {
    const handleResize = () => {
      setPageSizes(getPageSizes());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return pageSizes;
}

export default usePageSize;