export default {
    commands: ['owner', 'menu_owner'],
    ownerOnly: false,

    async execute(client, msg, args, ctx) {
        const { isOwner } = ctx;

        if (msg.type === 'list_response' || args.length === 0) {
            return await msg.reply(
                `👑 *Owner Section | قسم المالك*\n\n` +
                `• Name | الاسم: *${global.author}*\n` +
                `• Bot | البوت: *${global.namebot}*\n\n` +
                `📞 *Contact | تواصل:*\n` +
                `  ├ wa.me/33759850405\n` +
                `  └ wa.me/212773608927\n\n` +
                `_Contact the owner for support_ 💬`
            );
        }

        if (!isOwner) {
            return await msg.reply('⛔ *Owner only! | للمالك فقط!*');
        }

        const sub = args[0]?.toLowerCase();

        if (sub === 'restart') {
            await msg.reply('🔄 *Restarting... | جاري إعادة التشغيل...*');
            process.exit(0);
        }

        else if (sub === 'info') {
            await msg.reply(
                `👑 *Owner Commands:*\n\n` +
                `• !owner restart — Restart bot\n` +
                `• !owner info — Show this menu\n`
            );
        }

        else {
            await msg.reply(
                `👑 *Owner Commands:*\n\n` +
                `• !owner restart — Restart bot\n` +
                `• !owner info — Show this menu\n`
            );
        }
    }
};
