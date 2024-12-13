import { useEffect, useState, useMemo } from "react";

const useCheckScreenSize = () => {
  const maxMobileWidth = 629;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const isMobile = width <= maxMobileWidth;
  const widthLessThan768 = width < 768;
  const heightLessThan475 = height < 475;

  const pageHeightSmScreen = useMemo(() => Math.min(Math.round(height * 0.9), 520), [height]);
  const pageHeightLgScreen = useMemo(() => Math.min(Math.round(height * 0.75), 520), [height]);

  const pageHeight = useMemo(() => {
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

  return { isMobile, width, height, pageHeight };
};

export default useCheckScreenSize;
