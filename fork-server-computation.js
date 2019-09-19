const http = require('http');
const { fork } = require('child_process');

const longComputation = function () {
  let sum = 0;
  for (let i = 0; i < 1e11; i++) {
    sum += i;
  }

  return sum;
}

const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    // const sum = longComputation(); // this will exhaust the event loop since it takes long time
    // res.end(`Sum is ${sum}`);
    const forkedComputeChild = fork('./fork-child-compute.js');

    forkedComputeChild.on('message', (sum) => {
      res.end(`Sum is ${sum}`);
    });

    forkedComputeChild.send('start'); // start computation and wait for the response message
  }
  else {
    res.end('OK');
  }
})

server.listen(3000);