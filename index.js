require('dotenv').config();

const Discord = require('discord.js'), client = new Discord.Client();
const imports = {
  luxon: require('luxon'),
  db: require('quick.db')
}
const luxon = imports.luxon;
const db = imports.db;
const rl = require('readline-sync');

client.imports = imports;

const LUXON_ZONE = new luxon.Zone();
LUXON_ZONE.universal = true;

//////////////////////////////////////////////////////

function logErr (message) {
    if (!message) return null;
    return message;
}
async function sendMessageDM(user) {
    if (!user) return;
    let USER_MESSAGE_INDEX = 0;
    //console.log(`[${USER_MESSAGE_INDEX}] Apagando histórico de mensagem para ${user.tag} [...]`);
    //await user.deleteDM();
    console.log(`[${USER_MESSAGE_INDEX}] Aguardando mensagem para ${user.tag} [...]`)
    const message = rl.question(`Mensagem para ${user.tag}: `);
    console.log(`[${USER_MESSAGE_INDEX}] Enviando mensagem para ${user.tag} [...]`)
    await user.send(message).catch(logErr).then(async msg => {
        console.log(`[${USER_MESSAGE_INDEX}] Mensagem enviada para ${user.tag}`)
    });
}

let BOT_STARTED_AT = luxon.DateTime.fromJSDate(new Date());
client.on('ready', () => {
  BOT_STARTED_AT = luxon.DateTime.fromJSDate(new Date());
  let a = BOT_STARTED_AT;
  a = a.setZone("America/Sao_Paulo");
  console.log(`Loguei-me como ${client.user.tag} às ${a.toFormat("HH:mm:ss")}`);


  ////////////////////////////////////////////////////////////////////////////////
  

    client.users.cache.map(async user => {
        if (user.id === "771506901850652693") {
            await sendMessageDM(user);
        }
    })
  ////////////////////////////////////////////////////////////////////////////////
});

client.on('message', async message => {
    if (message.author.bot) return console.log(`[${message.author.tag}]:`, `${message.cleanContent}`);
    if (!message.guild && !message.author.bot) {
        console.log(`[${message.author.tag}]:`, `${message.cleanContent}`);
        return await sendMessageDM(message.author);
    }
})

//////////////////////////////////////////////////////

client.login(process.env.TOKEN);