import chalk from 'chalk';
import ora, { Ora } from 'ora';
import readline from 'node:readline';

export const colors = {
  cyan: chalk.cyan,
  green: chalk.green,
  yellow: chalk.yellow,
  red: chalk.red,
  gray: chalk.gray,
  blue: chalk.blue,
  magenta: chalk.magenta,
  dim: chalk.dim,
};

/**
 * Print a title with box
 */
export function title(msg: string): void {
  console.log('');
  console.log(colors.cyan(`╔══ ${msg}`));
  console.log(colors.cyan('║'));
}

/**
 * Print success message
 */
export function success(msg: string): void {
  console.log(colors.green(`  ✓ ${msg}`));
}

/**
 * Print warning message
 */
export function warning(msg: string): void {
  console.log(colors.yellow(`  ⚠ ${msg}`));
}

/**
 * Print error message
 */
export function error(msg: string, ...args: unknown[]): void {
  console.error(colors.red(`  ✗ ${msg}`), ...args);
}

/**
 * Print skipped message
 */
export function skipped(msg: string): void {
  console.log(colors.dim(`  ⊝ ${msg}`));
}

/**
 * Print info message with color
 */
export function print(color: typeof chalk, msg: string): void {
  console.log(color(`  ${msg}`));
}

/**
 * Create a spinner
 */
export function createSpinner(text: string): Ora {
  return ora({
    text,
    spinner: 'dots',
    color: 'cyan',
  });
}

/**
 * Prompt user for input
 */
export async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(colors.yellow(`  ${question} `), (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Prompt user for confirmation
 */
export async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(colors.yellow(`  ${question} (y/N): `), (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Format file size
 */
export function formatSize(bytes: number): string {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes >= GB) {
    return `${(bytes / GB).toFixed(1)}GB`;
  }
  if (bytes >= MB) {
    return `${(bytes / MB).toFixed(1)}MB`;
  }
  if (bytes >= KB) {
    return `${(bytes / KB).toFixed(1)}KB`;
  }
  return `${bytes}B`;
}
