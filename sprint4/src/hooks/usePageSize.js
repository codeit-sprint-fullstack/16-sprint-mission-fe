import { useEffect, useState } from "react";

const getPageSize = () => {
  const width = window.innerWidth;

  if (width < 744) {
    return {
      productPageSize: 4,
      bestPageSize: 1,
    };
  }

  if (width < 1200) {
    return {
      productPageSize: 6,
      bestPageSize: 2,
    };
  }

  return {
    productPageSize: 10,
    bestPageSize: 4,
  };
};

const usePageSize = () => {
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return pageSize;
};

export default usePageSize;