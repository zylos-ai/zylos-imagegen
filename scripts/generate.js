#!/usr/bin/env node

/**
 * Text-to-image generation CLI.
 *
 * Usage:
 *   node scripts/generate.js --prompt "A cute blue octopus" [--output name.png] [--model model] [--count 1] [--dir /path]
 */

import { generateImage } from '../src/index.js';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--prompt' || arg === '-p') args.prompt = argv[++i];
    else if (arg === '--output' || arg === '-o') args.output = argv[++i];
    else if (arg === '--model' || arg === '-m') args.model = argv[++i];
    else if (arg === '--count' || arg === '-n') args.count = parseInt(argv[++i], 10);
    else if (arg === '--dir' || arg === '-d') args.dir = argv[++i];
    else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: generate.js --prompt "description" [options]

Options:
  --prompt, -p   Text description of image to generate (required)
  --output, -o   Output filename (default: auto from prompt)
  --model, -m    Model name (default: from config)
  --count, -n    Number of variations (default: 1)
  --dir, -d      Output directory (default: from config)
  --help, -h     Show this help`);
      process.exit(0);
    }
  }
  return args;
}

const args = parseArgs(process.argv);

if (!args.prompt) {
  console.error('Error: --prompt is required');
  process.exit(1);
}

const result = await generateImage(args);

if (result.success) {
  for (const f of result.files) {
    console.log(f);
  }
} else {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
