import { useEffect, useState, useMemo } from "react";

const useCheckScreenSize = () => {
  const maxMobileWidth = 629;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const isPortraitMobile = width <= maxMobileWidth;
  const renderBigNav = width > 767 && height > 474;

  const calculatePageHeight = useMemo(() => Math.min(Math.round(height * 0.9), 520), [height]);
  const calculatePageWidth = useMemo(() => Math.min(Math.round(width * 0.98), 1040), [width]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isPortraitMobile, width, height, calculatePageHeight, calculatePageWidth, renderBigNav };
};

export default useCheckScreenSize;
