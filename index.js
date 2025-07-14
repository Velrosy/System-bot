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
var blacklistWords = ['','',''] 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const FeedBackRoom = ""; // ايدي روم الاراء
const clientID = ""; // ايدي رول العميل

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
