const Discord = require("discord.js");

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  const RandomAmmount = Math.floor(Math.random() * 500) + 1;
  const Ammount = RandomAmmount * data.user.money.multiplier;

  data.user.money.balance += Ammount;
  data.user.markModified("money.balance");
  await data.user.save();

  message.reply(
    `${bot.config.Emojis.success} | You begged and recieved ${bot.functions.formatNumber(Ammount)} Coins!`,
  );
}

module.exports = new cmd(execute, {
  description: "Beg for coins.",
  dirname: __dirname,
  usage: `<optional user>`,
  aliases: [],
  perms: ["EMBED_LINKS"],
});
