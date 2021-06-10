// import axios from "axios";
// import CombinedStream from "combined-stream";
// import * as fs from "fs";


const fs = require('fs')
const CombinedStream = require('combined-stream')
const axios = require('axios')
const url =
  "http://www.eyeborgs.com/press/movies/trailers/iphone/EB-Trailer-2min_iPhone_lrg_640.m4v";
// const url =
//   "http://103.222.20.150/ftpdata/Movies/Bollywood/2021/Black%20Rose%20%282021%29/Black%20Rose%20%282021%29%20Hindi%201080p%20SM.WEB-DL%20x264.mp4";
const status = {totalLength:0};
const dir = "./temp/files";
// var CombinedStream = require("combined-stream");

// const status={
//   "0-123232":{
//     status:"ongoing",
//     totalLength:0,
//     completedLength:0
//   },
//   totalLength:123654
// }

async function checkSupportPartial(url) {
  const headers = {
    range: "bytes=0-0",
  };
  let res = await axios.head(url, headers);
  //   console.log("res", res);
  return res["headers"];
}

// checkSupportPartial(url);

function getDataForRange(url, range) {
  const streamResponse = axios({
    url,
    method: "GET",
    responseType: "stream",
  }).then(function (res) {

    const rangelength = parseInt(res.headers['content-length'],10);
    // status[range][] = "settled";
    // console.log("length for range ", range," rangelength ",rangelength);
    status[range]['totalLength'] = rangelength
    res.data.on('data', (chunk) => {
      const chunkLength = chunk.length
      status[range]['completedLength'] =  status[range]['completedLength'] + chunkLength
      if(status[range]['completedLength'] === status[range]['totalLength']){
        // console.log('range completed ',range)
        status[range]['status'] = 'completed'

      }
      console.log(`Incoming data for range is ${range} chunk length is ${chunk.length} total completed  length is ${status[range]['completedLength']}`)
  })
    return res;
  });
  // console.log("getDataForRange", url, range);

  return streamResponse;
}

function calThreads(length, threads = 10) {
  let current = 0;
  const divide = parseInt(length / threads, 10);
  const remainder = length % threads;
  const res = [];
  while (current + divide <= length) {
    // console.log("Range is ", current, "-", current + divide);
    const str = `${current}-${current + divide}`;
    res.push(str);
    current = current + divide;
  }
  res[res.length - 1] = `${current - divide}-${current + remainder}`;
  return res;
}

// console.log(calThreads(2002, 1));

async function main(url) {
  const res = await checkSupportPartial(url);
  let length = parseInt(res["content-length"], 10);
  // console.log("length is", length);
  status['totalLength'] = length
  if (isFinite(length)) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const queue = calThreads(length, 1);
    queue.map(function (val) {
      status[val] = {
        status:"ongoing",
        totalLength:0,
        completedLength:0
      };
    });

    // getting statusurlg(status);
    console.time("Time this");
    // making req
    const promiseArr = [];
    for (let i = 0; i < queue.length; i++) {
      promiseArr[i] = getDataForRange(url, queue[i]);
    }
    axios
      .all(promiseArr)
      .then(
        axios.spread((...responses) => {
          console.log("all settled");
          //   clearInterval(intervalId);
          concatStreams(responses);
        })
      )
      .catch((errors) => {
        console.log("all error", errors);
        // react on errors.
      });
  }
}

function concatStreams(streams) {

  var combinedStream = CombinedStream.create();
  const writer = fs.createWriteStream("./temp/files/movie4.mp4")

  writer.on("finish", () => {
    // console.log("Finished")
    console.timeEnd("Time this");
  });
  writer.on("error", () => console.error("Error while dowloading image"));

  for (let i = 0; i < streams.length; i++) {
    // console.log("s", streams[i].data);
    combinedStream.append(streams[i].data);
  }
  combinedStream.pipe(writer);
}

// const merge = (...streams) => {
//   let pass = new PassThrough();
//   let waiting = streams.length;
//   for (let stream of streams) {
//     pass = stream.pipe(pass, { end: false });
//     stream.once("end", () => --waiting === 0 && pass.emit("end"));
//   }
//   return pass;
// };
main(url);
