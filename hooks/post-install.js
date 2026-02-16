#!/usr/bin/env node

/**
 * Post-install hook: create data directories.
 */

import { mkdirSync } from 'fs';
import { resolve } from 'path';

const HOME = process.env.HOME || '/home/howard';
const dataDir = resolve(HOME, 'zylos/components/imagegen');

mkdirSync(resolve(dataDir, 'output'), { recursive: true });

console.log('[imagegen] Data directories created');
