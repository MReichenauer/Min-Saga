import { useState, useEffect, useCallback } from "react";

const useHandleClickOutsideNode = (elementRef: React.RefObject<HTMLElement>, onClickOutside: () => void) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsButtonClicked(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsButtonClicked(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (elementRef.current && elementRef.current.contains(event.target as Node)) {
        return;
      }

      if (isButtonClicked) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [elementRef, isButtonClicked, onClickOutside]);

  return { handleMouseDown, handleMouseUp };
};

export { useHandleClickOutsideNode };
