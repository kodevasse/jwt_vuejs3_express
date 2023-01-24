// const express = require("express");
// const openai = require("../middlewares/openai");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

// Open AI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let app = express.Router();

app.post("/example", async (req, res, next) => {
  try {
    let { content } = req.body;

    let prompt = `This is a Chatbot that Answer questions from a user:\n`;

    let inputRaw = `${content}`; // here is where people enter stuff
    // let inputRaw = "And i enjoy live, do you do?"; // here is where people enter stuff
    prompt += inputRaw;

    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      //   stop: ["###", "<|endoftext|>"],
    });

    let output = `${gptResponse.data.choices[0].text}`;

    // remove the first character from output
    output = output.substring(1, output.length);

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith("\n")) {
      output = output.substring(0, output.length - 1);
    }

    // const applicationText = applicationTextResponse.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: output,
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

module.exports = app;
