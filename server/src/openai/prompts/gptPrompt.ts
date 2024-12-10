import openAiClient from "../client";

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
        content:
          "Du är en svensk barnboksförfattare som specialiserar sig på att skapa engagerande och åldersanpassade berättelser.",
      },
      {
        role: "user",
        content: `Skriv en barnvänlig saga på svenska om ${mainCharacter} som utspelar sig ${environment}. Sagan ska vara för barn i ${targetedAge} års ålder.
        Den ska ha en tydlig och beskrivande huvudtitel som sammanfattar hela berättelsen.
        Sagan ska vara indelad i 5 korta kapitel som tar mellan 7 och 10 minuter att läsa högt.
        Varje kapitel ska ha en egen beskrivande titel som börjar med ordet "Kapitel" följt av en relevant och spännande titel för kapitlet.
        Varje kapitel ska beskriva en scen med färgglada och livliga miljöer och ge en känsla av äventyr.
        Det ska vara en tydlig progression i berättelsen, där varje kapitel leder till nästa på ett naturligt sätt.
        Se till att varje kapitel slutar med en cliffhanger som gör barnet nyfiket på nästa kapitel.

        **Beskriv karaktärerna noggrant i varje kapitel, inklusive deras utseende och personlighetsdrag.**
        - Huvudkaraktären: ${mainCharacter} (t.ex. en liten igelkott med stora öron och rosa nos eller en glad tjej med blå ögon och blont lockigt hår med en röd klänning).
        - Andra karaktärer: (lägg till fler karaktärer, t.ex. en blå fågel med vita vingar, en snäll häxa med en lila klänning eller en svart katt med vita prickar).

        **Returnera svaret i följande format strikt som JSON:**
        {
          "targetedAge": ${targetedAge},
          "title": "Berättelsens titel",
          "id": null,
          "createdAt": null,
          "createdBy": null,
          "description": Kort beskrivning av berättelsen på 1-2 meningar
          "chapters": [
            {
              "title": "Kapitel 1: Titel för kapitlet",
              "content": "Detaljerad berättelse för kapitlet.",
              "imagePrompt": "En summering av kapitlet som beskriver miljön, omgivningen och vilka karaktärer som är med i kapitlet. Karaktärerna ska reffereras till med sitt namn. **Viktigt**: Denna summering ska vara på ett sätt så jag kan använda den som en prompt till Dall-e-3 för att generera en enkel och övergripande bild för detta kapitel.**",
              "characters": [
                { "id": 1, "name": "Karaktärens namn" },
                { "id": 2, "name": "Karaktärens namn" }
              ]
            },
            ...
          ],
          "characters": [
            { "id": 1, "name": "Karaktärens namn", "type": "Typ av karaktär", "description": "Detaljerad beskrivning av karaktären", "personality": "Detaljerad beskrivning av karaktärens personlighet" },
            ...
          ]
        }

        **Extra instruktioner:**
        - Varje kapitel ska inkludera levande och fantasifulla beskrivningar som engagerar målgruppen.
        - För imagePromt, inkludera detaljer om ljus, färger, karaktärernas känslor, och vad de gör i scenen.
        - Håll dig strikt till JSON-formatet och lägg inte till text utanför formatet.
  
        ${languageStyle}
        ${characterDescription}`,
      },
    ],
  });
  return completions.choices[0].message.content;
};

export { gptPrompt };
