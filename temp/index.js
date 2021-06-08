const os = require("os");

const MultipartDownload = require("multipart-download");
console.time("dbsave");
new MultipartDownload()
  .start(
    "http://103.222.20.150/ftpdata/Movies/Bollywood/2021/Black%20Rose%20%282021%29/Black%20Rose%20%282021%29%20Hindi%201080p%20SM.WEB-DL%20x264.mp4",
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
    console.log("Data coming ",data,offset)
    // manipulate data here
  })
  .on("end", (filePath) => {
    console.log(`Downloaded file path: ${filePath}`);
    console.log(`Cores $`);
    console.timeEnd("dbsave");
  });
