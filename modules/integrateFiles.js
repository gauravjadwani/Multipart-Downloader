function integrateFiles(){
    var CombinedStream = require('combined-stream');
    var fs = require('fs');

    var combinedStream = CombinedStream.create();
    combinedStream.append(fs.createReadStream('./../temp/files/0.mp4'));
    combinedStream.append(fs.createReadStream('./../temp/files/1.mp4'));
    combinedStream.append(fs.createReadStream('./../temp/files/2.mp4'));
    combinedStream.append(fs.createReadStream('./../temp/files/3.mp4'));
    // combinedStream.append(fs.createReadStream('file2.txt'));

    combinedStream.pipe(fs.createWriteStream('./../temp/files/all.mp4'));
}

integrateFiles()