const assert = require('assert');

// from the Pluralsight class - JavaScript Fundamentals for ES6:
// https://app.pluralsight.com/course-player?clipId=7705a4ff-60a4-46a5-97a5-96d1932d35d1
const a = [1, 2, 3, 4, 5];

let sum = 0;
a.forEach(elem => {
  sum += elem;
});
console.log(`sum: ${sum}`);

sum = 0;
for (let i in a) {
  sum += a[i];
}
console.log(`sum: ${sum}`);

// with iterators
sum = 0;
let aIter = a.values();
let iter = aIter.next();
while (!iter.done) {
  sum += iter.value;
  iter = aIter.next();
}
console.log(`sum: ${sum}`);

// with FOR OF - uses iterators
sum = 0;
for (const value of a) {
  sum += value;
}
console.log(`sum: ${sum}`);

// modify each element in an array
aSquare = a.map(a => a * a); // square each element and return a new array
console.log(aSquare);

// use map() on array with destructing

b = [
  {
    id: 1,
    displayName: 'jdoe',
    fullName: {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  {
    id: 2,
    displayName: 'bvuna',
    fullName: {
      firstName: 'Baba',
      lastName: 'Vuna'
    }
  },
  {
    id: 3,
    displayName: 'slavi',
    fullName: {
      firstName: 'Slavi',
      lastName: 'Doe'
    }
  }
];

const resArr = b.map(({ id, displayName }) => {
  let res = { id: id * id, fullName: displayName + '--' };
  return res;
});
console.log(resArr);

class ArrayIterator {
  constructor(array) {
    this.array = array;
    this.index = 0;
  }

  next() {
    let result = { value: undefined, done: true };

    if (this.index < this.array.length) {
      result.value = this.array[this.index++];
      result.done = false;
    }

    return result;
  }
}

class Company {
  constructor() {
    this.employees = [];
  }

  addEmployees(...names) {
    this.employees = this.employees.concat(names);
  }

  // [Symbol.iterator]() {
  //   return new ArrayIterator(this.employees);
  // }

  *[Symbol.iterator]() {
    for (const employee of this.employees) {
      console.log(`employee: ${employee}`);
      yield employee;
    }
  }
}

let filter = function* (items, predicate) {
  for (const item of items) {
    console.log(`filter`, item);
    if (predicate(item)) {
      yield item;
    }
  }
}

let take = function* (items, number) {
  let count = 0;
  if (number <= 0) return;
  for (const item of items) {
    console.log(`take: ${item}`);

    if (count < number) {
      yield item;
      count++;

      if (count >= number) {
        return;
      }
    }
  }
}

let count = 0;
let company = new Company();
company.addEmployees("Tim", "John", "Charles", "George", "Tara");

for (let employee of filter(company, e => e[0] === 'T')) {
  console.log(`employee: ${employee}`);
  count++;
}
console.log(`count filter(): ${count}`);

count = 0;
console.log('About to chain the generators and demonstrate lazy loading ... only 1 element will be referenced');

// this shows chaining  of generators which use lazy evaluation:
// the employees array is not fully traversed, but only until the first occurance is found 
// did not have to interate through the whole collection; we satisfied the predicate with 1 item
// so we never had to look into any additional items; so we do the least amount of work possible
for (let employee of take(filter(company, e => e[0] === 'T'), 1)) { // take the first employee whose name starts with 'T'
  console.log(`employee: ${employee}`);
  count++;
}
console.log(`count take(filter(), 1): ${count}`);

let range = function* (start, end) {
  let current = start;
  while (current <= end) {
    let delta = yield current; // that's a way to get state from the consumer of the iterator
    current += delta || 1; // either default to 1, or to what the consumer sent us
  }
}

let result = [];
let iterator = range(1, 10);
let next = iterator.next();
while (!next.done) {
  result.push(next.value);
  next = iterator.next(2); // this way we're skipping by 2; essentially emitting the odd values only since we start from 1
}

console.log(`range result: ${result.join(', ')}`);

const oddLessThan5 = result.filter(item => item < 5);
console.log(`oddLessThan5: ${oddLessThan5.toString()}`);

const modifiedResult = result.map((entity) => { return {value: entity * 2}; });
console.log(`modifiedResult with array.map(): ${modifiedResult.toString()}`);

let myMap = new Map();
myMap.set(`modifiedResult`, modifiedResult);

if (myMap.get("modifiedResult") === modifiedResult) {
  console.log(`Found modifiedResult in the map: ${modifiedResult}`);
}

let result1 = result.find((item) => item > 8); // find first that matches the predicate
console.log(`array.find(item > 8): ${result1}`);

let copyResult = Array.from(result);
copyResult.fill('a'); // sets all elements of the array to 'a'
assert.equal(copyResult[1], 'a');

let ar1 = new Array(3); // [, ,]
assert.equal(ar1.length, 3);
assert.equal(ar1[0], undefined);

let ar2 = Array.of(3, 4);
assert.equal(ar2.length, 2);
assert.equal(ar2[0], 3);
assert.equal(ar2[1], 4);

// create a copy of the ar2
let ar2copy = Object.create(ar2);
ar2copy.fill('c');
assert.equal(ar2copy.length, ar2.length);
assert.equal(ar2copy[0], 'c');

let ar3 = new Array(1, 2, 3);
assert.equal(ar3.length, 3);
assert.equal(ar3[0], 1);
assert.equal(ar3[1], 2);

let ar4 = Array.from(result);
assert.equal(ar4.length, result.length);
assert.equal(ar4[0], result[0]);

// entries
const entries = ar4.entries();
const firstEntry = entries.next().value;
assert.equal(firstEntry[0], 0); // the index of the elem from the source array
assert.equal(firstEntry[1], ar4[0]); // the value of the element from the source array
