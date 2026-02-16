#!/usr/bin/env node

/**
 * Image editing CLI.
 *
 * Usage:
 *   node scripts/edit.js --input photo.png --prompt "Add sunglasses" [--output cool.png] [--model model] [--dir /path]
 */

import { editImage } from '../src/index.js';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--input' || arg === '-i') args.input = argv[++i];
    else if (arg === '--prompt' || arg === '-p') args.prompt = argv[++i];
    else if (arg === '--output' || arg === '-o') args.output = argv[++i];
    else if (arg === '--model' || arg === '-m') args.model = argv[++i];
    else if (arg === '--dir' || arg === '-d') args.dir = argv[++i];
    else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: edit.js --input image.png --prompt "edit description" [options]

Options:
  --input, -i    Source image path (required)
  --prompt, -p   Description of the edit (required)
  --output, -o   Output filename (default: auto)
  --model, -m    Model name (default: from config)
  --dir, -d      Output directory (default: from config)
  --help, -h     Show this help`);
      process.exit(0);
    }
  }
  return args;
}

const args = parseArgs(process.argv);

if (!args.input) {
  console.error('Error: --input is required');
  process.exit(1);
}
if (!args.prompt) {
  console.error('Error: --prompt is required');
  process.exit(1);
}

const result = await editImage(args);

if (result.success) {
  for (const f of result.files) {
    console.log(f);
  }
} else {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
