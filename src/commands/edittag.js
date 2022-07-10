const { SlashCommandBuilder } = require("@discordjs/builders");
const Tags = require("../../tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edittag")
    .setDescription("Edit existing tag")
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

    const affectedRows = await Tags.update(
      { description },
      { where: { name } }
    );

    if (affectedRows > 0) {
        return interaction.reply(`Tag ${name} was edited.`)
    }

    return interaction.reply(`Could not find a tag with name ${name}.`)
  },
};
