import { useEffect, useState } from 'react';

const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1024px)';

const getBestPageSize = () => {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 4;
  if (window.matchMedia(TABLET_QUERY).matches) return 2;
  return 1;
}

const getPageSize = () => {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 10;
  if (window.matchMedia(TABLET_QUERY).matches) return 6;
  return 4;
}

export const usePageSize  = () => {
  const [bestPageSize, setBestPageSize] = useState(getBestPageSize);
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    const tabletMedia = window.matchMedia(TABLET_QUERY);
    const desktopMedia = window.matchMedia(DESKTOP_QUERY);

    const updatePageSize = () => {
      setBestPageSize(getBestPageSize());
      setPageSize(getPageSize());
    };

    tabletMedia.addEventListener('change', updatePageSize);
    desktopMedia.addEventListener('change', updatePageSize);

    return () => {
      tabletMedia.removeEventListener('change', updatePageSize);
      desktopMedia.removeEventListener('change', updatePageSize);
    };
  }, []);

  return { bestPageSize, pageSize };
}