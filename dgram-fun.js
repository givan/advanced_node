const dgram = require('dgram');

const PORT = 3333;
const HOST = '127.0.0.1';

// server
const server = dgram.createSocket('udp4');

server.on("listening", () => console.log("UDP server listing.."));
server.on("message", (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} -> ${msg}`);
});

server.bind(PORT, HOST);

// client

// now put this into an interval and send this every second
// setInterval(function() {
//   const client = dgram.createSocket('udp4');
//   client.send("Pluralsight rocks!!", PORT, HOST, (err) => {
//     if (err) throw err;
  
//     console.log("UDP message sent");
//     client.close();
//   });
// }, 1000);

// use Buffer
const msg = Buffer.from("Pluralsight rocks!!!");

const client2 = dgram.createSocket('udp4');
client2.send(msg, 0, 11, PORT, HOST, (err) => {
  if (err) throw err;

  console.log("UDP client2 - first chunk of 10 bytes sent.. Now starting the second chunk of the MSG buffer..");

  client2.send(msg, 11, msg.length, PORT, HOST, (err) => {
    console.log("UDP message completed sending in 2 chunks");
    client2.close();
  })
});
