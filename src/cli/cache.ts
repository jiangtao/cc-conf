import { Command } from 'commander';
import { initConfig, getRepoPath } from '../lib/config.js';
import { initI18n } from '../lib/i18n.js';
import { success, error, print, colors } from '../lib/ui.js';
import { t } from '../lib/i18n.js';
import { backupCache, restoreCache, cleanCache } from '../core/cache.js';

export const cacheCommand = new Command('cache')
  .description('Plugin cache management')
  .option('-r, --repo <path>', 'Repository path')
  .option('-l, --lang <lang>', 'Language (en/zh)');

// Backup subcommand
cacheCommand
  .command('backup')
  .description('Backup plugin cache')
  .action(async () => {
    await initConfig();
    await initI18n();

    try {
      await backupCache(getRepoPath());
      success(t('cache.backup.done'));
      print(colors.yellow, t('cache.backup.hint'));
    } catch (err) {
      error((err as Error).message);
      process.exit(1);
    }
  });

// Restore subcommand
cacheCommand
  .command('restore')
  .description('Restore plugin cache')
  .action(async () => {
    await initConfig();
    await initI18n();

    try {
      await restoreCache(getRepoPath());
      success(t('cache.restore.done'));
    } catch (err) {
      error((err as Error).message);
      process.exit(1);
    }
  });

// Clean subcommand
cacheCommand
  .command('clean')
  .description('Clean cache backup files')
  .action(async () => {
    await initConfig();
    await initI18n();

    try {
      await cleanCache(getRepoPath());
    } catch (err) {
      error((err as Error).message);
      process.exit(1);
    }
  });
