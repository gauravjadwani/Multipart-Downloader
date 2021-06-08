import { getDataForRange, concatStreams } from "./../main.js";
const url =
  "http://103.222.20.150/ftpdata/Movies/Bollywood/2021/Black%20Rose%20%282021%29/Black%20Rose%20%282021%29%20Hindi%201080p%20SM.WEB-DL%20x264.mp4";
import * as fs from "fs";
function main() {
  const res = getDataForRange(url, "0-277528568").then(function (response) {
    console.log("res.data", response.body);
  });
  return;

  // console.log(await res);
  // const res1 = await getDataForRange(url, "788400-788493");

  //   console.log(res);
  // const writer = fs.createWriteStream("./1.mp4");
  // res.data.pipe(writer);
  //   writer.on("finish", () => console.log("Finished"));
  //   writer.on("error", () => console.error("Error while dowloading image"));

  //   console.log("data", data);

  //   fs.writeFile("2pac.mp4", data.data, (err) => {
  //     // throws an error, you could also catch it here
  //     if (err) throw err;

  //     // success case, the file was saved
  //     console.log("Lyric saved!");
  //   });

  // concatStreams([res]);
}

main();
