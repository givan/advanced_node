const http = require('http');
const pid = process.pid;

let usersCount = 0;

const server = http.createServer();

server.on('request', (req, res) => {
  // for (let i = 0; i < 1e9; i++) {} // simulate CPU work
  res.write(`Handled by pid: ${pid}\n`);
  res.end(`UsersCount: ${usersCount}`);
});

process.on('message', (msg) => {
  console.log(`Worker ${pid} message: ${JSON.stringify(msg)}`);
  usersCount = msg.usersCount;
});

// to simulate load test, you can use Apache Benchmark tool (ab); 
// https://www.cedric-dumont.com/2017/02/01/install-apache-benchmarking-tool-ab-on-windows/
// for windows - you can download the apache binaries from here: https://www.apachelounge.com/download/
// then go to bin folder and find ab.exe
// ..Downloads\httpd-2.4.41-win64-VS16\Apache24\bin>ab -c200 -t10 http://localhost:3000/

server.listen(3000, () => {
  console.log(`Server listening pid: ${process.pid}`);
});

// to simulate random crash on the worker 
setTimeout(() => {
  process.exit(1);
}, Math.random() * 10000);