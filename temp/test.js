import axios from "axios";
import CombinedStream from "combined-stream";
import * as fs from "fs";

const url = "https://www.w3schools.com/html/mov_bbb.mp4";
// var CombinedStream = require("combined-stream");

async function checkSupportPartial(url) {
  const headers = {
    range: "bytes=0-0",
  };
  let res = await axios.head(url, headers);
  //   console.log("res", res);
  return res["headers"];
}

// checkSupportPartial(url);

export function getDataForRange(url, range) {
  const streamResponse = axios({
    url,
    method: "GET",
    responseType: "stream",
    range: `bytes=${range}`,
  });
  console.log("getDataForRange", url, range);
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
  if (isFinite(length)) {
    // console.log("length", length);
    const queue = calThreads(length, 10);
    // console.log("queue", queue);

    // making req
    const promiseArr = [];
    for (let i = 0; i < queue.length; i++) {
      promiseArr[i] = getDataForRange(url, queue[i]);
    }
    axios
      .all(promiseArr)
      .then(
        axios.spread((...responses) => {
          concatStreams(responses);
        })
      )
      .catch((errors) => {
        console.log("all error", errors);
        // react on errors.
      });
  }
}

export function concatStreams(streams) {
  var combinedStream = CombinedStream.create();
  for (let i = 0; i < streams.length; i++) {
    // console.log("s", streams[i].data);
    combinedStream.append(streams[i].data);
  }
  combinedStream.pipe(fs.createWriteStream("combinedMain.mp4"));
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
