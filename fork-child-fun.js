process.on('message', (msg) => {
  console.log(`Message in child: ${msg}`);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 100);