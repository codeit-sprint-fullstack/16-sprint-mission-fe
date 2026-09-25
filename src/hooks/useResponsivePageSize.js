import { useEffect, useState } from "react";

function getPageSize(width) {
  if (width >= 1200) {
    return 10;
  }

  if (width >= 768) {
    return 6;
  }

  return 4;
}

function getInitialPageSize() {
  if (typeof window === "undefined") {
    return 10;
  }

  return getPageSize(window.innerWidth);
}

function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(getInitialPageSize);

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return pageSize;
}

export default useResponsivePageSize;