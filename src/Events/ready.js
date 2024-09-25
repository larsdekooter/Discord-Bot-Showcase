const Event = require("../Structures/Event");

// Ready event
module.exports = new Event("ready", async (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  // Send a start-up message to the specified channel
  const channel = client.channels.cache.get("950680837211435019");
  const today = new Date();
  channel.send(`Started on <t:${Math.floor(today.getTime() / 1000)}:T>`);
});
