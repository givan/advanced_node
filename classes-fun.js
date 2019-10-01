const assert = require('assert');

class Person {
  constructor(name) {
    this.name = name; // may throw an error
  }
  get name() {
    return this._name;
  }

  set name(value) {
    if (!value || typeof value !== 'string') throw new Error("name is a string property");

    this._name = value;
  }

  doWork() {
    return `${this.name} is a person trying to work`;
  }
}

class Employee extends Person {
  constructor(name) {
    super(name);
  }

  doWork() {
    // we can call super in a method, which will try to call base's doWork method() if exists
    return `${super.doWork()} is working`;
  }
}

const val1Symb = Symbol.for('HidingPropertyNames.val1'); // we're not exporting this symbol so nobody can get access to it
class HidingPropertyNames {
  constructor(val1) {
    this[val1Symb] = val1;
  }

  get val1Prop() {
    return this[val1Symb];
  }
  set val1Prop(val) {
    this[val1Symb] = val;
  }
}

const val1 = 111;
let hidePropName = new HidingPropertyNames(val1);
assert.ok(!hidePropName.hasOwnProperty('val1'));
assert.equal(hidePropName.val1Prop, val1);

const john = new Employee("John Doe");
console.log(john.doWork());