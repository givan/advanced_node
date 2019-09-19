const { fork } = require('child_process');

const child = fork('fork-child-fun.js');

child.on('message', (msg) => {
  console.log(`Message from child: counter = ${msg.counter}`);
});

child.send('Message from parent');