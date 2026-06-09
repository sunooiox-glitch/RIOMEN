import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const plugins = new Map();

export async function loadPlugins() {
    const pluginsPath = join(__dirname, '../plugins');
    const files = readdirSync(pluginsPath).filter(f => f.endsWith('.js'));

    for (const file of files) {
        try {
            const plugin = await import(`../plugins/${file}`);
            const mod = plugin.default;
            if (mod?.commands) {
                for (const cmd of mod.commands) {
                    plugins.set(cmd, mod);
                }
                console.log(chalk.green(`🔌 Loaded: ${file}`));
            }
        } catch (err) {
            console.log(chalk.red(`❌ Failed: ${file}`), err.message);
        }
    }

    console.log(chalk.cyan(`\n✅ ${plugins.size} commands loaded!\n`));
}

export function getPlugin(command) {
    return plugins.get(command.toLowerCase()) || null;
}
