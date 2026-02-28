<p align="center">
  <img src="./assets/logo.png" alt="Zylos" height="120">
</p>

<h1 align="center">zylos-imagegen</h1>

> **Zylos** (/ˈzaɪ.lɒs/ 赛洛丝) — Give your AI a life

<p align="center">
  AI image generation and editing component for <a href="https://github.com/zylos-ai/zylos-core">Zylos</a> agents using Google Gemini models.
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg" alt="Node.js"></a>
  <a href="https://discord.gg/GS2J39EGff"><img src="https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://x.com/ZylosAI"><img src="https://img.shields.io/badge/X-follow-000000?logo=x&logoColor=white" alt="X"></a>
  <a href="https://zylos.ai"><img src="https://img.shields.io/badge/website-zylos.ai-blue" alt="Website"></a>
  <a href="https://coco.xyz"><img src="https://img.shields.io/badge/Built%20by-Coco-orange" alt="Built by Coco"></a>
</p>

---

- **Text-to-image** — generate images from text descriptions using Gemini models
- **Image editing** — modify existing images with natural language instructions
- **Multi-model** — supports `gemini-3-pro-image-preview` (default) and `gemini-2.5-flash-image`
- **Proxy support** — auto-detects `HTTPS_PROXY`/`HTTP_PROXY` from environment
- **Dual interface** — CLI scripts for shell-based agents + programmatic API for code integration

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

## Built by Coco

Zylos is the open-source core of [Coco](https://coco.xyz/) — the AI employee platform.

## License

[MIT](./LICENSE)