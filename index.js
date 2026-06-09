import './config.js';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import express from 'express';
import chalk from 'chalk';
import { loadPlugins, getPlugin } from './lib/loader.js';
import { isOwner } from './lib/helper.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send(`🤖 ${global.namebot} is running!`));
app.listen(PORT, () => console.log(chalk.cyan(`🌐 Server on port ${PORT}`)));

await loadPlugins();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log(chalk.yellow('\n📱 Scan QR Code:\n'));
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(chalk.green(`\n✅ ${global.namebot} is ready!\n`));
});

client.on('authenticated', () => {
    console.log(chalk.blue('🔐 Authenticated successfully'));
});

client.on('auth_failure', (msg) => {
    console.error(chalk.red('❌ Auth failed:', msg));
});

client.on('disconnected', (reason) => {
    console.log(chalk.red('🔌 Disconnected:', reason));
    client.initialize();
});

client.on('message', async (msg) => {
    try {
        const body    = msg.body.trim();
        const from    = msg.from;
        const number  = from.replace('@c.us', '').replace('@g.us', '');
        const owner   = isOwner(number);
        const isGroup = from.endsWith('@g.us');
        const ctx     = { client, config: global, isOwner: owner, isGroup };

        if (msg.type === 'list_response') {
            const selectedId = msg.selectedRowId;
            console.log(chalk.magenta(`📋 List select: ${selectedId}`));
            const plugin = getPlugin(selectedId);
            if (plugin) await plugin.execute(client, msg, [], ctx);
            return;
        }

        if (!body.startsWith(global.prefix)) return;

        const args    = body.slice(global.prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        console.log(chalk.cyan(`📩 Command: ${command} | from: ${number}`));

        const plugin = getPlugin(command);

        if (!plugin) {
            return await msg.reply(
                `❓ Unknown command: *${command}*\n` +
                `Type *${global.prefix}menu* to see all commands.`
            );
        }

        if (plugin.ownerOnly && !owner) {
            return await msg.reply('⛔ *This command is for the owner only!*');
        }

        if (plugin.groupOnly && !isGroup) {
            return await msg.reply('⛔ *This command works in groups only!*');
        }

        await plugin.execute(client, msg, args, ctx);

    } catch (err) {
        console.error(chalk.red('❌ Error:'), err);
        await msg.reply(global.eror).catch(() => {});
    }
});

client.initialize();
