// <==================================> \\
const {
  Client,
  Collection,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
  Modal,
  TextInputComponent,
  MessageEmbed,
} = require("discord.js");
const fs = require(`node:fs`);
const client = new Client({
  intents: [3276799],
}).setMaxListeners(0);
const { joinVoiceChannel } = require("@discordjs/voice");
const axios = require(`axios`);
const { token , prefix } = require("./config.json")

// <===== Ready =====> \\

client.on("ready", async () => {
  //[]\\
  const statuses = [`الحالة الاولى`,`الحالة الثانيه`, `الحالة الثالثه`, `الحالة الرابعه`];//عدل على الحالات براحتك
  console.log(`================`);
  console.log(`Velros Dev`); // لاتعدل اي شيء هنا 
  console.log(`Bot Name : ${client.user.username}`);
  console.log(`Bot Tag : ${client.user.tag}`);
  console.log(`Bot Id : ${client.user.id}`);
  console.log(`Servers Count : ${client.guilds.cache.size}`);
  console.log(
    `Users Count : ${client.guilds.cache
      .reduce((total, guild) => total + guild.memberCount, 0)
      .toLocaleString()}`,
  );
  console.log(`Velros / _uqr`); // لاتعدل اي شيء هنا
  console.log(`================`);
  //[]\\
  const updateIntervalInSeconds = 2;
  const updateIntervalInMilliseconds = updateIntervalInSeconds * 1000;

  const updateStatus = () => {
    const randomIndex = Math.floor(Math.random() * statuses.length);

    const selectedStatus = statuses[randomIndex];
    client.user.setActivity(selectedStatus, {
      type: `STREAMING`,
      url: `https://www.twitch.tv/help`,// حط الكلام الي تريده مكان كلمة help
    });
  };

  setInterval(updateStatus, updateIntervalInMilliseconds);
});

// <===== Login Token =====> \\

client.login(token)

// <=====  =====> \\
