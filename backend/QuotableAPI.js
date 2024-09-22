// const axios = require('axios');
// const uri = "http://api.quotable.io/random";

// module.exports = getData =()=>{
//     return axios.get(uri).then(response=> response.data.content.split(" "));
// }

const axios = require("axios");
const uri = "https://dummyjson.com/quotes";

module.exports = async function getData() {
  try {
    const response = await axios.get(uri);
    const quote = response.data.quotes;
    const randomId = Math.floor(Math.random() * 30) + 1;
    const randomQuote = quote.find((quote) => quote.id === randomId);
    // console.log(randomQuote);
    return randomQuote.quote.split(" "); // Split the quote into an array of words
  } catch (error) {
    console.error("Error fetching the quote:", error.message);
    return []; // Return an empty array if there's an error
  }
};
