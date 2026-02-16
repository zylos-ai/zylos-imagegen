---
name: imagegen
version: 0.1.0
description: >
  AI image generation using Google Gemini models. Use when the user asks to
  generate, create, draw, or design images, avatars, logos, icons, illustrations,
  or any visual content. Also use when the user asks to edit, modify, transform,
  or enhance existing images with text instructions.
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
      default: "gemini-3-pro-image-preview"
    - name: IMAGEGEN_OUTPUT_DIR
      description: Default output directory for generated images
      default: "~/zylos/components/imagegen/output"

dependencies: []
---

# Image Generation

## Text-to-Image

```bash
node ~/.claude/skills/imagegen/scripts/generate.js --prompt "A cute blue octopus mascot" --output octopus.png
node ~/.claude/skills/imagegen/scripts/generate.js --prompt "Mountain landscape" --count 3
```

Run `node ~/.claude/skills/imagegen/scripts/generate.js --help` for all options.

## Image Editing

```bash
node ~/.claude/skills/imagegen/scripts/edit.js --input photo.png --prompt "Add sunglasses" --output cool.png
```

Run `node ~/.claude/skills/imagegen/scripts/edit.js --help` for all options.

## Notes

- Default model: `gemini-3-pro-image-preview`. Override with `--model` or `IMAGEGEN_MODEL` env var.
- Output defaults to `~/zylos/components/imagegen/output/`. Override with `--dir`.
- Proxy auto-detected from `HTTPS_PROXY`/`HTTP_PROXY`. No proxy needed if direct network access available.
