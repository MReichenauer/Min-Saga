import { useEffect, useState } from "react";
import useCheckScreenWidth from "./useCheckScreenWidth";

const useCheckScreenOrientation = () => {
  const [recommendLandscape, setRecommendLandscape] = useState(false);
  const { width, height } = useCheckScreenWidth();

  useEffect(() => {
    const shouldRecommendLandscape = width < height && width > 400;
    setRecommendLandscape(shouldRecommendLandscape);
  }, [width, height]);

  const orientation = width > height ? "landscape" : "portrait";

  return { recommendLandscape, orientation };
};

export default useCheckScreenOrientation;
