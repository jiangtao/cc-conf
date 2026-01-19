import fs from 'fs-extra';
import path from 'node:path';
import readline from 'node:readline';
import { getClaudeDir } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

/**
 * Restore settings.json
 */
export async function restoreSettings(configDir: string): Promise<void> {
  print(colors.cyan, t('restore.steps.settings'));

  const claudeDir = getClaudeDir();
  const srcPath = path.join(configDir, 'settings.json');
  const dstPath = path.join(claudeDir, 'settings.json');

  // Check if source exists
  if (!(await fs.pathExists(srcPath))) {
    warning(t('backup.warnings.not_found', { item: 'settings.json' }));
    return;
  }

  // Read and parse JSON
  const data = await fs.readJson(srcPath);

  // Check if destination exists and has API token
  let existingToken = '';
  if (await fs.pathExists(dstPath)) {
    try {
      const existingData = await fs.readJson(dstPath);
      if (existingData.env?.ANTHROPIC_AUTH_TOKEN) {
        existingToken = existingData.env.ANTHROPIC_AUTH_TOKEN;
        print(colors.yellow, `  ${t('restore.messages.existing_token')}`);
      }
    } catch {
      // Ignore parse errors
    }
  }

  // Handle API token
  if (existingToken === '') {
    // Check environment variable
    if (process.env.ANTHROPIC_AUTH_TOKEN) {
      existingToken = process.env.ANTHROPIC_AUTH_TOKEN;
      print(colors.yellow, '  Using ANTHROPIC_AUTH_TOKEN from environment');
    }
  }

  if (existingToken === '') {
    // Prompt for token
    const token = await promptToken();
    if (token) {
      existingToken = token;
    }
  }

  // Merge token into settings
  if (existingToken && !data.env) {
    data.env = {};
  }
  if (existingToken) {
    data.env.ANTHROPIC_AUTH_TOKEN = existingToken;
  }

  // Write settings
  await fs.ensureDir(claudeDir);
  await fs.writeJson(dstPath, data, { spaces: 2 });
  success('settings.json restored');
}

/**
 * Prompt user for API token
 */
function promptToken(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(colors.yellow(`  ${t('restore.prompts.api_token')} `), (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
