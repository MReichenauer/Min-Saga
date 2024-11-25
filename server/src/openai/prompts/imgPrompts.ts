import openAiClient from "../client";

const imgPrompt = async (prompt: string) => {
  const response = await openAiClient.images.generate({
    model: "dall-e-3",
    size: "1024x1024",
    quality: "standard",
    style: "natural",
    prompt: `${prompt}  Bilden ska vara en digital illustration, ljus och färgstark, skapad för att passa små barn. Använd mjuka linjer och en enkel lekful stil man kan förvänta sig att se i en barnbok.
    **Följande krav måste uppfullas.** 
    1. Illustarationen ska var anpassad efter 1024x1024 pixlar.
    2. Illustarationen ska vara enbart en bild.
    3. Där får INTE finnas någon text eller några bokstäver med i illustrationen.
    4. Illustrationen ska vara en enkel målning anpassad för barn under 6 år.
    5. Illustrationen ska passa in i en barnbok.`,
  });
  return response.data[0].url;
};

export default imgPrompt;
