const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

// Open AI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// generate the CV
router.post("/application", async (req, res) => {
  console.log(req.body, req.body.skills);
  // const jobDescription = req.body.jobDescription;
  const jobDescription = req.body.jobSummary;
  const educations = req.body.educations;
  const skills = req.body.skills;
  const goals = req.body.goals;
  const jobType = req.body.jobType;

  // Bruker openai-pakken til å generere et sammendrag av jobbbeskrivelsen
  try {
    // const summaryResponse = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Skriv et sammendrag av denne stillingsbeskrivelsen, ta med krav og forventninger fra arbeidsgiveren ${jobDescription}`,
    //   temperature: 0.7,
    //   max_tokens: 1200,
    //   top_p: 0.3,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0.0,
    // });

    // const summary = summaryResponse.data.choices[0].text;

    // Bruker openai-pakken til å generere jobbsøknadstekst utifra sammendrag, jobbtype og stikkord
    const applicationTextResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Vennligst skriv en søknad for stillingen ${jobDescription}, ved å vise hvordan du konkret svarer på arbeidsgiverne sine bekymringer om at du kan utføre jobben, at du er motivert og passer inn i selskapet. Inkluder konkrete eksempler på din erfaring og kompetanse som passer til stillingsbeskrivelsen og selskapet, og vær spesielt oppmerksom på å vise hvordan din ${skills} og ${goals} skiller deg ut fra andre søkere. Bruk også din ${educations} som et argument for hvorfor arbeidsgiver bør velge deg. Skriv søknaden din i ${jobType} stil, og legg inn en kreativ og overbevisende innledning for å vise at søknaden din er verdt å lese.
      `,
      // prompt: `Skriv ein profesjonell søknaden til ein ledig jobb. Bruk dei viktigeste utdanningene mine: ${educations} og personlige egenskapene i søknaden på best mulig måte, her er mine egenskaper: ${skills}. Søknaden skal være tilpasset den ledige stillingenbeskrivelsen. Her er et sammendrag av stillingsbeskrivelsen: ${jobDescription}, flett inn mine personlige mål i søknaden: ${goals}, få med at jeg gjerne vil ha jobben. Skriv ein kort avslutning. Søknaden skal være maks 1 side lang. Ikke bruk lange setninger, bruk flere korte setninger. Søknaden skal være på norsk.`,
      temperature: 0.75,
      max_tokens: 3000,
      top_p: 0.4,
      frequency_penalty: 0.4,
      presence_penalty: 0,
    });

    const applicationText = applicationTextResponse.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: applicationText,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "There was an error fetching your question",
    });
  }

  // rest of the code goes here
});

module.exports = router;
