import { List } from 'whatsapp-web.js';

export default {
    commands: ['menu', 'help', 'start'],

    async execute(client, msg, args, ctx) {

        // اختيار اللغة
        const lang = args[0]?.toLowerCase();

        if (lang === 'en') return sendMenu(msg, 'en');
        if (lang === 'ar') return sendMenu(msg, 'ar');

        // إذا ما حدد لغة — يسأله أولاً
        await msg.reply(
            `🌍 *Choose Language / اختر اللغة*\n\n` +
            `• !menu en — 🇬🇧 English\n` +
            `• !menu ar — 🇸🇦 العربية`
        );
    }
};

async function sendMenu(msg, lang) {
    const isAr = lang === 'ar';

    const list = new List(
        isAr
            ? `『 قائمة الأوامر 🍷 』\n\n*( 🌹 | الأقسام الرئيسية | 🌹 )*\n\n> 𝙊𝙬𝙣𝙚𝙧 : ${global.author}\n> 𝘽𝙤𝙩 : ${global.namebot}`
            : `『 Commands Menu 🍷 』\n\n*( 🌹 | Main Sections | 🌹 )*\n\n> 𝙊𝙬𝙣𝙚𝙧 : ${global.author}\n> 𝘽𝙤𝙩 : ${global.namebot}`,

        isAr ? '📋 اختر القسم' : '📋 Choose Section',

        [
            {
                title: isAr ? '( 🌹 | الأقسام | 🌹 )' : '( 🌹 | Sections | 🌹 )',
                rows: [
                    { id: 'menu_ai',       title: isAr ? '⌁ ـ قسم الذكاء الاصطناعي ،،⌁' : '⌁ AI Section ،،⌁',       description: '🧠 : ﹝ AI ﹞' },
                    { id: 'menu_sticker',  title: isAr ? '⌁ ـ قسم الملصقات ،،⌁'         : '⌁ Sticker Section ،،⌁',  description: '🖼️ : ﹝ Sticker ﹞' },
                    { id: 'menu_download', title: isAr ? '⌁ ـ قسم التحميل ،،⌁'          : '⌁ Download Section ،،⌁', description: '📥 : ﹝ Download ﹞' },
                    { id: 'menu_fun',      title: isAr ? '⌁ ـ قسم الترفيه ،،⌁'          : '⌁ Fun Section ،،⌁',      description: '🎮 : ﹝ Fun ﹞' },
                    { id: 'menu_group',    title: isAr ? '⌁ ـ قسم المجموعة ،،⌁'         : '⌁ Group Section ،،⌁',    description: '👥 : ﹝ Group ﹞' },
                    { id: 'menu_religion', title: isAr ? '⌁ ـ قسم الدين ،،⌁'            : '⌁ Religion Section ،،⌁', description: '🕌 : ﹝ Religion ﹞' },
                    { id: 'menu_sounds',   title: isAr ? '⌁ ـ قسم الاصوات ،،⌁'         : '⌁ Sounds Section ،،⌁',   description: '🎧 : ﹝ Sounds ﹞' },
                    { id: 'menu_admin',    title: isAr ? '⌁ ـ قسم المشرفين ،،⌁'        : '⌁ Admin Section ،،⌁',    description: '🛡️ : ﹝ Admin ﹞' },
                    { id: 'menu_owner',    title: isAr ? '⌁ ـ قسم المالك ،،⌁'           : '⌁ Owner Section ،،⌁',    description: '👑 : ﹝ Owner ﹞' },
                ]
            }
        ],
        `${global.namebot} 🤖`,
        isAr ? '📋 اختر قسماً' : '📋 Select a section'
    );

    await msg.reply(list);
}
