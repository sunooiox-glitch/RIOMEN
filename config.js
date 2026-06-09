import { watchFile, unwatchFile } from 'fs';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

global.pairingNumber = 212773608927;
global.owner = [
  ['33759850405',  'ℝ𝕀𝕆𝕄𝔼ℕ', true],
  ['212773608927', 'ℝ𝕀𝕆𝕄𝔼ℕ', true],
];

global.namebot  = 'ℝ𝕀𝕆𝕄𝔼ℕ';
global.author   = 'ℝ𝕀𝕆𝕄𝔼ℕ';
global.prefix   = '!';
global.source   = 'https://github.com/riomen/whatsapp-bot';

global.wait  = '⏳ Loading... | جاري التحميل';
global.eror  = '❌ Error occurred | وقع خطأ';
global.done  = '✅ Done! | تم بنجاح';

global.stickpack = namebot;
global.stickauth = author;

global.limits = {
    download: 50,
    sticker:  5,
    ai:       100,
};

global.emoji = {
    owner:    '👑',
    admin:    '🛡️',
    member:   '👤',
    bot:      '🤖',
    success:  '✅',
    error:    '❌',
    warning:  '⚠️',
    loading:  '⏳',
    download: '📥',
    sticker:  '🖼️',
    ai:       '🧠',
    music:    '🎵',
    video:    '🎬',
    group:    '👥',
    religion: '🕌',
    fun:      '🎮',
    info:     'ℹ️',
};

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright("Update 'config.js'"));
    import(`${file}?update=${Date.now()}`);
});
