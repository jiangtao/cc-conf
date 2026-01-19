import fs from 'fs-extra';

/**
 * Copy a file with permissions
 */
export async function copyFile(src: string, dst: string): Promise<void> {
  await fs.copy(src, dst, { preserveTimestamps: true });
  const srcStat = await fs.stat(src);
  await fs.chmod(dst, srcStat.mode);
}

/**
 * Ensure directory exists
 */
export async function ensureDir(dir: string): Promise<void> {
  await fs.ensureDir(dir);
}

/**
 * Read JSON file
 */
export async function readJson<T = unknown>(file: string): Promise<T> {
  return fs.readJson(file);
}

/**
 * Write JSON file
 */
export async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.writeJson(file, data, { spaces: 2 });
}

/**
 * Check if path exists
 */
export async function pathExists(p: string): Promise<boolean> {
  return fs.pathExists(p);
}

/**
 * Read directory
 */
export async function readdir(dir: string): Promise<string[]> {
  return fs.readdir(dir);
}

/**
 * Get file stats
 */
export async function stat(p: string): Promise<fs.Stats> {
  return fs.stat(p);
}
