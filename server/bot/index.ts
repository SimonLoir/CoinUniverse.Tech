import * as Discord from 'discord.js';
import { watcher } from '../watcher';
class DiscordBot {
    private client: Discord.Client;
    constructor() {
        const client = new Discord.Client();
        this.client = client;

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('message', (msg) => {
            if (msg.author.bot) return;
            if (msg.content.indexOf('test') >= 0) {
                this.sendMessage(
                    'BTC price alert',
                    'BTC is up 1000% in the last five days',
                    0x00ff00
                );
            }
        });

        client.login(process.env.DISCORD_BOT_TOKEN);
    }

    public sendMessage(title: string, message: string, color: number) {
        const channel = this.client.channels.cache.find(
            (c) => c.id == '791703852205735937'
        );
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setColor(color)
            .setDescription(message);
        //@ts-ignore
        channel.send(embed);
    }
}

export var bot = new DiscordBot();

setInterval(() => {
    const pairs = watcher.getPairs('ZIL_USDT');
    const names = watcher.getNames();
    let message = `Here is a quick recap of the ZIL price on the following exchanges :`;
    for (let index = 0; index < pairs.length; index++) {
        const pair_value = pairs[index];
        const pair_exchange = names[index];
        message += `\n${pair_exchange} : ${pair_value}$`;
    }
    console.log(message);
    //bot.sendMessage('ZILLLLL', message, 0x00ff00);
}, 15000);
