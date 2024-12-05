import useCheckScreenOrientation from "@hooks/helpers/useCheckScreenOrientation";
import { useEffect, useState } from "react";
import styles from "./recommendLandscapeBanner.module.css";
const RecommendLandscapeBanner: React.FC = () => {
  const { recommendLandscape } = useCheckScreenOrientation();
  const [showTip, setShowTip] = useState<boolean | null>(null);
  const [haveReadTip, setHaveReadTip] = useState(false);

  useEffect(() => {
    if (recommendLandscape) {
      setShowTip(true);
      document.body.classList.add("noScroll");
    } else {
      setShowTip(false);
      document.body.classList.remove("noScroll");
    }
  }, [recommendLandscape]);

  const handleTipAction = () => {
    setShowTip(false);
    setHaveReadTip(true);
    document.body.classList.remove("noScroll");
  };

  if (!showTip || haveReadTip) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Vi rekommenderar att du vänder enheten till liggande läge för en bättre upplevelse.</p>
        <button onClick={handleTipAction}>Tack för tipset!</button>
      </div>
    </div>
  );
};

export default RecommendLandscapeBanner;
