import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.homePageContainer}>
      <h1>Min Saga</h1>
      <p>Välkommen till Min Saga! Platsen där du kan skapa din egen saga med några knapptryck.</p>
      <em>
        Detta är den första versionen och den är inte optimal. Om du vill delta i framtida utveckling av detta projekt,
        kontakta mig gärna via Hjälp & kontakt.
      </em>
      <h2>Hur fungerar det?</h2>
      <h3>Skapa en saga</h3>
      <p>
        När du väljer att skapa en saga genereras en skräddarsydd saga efter dina önskemål med hjälp av AI. Sagan kommer
        att vara uppdelad i fem kapitel, och varje kapitel kommer även att ha en bild som illustrerar kapitlet.
      </p>
      <h3>Läsa en saga</h3>
      <p>
        Du hittar alla sagor du har skapat under <em>Mina sagor</em>. När du ska läsa en saga rekommenderar jag att du
        använder en surfplatta eller en mobil i liggande läge för bästa upplevelse. Sagorna visas i en digital bok som
        du kan bläddra genom att "swipa" till höger och vänster på skärmen, eller genom att använda framåt- och
        bakåtknapparna som finns under boken.
      </p>
      <h3>Känsligt innehåll</h3>
      <p>
        Jag har lagt mycket tid på att säkerställa att sagan ska vara anpassad efter önskad ålder och att inget känsligt
        innehåll genereras. Om du upplever att det förekommer olämpligt innehåll, kontakta mig via{" "}
        <em>Hjälp & kontakt</em> så åtgärdar jag detta snarast möjligt.
      </p>
    </section>
  );
};

export default HomePage;
