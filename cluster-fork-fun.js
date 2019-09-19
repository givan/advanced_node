const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for : ${cpus} CPUs`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();  
  }

  // monitor for worker crashes and start new workers if they existed with no 0 code
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker ... `);
      cluster.fork();
    }
  });

  const updateUserCountInDb = () => {
    this.userCount = this.userCount || 5;
    this.userCount *= 2;
    return this.userCount;
  }

  updateUserCountInDb();
  setInterval(() => {
    const usersCount = updateUserCountInDb();

    // now broadcast to all workers
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ usersCount });
    });
  }, 10000);

  // console.dir(cluster.workers, {depth: 0});
  // Object.values(cluster.workers).forEach((worker) => {
  //   worker.send( { msg: `Hello worker: ${worker.id}` });
  // });
}
else {
  require('./cluster-server-fun'); // this the actual worker after forking so just execute the actual handler
}