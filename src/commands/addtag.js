const { SlashCommandBuilder } = require("@discordjs/builders");
const Tags = require("../tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtag")
    .setDescription("Adds your tag to database")
    .addStringOption((option) =>
      option.setName("name").setDescription("The tag name").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description for tag")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const description = interaction.options.getString("description");
    const username = interaction.user.username;

    try {
      const tag = await Tags.create({ name, description, username });

      return interaction.reply(`Tag ${tag.name} added.`);
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return interaction.reply("That tag already exists.");
      }

      return interaction.reply("Something went wrong with adding a tag.");
    }
  },
};
