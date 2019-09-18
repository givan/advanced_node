const os = require('os');

console.log(`os.freemem(): ${os.freemem()}`);
console.log(`os.type(): ${os.type()}`);

console.log(`os.userinfo(): ${JSON.stringify(os.userInfo())}`);
console.log(`os.cpus().length: ${os.cpus().length}`);

console.log(`os.constants.signals: ${JSON.stringify(os.constants.signals, null, 2)}`);

const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);

files.forEach(file => {
  const filePath = path.join(dirname, file);

  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    fs.truncate(filePath, stats.size / 2, (err) => {
      if (err) throw err;
    });
  });
});

