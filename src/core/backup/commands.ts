import fs from 'fs-extra';
import path from 'node:path';
import { copyFile } from '../../lib/file.js';
import { getClaudeDir } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

export interface CommandsBackupOptions {
  skip?: boolean;
}

/**
 * Backup custom commands
 */
export async function backupCommands(
  configDir: string,
  options: CommandsBackupOptions = {}
): Promise<void> {
  if (options.skip) {
    print(colors.dim, t('backup.steps.commands'));
    return;
  }

  print(colors.cyan, t('backup.steps.commands'));

  const claudeDir = getClaudeDir();
  const srcDir = path.join(claudeDir, 'commands');
  const dstDir = path.join(configDir, 'commands');

  // Check if source exists
  if (!(await fs.pathExists(srcDir))) {
    warning(t('backup.warnings.not_found', { item: 'commands directory' }));
    return;
  }

  // Create destination directory
  await fs.ensureDir(dstDir);

  // Copy all command files
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

  success(t('backup.messages.commands_count', { count }));
}
