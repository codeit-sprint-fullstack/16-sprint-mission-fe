import { useState, useEffect } from "react";

function getDeviceType(width) {
  if (width >= 1200) return "desktop";
  if (width >= 744) return "tablet";
  return "mobile";
}

function useDeviceType() {
  const [deviceType, setDeviceType] = useState(() => getDeviceType(window.innerWidth));
  
  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

export default useDeviceType;
