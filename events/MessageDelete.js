const {MessageEmbed} = require('discord.js')
module.exports = async(message) => {

    let embed = new MessageEmbed()
    .setTitle(`Сообщение удалено :wastebasket:`)
    .setDescription(`**Сообщение пользователя <@${message.author.id}> было удалено в канале <#${message.channel.id}>**`)
    .addField(`Сообщение`, message.content || 'lol')
    .setColor('#2f3136');

   let channel = message.guild.channels.cache.find(ch=>ch.name==="activity-log");
   if(!channel)return;
   channel.send({ embeds: [embed] });
   
}