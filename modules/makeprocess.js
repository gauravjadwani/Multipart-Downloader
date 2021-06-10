

const cluster  = require('cluster')
const { cpus } = require('os')
const log      = require('./log')

const isMaster   = cluster.isMaster
const numWorkers = cpus().length


module.exports = function makeProcess(length, process = numWorkers) {
    // [0-24566,24569-7812166]
    let current = 0;
    const divide = parseInt(length / process, 10);
    const remainder = length % process;
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
  