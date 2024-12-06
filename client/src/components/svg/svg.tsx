import { useEffect, useState } from "react";
import { IconEnum } from "./Models";

type SvgProps = {
  size: number;
  icon: IconEnum;
};

const Svg: React.FC<SvgProps> = ({ size, icon }) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        const importSrc = await import(`./icons/${icon}.svg`);
        setIconSrc(importSrc.default);
      } catch (error) {
        console.error("Error loading icon:", error);
        setIconSrc(null);
      }
    };
    importIcon();
  }, [icon]);

  if (!iconSrc) {
    return null;
  }

  return <img src={iconSrc} alt={`icon of ${iconSrc}`} width={size} height={size} />;
};

export default Svg;
