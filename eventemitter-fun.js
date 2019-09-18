const EventEmitter = require("events");
const fs = require("fs");

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log(`Before executing ...`);

    this.emit('begin');
    taskFunc();
    this.emit('end');

    console.log(`After executing ..`);
  }
}

const withLog = new WithLog();
withLog.on("begin", () => console.log(`About to execute: `));
withLog.on("end", () => console.log(`Done with execute`));

withLog.execute(() => console.log(` ***** Executing task ******`)); // this is a synchronous call

// withLog.execute(() => {
//   setTimeout(
//     () => console.log(` ***** Executing task ******`),
//     100
//   )
// });

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time("execute");
    this.emit("begin");

    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }

      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

const withTime = new WithTime();
withTime.on("begin", () => console.log("About to execute .. "));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("error", console.error);

withTime.on("data", (data) => {
  console.log(`Data length received (1): ${data.length}`)
});

// multiple listeners (second one here) - prependListener makes this second listener called first
withTime.prependListener("data", (data) => {
  console.log(`Data length received (2): ${data.toString().length}`)
});

// withTime.removeListener(); // to remove a listener
// withTime.execute(fs.readFile, "invalid+file-name"); // need to have an error event handler on withTime - otherwise node process crashes
withTime.execute(fs.readFile, __filename);

// process.on("uncaughtException", (err) => { // if we have multiple errors we will do the cleanup multiple times; hence you can use process.once() 
//   console.log(err);
//   // do some cleanup
//   process.exit(1);
// });

process.once("uncaughtException", (err) => {
  console.log(err);
  // do some cleanup
  process.exit(1);
})