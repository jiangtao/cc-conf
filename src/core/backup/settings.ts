import fs from 'fs-extra';
import path from 'node:path';
import { getClaudeDir } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

export interface SettingsBackupOptions {
  skip?: boolean;
}

/**
 * Backup settings.json, removing sensitive information
 */
export async function backupSettings(
  configDir: string,
  options: SettingsBackupOptions = {}
): Promise<void> {
  if (options.skip) {
    print(colors.dim, t('backup.steps.settings'));
    return;
  }

  print(colors.cyan, t('backup.steps.settings'));

  const claudeDir = getClaudeDir();
  const srcPath = path.join(claudeDir, 'settings.json');
  const dstPath = path.join(configDir, 'settings.json');

  // Check if source exists
  if (!(await fs.pathExists(srcPath))) {
    warning(t('backup.warnings.not_found', { item: 'settings.json' }));
    return;
  }

  // Read and parse JSON
  const data = await fs.readJson(srcPath);

  // Remove sensitive information
  if (data.env) {
    delete data.env.ANTHROPIC_AUTH_TOKEN;
    success(t('backup.messages.settings_removed'));
  }

  // Write cleaned JSON
  await fs.ensureDir(configDir);
  await fs.writeJson(dstPath, data, { spaces: 2 });
}
