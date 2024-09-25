const { SlashCommandBuilder } = require("discord.js");
const Command = require("../Structures/Command");

module.exports = new Command({
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear the channel")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to clear")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount") || 100;

    if (amount > 100) {
      return await interaction.reply({
        content: "You can't clear more than 100 messages",
        ephemeral: true,
      });
    }

    // Get the messages to delete
    const messages = (
      await interaction.channel.messages.fetch({
        limit: amount,
      })
    ).filter((m) => m.bulkDeletable);

    await interaction.channel.bulkDelete(messages);
    await interaction.reply({
      content: "Cleared " + messages.size + " messages",
      ephemeral: true,
    });
  },
});
