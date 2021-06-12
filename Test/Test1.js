  
const axios = require("axios")
const fs = require("fs")

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});
const downloadImage = async (url) => {
    // Writer stream where we want to download the image
    const writer = fs.createWriteStream("./bigclone.file");
    console.log("data comigjdwdwwd")
    const streamResponse = await axios({
      url,
      method: "GET",
      responseType: "stream"
    });
    let cal = 0
    // Write data
    // console.log("streamResponse.data", streamResponse.data);
    // streamResponse.data.pipe(writer);
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
    "http://localhost:8000";
  downloadImage(imageLink);