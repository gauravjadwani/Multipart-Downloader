const os = require("os");

const MultipartDownload = require("multipart-download");
console.time("dbsave");
new MultipartDownload()
  .start(
    "http://www.eyeborgs.com/press/movies/trailers/iphone/EB-Trailer-2min_iPhone_lrg_640.m4v",
    {
      numOfConnections: 1,
      saveDirectory: os.tmpdir(),
      fileName: "movie.mkv",
    }
  )
  .on("error", (err) => {
    // handle error here
  })
  .on("data", (data, offset) => {
    // manipulate data here
  })
  .on("end", (filePath) => {
    console.log(`Downloaded file path: ${filePath}`);
    console.log(`Cores $`);
    console.timeEnd("dbsave");
  });
