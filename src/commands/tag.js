const { SlashCommandBuilder } = require("@discordjs/builders");
const Tags = require("../../tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("Get a certain tag by name")
    .addStringOption((option) =>
      option.setName("name").setDescription("The tag name").setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const tag = await Tags.findOne({ where: { name } });

    if (tag) {
      tag.increment("usage_count");

      return interaction.reply(tag.get("description"));
    }

    return interaction.reply(`Could not find tag: ${name}`);
  },
};
