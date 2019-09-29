// from the Pluralsight class - JavaScript Fundamentals for ES6
// https://app.pluralsight.com/course-player?clipId=d3b381d1-d7ad-452d-af1b-7ac55bba9209

const assert = require('assert');

let mySet = new Set();
// unique list of phone numbers
assert.equal(mySet.size, 0);

mySet.add('somevalue');
assert.equal(mySet.size, 1);

// the value is going to be converted into string even if the values 
const v1 = 1;
mySet.add(v1);
assert.equal(mySet.size, 2);

const v2 = 1; // same value different variable
mySet.add(v2);
assert.equal(mySet.size, 2);

const emptyLiteral1 = {};
mySet.add(emptyLiteral1);
assert(mySet.has(emptyLiteral1));
assert.equal(mySet.size, 3);

const emptyLiteral2 = {};
mySet.add(emptyLiteral2);
assert(mySet.has(emptyLiteral2));
assert.equal(mySet.size, 4); // assert the size hasn't changed since emptyLIteral1 and emptyLiteratl2 are the same

// init with an array
function initWithAnArray() {
  let mySet = new Set([1, 2, 3, 4]);
  assert.equal(mySet.size, 4);
};
initWithAnArray();

// deleting from a set
function deleteFromArray() {
  let mySet = new Set([1, 2, 3]);

  assert.equal(mySet.size, 3);

  mySet.delete(1);

  assert.equal(mySet.size, 2);


  mySet.clear();

  assert.equal(mySet.size, 0);
};
deleteFromArray();

// iterate over a set
function iterateOverSet() {
  let mySet = new Set(['Tom', 'Suzie', 'Harry']);

  let counter = 0;
  mySet.forEach(() => counter++);
  assert.equal(counter, 3);

  // using entries()
  counter = 0;
  for (const item of mySet.entries()) {
    counter++;
  }
  assert.equal(counter, 3);

  // using .values()
  counter = 0;
  for (const item of mySet.values()) {
    counter++;
  }
  assert.equal(counter, 3);
};
iterateOverSet();

// duplicate a set
function duplicateSet() {
  let mySet = new Set(['Tom', 'Suzie', 'Ramada']);

  // entries returns an iterator of objects having key-value; values() on the other hand returns an iterator with simply the values themselves
  // so the following line will not produce a copy of the original mySet set, instead use .values()
  // let mySet2 = new Set(mySet.entries()); 
  let mySet2 = new Set(mySet.values());
  assert.deepStrictEqual(mySet2, mySet);

  // another way is simply pass the set itself object
  let mySet3 = new Set(mySet);
  assert.deepStrictEqual(mySet3, mySet);

  mySet.delete('Tom');
  assert(!mySet.has('Tom')); // doesn't exist in the source mySet
  assert(mySet3.has('Tom')); // but exists in the duplicate
};
duplicateSet();

function createMap() {
  let myMap = new Map([['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']]);
  assert.equal(myMap.size, 3);

  // use set and delete
  myMap.set('key4', {});
  assert.equal(myMap.size, 4);

  myMap.delete('key4');
  assert.equal(myMap.size, 3);

  // can contain the same value multiple times, but the key is unique
  myMap.set('key5', {});
  assert.equal(myMap.size, 4);

  const value1 = {};
  myMap.set('key5', value1);
  assert.equal(myMap.size, 4); // didn't add the key5 one more time

  // can add the same value twice though
  myMap.set('key6', value1);
  assert.equal(myMap.size, 5);
  assert(myMap.has('key6'));
  assert(myMap.has('key5'));

  // will create a copy of the source map
  let myCopyMap = new Map(myMap);
  assert.equal(myCopyMap.size, myMap.size);

  // will create a copy of the source map using .entries()
  let myCopyMap2 = new Map(myMap.entries()); // .entries() will return an iterator with objects  having key-value pairs
  assert.equal(myCopyMap2.size, myMap.size);
};
createMap();

function iterateOverMap() {
  let myMap = new Map();

  myMap.set('key1', 'value1');
  assert.equal(myMap.get('key1'), 'value1');

  let key1Val = myMap.get('key1');
  key1Val += ' -- modified';
  // did it get changed? is the get() returning a reference - NO
  // assert.equal(myMap.get('key1'), 'value1 -- modified');

  // would it update if called expclitly with .set()? - YES
  const newVal = 'value1 -- modified explicitly';
  myMap.set('key1', newVal);
  assert.equal(myMap.get('key1'), newVal);

  // iterate with .forEach()
  myMap = new Map([['key1', 'value1'], [2, 'value2'], ['key3', 3]]);
  let counter = 0;
  myMap.forEach((value, key) => {
    counter++;

    console.log(`key->value: ${key}-> ${value}`);
  });
  assert.equal(myMap.size, counter);

  // using for-of on the map
  counter = 0;
  for (let [key, value] of myMap) {
    counter++;
    console.log(`for-of key-value: ${key}->${value}`);
  }
  assert.equal(myMap.size, counter);

  // using .entries()
  counter = 0;
  const iter = myMap.entries();
  let val = iter.next();
  while (!val.done) {
    [pairKey, pairValue] = val.value;
    console.log(`key-val: ${pairKey}->${pairValue}`);
    counter++;

    val = iter.next();
  }
  assert.equal(myMap.size, counter);

  // using .values()
  const values = myMap.values();
  let firstVal = values.next().value;
  assert.equal(firstVal, 'value1');

  // using .keys()
  const keys = myMap.keys();
  let firstKey = keys.next().value;
  assert.equal(firstKey, 'key1');
  assert.ok(myMap.has(firstKey));
};
iterateOverMap();

// WeakMap and WeakSet
function weakSetLimitedProperties() {
  let myWeakSet = new WeakSet();
  let key1 = {}; // must be an object
  myWeakSet.add(key1);

  assert.ok(!myWeakSet.hasOwnProperty('size'));
  assert.ok(!myWeakSet.hasOwnProperty('entries'));
  assert.ok(!myWeakSet.hasOwnProperty('values'));
  assert.ok(!myWeakSet.hasOwnProperty('forEach'));
  assert.ok(!myWeakSet.hasOwnProperty('clear'));
  
  assert.ok(myWeakSet.has(key1));

  const key2 = {};
  assert.ok(myWeakSet.add(key2));
  assert.ok(myWeakSet.has(key2));

  assert.ok(myWeakSet.delete(key1));
  assert.ok(myWeakSet.delete(key2));

  assert.ok(!myWeakSet.has(key1));
  assert.ok(!myWeakSet.has(key2));
};

weakSetLimitedProperties();

// proxies
let unicorn = {
  legs: 4,
  color: 'brown',
  horn: true,
  hornAttack: function(target) {
    return target.name + ' was obliterated!';
  }
};

let proxyUnicorn = new Proxy(unicorn, {
  get: function(target, property) {
    if (property === 'color') {
      return 'awesome ' + target[property];
    } else {
      return target[property]; // default - pass down to the target obj
    }
  },
  set: function(target, property, value) {
    if (property === 'horn') {
      console.log('Cant remove unicorns horn');
    } else {
      target[property] = value; // pass down to the real object
    }
  }
});

const originalFunc = unicorn.hornAttack;
unicorn.hornAttack = new Proxy(originalFunc, {
  apply: function(target, context, args) {
      if (context !== unicorn) {
        return 'nobody can use the horn but the unicorn itself'; // to prevent highjacking .. 
      } else {
        return target.apply(context, args);
      }
  }
});

let thief = {name: 'Rupert'};
thief.attack = unicorn.hornAttack;
const thiefAttackRes = thief.attack();
console.log(`Thief attack result with proxy protection: ${thiefAttackRes}`);
const unicornAttackRes = unicorn.hornAttack(thief);
console.log(`Unicorn attack result: ${unicornAttackRes}`);

assert.equal(unicorn.color, 'brown');
assert.equal(proxyUnicorn.color, 'awesome brown');

proxyUnicorn.color = 'white';
proxyUnicorn.horn = false;
assert.equal(proxyUnicorn.horn, true);
assert.equal(proxyUnicorn.color, 'awesome white');

assert(!Object.is(1, 2));

assert(!Object.is(-0, 0));
assert(-0 === 0);

assert(!(NaN === NaN));
assert(Object.is(NaN, NaN));

// Object.assign() is mixins with objects

var shark = {
  bite: function(target) {
    target.hurt = true;
  }
}

var person = {};

var laser = {
  pewpew: function(target) {
    target.exploded = true;
  }
}

Object.assign(shark, laser); // shark gets laser mixins
shark.pewpew(person);
assert.ok(person.hasOwnProperty('exploded'));
assert.ok(Object.is(person.exploded, true));