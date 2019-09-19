const fs = require('fs');

// const readFileAsArray = function(file, cb) {
//   fs.readFile(file, (err, data) => {
//     if (err) {
//       return cb(err);
//     }

//     const lines = data.toString().trim().split('\n');
//     cb(null, lines);
//   });
// }

const readFileAsArray = function (file, cb = () => { }) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        cb(err);
        return;
      }

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
}

// readFileAsArray('./files/numbers', (err, lines) => {
//   if (err) throw err;

//   const numbers = lines.map(Number);
//   const oddNumbers = numbers.filter(number => number % 2 == 1);
//   console.log(`Odd numbers count: ${oddNumbers.length}`);
// });

readFileAsArray('./files/numbers')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 == 1);
    console.log(`Odd numbers count: ${oddNumbers.length}`);
  })
  .catch(err => {
    console.error(`Error loading: ${err}`);
  });

/// now the async / await version

async function countOdd() {
  try {
    const lines = await readFileAsArray('./files/numbers');
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 == 1);
    console.log(`Odd numbers count from async/await: ${oddNumbers.length}`);
  }
  catch (err) {
    console.error(err);
  }
}

countOdd();