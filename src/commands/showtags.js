const { SlashCommandBuilder } = require("@discordjs/builders");
const Tags = require("../tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showtags")
    .setDescription("List all tags in the database."),
  async execute(interaction) {
    const tagList = await Tags.findAll({ attributes: ["name"] });
    const tagString = tagList.map((t) => t.name).join(", ") || "No tags set.";

    return interaction.reply(`List of tags: ${tagString}`);
  },
};
