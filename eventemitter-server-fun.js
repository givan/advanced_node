const EventEmitter = require("events");

class Server extends EventEmitter {
  constructor(client) {
    super();
    this.tasks = [];
    this.taskId = 1;
    this.client = client;

    process.nextTick(() => {
      this.emit("response", "Type a command (help to list commands)")
    });

    this.client.on("command", (command, args) => {
      switch (command) {
        case "help":
        case "add":
        case "ls":
          this[command](args);
          break;
      
        default:
          this.emit("response", `Unknown command: ${command}`);
          break;
      }
    });
  }

  taskStrings() {
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`
    }).join('\n');
  }

  help() {
    this.emit("response", "The following commands are supported: help, add or ls");
  }

  add(args) {
    this.tasks[this.taskId] = args.join(" ");
    this.emit("response", `added task ${this.taskId}`);
    this.taskId++;
  }

  ls() {
    this.emit("response", `Tasks: \n ${this.taskStrings()}`);
  }
}

module.exports = (client) => new Server(client);