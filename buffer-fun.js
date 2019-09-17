console.log(global);

let buf = Buffer.allocUnsafe(10); // 10 byte buffer without filling
console.log(buf);

let buff2 = new Buffer(10); // this automatically fills it; this is deprecated - use alloc() or allocUnsafe()
console.log(buff2);

let buff3 = Buffer.alloc(10);
console.log(buff3);