const http = require('http');
const server = http.createServer();

server.on("request", (req, res) => {
  res.writeHead(200,  {'content-type': "text/plain"});
  // res.end("Hello World!\n");

  res.write("Hello World\n");

  setTimeout(function() {
    res.write("Yet second Hello World!\n");
  }, 1000);

  setTimeout(function() {
    res.write("Yet third Hello World!\n");
  }, 2000);

  setTimeout(function() {
    res.write("Yet fourth Hello World!\n");
  }, 40000 + 1000); // this will timeout the request since the default timeout is 40000
});

// enum with all possible HTTP response codes - super useful
console.log(`http.STATUS_CODES: ${JSON.stringify(http.STATUS_CODES, null, 2)}`);


// server.timeout = 1000; // the default timeout for the server - on default is 40000
server.listen(8000);