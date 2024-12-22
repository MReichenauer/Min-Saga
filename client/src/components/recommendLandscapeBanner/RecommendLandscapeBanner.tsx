import useCheckScreenOrientation from "@hooks/helpers/useCheckScreenOrientation";
import { useEffect, useState } from "react";
import GenericModal from "@components/genericModal/GenericModal";
const RecommendLandscapeBanner: React.FC = () => {
  const { recommendLandscape } = useCheckScreenOrientation();
  const [showTip, setShowTip] = useState<boolean | null>(null);
  const [haveReadTip, setHaveReadTip] = useState(false);

  useEffect(() => {
    if (recommendLandscape) {
      setShowTip(true);
      document.body.classList.add("noScroll");
    }
    return () => {
      setShowTip(false);
      document.body.classList.remove("noScroll");
    };
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
    <GenericModal
      displayModal={showTip}
      onClose={handleTipAction}
      primaryButtonAction={handleTipAction}
      primaryButtonText="Tack för tipset"
      title="Tips"
      content={<p>Vi rekommenderar att du vänder din enhet till en liggande possition för en bättre upplevelse.</p>}
    />
  );
};

export default RecommendLandscapeBanner;
