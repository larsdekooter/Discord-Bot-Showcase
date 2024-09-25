const { Client, ClientEvents } = require("discord.js");
const ExtendedClient = require("./Client");

/**
 * @template {keyof ClientEvents} K
 * @param {ExtendedClient} client
 * @param  {ClientEvents[K]} eventArgs
 */
function RunFunction(client, ...eventArgs) {}

// Make a custom event class for the event handler to work with intellisense
module.exports = class Event {
  /**
   *
   * @param {K} event
   * @param {RunFunction<K>} runFunction
   */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
};
