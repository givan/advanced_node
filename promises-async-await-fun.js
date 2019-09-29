const fs = require('fs');
const assert = require('assert');

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

function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      resolve({orderId, userId: 1});
    }, 100);
  })
};

function getUser(userId) {
  return Promise.resolve({userId, companyId: 2});
}

function getCompany(companyId) {
  return Promise.resolve({name: 'Pluralsight'});
}

getOrder(3).then(function (order) {
  return getUser(order.userId); // this returns another promise - chaining them now
}).then(function (user) {
  return getCompany(user.companyId);
}).then(function (company) {
  assert.equal(company.name, 'Pluralsight');
}).catch(function (err) {
  console.error(`getOrder promise chain returned error: ${JSON.stringify(err)}`);
});

// call in parallel getOrder for multiple orders
let ordersPromises = [];
let orderIds = [1, 2, 3, 4];
orderIds.forEach((item) => {
  ordersPromises.push(getOrder(item));
});

Promise.all(ordersPromises).then((results) => {
  assert.equal(results.length, ordersPromises.length);
});