//  async function downloadFile(fileUrl, outputLocationPath: string) {
//     const writer = createWriteStream(outputLocationPath);

//     return Axios({
//       method: 'get',
//       url: fileUrl,
//       responseType: 'stream',
//     }).then(response => {

//       //ensure that the user can call `then()` only when the file has
//       //been downloaded entirely.

//       return new Promise((resolve, reject) => {
//         response.data.pipe(writer);
//         let error = null;
//         writer.on('error', err => {
//           error = err;
//           writer.close();
//           reject(err);
//         });
//         writer.on('close', () => {
//           if (!error) {
//             resolve(true);
//           }
//           //no need to call the reject here, as it will have been called in the
//           //'error' stream;
//         });
//       });
//     });
//   }

const axios = require("axios");
const fs = require("fs");
const { Transform } = require('stream');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    process.stdout.write(`length is ${chunk.length}`);
    callback(null, chunk);
  }
});


const downloadFile = async (url) => {
  // Writer stream where we want to download the image
  var writeOpts = {highWaterMark:10000}
  const writer = fs.createWriteStream("./bigclone1.mp4",writeOpts);
  console.log("data comigjdwdwwd");
  const streamResponse = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  let cal = 0;
  streamResponse.data.pipe(writer);
  streamResponse.data.on("data", (chunk) => {
    console.log("length of chunk", chunk.length);
    cal = cal + chunk.length;
    console.log("total", cal);
  });

    // streamResponse.data.pipe(reportProgress)
    streamResponse.data.on("data", (chunk) => {
      console.log("length of chunk", chunk.length);
      cal = cal + chunk.length;
      console.log("total", cal);
    });
    let error = null;
    writer.on("error", (err) => {
      console.log("error", err);
      error = err;
      writer.close();
      // reject(err);  
    });
    writer.on("drain", (err) => {
      console.log("drain", err);
      // resolve(true);
    });
    writer.on("close", () => {
      console.log("close", error);
      if (!error) {
        //
        // resolve(true);
      }
    });
  // return new Promise((resolve, reject) => {

  //   // streamResponse.data.pipe(reportProgress)
  //   streamResponse.data.on("data", (chunk) => {
  //     console.log("length of chunk", chunk.length);
  //     cal = cal + chunk.length;
  //     console.log("total", cal);
  //   });
  //   let error = null;
  //   writer.on("error", (err) => {
  //     console.log("error", err);
  //     error = err;
  //     writer.close();
  //     reject(err);
  //   });
  //   writer.on("drain", (err) => {
  //     console.log("drain", err);
  //     resolve(true);
  //   });
  //   writer.on("close", () => {
  //     console.log("close", error);
  //     if (!error) {
  //       //
  //       resolve(true);
  //     }
  //   });
  // });
};
const fileLink =
  "http://103.222.20.150/ftpdata/Movies/Bollywood/2021/Black%20Rose%20%282021%29/Black%20Rose%20%282021%29%20Hindi%201080p%20SM.WEB-DL%20x264.mp4";
downloadFile(fileLink);


    // Write data
    // console.log("streamResponse.data", streamResponse.data);
    // streamResponse.data.pipe(writer);
    // streamResponse.data.on('data', (chunk) =>{
    //   console.log('length of chunk',chunk.length)
    //   cal=cal+chunk.length
    //   console.log('total',cal)
    // })
    // let length = parseInt(streamResponse.headers["content-length"], 10);
    // console.log("length",length)
  
    // writer.on("finish", () => console.log("Finished"));
    // writer.on("error", () => console.error("Error while dowloading image"));
    // writer.on("data", (d) => {
    //   console.log('length of chunk',d.length)
    //   cal=cal+d.length
    //   console.log('total',cal)
    // });
