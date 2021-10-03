const Discord = require(`discord.js`);
const canvacord = require(`canvacord`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args || !args[0]) {
    return message.reply(`Please provide text.`);
  }

  args = args.join(` `).slice(22);

  const User = (await bot.functions.fetchUser(args[0])) || message.author;
  const Image = await canvacord.Canvas.youtube({
    username: User.username,
    avatar: User.displayAvatarURL({ format: "png" }),
    content: args,
  });

  message.reply({
    files: [new Discord.MessageAttachment(Image, "youtube.png")],
  });
}

module.exports = new cmd(execute, {
  description: `YouTube comment lol.`,
  aliases: ["waste"],
  dirname: __dirname,
  usage: `<user | self> <text>`,
});
