import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'node:path';
import { initConfig, setRepo, getRepoPath } from '../lib/config.js';
import { initI18n } from '../lib/i18n.js';
import { title, success, warning, error, print, colors } from '../lib/ui.js';
import { isGitRepo, pull } from '../lib/git.js';
import { t } from '../lib/i18n.js';
import { restoreSettings } from '../core/restore/settings.js';
import { restoreCommands, restoreSkills } from '../core/restore/files.js';
import { restoreCache } from '../core/cache.js';

export const restoreCommand = new Command('restore')
  .description('Restore Claude Code configuration')
  .option('-r, --repo <path>', 'Repository path')
  .option('-l, --lang <lang>', 'Language (en/zh)')
  .option('--no-pull', 'Skip git pull')
  .option('--no-cache', 'Skip cache restore')
  .option('--dry-run', 'Show what would be restored without doing it')
  .action(async (options) => {
    await initConfig(options.lang);
    await initI18n(options.lang);

    title(t('restore.title'));

    if (options.repo) {
      setRepo(options.repo);
    }

    const repoPath = getRepoPath();

    // Ensure repo exists
    if (!(await fs.pathExists(repoPath))) {
      error(t('errors.repo_not_found', { path: repoPath }));
      process.exit(1);
    }

    const configDir = path.join(repoPath, 'config');
    const claudeDir = path.join(process.env.HOME || '.', '.claude');

    // Git pull
    if (options.pull) {
      print(colors.cyan, t('restore.steps.update'));
      const isRepo = await isGitRepo(repoPath);
      if (isRepo) {
        try {
          await pull(repoPath);
        } catch {
          warning('Git pull failed, continuing...');
        }
      }
    } else {
      print(colors.dim, t('restore.steps.update'));
    }

    // Create Claude directories
    print(colors.cyan, t('restore.steps.create_dirs'));
    if (!options.dryRun) {
      await fs.ensureDir(claudeDir);
      await fs.ensureDir(path.join(claudeDir, 'commands'));
      await fs.ensureDir(path.join(claudeDir, 'skills'));
      await fs.ensureDir(path.join(claudeDir, 'plugins'));
    }

    // Restore settings
    if (!options.dryRun) {
      await restoreSettings(configDir);
    }

    // Restore commands
    if (!options.dryRun) {
      await restoreCommands(configDir);
    }

    // Restore skills
    if (!options.dryRun) {
      await restoreSkills(configDir);
    }

    // Restore cache
    if (options.cache) {
      print(colors.cyan, t('restore.steps.cache'));
      const cacheFile = path.join(repoPath, 'cache', 'plugins-cache.tar.gz');
      if (await fs.pathExists(cacheFile)) {
        if (!options.dryRun) {
          try {
            await restoreCache(repoPath);
          } catch {
            warning('Cache restore failed');
          }
        }
      }
    }

    success('Restore complete');
  });
