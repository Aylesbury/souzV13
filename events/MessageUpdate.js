const {MessageEmbed} = require('discord.js')
module.exports = async(oldMessage, newMessage) => {

    let embed = new MessageEmbed()
    .setTitle(`Сообщение изменено :pencil:`)
    .setDescription(`**Сообщение пользователя <@${oldMessage.author.id}> было удалено в канале <#${oldMessage.channel.id}>**`)
    .addField(`Старое сообщение`, oldMessage.content, true)
    .addField(`Новое сообщение`, newMessage.content, true)
    .setColor('#2f3136');

   let channel = oldMessage.guild.channels.cache.find(ch=>ch.name==="audit-log")
   if(!channel)return;
   channel.send({ embeds: [embed] });
   
}