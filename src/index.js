const ExtendedClient = require("./Structures/Client");
const { GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

client.start(process.env.DISCORD_TOKEN);
