# zylos-imagegen

AI image generation component for [Zylos](https://github.com/zylos-ai/zylos-core) using Google Gemini models.

## Features

- **Text-to-image**: Generate images from text descriptions
- **Image editing**: Modify existing images with natural language instructions
- **Multi-model**: Support for `gemini-2.5-flash-image` (default) and `gemini-3-pro-image-preview`
- **Proxy support**: Auto-detects `HTTPS_PROXY`/`HTTP_PROXY` from environment
- **Dual interface**: CLI scripts for shell-based agents + programmatic API for code integration

## Install

```bash
zylos add imagegen
```

Or manually:

```bash
cd ~/zylos/.claude/skills
git clone https://github.com/zylos-ai/zylos-imagegen.git imagegen
cd imagegen && npm install
```

## Configuration

Add to `~/zylos/.env`:

```bash
# Required
GEMINI_API_KEY=your_google_ai_studio_api_key

# Optional
IMAGEGEN_MODEL=gemini-3-pro-image-preview    # or gemini-2.5-flash-image
IMAGEGEN_OUTPUT_DIR=~/zylos/components/imagegen/output
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey).

## Usage

### CLI

```bash
# Generate an image
node scripts/generate.js --prompt "A cute blue octopus mascot" --output octopus.png

# Generate multiple variations
node scripts/generate.js --prompt "A mountain landscape" --count 3

# Edit an existing image
node scripts/edit.js --input photo.png --prompt "Add sunglasses" --output cool.png
```

### Programmatic

```javascript
import { generateImage, editImage } from './src/index.js';

const result = await generateImage({
  prompt: 'A cute blue octopus',
  output: 'octopus.png',
});

const edited = await editImage({
  input: 'photo.png',
  prompt: 'Make it a watercolor painting',
});
```

## How It Works

Uses the `@google/genai` SDK to call Google's Gemini image generation models directly. No Gemini CLI or other tools required — just an API key.

For environments behind a proxy, the component automatically configures `undici`'s `ProxyAgent` as the global fetch dispatcher when `HTTPS_PROXY` or `HTTP_PROXY` is set.

## License

MIT
