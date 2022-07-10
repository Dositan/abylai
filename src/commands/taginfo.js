const { SlashCommandBuilder } = require("@discordjs/builders");
const Tags = require("../tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("taginfo")
    .setDescription("Displays info on tag")
    .addStringOption((option) =>
      option.setName("name").setDescription("The tag name").setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");

    const tag = await Tags.findOne({ where: { name } });

    if (tag) {
      return interaction.reply(
        `${name} was created by ${tag.username} at ${
          tag.createdAt
        } and has been used ${tag.usage_count} time${
          tag.usage_count > 1 ? "s" : ""
        }.`
      );
    }

    return interaction.reply(`Could not find tag: ${name}`);
  },
};
