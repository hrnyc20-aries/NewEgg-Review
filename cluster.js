const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  let startIndex = 0;
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('listening', () => {
    process.env.START = startIndex;
    // console.log('TCL: process.env.START', process.env.START);
    startIndex += 10;
  });

  cluster.on('exit', (worker, code, signal) => {
    // console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on('disconnect', () => {
    // console.log('the start: =>', process.env.START);
    process.env.END = 40;
    // console.log('TCL: process.env.END = 40;', process.env.END);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
