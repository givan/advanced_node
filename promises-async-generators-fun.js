// this is from the Pluralsight JavaScript Fundamentals for ES6
// Asynchronous Development in ES6: Asynchronous Generators and Promises
// - https://app.pluralsight.com/course-player?clipId=b1df64a6-9b93-41c5-a8bf-e87930fe0ff0

function run(generator) {
  let sequence;

  let process = function (result) {
    if (!result.done) {
      result.value.then(function (value) {
        if (!result.done) {
          process(sequence.next(value));
        }
      })
    }
  }

  sequence = generator();
  let next = sequence.next();
  process(next);
};

function getStockPriceP() {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(50);
    }, 300);
  });
};

function executeTradeP() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('OK');
    }, 200);
  });
};

function* main() {
  try {
    let price = yield getStockPriceP();
    if (price > 45) {
      yield executeTradeP();
    } else {
      console.log(`Current stock price is: ${price}`);
    }
  } catch (error) {
    console.error('Error while running main', error);
  }
}

run(main);