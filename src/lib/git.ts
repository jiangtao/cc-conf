import simpleGit, { SimpleGit } from 'simple-git';

/**
 * Check if directory is a git repository
 */
export async function isGitRepo(dir: string): Promise<boolean> {
  try {
    const git = simpleGit(dir);
    await git.status();
    return true;
  } catch {
    return false;
  }
}

/**
 * Initialize a new git repository
 */
export async function gitInit(dir: string): Promise<void> {
  const git = simpleGit(dir);
  await git.init();
}

/**
 * Set git config value
 */
export async function gitConfig(dir: string, key: string, value: string): Promise<void> {
  const git = simpleGit(dir);
  await git.addConfig(key, value);
}

/**
 * Add a remote
 */
export async function addRemote(dir: string, name: string, url: string): Promise<void> {
  const git = simpleGit(dir);
  await git.remote(['add', name, url]);
}

/**
 * Pull changes from remote
 */
export async function pull(dir: string): Promise<void> {
  const git = simpleGit(dir);
  await git.pull();
}

/**
 * Add files to staging
 */
export async function add(dir: string, path: string): Promise<void> {
  const git = simpleGit(dir);
  await git.add(path);
}

/**
 * Commit staged changes
 */
export async function commit(dir: string, message: string): Promise<void> {
  const git = simpleGit(dir);
  await git.commit(message);
}

/**
 * Check if there are uncommitted changes
 */
export async function hasChanges(dir: string): Promise<boolean> {
  try {
    const git = simpleGit(dir);
    const status = await git.status();
    return status.files.length > 0;
  } catch {
    return false;
  }
}

/**
 * Push changes to remote
 */
export async function push(dir: string, remote: string): Promise<void> {
  const git = simpleGit(dir);
  await git.push(remote, 'main');
}

/**
 * Check if working directory is clean
 */
export async function isClean(dir: string): Promise<boolean> {
  try {
    const git = simpleGit(dir);
    const status = await git.status();
    return status.files.length === 0;
  } catch {
    return true;
  }
}

/**
 * Get git instance for directory
 */
export function getGit(dir: string): SimpleGit {
  return simpleGit(dir);
}
