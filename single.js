import { getDataForRange, concatStreams } from "./test.js";
const url = "https://www.w3schools.com/html/mov_bbb.mp4";
import * as fs from "fs";
async function main() {
  const res = await getDataForRange(url, "0-788400");
  const res1 = await getDataForRange(url, "788400-788493");

  //   console.log(res);
  //   const writer = fs.createWriteStream("./1.mp4");
  //   res.data.pipe(writer);
  //   writer.on("finish", () => console.log("Finished"));
  //   writer.on("error", () => console.error("Error while dowloading image"));

  //   console.log("data", data);

  //   fs.writeFile("2pac.mp4", data.data, (err) => {
  //     // throws an error, you could also catch it here
  //     if (err) throw err;

  //     // success case, the file was saved
  //     console.log("Lyric saved!");
  //   });

  concatStreams([res, res1]);
}

main();
