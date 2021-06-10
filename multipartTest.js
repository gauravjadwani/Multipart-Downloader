const os = require('os');
 
const MultipartDownload = require('multipart-download');
 
new MultipartDownload()
  .start('http://103.222.20.150/ftpdata/Movies/Bollywood/2021/Black%20Rose%20%282021%29/Black%20Rose%20%282021%29%20Hindi%201080p%20SM.WEB-DL%20x264.mp4', {
    numOfConnections: 5,
    saveDirectory: os.tmpdir(),
    fileName: 'kitty.png'
  })
  .on('error', (err) => {
    // handle error here
    console.log("error",err)
  })
  .on('data', (data, offset) => {
    // manipulate data here
    console.log("data",data,offset)
  })
  .on('end', (filePath) => {
    console.log(`Downloaded file path: ${filePath}`);
  });