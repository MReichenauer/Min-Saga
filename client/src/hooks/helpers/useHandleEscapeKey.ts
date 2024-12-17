import { useEffect } from "react";

const useHandleEscapeKey = (onKeyDown: () => void, isActive: boolean) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onKeyDown();
      }
    };

    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyDown, isActive]);
};

export default useHandleEscapeKey;
