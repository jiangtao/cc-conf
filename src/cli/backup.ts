import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'node:path';
import { initConfig, setRepo, getRepoPath } from '../lib/config.js';
import { initI18n } from '../lib/i18n.js';
import { title, success, warning, error } from '../lib/ui.js';
import { isGitRepo, add, commit, hasChanges } from '../lib/git.js';
import { t } from '../lib/i18n.js';
import { backupSettings } from '../core/backup/settings.js';
import { backupCommands } from '../core/backup/commands.js';
import { backupSkills } from '../core/backup/skills.js';
import { backupProjects } from '../core/backup/projects.js';

export const backupCommand = new Command('backup')
  .description('Backup Claude Code configuration')
  .option('-r, --repo <path>', 'Repository path')
  .option('-l, --lang <lang>', 'Language (en/zh)')
  .option('--no-settings', 'Skip settings backup')
  .option('--no-commands', 'Skip commands backup')
  .option('--no-skills', 'Skip skills backup')
  .option('--no-commit', 'Skip git commit')
  .action(async (options) => {
    await initConfig(options.lang);
    await initI18n(options.lang);

    title(t('backup.title'));

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

    // Backup settings
    await backupSettings(configDir, { skip: !options.settings });

    // Backup commands
    await backupCommands(configDir, { skip: !options.commands });

    // Backup skills
    await backupSkills(configDir, { skip: !options.skills });

    // Backup projects (from config file)
    const config = await initConfig(options.lang);
    await backupProjects(configDir, {
      projects: config.projects,
      scanDirs: config.scanDirs,
    });

    // Git commit
    if (options.commit && (await isGitRepo(repoPath))) {
      const hasChangesResult = await hasChanges(repoPath);
      if (!hasChangesResult) {
        warning(t('backup.messages.no_changes'));
      } else {
        await add(repoPath, 'config/');
        await commit(repoPath, 'Update config backup');
        success(t('backup.messages.committed'));
      }
    }
  });
