module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setActivity('quryltai', { type: 'LISTENING'})
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
