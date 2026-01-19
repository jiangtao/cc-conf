import fs from 'fs-extra';
import path from 'node:path';
import { copyFile } from '../../lib/file.js';
import { getClaudeDir } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

/**
 * Restore custom commands
 */
export async function restoreCommands(configDir: string): Promise<void> {
  print(colors.cyan, t('restore.steps.commands'));

  const claudeDir = getClaudeDir();
  const srcDir = path.join(configDir, 'commands');
  const dstDir = path.join(claudeDir, 'commands');

  if (!(await fs.pathExists(srcDir))) {
    warning(t('backup.warnings.not_found', { item: 'commands directory' }));
    return;
  }

  await fs.ensureDir(dstDir);

  const entries = await fs.readdir(srcDir);
  let count = 0;

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry);
    const stat = await fs.stat(srcPath);

    if (stat.isFile()) {
      const dstPath = path.join(dstDir, entry);
      await copyFile(srcPath, dstPath);
      count++;
    }
  }

  success(t('restore.messages.restored', { item: `${count} commands` }));
}

/**
 * Restore custom skills
 */
export async function restoreSkills(configDir: string): Promise<void> {
  print(colors.cyan, t('restore.steps.skills'));

  const claudeDir = getClaudeDir();
  const srcDir = path.join(configDir, 'skills');
  const dstDir = path.join(claudeDir, 'skills');

  if (!(await fs.pathExists(srcDir))) {
    warning(t('backup.warnings.not_found', { item: 'skills directory' }));
    return;
  }

  await fs.ensureDir(dstDir);

  const entries = await fs.readdir(srcDir);
  let count = 0;

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry);
    const stat = await fs.stat(srcPath);

    if (stat.isFile()) {
      const dstPath = path.join(dstDir, entry);
      await copyFile(srcPath, dstPath);
      count++;
    }
  }

  success(t('restore.messages.restored', { item: `${count} skills` }));
}
