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
const { token , prefix , OwnerID } = require("./config.json")

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

// <===== var & const  =====> \\

var Channels = [``,``,``]; // ايدي رومات الي ينرسل فيها خط تلقائي
var line = ``; // الخط 
var color = ``; // لون الايمبد
var TaxRoom = ``; // روم الضريبه التلقائيه
const VoiceChannel = ""; // روم الفويس
var BoostRoom = ``; // حط هنا ايدي روم البوست
var TransferRoom = ``; // روم التحويلات
var blacklistWords = ['','',''] // حط الكلمات الممنوعه المسبات والمنتجات والخ اشياء ضد قوانين السيرفر وضد قوانين سيرفرك 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const FeedBackRoom = ""; // ايدي روم الاراء
const clientID = ""; // ايدي رول العميل
var EventsRole = ``; // ايدي رول الفعاليات
var NewsRoleId = ``; // ايدي رول الاخبار
var GiveawayRoleId = ``;// ايدي رول الجيف اويات


// <====== Auto Command & message =======> \\

//<=========== FeedBack Mesage =========> 
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; 
    if (message.channel.id !== FeedBackRoom) return;   

    
    if (!message.member) {
        console.error("Member object not found.");
        return;
    }

    
    
    const role = message.guild.roles.cache.get(clientID);

    if (!role) {
        console.error(`Role with ID ${clientID} not found.`);
        return;
    }

    
    if (!message.member.roles.cache.has(clientID)) {
        
        try {
            await message.member.roles.add(role);
            console.log(`Role ${clientID} added to ${message.member.user.tag}`);
        } catch (error) {
            console.error("Error adding the role:", error);
        }
    }

    
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(color) 
                .setDescription(`
> **Thanks __${message.member.displayName}__ For Your Feedback**
> **And For Using ${message.guild.name}**
> **We Appreciate Your Words** `)
                .setImage(line)  
                .setFooter("Velros")
        ]
    });
});

//<======== Auto line ==========>
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (Channels.includes(message.channel.id)) {
    message.channel.send(line);
  }
});


//<=========== Auto tax ==========>
client.on("messageCreate", async(message) => {
        let args = message.content
          .split(" ")
          .slice(0)
          .join(" "); if (message.author.bot) return;
          if (args.endsWith("m")) args =  args.replace(/m/gi, "") * 1000000;
      else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
      else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
      else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
      else if (args.endsWith("b")) args = args.replace(/b/gi, "") * 1000000000;
    else if (args.endsWith("B")) args = args.replace(/B/gi, "") * 1000000000;
        if (!message.guild) return;
        if (message.channel.id != TaxRoom) return;  
          let args2 = parseInt(args)
          let tax = Math.floor(args2 * (20) / (19) + (1))
          let tax2 = Math.floor(args2 * (20) / (19) + (1)-(args2))
          let tax3 = Math.floor(tax2 * (20) / (19) + (1))
          let tax4 = Math.floor(tax2 + tax3 + args2)
          if (!args2) return message.reply(`
    > ** Error It Must Be A Number ⚠⚠ **`);
          if (isNaN(args2)) return message.reply(`
    > ** Error It Must Be A Number ⚠⚠ **`);
          if (args2 < 1) return message.reply(`
    > ** Error It Must Be Larger Than 1 ⚠⚠ **`);

        let m = await message.reply({ content: `
    > **  Your Tax Is : __${tax}__**` });
    })

//<========== Auto message ===========>
  client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content === "الكلمة") { // غير الكلمة حسب الكلمة  الي بدك البوت يرد عليها
    message.delete();
    message.channel
      .send(`الرد`); // الرد
  }
});

//كود رد تلقائي من غير مايحذف الكلمة ويرد عليك
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content === "2الكلمة") { // نفس الشيء
    message.channel
      .send(`الرد`); // نفس الشيء 
  }
});


// <======= Info select ===========> \\\

client.on(`messageCreate`, async message => {
  if(message.content.startsWith(prefix + "send-info")){

    
  
    if(!OwnerID.includes(message.member.id)) return;

const menu_i = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
                    .setCustomId('menu_info')
                    .setPlaceholder('اختار من هنا')
          .setMinValues(1)
          .setMaxValues(1)
                    .addOptions(
                        {
                          label: `تعريف الخادم`,
                          value: "1",

                        },
                        {
                            label: 'قوانين الخادم' ,
                            value: '2',
                        },
                      {
                            label : "فروعنا",  
                            value: "3",

                      },
                        {
                            label: 'سياسات وشروط الخدمة' ,
                            value: '4',   
                          },

               ),
        );
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle("Your Server name here")
        .setDescription(` يمكنكم رؤية معلومات عنا هنا فقط اختر من القائمه التاليه
- **تعريف الخادم**
- **قوانين الخادم**
- **فروعنا**
- **سياسات وشروط الخدمه**`)
        .setColor(color)
       .setImage('').
        setThumbnail(message.guild.iconURL({dynamic:true}))
      ], components: [menu_i]})


}
})


client.on("interactionCreate", async interaction => {
    if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "1"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ تعريف الخادم __`)

.setDescription(`حط هنا تعريف سيرفرك`)
.setColor(color)
.setImage(line)
      ],ephemeral:true
        })

                        }
    }
  if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "2"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ قوانين الخادم  __`)

.setDescription(`حط هنا قوانين سيرفرك`)
        .setColor(color)
.setImage(line)

      ],ephemeral:true
        })

                        }
    }

  if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "3"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__ فروعنا __`)

.setDescription(` حط هنا روابط سيرفراتك او حساباتك الشخصيه او اي شيء ينتمي اليك`)
.setColor(color)
.setImage(line)     
      ],ephemeral:true

        })

                        }}

 if (interaction.customId === "menu_info") {
          let vale = interaction.values[0];
      if(vale === "4"){
      interaction.reply({embeds:[
      new MessageEmbed()
      .setTitle(`__سياسات وشروط الخدمة__`)
.setDescription(`**حط هنا السياسات حقتك**`)
.setColor(color)
  .setImage(line)
      ],ephemeral:true
        })

                        }}
      })

// <========== Thx Boost Message =========> \\

client.on("guildMemberUpdate", (old, now) => {
  let oldS = old.premiumSince;
  let nowS = now.premiumSince;
  if (!oldS && nowS) {
    let user = now.guild.members.cache.get(now.user.id);
    let channel = now.guild.channels.cache.get(BoostRoom);
    channel
      .send({
        content: `**__
>  شكراً لك على دعمك لل خادمنا ${now.user} __**`,
      })
      .then((Velros) => {
        Velros.react("♥️"); // تقدر تغير الرياكشن
      });
  }
});


// <========== Join To Voice =========> \\



 client.on("ready", () => {
  setInterval(async () => {
    client.channels
      .fetch(VoiceChannel)
      .then((channel) => {
        const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      })
      .catch((error) => {
        return;
      });
  }, 1000);
});


//  <========== t7well Command ==========> \\

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "trn")) {
    let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.reply("> **يرجى كتابة الرقم صحيح**");
    const multipliers = {
      m: 1000000,
      k: 1000,
      K: 1000,
      M: 1000000,
      مليون: 1000000,
      الف: 1000,
      ألف: 1000,
      ك: 1000,
      م: 1000000,
      آلاف: 1000,
      ألاف: 1000,
      الاف: 1000,
      ملايين: 1000000,
    };
    for (const key in multipliers) {
      if (args.endsWith(key)) {
        args = args.replace(new RegExp(key, "gi"), "") * multipliers[key];
        break;
      }
    }
    if (!args) return message.reply("> **يرجى كتابة الرقم صحيح**");
    const args2 = parseInt(args);
    if (args2 <= 1)
      return message.reply(`> **يرجى كتابة رقم أكبر من \`1\`** ⚠️`);
    const tax = Math.floor((args2 * 20) / 19 + 1);

    message.reply(`\`\`\`copy message and send it in <#${TransferRoom}> to complete order \n c ${message.author.id} ${tax}\`\`\``);
  }
});

// <======== Black list word ==========> \\\
client.on('messageCreate', message => {
      if (message.author.bot || message.member.permissions.has('ADMINISTRATOR')) return;

      const content = message.content.split(' ');

      if (!content[0]) return;

      content.forEach(arg => {
        if (!message) return;

        const found = blacklistWords.filter(b => b === arg).map(m => m)[0];

        if (found) {
          message.author.send('> \`-\` **تم حذف رسالتك بسبب كلام غير لائق او اسم منتج غير مشفر**');
          message.delete();
          return;
        }
      });
    });
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "come") {
    const user = message.mentions.members.first();
    if (!user) return message.reply(`**❗️ | I Can't Find This User!**`);
    if (user.id === message.author.id)
      return message.reply(`**❗️ | You Can't Send To Yourself!**`);
    if (user.user.bot) return message.reply(`**❗️ | You Can't Send To Bot!**`);

    let inv;
    try {
      inv = await message.channel.createInvite({ maxAge: 300, maxUses: 1 });
    } catch (error) {
      return message.reply(`**❌️ | Failed to create invite link!**`);
    }

    user
      .send(
        `** Sorry For Disturbance You Have Requested 

CHANNEL : ${message.channel} 

You Request By : ${message.guild.members.cache.get(message.author.id).displayName || message.author.tag} 

link Server Link : ${inv.url} 
**`,
      )
      .then(() => {
        message
          .reply({
            embeds: [
              new MessageEmbed()
                .setDescription(`**⚙️ | Please Wait ....**`)
                .setImage(line)
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(color),
            ],
          })
          .then((t) => {
            setTimeout(
              () =>
                t.edit({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `**✅️ | Done Message Has Been Send To ${user.displayName}**

**⚙️ | Please Wait**`,
                      )
                      .setImage(line)
                      .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                      )
                      .setColor(color),
                  ],
                }),
              1800,
            );
          });
      })
      .catch((y) => {
        message
          .reply({
            embeds: [
              new MessageEmbed()
                .setDescription(`> **⚙️ | Please Wait ....**`)
                .setImage(line)
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor(color),
            ],
          })
          .then((t) => {
            setTimeout(
              () =>
                t.edit({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(`❗️ | **Error __${y.message}__**`)
                      .setImage(line)
                      .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                      )
                      .setColor(color),
                  ],
                }),
              1800,
            );
          });
      });
  }
});


/ <========== ping command ==========> \\

client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  const command = message.content.split(" ")[0];
  if (command == prefix + "ping") {
    const msg = Date.now() - message.createdTimestamp;
    const api = Math.round(client.ws.ping);
    let states = "🟢 Excellent";
    let states2 = "🟢 Excellent";
    if (Number(msg) > 70) states = "🟢 Good";
    if (Number(msg) > 170) states = "🟡 Not Bad";
    if (Number(msg) > 350) states = "🔴 Soo Bad";
    if (Number(api) > 70) states2 = "🟢 Good";
    if (Number(api) > 170) states2 = "🟡 Not Bad";
    if (Number(api) > 350) states2 = "🔴 Soo Bad";
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: `${client.user.avatarURL({ format: "png" })}`,
      })
      .addField("**Time Taken:**", msg + " ms , " + states, true)
      .addField("**WebSocket:**", api + " ms 📶 | " + states2, true)
      .setFooter({ text: `${message.guild.name}` })
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).catch((err) => {
      return;
    });
  }
});

// <========== Embed Command ==========> \\

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(prefix + "embed")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply(
        `> ⚠️ | ** You Don’t Have Premission**`,
      );
    }
    const args = message.content.slice(prefix.length + "embed".length).trim();

    if (!args)
      return message.reply(
        "> ⚠️ | **Please type a message**",
      );

    try {
      await message.delete();

      const attach = message.attachments.first();
      const embed = new MessageEmbed()
        .setTitle("**Velros**")
        .setDescription(`**${args}**`)
        .setFooter({
          text: `Velros`,
          iconURL: message.guild.iconURL(),
        })
        .setTimestamp()
        .setColor(color || "#000000")
        .setThumbnail(message.guild.iconURL());

      if (attach) {
        embed.setImage(attach.proxyURL);
      }

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error sending embed:", error);
      message.channel.send(
        "> ⚠️ | **Failed to send embed.**",
      );
    }
  }
});

// <========== Tax Command ==========> \\

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "tax") {
    let args1 = message.content.split(" ").slice(1).join(" ");
    if (args1.endsWith("m")) args1 = args1.replace(/m/gi, "") * 1000000;
    else if (args1.endsWith("k")) args1 = args1.replace(/k/gi, "") * 1000;
    else if (args1.endsWith("M")) args1 = args1.replace(/M/gi, "") * 1000000;
    else if (args1.endsWith("K")) args1 = args1.replace(/K/gi, "") * 1000;
    else if (args1.endsWith("b")) args1 = args1.replace(/b/gi, "") * 1000000000;
    else if (args1.endsWith("B")) args1 = args1.replace(/B/gi, "") * 1000000000;

    let args2 = parseInt(args1);
    let tax = Math.floor((args2 * 20) / 19 + 1);
    let tax2 = Math.floor((args2 * 20) / 19 + 1 - args2);
    let tax3 = Math.floor((tax2 * 20) / 19 + 1);
    let tax4 = Math.floor(tax2 + tax3 + args2);

    if (!args2 || isNaN(args2) || args2 < 1) {
      return message.reply(
        "> ** Error: Input Must Be A Valid Number Greater Than 1 ⚠⚠ **",
      );
    }

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("tax_mediator") // تعديل معرف الزر
        .setLabel("Mediator")
        .setEmoji("👮")
        .setStyle("SUCCESS"),
    );

    let row2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("tax_back") // تعديل معرف الزر
        .setLabel("Back")
        .setEmoji("↩️")
        .setStyle("DANGER"),
    );

    let m = await message.reply({
      content: `> **  Your Tax Is: __${tax}__**`,
      components: [row],
    });

    let collector = m.createMessageComponentCollector({
      filter: (i) => i.user.id === message.author.id,
      time: 3600000,
      max: 2,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "tax_mediator") {
        await m.edit({
          content: `> **  Your Tax Is: __${tax4}__**`,
          components: [row2],
        });
        await i.deferUpdate();
      }
      if (i.customId === "tax_back") {
        await m.edit({
          content: `> **  Your Tax Is: __${tax}__**`,
          components: [row],
        });
        await i.deferUpdate();
      }
    });
  }
});

var TaxRoom = `1389605572667641949`;
client.on("messageCreate", async (message) => {
  let args = message.content.split(" ").slice(0).join(" ");
  if (message.author.bot) return;
  if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
  else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
  else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
  else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
  else if (args.endsWith("b")) args = args.replace(/b/gi, "") * 1000000000;
  else if (args.endsWith("B")) args = args.replace(/B/gi, "") * 1000000000;
  if (!message.guild) return;
  if (message.channel.id != TaxRoom) return;
  let args2 = parseInt(args);
  let tax = Math.floor((args2 * 20) / 19 + 1);
  let tax2 = Math.floor((args2 * 20) / 19 + 1 - args2);
  let tax3 = Math.floor((tax2 * 20) / 19 + 1);
  let tax4 = Math.floor(tax2 + tax3 + args2);
  if (!args2)
    return message.reply(`
    > ** Error It Must Be A Number ⚠⚠ **`);
  if (isNaN(args2))
    return message.reply(`
    > ** Error It Must Be A Number ⚠⚠ **`);
  if (args2 < 1)
    return message.reply(`
    > ** Error It Must Be Larger Than 1 ⚠⚠ **`);

  let m = await message.reply({
    content: `
    > **  Your Tax Is : __${tax}__**`,
  });
});

//  <========== Roles  Commands ==========> \\



client.on("messageCreate", async (message) => {
  if (message.content === prefix + "collect") {
    if(!OwnerID.includes(message.member.id)) return;
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Choose Your Role")
      .setThumbnail(message.guild.iconURL({ dynamic: true}))
      .setImage("")// حط صورة لل اخذ الرولات يعني شيء متعلق بل رولات
      .setDescription(`حط الكلام الي تحتاجه هنا`);
    

    const button1 = new MessageButton()
      .setCustomId("events") // نفس الشيء
      .setLabel("Events News") // نفس الشيء
      .setEmoji("<:Winner:1389344566296969237>") // نفس الشيء
      .setStyle("PRIMARY"); // لاتغير اي شيء

    const button2 = new MessageButton()
      .setCustomId("news") // لاتغير اي شيء هنا اذا ماتفهم بل برمجه
      .setLabel("Server News")// تقدر تغير اسم الرول مثلا هنا مكتوب اخبار السيرفر تقدر تحط عروض والخ
      .setEmoji("<:News:1389610001571512332>") // تقدر تغير هذا الايموجي
      .setStyle("PRIMARY"); // نفس الشيء

    const button3 = new MessageButton()
      .setCustomId("giveaway") // نفس الشيء
      .setLabel("Giveaways") // نفس الشيء
      .setEmoji("<:Giveaway:1389338285201031340>") // نفس الشيء 
      .setStyle("PRIMARY"); // نفس الشيء تلعب فيه بدون خبره = ايرور ماله داعي

    const row = new MessageActionRow().addComponents(button1, button2, button3);

    message.reply({ embeds: [embed], components: [row] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const roleId =
    interaction.customId === "events"
      ? EventsRole
      : interaction.customId === "news"
        ? NewsRoleId
        : GiveawayRoleId;

  const role = interaction.guild.roles.cache.get(roleId);

  if (role) {
    const member = interaction.member;
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      await interaction.reply({
        content: `Role ${role.name} removed!`,
        ephemeral: true,
      });
    } else {
      await member.roles.add(role);
      await interaction.reply({
        content: `Role ${role.name} added!`,
        ephemeral: true,
      });
    }
  }
});

// <========== The End & Error ==========>

client.on("error", (e) => console.error(e));

client.on("warn", (e) => console.warn(e));

process.on("unhandledRejection", (e) => {
  return console.log(e);
});

process.on("uncaughtException", (e) => {
  return console.log(e);
});

process.on("uncaughtExceptionMonitor", (e) => {
  return console.log(e);
});
