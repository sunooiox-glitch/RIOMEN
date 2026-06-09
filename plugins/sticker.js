export default {
    commands: ['sticker', 's', 'menu_sticker'],

    async execute(client, msg, args, ctx) {

        if (msg.type === 'list_response') {
            return await msg.reply(
                `🖼️ *Sticker Section | قسم الملصقات*\n\n` +
                `🇬🇧 *Supported:*\n` +
                `• 🖼️ Image → Sticker\n` +
                `• 🎞️ Video (max 7s) → GIF Sticker\n` +
                `• 🎭 GIF → Sticker\n\n` +
                `🇸🇦 *مدعوم:*\n` +
                `• 🖼️ صورة → ملصق\n` +
                `• 🎞️ فيديو (7 ثواني) → ملصق GIF\n` +
                `• 🎭 GIF → ملصق\n\n` +
                `_Usage: Send/Reply with *!s*_`
            );
        }

        const quotedMsg = await msg.getQuotedMessage().catch(() => null);
        const targetMsg = quotedMsg || msg;

        if (!targetMsg.hasMedia) {
            return await msg.reply(
                `❌ *No media found!*\n\n` +
                `📌 Send or reply to:\n` +
                `• 🖼️ Image\n` +
                `• 🎞️ Short video (max 7s)\n` +
                `• 🎭 GIF\n\n` +
                `with *!s*`
            );
        }

        // التحقق من نوع الميديا
        const mime = targetMsg.type;
        const isImage = mime === 'image';
        const isVideo = mime === 'video';
        const isGif   = targetMsg.isGif || false;

        if (!isImage && !isVideo && !isGif) {
            return await msg.reply(
                `❌ *Unsupported format!*\n` +
                `Only images, videos, and GIFs are supported.`
            );
        }

        // التحقق من مدة الفيديو
        if (isVideo && !isGif) {
            const duration = targetMsg._data?.duration || 0;
            if (duration > 7) {
                return await msg.reply(
                    `❌ *Video too long!*\n` +
                    `Maximum duration is *7 seconds*.\n` +
                    `Your video: *${duration}s*`
                );
            }
        }

        await msg.reply(global.wait);

        try {
            const media = await targetMsg.downloadMedia();

            await client.sendMessage(msg.from, media, {
                sendMediaAsSticker: true,
                stickerAuthor: global.stickauth,
                stickerName: global.stickpack,
            });

        } catch (err) {
            console.error('Sticker error:', err);
            await msg.reply(global.eror);
        }
    }
};
