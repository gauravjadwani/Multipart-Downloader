const axios = require("axios")

module.exports =  function getDataForRange(url, range, status, process) {
  console.log('getDataForRange',url, range, status, process)
    const streamResponse =  axios({
      url,
      method: "GET",
      responseType: "stream",
    })
    // .then(function (res) {
    //     console.time("Time this");
    //   const rangelength = parseInt(res.headers['content-length'],10);
    //   // status[range][] = "settled";
    //   // console.log("length for range ", range," rangelength ",rangelength);
    //   status[range]['totalLength'] = rangelength
    //   res.data.on('data', (chunk) => {
    //     const chunkLength = chunk.length
    //     status[range]['completedLength'] =  status[range]['completedLength'] + chunkLength
    //     if(status[range]['completedLength'] === status[range]['totalLength']){
    //       // console.log('range completed ',range)
    //     //   status[range]['status'] = 'completed'

    //     process.send({status:'completed',process:process,range:range});
    //     console.log('gaurav')
    //     console.timeEnd("Time this");
  
    //     }
    //     console.log(`Incoming process ${process.pid} for range is ${range} chunk length is ${chunk.length} total completed  length is ${status[range]['completedLength']}`)
    // })
    //   return res;
    // });
    // console.log("getDataForRange", url, range);
  
    return streamResponse;
  }