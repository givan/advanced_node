const EventEmitter = require("events");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require("./eventemitter-server-fun")(client);

server.on("response", (res) => {
  console.log(`Server resp: ${res}`);
});

let command, args;
rl.on("line", (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});