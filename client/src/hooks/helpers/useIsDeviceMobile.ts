import { useEffect, useState } from "react";

const useIsDeviceMobile = () => {
  const maxMobileWidth = 630;
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= maxMobileWidth;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, width };
};

export default useIsDeviceMobile;
