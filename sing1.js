import * as fs from "fs";
import axios from "axios";
const downloadImage = async (url) => {
  // Writer stream where we want to download the image
  const writer = fs.createWriteStream("./demo.mp4");

  const streamResponse = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  // Write data
  console.log("streamResponse.data", streamResponse.data);
  streamResponse.data.pipe(writer);

  writer.on("finish", () => console.log("Finished"));
  writer.on("error", () => console.error("Error while dowloading image"));
};
const imageLink = "https://www.w3schools.com/html/mov_bbb.mp4";
downloadImage(imageLink);
