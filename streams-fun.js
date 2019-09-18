// const {Writable} = require('stream');

// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   }
// });

// process.stdin.pipe(outStream); 

// equivalent to:
// process.stdin.pipe(process.stdout);

const { Readable } = require('stream');

// const inStream = new Readable();
// inStream.push("ABCDEFGEEEEFFF");
// inStream.push(null); // to indicate end of the readable stream


// better way is to have the writable stream read chunks from the readable
// const inStream = new Readable({
//   read(size) {
//     setTimeout(() => {
//       if (this.currentCharCode > 90) {
//         this.push(null); // indicate end of the read stream
//         return;
//       }
//       // push one char at a time; pushing the data on demand, when the consumer asks for it
//       this.push(String.fromCharCode(this.currentCharCode++));
//     }, 100);
//   }
// });
// inStream.currentCharCode = 65; // 'A'

// inStream.pipe(process.stdout); // this pushes the data from the redable stream into the writable (stdout)

// process.on('exit', () => {
//   console.error(`\n\n currentCharCode is ${inStream.currentCharCode}`);
// });

// process.stdout.on("exit", process.exit);

const { Duplex } = require("stream");
const inOutStream = new Duplex({
  read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push(null); // indicate end of the read stream
        return;
      }
      // push one char at a time; pushing the data on demand, when the consumer asks for it
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  },

  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

inOutStream.currentCharCode = 65;
process.stdin.pipe(inOutStream).pipe(process.stdout);

const { Transform } = require('stream');
const transfStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(transfStream).pipe(process.stdout);