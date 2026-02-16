#!/usr/bin/env node

/**
 * Post-upgrade hook: ensure data directories exist.
 */

import { mkdirSync } from 'fs';
import { resolve } from 'path';

const HOME = process.env.HOME || '/home/howard';
const dataDir = resolve(HOME, 'zylos/components/imagegen');

mkdirSync(resolve(dataDir, 'output'), { recursive: true });

console.log('[imagegen] Post-upgrade: OK');
