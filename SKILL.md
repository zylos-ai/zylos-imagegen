---
name: imagegen
version: 0.1.0
description: AI image generation using Google Gemini models (text-to-image and image editing)
type: capability

lifecycle:
  npm: true
  data_dir: ~/zylos/components/imagegen
  hooks:
    post-install: hooks/post-install.js
    pre-upgrade: hooks/pre-upgrade.js
    post-upgrade: hooks/post-upgrade.js
  preserve:
    - config.json
    - output/

upgrade:
  repo: zylos-ai/zylos-imagegen
  branch: main

config:
  required:
    - name: GEMINI_API_KEY
      description: Google AI Studio API key for Gemini image generation
      sensitive: true
  optional:
    - name: IMAGEGEN_MODEL
      description: Gemini model for image generation
      default: "gemini-2.5-flash-image"
    - name: IMAGEGEN_OUTPUT_DIR
      description: Default output directory for generated images
      default: "~/zylos/components/imagegen/output"

dependencies: []
---

# Image Generation

AI image generation component using Google Gemini models. Supports text-to-image generation and image editing.

## Dependencies

- None (only npm packages)

## When to Use

- When the user asks to generate, create, or draw images
- When the user asks to edit, modify, or transform existing images
- When creating avatars, logos, illustrations, or any visual content

## How to Use

### Text-to-Image

```bash
node scripts/generate.js --prompt "A cute blue octopus mascot" --output octopus.png
```

Options:
- `--prompt` (required): Text description of the image to generate
- `--output` (optional): Output filename (default: auto-generated from prompt)
- `--model` (optional): Override model (default: from config or gemini-2.5-flash-image)
- `--count` (optional): Number of variations to generate (default: 1)
- `--dir` (optional): Output directory (default: from config)

### Image Editing

```bash
node scripts/edit.js --input photo.png --prompt "Add sunglasses" --output cool.png
```

Options:
- `--input` (required): Path to the source image
- `--prompt` (required): Description of the edit to make
- `--output` (optional): Output filename (default: auto-generated)
- `--model` (optional): Override model
- `--dir` (optional): Output directory

### Programmatic API

```javascript
import { generateImage, editImage } from './src/index.js';

const result = await generateImage({
  prompt: 'A cute blue octopus',
  output: 'octopus.png',
});

const edited = await editImage({
  input: 'photo.png',
  prompt: 'Add sunglasses',
  output: 'cool.png',
});
```

## Supported Models

- `gemini-2.5-flash-image` (default) - Fast, good quality
- `gemini-3-pro-image-preview` - Higher quality, slower

## Config Location

- Config: `~/zylos/components/imagegen/config.json`
- Output: `~/zylos/components/imagegen/output/`
