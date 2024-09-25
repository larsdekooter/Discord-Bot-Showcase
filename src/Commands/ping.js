const { SlashCommandBuilder } = require("discord.js");
const Command = require("../Structures/Command");

module.exports = new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),
  async execute(interaction, client) {
    return await interaction.reply({
      content: `Pong!\n\`${client.ws.ping}ms\`\n${
        new Date().getTime() - interaction.createdTimestamp
      }`,
    });
  },
});
