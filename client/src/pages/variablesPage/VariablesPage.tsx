import styles from "./variablesPage.module.css";

const VariablesPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heightFitContent}>
        <h2>main colors</h2>
        <div className={styles.colorContainer}>
          <div className={styles.mainColorLight}></div>
          <div className={styles.mainColor}></div>
          <div className={styles.mainColorDark}></div>
        </div>
      </div>
      <div className={styles.heightFitContent}>
        <h2>secondary colors</h2>
        <div className={styles.colorContainer}>
          <div className={styles.secondaryColorLight}></div>
          <div className={styles.secondaryColor}></div>
          <div className={styles.secondaryColorDark}></div>
        </div>
      </div>
      <div className={styles.heightFitContent}>
        <h2>tertiary colors</h2>
        <div className={styles.colorContainer}>
          <div className={styles.tertiaryColorLight}></div>
          <div className={styles.tertiaryColor}></div>
          <div className={styles.tertiaryColorDark}></div>
        </div>
      </div>
      <div className={styles.heightFitContent}>
        <h2>quaternary colors</h2>
        <div className={styles.colorContainer}>
          <div className={styles.quaternaryColorLight}></div>
          <div className={styles.quaternaryColor}></div>
          <div className={styles.quaternaryColorDark}></div>
        </div>
      </div>
      <div className={styles.heightFitContent}>
        <h1 className={styles.heading1}>Heading H1</h1>
        <h2 className={styles.heading2}>Heading H2</h2>
        <h3 className={styles.heading3}>Heading H3</h3>
        <p className={styles.text1}>Text Regular</p>
        <p className={styles.text2}>Text Small</p>
      </div>
      <div className={styles.buttonContainer}>
        <h2>Buttons</h2>
        <button className="primaryButton">Main Button</button>
        <button className="secondaryButton">Secondary Button</button>
      </div>
      <a href="https://fonts.google.com/specimen/Inter" target="_blank">
        {" "}
        Fontsiten.com
      </a>
    </div>
  );
};

export default VariablesPage;
