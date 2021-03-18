const Discord = require('discord.js'), client = new Discord.Client();
const imports = {
  luxon: require('luxon'),
  db: require('quick.db')
}
const luxon = imports.luxon;
const db = imports.db;

client.imports = imports;

//////////////////////////////////////////////////////

let BOT_STARTED_AT = new Date();
client.on('ready', () => {
  BOT_STARTED_AT = new Date();
  let t = BOT_STARTED_AT;
  t = {
    original: t,
    hour: (async => {
      time = t.getHours();
      time = (time < 10) ? `0${time}` : `${time}`;
      return time;
    })(),
    minute: (async => {
      time = t.getMinutes();
      time = (time < 10) ? `0${time}` : `${time}`;
      return time;
    })(),
    second: (async => {
      time = t.getSeconds();
      time = (time < 10) ? `0${time}` : `${time}`;
      return time;
    })()
  }
  t.fullTime = () => {return `${t.hour}:${t.minute}:${t.second}`;}
  let a = new luxon.DateTime();
  console.log(`Loguei-me como ${client.user.tag} às ${a.toFormat("hh:mm:ss")}`);
});

//////////////////////////////////////////////////////

client.login(process.env.TOKEN);