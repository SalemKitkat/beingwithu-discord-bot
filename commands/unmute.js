module.exports.run = (client, message, args) => {

    const config = require("../config.json");
    const sysop = require("../sysop.js");
    const target = message.mentions.members.first();


    if (sysop.check_user(message.author.id) === false && !message.member.hasPermission("MANAGE_ROLES")) {
    	return message.reply("you must be \`Leader\` to use this command");
    }

    if (!args[0] || args[1]) {
    	return message.reply(`use    \`${config.prefix}unmute @user\``);
    }

    if (!target) {
    	return message.reply("provide a @user to unmute");
    }

    if (target && !target.roles.find(val => val.name === "muted")) {
    	return message.reply(`${target.user.username} is not muted`);
    }



    function unmute(target, muted_role) {
    	 target.removeRole(muted_role).catch(console.error);
    	 return message.channel.send(`<@${target.user.id}> has been unmuted`);
    }


    function main() {
        const muted = message.guild.roles.find(val => val.name === "muted");
        unmute(target, muted);
    }

    main();
};


exports.conf = {
    aliases: []
};


exports.help = {
    name: "unmute",
    description: "no description set",
    usage: "unmute @user"
};
