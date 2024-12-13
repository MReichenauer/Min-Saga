import { useEffect } from "react";

const useHandleClickOutsideNode = (elementRef: React.RefObject<HTMLElement>, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [elementRef, onClickOutside]);
};

export default useHandleClickOutsideNode;
