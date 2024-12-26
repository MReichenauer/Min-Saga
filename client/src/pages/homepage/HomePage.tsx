import TextContainer from "@components/textContainer/TextContainer";
import styles from "./homePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstPart}>
        <div className={styles.sizeContainer}>
          <TextContainer
            title="Introduktion"
            typeOfTitle="h2"
            text="Välkommen till Min Saga! En plats där du kan skapa din egen saga med några knapptryck."
            emphasizeText="Detta är den första versionen och den är inte optimal. Om du vill delta i framtida utveckling av detta
                projekt, kontakta mig gärna via formuläret på Hjälp & kontakt."
          />
        </div>
        <div className={styles.sizeContainer}>
          <TextContainer
            title="Skapa en saga"
            typeOfTitle="h3"
            text={
              <p className={styles.paragraph}>
                När du väljer att <Link to={"/create-story"}>skapa en saga</Link> genereras en skräddarsydd saga efter
                dina önskemål med hjälp av AI. Sagan kommer att vara uppdelad i fem kapitel, och varje kapitel kommer
                även att ha en bild som illustrerar kapitlet.
              </p>
            }
          />
        </div>
      </div>
      <div className={styles.secondaryPart}>
        <div className={styles.sizeContainer}>
          <TextContainer
            title="Läsa en saga"
            typeOfTitle="h3"
            text={
              <p className={styles.paragraph}>
                Du hittar alla sagor du har skapat under <Link to={"/my-stories"}>Mina sagor</Link>. När du ska läsa en
                saga rekommenderar jag att du använder en surfplatta eller en mobil i liggande läge för bästa
                upplevelse. Sagorna visas i en digital bok som du kan bläddra genom att "swipa" till höger och vänster
                på skärmen, eller genom att använda framåt- och bakåtknapparna som finns under boken.
              </p>
            }
          />
        </div>
        <div className={styles.sizeContainer}>
          <TextContainer
            title="Känsligt innehåll"
            typeOfTitle="h3"
            text={
              <p className={styles.paragraph}>
                Jag har lagt mycket tid på att säkerställa att sagan ska vara anpassad efter önskad ålder och att inget
                känsligt innehåll genereras. Om du upplever att det förekommer olämpligt innehåll, kontakta mig via{" "}
                <em>Hjälp & kontakt</em> så åtgärdar jag detta snarast möjligt.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
