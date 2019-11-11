// https://thecodebarbarian.com/getting-started-with-async-iterators-in-node-js

const nums = [1, 2, 3];

let index = 0;
const asyncIterator = {
  next: () => {
    if (index >= nums.length) {
      // A conventional iterator would return a `{ done: true }`
      // object. An async iterator returns a promise that resolves
      // to `{ done: true }`
      return Promise.resolve({ done: true });
    }
    const value = nums[index++];
    return Promise.resolve({ value, done: false });
  }
};

const asyncIterable = {
  [Symbol.asyncIterator]: () => asyncIterator
};

async function main() {
  for await (const value of asyncIterable) {
    console.log(value);
  }
}

main().catch(error => console.error(error.stack));


// https://dev.to/nestedsoftware/asynchronous-generators-and-pipelines-in-javascript--1h62
// Async generators

const timer = () => setInterval(() => console.log('tick'), 1000)

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getValue = () => {
  //return promise instead of value
  return new Promise(resolve => {
    setTimeout(() => resolve(random(1, 10)), 1000)
  })
}

const numberGenerator = async function* () {
  for (let i = 0; i < 5; i++) {
    const value = await getValue() //await promise
    yield value ** 2
  }
}

const mainGenerators = async () => {
  const t = timer()
  const numbers = numberGenerator()

  //use 'for await...of' instead of 'for...of'
  for await (const v of numbers) {
    console.log('number = ' + v)
  }

  clearInterval(t)
}

mainGenerators()