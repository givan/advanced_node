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

const john = new Employee("John Doe");
console.log(john.doWork());