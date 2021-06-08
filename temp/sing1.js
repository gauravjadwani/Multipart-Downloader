import * as fs from "fs";
import axios from "axios";
const downloadImage = async (url) => {
  // Writer stream where we want to download the image
  const writer = fs.createWriteStream("./demo.mp4");
  console.log("data comigjdwdwwd")
  const streamResponse = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });
  let cal = 0
  // Write data
  // console.log("streamResponse.data", streamResponse.data);
  streamResponse.data.pipe(writer);
  streamResponse.data.on('data', (chunk) =>{
    console.log('length of chunk',chunk.length)
    cal=cal+chunk.length
    console.log('total',cal)
  })
  let length = parseInt(streamResponse.headers["content-length"], 10);
  console.log("length",length)

  writer.on("finish", () => console.log("Finished"));
  writer.on("error", () => console.error("Error while dowloading image"));
  // writer.on("data", (d) => {
  //   console.log('length of chunk',d.length)
  //   cal=cal+d.length
  //   console.log('total',cal)
  // });
};
const imageLink =
  "https://www.w3schools.com/html/mov_bbb.mp4";
downloadImage(imageLink);
