import openAiClient from "./client";

const gptPrompt = async (mainCharacter: string, environment: string, targetedAge: number) => {
  const languageStyle =
    targetedAge <= 5
      ? "Använd ett väldigt enkelt och lekfullt språk, korta meningar och återkommande fraser för att hålla barnet engagerat."
      : targetedAge <= 7
      ? "Använd ett enkelt, men lite mer utvecklat språk, korta meningar med några beskrivande adjektiv."
      : "Använd ett mer komplext språk med längre meningar och beskrivningar som tilltalar äldre barn, men fortfarande barnvänligt.";

  const characterDescription = `Huvudkaraktären ${mainCharacter} ska vara en karismatisk och modig karaktär som har unika egenskaper. 
    För exempelvis en giraff kan du beskriva den som lång, nyfiken och vänlig, för en prinsessa kan du beskriva den som vacker, vänlig och modig, 
    för en hjälte kan du beskriva den som stark och äventyrlig, och för en prins kan du beskriva den som ädel och rättvis. Huvudkaraktären kan vara ett djur, en människa eller något annat kreativt!`;

  const completions = await openAiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a Swedish child story writer who specializes in creating engaging, age-appropriate stories.",
      },
      {
        role: "user",
        content: `
          Skriv en barnvänlig saga på svenska om ${mainCharacter} som utspelar sig ${environment}. Sagan ska vara för barn i ${targetedAge} års ålder.
          Den ska ha en tydlig och beskrivande huvudtitel som sammanfattar hela berättelsen.
          Sagan ska vara indelad i 7 korta kapitel som tar mellan 7 och 10 minuter att läsa högt.
          ${languageStyle}
          Skriv med en tydlig början, mitt och slut, och gör så att varje kapitel slutar med en cliffhanger som gör barnet nyfiket på nästa kapitel.
          Varje kapitel ska ha en egen beskrivande titel som börjar med ordet "Kapitel" följt av en relevant och spännande titel för kapitlet.
          Varje kapitel ska beskriva en scen med färgglada och livliga miljöer (exempelvis en tropisk ö) och ge en känsla av äventyr.
          ${characterDescription}
          Se till att det finns en tydlig progression i berättelsen och att varje kapitel leder till nästa på ett naturligt sätt.
        `,
      },
    ],
  });
  return completions.choices[0].message;
};

export { gptPrompt };
