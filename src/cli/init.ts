import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { expandPath } from '../lib/config.js';
import { initI18n } from '../lib/i18n.js';
import { title, success } from '../lib/ui.js';
import { gitInit, addRemote } from '../lib/git.js';
import { t } from '../lib/i18n.js';

export const initCommand = new Command('init')
  .description('Initialize config repository')
  .option('-r, --repo <path>', 'Repository path')
  .option('--git-url <url>', 'Git remote URL')
  .option('--no-git', 'Skip git initialization')
  .action(async (options) => {
    await initI18n(options.lang);

    title(t('init.title'));

    let repoPath = options.repo;

    // Prompt for repo path if not provided
    if (!repoPath) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'repo',
          message: t('init.prompts.repo_path'),
          default: '~/cc-config',
        },
      ]);
      repoPath = answers.repo;
    }

    const expandedRepo = expandPath(repoPath);

    // Create repository
    if (!(await fs.pathExists(expandedRepo))) {
      await fs.ensureDir(expandedRepo);
      success(t('init.messages.created'));
    }

    // Initialize git
    if (options.git !== false) {
      const shouldInit =
        options.git === true ||
        (await inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'init',
              message: t('init.prompts.init_git'),
              default: false,
            },
          ])
          .then((a) => a.init));

      if (shouldInit) {
        await gitInit(expandedRepo);
        success(t('init.messages.git_initialized'));

        // Add remote if provided
        if (options.gitUrl) {
          await addRemote(expandedRepo, 'origin', options.gitUrl);
        }
      }
    }
  });
