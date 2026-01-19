import fs from 'fs-extra';
import path from 'node:path';
import * as tar from 'tar';
import { getClaudeDir } from '../lib/config.js';
import { title, success, print, formatSize, colors } from '../lib/ui.js';
import { t } from '../lib/i18n.js';

/**
 * Backup plugin cache to tar.gz file
 */
export async function backupCache(repoPath: string): Promise<void> {
  title(t('cache.backup.title'));

  const claudeDir = getClaudeDir();
  const pluginsCacheDir = path.join(claudeDir, 'plugins', 'cache');
  const cacheDir = path.join(repoPath, 'cache');
  const cacheFile = path.join(cacheDir, 'plugins-cache.tar.gz');

  // Check if source exists
  if (!(await fs.pathExists(pluginsCacheDir))) {
    throw new Error('Plugin cache not found');
  }

  // Create cache directory
  await fs.ensureDir(cacheDir);

  // Show detected plugins
  print(colors.green, t('cache.backup.detected'));
  const entries = await fs.readdir(pluginsCacheDir);
  for (const entry of entries) {
    const entryPath = path.join(pluginsCacheDir, entry);
    const stat = await fs.stat(entryPath);
    if (stat.isDirectory()) {
      print(colors.gray, `  • ${entry} (${formatSize(stat.size)})`);
    }
  }

  // Create tar.gz file
  print(colors.cyan, t('cache.backup.packing'));

  await tar.create(
    {
      gzip: true,
      file: cacheFile,
      cwd: pluginsCacheDir,
    },
    await fs.readdir(pluginsCacheDir)
  );
}

/**
 * Restore plugin cache from tar.gz file
 */
export async function restoreCache(repoPath: string): Promise<void> {
  title(t('cache.restore.title'));

  const claudeDir = getClaudeDir();
  const cacheFile = path.join(repoPath, 'cache', 'plugins-cache.tar.gz');

  // Check if cache file exists
  if (!(await fs.pathExists(cacheFile))) {
    throw new Error('Cache backup not found');
  }

  // Show file info
  const stat = await fs.stat(cacheFile);
  print(colors.green, t('cache.restore.info'));
  print(colors.gray, `  File: ${cacheFile}`);
  print(colors.gray, `  Size: ${formatSize(stat.size)}`);

  // Extract
  print(colors.cyan, t('cache.restore.extracting'));

  const targetDir = path.join(claudeDir, 'plugins');
  await fs.ensureDir(targetDir);

  await tar.extract({
    file: cacheFile,
    cwd: targetDir,
    gzip: true,
  });
}

/**
 * Remove plugin cache backup files
 */
export async function cleanCache(repoPath: string): Promise<void> {
  title(t('cache.clean.title'));

  const cacheDir = path.join(repoPath, 'cache');
  const entries = await fs.readdir(cacheDir);

  print(colors.green, t('cache.clean.files'));
  let totalSize = 0;

  for (const entry of entries) {
    const entryPath = path.join(cacheDir, entry);
    const stat = await fs.stat(entryPath);
    if (!stat.isDirectory()) {
      print(colors.gray, `  • ${entry} (${formatSize(stat.size)})`);
      totalSize += stat.size;
    }
  }

  print(colors.green, t('cache.clean.total', { size: Math.round(totalSize / 1024 / 1024) }));

  // Delete files
  for (const entry of entries) {
    const entryPath = path.join(cacheDir, entry);
    const stat = await fs.stat(entryPath);
    if (!stat.isDirectory()) {
      await fs.remove(entryPath);
    }
  }

  success(t('cache.clean.done'));
}
