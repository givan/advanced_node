// console.log(module);

const v = 555; // this is local var

exports = {a : 2}; // this will not replace exports variable; need to use module.exports instead

let exports2 = module.exports;

exports2 = {b: 3};

module.exports = exports2;