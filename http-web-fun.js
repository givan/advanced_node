const http = require('http');

const req = http.request(
  { hostname: "www.google.com" },
  (res) => {
    console.log(`res.statusCode: ${res.statusCode}`);
    console.log(`res.headers: ${JSON.stringify(res.headers)}`);

    res.on("data", (data) => {
      // this must be a Buffer instance
      console.log(data.toString());
    })
  }
);
req.on("error", (err) => console.error(`http.request error: ${err}`));
console.log(`req.gent: ${req.agent}`);
req.end(); // if we don't call .end() the call is not completed and hence the callback with (res) is not called (after given amount of time will time out)

// shorter version and no need to call .end()
http.get("http://google.com", (res) => {
  console.log(res);

  res.on("data", (data) => {
    console.log(`data: ${data}`);
  });
}).on('error', (err) => console.error(`http.get error: ${err}`)); 



