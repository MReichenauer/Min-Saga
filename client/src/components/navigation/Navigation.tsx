import useCheckScreenSize from "@hooks/helpers/useCheckScreenSize";
import BigNav from "./navBars/bigNav/BigNav";
import SmallNav from "./navBars/smallNav/SmallNav";

const Navigation = () => {
  const { renderBigNav } = useCheckScreenSize();
  return <>{renderBigNav ? <BigNav /> : <SmallNav />}</>;
};

export default Navigation;
