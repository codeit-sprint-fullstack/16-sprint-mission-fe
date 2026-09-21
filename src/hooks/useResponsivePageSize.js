// src/hooks/useResponsivePageSize.js

import { useEffect, useState } from "react";

function getPageSize() {
const width = window.innerWidth;

if (width < 768) {
return 4;
}

if (width < 1200) {
return 6;
}

return 10;
}

export default function useResponsivePageSize() {
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
}