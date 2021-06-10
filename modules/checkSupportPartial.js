const axios = require("axios")

module.exports = async function checkSupportPartial(url) {
    const headers = {
      range: "bytes=0-0",
    };
    let res = await axios.head(url, headers);
    //   console.log("res", res);
    return res["headers"];
  }