import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

const HOME = process.env.HOME || '/home/howard';
const ENV_PATH = resolve(HOME, 'zylos/.env');

// Load .env if exists
if (existsSync(ENV_PATH)) {
  const content = readFileSync(ENV_PATH, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

export const config = {
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.IMAGEGEN_MODEL || 'gemini-3-pro-image-preview',
  outputDir: (process.env.IMAGEGEN_OUTPUT_DIR || `${HOME}/zylos/components/imagegen/output`).replace('~', HOME),
  proxy: process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null,
};

export function validateConfig() {
  if (!config.apiKey) {
    console.error('Error: GEMINI_API_KEY not set. Add it to ~/zylos/.env');
    process.exit(1);
  }
}
