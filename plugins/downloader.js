import { Buttons } from 'whatsapp-web.js';

export default {
    commands: ['yt', 'youtube', 'tt', 'tiktok', 'ig', 'fb', 'menu_download',
               'yt_video', 'yt_audio', 'yt_voice', 'yt_file'],

    // تخزين مؤقت للروابط
    cache: new Map(),

    async execute(client, msg, args, ctx) {

        if (msg.type === 'list_response') {
            return await msg.reply(
                `📥 *Download Section | قسم التحميل*\n\n` +
                `🎬 *YouTube*\n` +
                `• !yt [link]\n\n` +
                `🎵 *TikTok*\n` +
                `• !tt [link]\n\n` +
                `📸 *Instagram*\n` +
                `• !ig [link]\n\n` +
                `👤 *Facebook*\n` +
                `• !fb [link]\n\n` +
                `_Paste the link after the command_ 🔗`
            );
        }

        const command = msg.body.trim().split(/\s+/)[0].slice(1).toLowerCase();
        const url = args[0];
        const from = msg.from;

        // ── اختيار صيغة اليوتيوب ────────────────────────────────────────────
        if (['yt_video', 'yt_audio', 'yt_voice', 'yt_file'].includes(command)) {
            const cachedUrl = this.cache.get(from);
            if (!cachedUrl) return await msg.reply('❌ *Session expired! Send the link again.*');

            await msg.reply(`${global.wait}\n🔗 ${cachedUrl}`);

            try {
                if (command === 'yt_video') {
                    await msg.reply(
                        `🎬 *Downloading Video...*\n` +
                        `_YouTube video download coming soon_ 🚀`
                    );
                }
                else if (command === 'yt_audio') {
                    await msg.reply(
                        `🎵 *Downloading Audio...*\n` +
                        `_MP3 audio download coming soon_ 🚀`
                    );
                }
                else if (command === 'yt_voice') {
                    await msg.reply(
                        `🎧 *Downloading Voice...*\n` +
                        `_Voice message download coming soon_ 🚀`
                    );
                }
                else if (command === 'yt_file') {
                    await msg.reply(
                        `📁 *Downloading File...*\n` +
                        `_File download coming soon_ 🚀`
                    );
                }
                this.cache.delete(from);
            } catch (err) {
                console.error('YT format error:', err);
                await msg.reply(global.eror);
            }
            return;
        }

        // ── التحقق من الرابط ─────────────────────────────────────────────────
        if (!url) {
            return await msg.reply(
                `❌ *No link! | لم تضع رابطاً!*\n\n` +
                `📌 Example:\n` +
                `• !yt https://youtube.com/...\n` +
                `• !tt https://tiktok.com/...\n` +
                `• !ig https://instagram.com/...\n` +
                `• !fb https://facebook.com/...`
            );
        }

        const isValidUrl = (str) => {
            try { new URL(str); return true; }
            catch { return false; }
        };

        if (!isValidUrl(url)) {
            return await msg.reply('❌ *Invalid link! | رابط غير صحيح!*');
        }

        // ── YouTube ──────────────────────────────────────────────────────────
        if (command === 'yt' || command === 'youtube') {
            if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
                return await msg.reply('❌ *Invalid YouTube link!*');
            }

            // حفظ الرابط مؤقتاً
            this.cache.set(from, url);

            // إرسال أزرار الاختيار
            const buttons = new Buttons(
                `🎬 *YouTube Downloader*\n\n🔗 ${url}\n\n_Choose format | اختر الصيغة:_`,
                [
                    { id: 'yt_video', body: '🎬 Video' },
                    { id: 'yt_audio', body: '🎵 Audio' },
                    { id: 'yt_voice', body: '🎧 Voice' },
                    { id: 'yt_file',  body: '📁 File'  },
                ],
                global.namebot,
                '📥 Select format'
            );

            await client.sendMessage(from, buttons);
        }

        // ── TikTok ───────────────────────────────────────────────────────────
        else if (command === 'tt' || command === 'tiktok') {
            if (!url.includes('tiktok.com') && !url.includes('vm.tiktok')) {
                return await msg.reply('❌ *Invalid TikTok link!*');
            }
            await msg.reply(`${global.wait}\n🔗 ${url}`);
            await msg.reply(`🎵 *TikTok Downloader*\n\n⚠️ *Coming soon!* 🚀`);
        }

        // ── Instagram ────────────────────────────────────────────────────────
        else if (command === 'ig') {
            if (!url.includes('instagram.com')) {
                return await msg.reply('❌ *Invalid Instagram link!*');
            }
            await msg.reply(`${global.wait}\n🔗 ${url}`);
            await msg.reply(`📸 *Instagram Downloader*\n\n⚠️ *Coming soon!* 🚀`);
        }

        // ── Facebook ─────────────────────────────────────────────────────────
        else if (command === 'fb') {
            if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
                return await msg.reply('❌ *Invalid Facebook link!*');
            }
            await msg.reply(`${global.wait}\n🔗 ${url}`);
            await msg.reply(`👤 *Facebook Downloader*\n\n⚠️ *Coming soon!* 🚀`);
        }
    }
};
