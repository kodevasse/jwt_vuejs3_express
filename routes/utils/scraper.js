

const axios = require("axios");
const cheerio = require("cheerio");



const urlSearch = "https://www.finn.no/job/fulltime/ad.html?finnkode=286704258";

async function scrape() {
  const url = urlSearch; // replace with your own URL
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // find the strong elements
  const strongElements = $("strong");

  // initialize an empty array to store the results
  const results = [];

  // loop through the strong elements
  strongElements.each((i, el) => {
    // get the text of the strong element
    const strongText = $(el).text();

    // find the next siblings of the strong element (p, br, ul, and li elements)
    const siblings = $(el).nextUntil("strong", "p, br, ul, li");

    // initialize an empty array to store the texts of the siblings
    const siblingTexts = [];

    // loop through the siblings
    siblings.each((i, sibling) => {
      // get the tag name of the sibling
      const tagName = $(sibling).prop("tagName");
      // get the text of the sibling
      let siblingText = $(sibling).text();
      // add a "." to the end of the text if it's a li element
      if (tagName === "LI") {
        siblingText += ".";
      }
      // add a space before the sibling text if it's a ul or p element
      if (tagName === "UL" || tagName === "P") {
        siblingTexts.push(siblingText + " ");
      } else {
        siblingTexts.push(siblingText);
      }
    });

    // add a space between the li elements
    const siblingsText = siblingTexts.join("\n  ");

    // add the strong text and siblings text to the results array
    results.push(strongText + "\n" + siblingsText);
  });

  // join the array of results into a single string
  const text = results.join("\n");

  console.log(text);
}

scrape();