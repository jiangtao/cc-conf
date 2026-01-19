import fs from 'fs-extra';
import path from 'node:path';
import { copyFile } from '../../lib/file.js';
import { getClaudeDir } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

export interface SkillsBackupOptions {
  skip?: boolean;
}

/**
 * Backup custom skills
 */
export async function backupSkills(
  configDir: string,
  options: SkillsBackupOptions = {}
): Promise<void> {
  if (options.skip) {
    print(colors.dim, t('backup.steps.skills'));
    return;
  }

  print(colors.cyan, t('backup.steps.skills'));

  const claudeDir = getClaudeDir();
  const srcDir = path.join(claudeDir, 'skills');
  const dstDir = path.join(configDir, 'skills');

  // Check if source exists
  if (!(await fs.pathExists(srcDir))) {
    warning(t('backup.warnings.not_found', { item: 'skills directory' }));
    return;
  }

  // Create destination directory
  await fs.ensureDir(dstDir);

  // Copy all skill files
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

  success(t('backup.messages.skills_count', { count }));
}
