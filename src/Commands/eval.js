const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const Command = require("../Structures/Command");

module.exports = new Command({
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluates code"),

  async execute(interaction, client) {
    // Check if the user is the owner of the bot
    if (!interaction.user.id === "697045560527552552") return;
    // Create the modal for the code input
    const modal = new ModalBuilder()
      .setCustomId("evalModal")
      .setTitle("Evaluate Code");

    const actionrow = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("codeInput")
        .setLabel("Code")
        .setStyle(TextInputStyle.Paragraph)
    );

    modal.addComponents(actionrow);

    await interaction.showModal(modal);

    // Wait for the modal to be submitted
    const i = await interaction.awaitModalSubmit({
      filter: (i) => i.customId === "evalModal",
      time: 60000,
    });
    // Answer the modal
    await i.deferReply();

    // Get the code from the modal
    const code = i.fields.getTextInputValue("codeInput");

    // Evaluate the code
    try {
      let evaled = await eval(code);

      if (typeof evaled !== "string") {
        evaled = require("util").inspect(evaled, { depth: 1 });
      }

      // Respond with the code and the output
      const embed = new EmbedBuilder()
        .setColor("#36393E")
        .setFields(
          { name: "Input", value: `\`\`\`js\n${code}\n\`\`\`` },
          { name: "Output", value: `\`\`\`js\n${evaled}\n\`\`\`` }
        )
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      await i.editReply({ embeds: [embed] });
    } catch (error) {
      // Respond with the error
      const embed = new EmbedBuilder()
        .setDescription(
          `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n**Output:**\n\`\`\`ansi\n\x1b[31;1m${error.message}\n\`\`\``
        )
        .setColor("Blue");

      await i.editReply({ embeds: [embed] });
    }
  },
});
