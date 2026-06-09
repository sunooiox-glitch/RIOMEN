export default {
    commands: ['ping', 'test'],

    async execute(client, msg, args, ctx) {
        const start = Date.now();
        await msg.reply(
            `🏓 *Pong!*\n\n` +
            `⚡ Speed: *${Date.now() - start}ms*\n` +
            `🤖 Bot: *${global.namebot}*\n` +
            `✅ Status: *Online*`
        );
    }
};
