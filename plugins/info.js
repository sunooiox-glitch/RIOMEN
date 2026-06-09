import { formatDate } from '../lib/helper.js';

export default {
    commands: ['info', 'about'],

    async execute(client, msg, args, ctx) {
        await msg.reply(
            `🤖 *Bot Info | معلومات البوت*\n\n` +
            `• Name | الاسم: *${global.namebot}*\n` +
            `• Owner | المالك: *${global.author}*\n` +
            `• Prefix | البادئة: *${global.prefix}*\n` +
            `• Version | الإصدار: *1.0.0*\n` +
            `• Library: *whatsapp-web.js*\n` +
            `• Time | الوقت: *${formatDate()}*\n` +
            `• Status | الحالة: *✅ Online*\n\n` +
            `_${global.namebot} — Made with ❤️_`
        );
    }
};
