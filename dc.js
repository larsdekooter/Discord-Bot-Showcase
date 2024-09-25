const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const commands = [];

// This function is to laod the commands into the discord api
(async () => {
  for (const file of fs.readdirSync("./src/Commands")) {
    const command = require(`./src/Commands/${file}`);
    commands.push(command.data.toJSON());
  }
  const data = await rest.put(
    Routes.applicationGuildCommands("938787836755320853", "950680035411501056"),
    {
      body: commands,
    }
  );

  console.log(data);
})();
