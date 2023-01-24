const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

// Open AI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// generate the CV
router.post("/summary", async (req, res) => {
  const jobDescription = req.body.jobDescription;

  // Bruker openai-pakken til å generere et sammendrag av jobbbeskrivelsen
  try {
    const summaryResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Skriv et sammendrag av ein stillingsbeskrivelsen, ta med det som er det viktigste for ein jobbsøker og for å lage ein god søknad. Lag 1 liste med forventningen fra arbeidsgiver. Skriv hva arbeidsgiveren sine bekymringer om at du kan utføre jobben. Her er stillingsbeskrivelsen: ${jobDescription}`,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    const summary = summaryResponse.data.choices[0].text;
    // remove a singel new line or more at the start of output if there is one
    if (summary.startsWith("\n")) {
      output = summary.substring(1, summary.length);
    }
    res.status(200).json({
      success: true,
      data: summary,
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
