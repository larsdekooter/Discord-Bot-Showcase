const Event = require("../Structures/Event");

// Interaction event
module.exports = new Event("interactionCreate", async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.find(
    (c) => c.data.name === interaction.commandName
  );
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
    });
  }
});
