// Source - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

let inputArray = [1, 3, 4, 5];
const res = inputArray.find((element) => element == 3);
console.log(`find() on array: ${res}`);

class Artist {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}

let artists = [new Artist(1, "Artist1", "Address2"), new Artist(2, "Artist2", "Address2"), new Artist(3, "Artist3", "Address3")];
let artistIdAndName = artists.map(({ id, name }) => { return { id, name }; }); // this uses destructing on Artist on id and address only

console.dir(artistIdAndName);

// array distructing
let arr = ["a", "b", "c"];
[one, two, three] = arr;
console.log(`one=${one}; two=${two}; three=${three}`);

let a, b, rest;
a = 10;
b = 20; // if you remove ; here, then both 'a' and 'b' will be equal to 10 - check it out!
[b, a] = [a, b]; // swap a and b
console.log(`a=${a}; b=${b}`);

[a, b, ...rest] = [10, 20, 30, 40, 50, 60];
console.log(rest);

// you can set default vaules on destructing:
[a = 1, b = 7] = [3];
console.log(`a=${a}; b=${b}`); // a = 3, b = 7

// parsing an array returned from a func
function f() {
  return [1, 2, 3, 4, 5];
}

[a, b] = f();
console.log(`a=${a}; b=${b}`);
[a, b, ...rest] = f();
console.log(rest);

let o = { p: 1, q: true };
let { p, q } = o;
console.log(`p=${p} and q=${q}`);

// assigning to new variable names
let { p: foo, q: bar } = o;
console.log(`foo=${foo} and bar=${bar}`);

// Assigning to new variables names and providing default values
let { a: aa = 10, b: bb = 20 } = { a: 3 };
console.log(`aa=${aa}, bb=${bb}`);

// Unpacking fields from objects passed as function parameter
let user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
    firstName: 'John',
    lastName: 'Doe'
  }
};

function userId({ id }) {
  return id;
}
console.log(userId(user));

function whois({ displayName: name, fullName: { firstName: fname } }) {
  console.log(`name=${name}, fname=${fname}`);
}
whois(user);

// Setting a function parameter's default value
function whois2({ displayName = 'default', fullName = { firstName: 'Default First Name' } } = {}) {
  console.log(`displayName=${displayName}`);
  console.log(`fullName=${fullName}`);
}
whois2({ displayName: "Slavi Trifonov" });
whois2();

// For of iteration and destructuring
for (const { id, name } of artists) {
  console.log(`id=${id} => name=${name}`);
}

// Rest in Object Destructuring
let { x, y, ...z } = { x: 10, y: 20, c: 30, d: 40, e: 50 };
console.log(`x=${x}; y=${y}`);
console.log(z);