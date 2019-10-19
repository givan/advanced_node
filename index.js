// require('./ascii-art');
// require('./ascii-art'); // only once is loaded - then is cached
// console.log(require.cache);
// delete require.cache['C:\\Users\\geivano\\Source\\Repos\\advanced_node\\module_fun.js'];
// require('./ascii-art');

// const v = require('./module_fun');
// console.log(v);

// npm
// npm i -O nodemon - will save nodemon as an optional package

// npm i npm -g -> to update the npm install

// npm config set init-author-name "George Ivanov"

// npm search lint -> search NPM for lint

// npm chrstmas eggs - run the command: $ npm xmas

// Process, Buffer and StringDecoder

// require('./buffer-fun');
// require('./dns-fun');
// require('./dgram-fun');
// require('./http-fun');
// require('./http-web-fun');
// require('./built-in-modules');
// require("./eventemitter-fun");
// require('./streams-fun');
// require('./fork-server-computation');
// require('./cluster-fork-fun');
require('./promises-async-await-fun');
// require('./promises-async-generators-fun');
// require('./destructing-fun');
// require('./classes-fun');
// require('./functional-fun');
// require('./built-in-objects');

// The following is one of the coding excercises i got with Walmart:
// const Cube = require('cubejs');
 
// // Create a new solved cube instance
// const cube = new Cube();
 
// // Apply an algorithm or randomize the cube state
// cube.move("U F R2 B' D2 L'");
// cube.randomize();
 
// // Create a new random cube
// console.log(cube.asString());

// Cube.initSolver();

// const res = cube.solve();
// console.dir(res);