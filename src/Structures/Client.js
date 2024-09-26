const { Client, ClientOptions, Collection } = require("discord.js");
const fs = require("fs");

// Create a custom client for extended functionality
module.exports = class ExtendedClient extends Client {
  commands = new Collection();
  /**
   *
   * @param {ClientOptions} options
   */
  constructor(options) {
    super(options);
    this.commands = new Collection();
  }

  start(token) {
    // Load commands
    for (const file of fs.readdirSync("./src/Commands")) {
      const command = require(`../Commands/${file}`);
      this.commands.set(command.data.name, command);
    }

    fs.readdirSync("./src/Events")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const event = require(`../Events/${file}`);
        this.on(event.event, event.run.bind(null, this));
      });

    this.login(token);
  }
};
