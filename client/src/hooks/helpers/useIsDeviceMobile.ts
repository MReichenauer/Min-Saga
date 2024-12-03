import { useEffect, useState } from "react";

const useIsDeviceMobile = () => {
  const maxMobileWidth = 480;
  const [isWide, setIsWide] = useState(window.innerWidth <= maxMobileWidth);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxMobileWidth}px)`);

    console.log("mediaquery", mediaQuery);

    const handleResize = () => setIsWide(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [maxMobileWidth]);

  return isWide;
};

export default useIsDeviceMobile;
