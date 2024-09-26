const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

const ExtendedClient = require("./Client");
/**
 *
 * @param {ChatInputCommandInteraction} interaction
 * @param {ExtendedClient} client
 */
function executeFunction(interaction, client) {}

// Create a custom command class to make the command handler work with intellisense
module.exports = class Command {
  /**
   *
   * @param {{data: SlashCommandBuilder, execute: executeFunction}} options
   */
  constructor(options) {
    this.data = options.data;
    this.execute = options.execute;
  }
};
