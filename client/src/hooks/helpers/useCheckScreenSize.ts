import { useEffect, useState } from "react";

const useCheckScreenSize = () => {
  const maxMobileWidth = 629;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const isPortraitMobile = width <= maxMobileWidth;
  const renderBigNav = width > 767 && height > 474;

  const calculatePageHeight = Math.min(Math.round(height * 0.9), 520);
  const calculatePageWidth = Math.min(Math.round(width * 0.98), 1040);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    console.log("width", width);
    console.log("height", height);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [width, height]);

  return { isPortraitMobile, width, height, calculatePageHeight, calculatePageWidth, renderBigNav };
};

export default useCheckScreenSize;
