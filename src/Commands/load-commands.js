const Command = require("../Structures/Command");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = new Command({
  data: new SlashCommandBuilder()
    .setName("load-commands")
    .setDescription("Reload commands"),
  async execute(interaction, client) {
    const commands = fs.readdirSync("./src/Commands");
    for (const file of commands) {
      const command = require(`./${file}`);
      client.commands.set(command.data.name, command);
    }
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands.map((command) => command.data.toJSON()),
    });
    await interaction.reply({
      content: "Commands reloaded",
      ephemeral: true,
    });
  },
});
