import fs from 'fs-extra';
import path from 'node:path';
import { expandPath } from '../../lib/config.js';
import { success, warning, print, colors } from '../../lib/ui.js';
import { t } from '../../lib/i18n.js';

export interface ProjectsBackupOptions {
  projects?: string[];
  scanDirs?: string[];
  scanAll?: boolean;
}

/**
 * Scan a directory for .claude folders
 */
async function scanDirectory(baseDir: string, configDir: string): Promise<number> {
  let count = 0;

  if (!(await fs.pathExists(baseDir))) {
    return count;
  }

  const entries = await fs.readdir(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      // Check if it's a .claude directory
      if (entry.name === '.claude') {
        const projectPath = path.dirname(fullPath);
        const projectName = path.basename(projectPath);
        const dstPath = path.join(configDir, 'projects', projectName);

        try {
          await fs.copy(projectPath, dstPath, { overwrite: true });
          print(colors.gray, `  ✓ ${projectName}`);
          count++;
        } catch {
          // Skip if copy fails
        }
        // Don't descend into .claude
        continue;
      }

      // Recursively scan subdirectories
      const subCount = await scanDirectory(fullPath, configDir);
      count += subCount;
    }
  }

  return count;
}

/**
 * Backup project configurations
 */
export async function backupProjects(
  configDir: string,
  options: ProjectsBackupOptions = {}
): Promise<void> {
  const dirsToScan = options.projects || options.scanDirs || [];

  if (dirsToScan.length === 0 && !options.scanAll) {
    print(colors.dim, t('backup.steps.projects'));
    return;
  }

  print(colors.cyan, t('backup.steps.projects'));

  const projectsDir = path.join(configDir, 'projects');
  await fs.ensureDir(projectsDir);

  let count = 0;

  for (const dir of dirsToScan) {
    const expandedDir = expandPath(dir);
    const found = await scanDirectory(expandedDir, projectsDir);
    count += found;
  }

  if (count === 0) {
    warning(t('backup.warnings.not_found', { item: 'project configurations' }));
  } else {
    success(t('backup.messages.projects_count', { count }));
  }
}
