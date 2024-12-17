import { useEffect, useState } from "react";
import useCheckScreenSize from "./useCheckScreenSize";

const useCheckScreenOrientation = () => {
  const [recommendLandscape, setRecommendLandscape] = useState(false);
  const { width, height } = useCheckScreenSize();

  useEffect(() => {
    const isPortrait = width < height;
    const isValidWidth = width > 374;
    const isValidHeight = height > 629;

    setRecommendLandscape(isPortrait && isValidWidth && isValidHeight);
  }, [width, height]);

  const orientation = width > height ? "landscape" : "portrait";

  return { recommendLandscape, orientation };
};

export default useCheckScreenOrientation;
