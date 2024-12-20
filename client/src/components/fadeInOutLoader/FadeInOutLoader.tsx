import styles from "./fadeInOutLoader.module.css";
type FadeInOutLoaderProps = {
  loadingState: string;
};
const FadeInOutLoader: React.FC<FadeInOutLoaderProps> = ({ loadingState }) => {
  return (
    <div className={styles.loaderContainer}>
      <p className={styles.loaderContent}>{loadingState}</p>
    </div>
  );
};

export default FadeInOutLoader;
