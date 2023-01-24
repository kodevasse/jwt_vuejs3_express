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
  const jobDescription = req.body.jobDescription;
  const educations = req.body.educations;
  const skills = req.body.skills;
  const goals = req.body.goals;

  // Bruker openai-pakken til å generere et sammendrag av jobbbeskrivelsen
  try {
    const summaryResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Skriv et sammendrag av denne stillingsbeskrivelsen, ta med krav og forventninger fra arbeidsgiveren ${jobDescription}`,
      temperature: 0.7,
      max_tokens: 1200,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    const summary = summaryResponse.data.choices[0].text;

    // Bruker openai-pakken til å generere jobbsøknadstekst utifra sammendrag, jobbtype og stikkord
    const applicationTextResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Skriv hele søknaden til ein ledig jobb. Bruk mine utdanning ${educations} og nøkkelord ${skills} for å beskrive meg selv. Pass også på at søknaden er tilpasset den ledige stillingen for min motivasjon og målsetning som er at jeg ${goals}. Her er en sammendrag av jobbannonsen jeg ønsker å søke på: ${summary} `,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
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
