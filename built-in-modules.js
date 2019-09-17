const os = require('os');

console.log(`os.freemem(): ${os.freemem()}`);
console.log(`os.type(): ${os.type()}`);

console.log(`os.userinfo(): ${JSON.stringify(os.userInfo())}`);
console.log(`os.cpus().length: ${os.cpus().length}`);

console.log(`os.constants.signals: ${JSON.stringify(os.constants.signals, null, 2)}`);
