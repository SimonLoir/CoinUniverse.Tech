import * as Discord from 'discord.js';
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
