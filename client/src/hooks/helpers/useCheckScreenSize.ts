import { useEffect, useState, useMemo } from "react";

const useCheckScreenSize = () => {
  const maxMobileWidth = 629;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const isPortraitMobile = width <= maxMobileWidth;
  const widthLessThan768 = width < 769;
  const heightLessThan475 = height < 476;
  const renderBigNav = width > 767 && height > 474;

  const pageHeightSmScreen = useMemo(() => Math.min(Math.round(height * 0.8), 520), [height]);
  const pageHeightLgScreen = useMemo(() => Math.min(Math.round(height * 0.75), 520), [height]);
  const calculatePageWidth = useMemo(() => Math.min(Math.round(width * 0.95), 1040), [width]);

  const calculatePageHeight = useMemo(() => {
    if (widthLessThan768 && heightLessThan475) {
      return pageHeightSmScreen;
    } else {
      return pageHeightLgScreen;
    }
  }, [widthLessThan768, heightLessThan475, pageHeightSmScreen, pageHeightLgScreen]);

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
