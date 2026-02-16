import { GoogleGenAI } from '@google/genai';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { config, validateConfig } from './lib/config.js';
import { setupProxy } from './lib/proxy.js';

let ai = null;

async function getClient() {
  if (!ai) {
    await setupProxy();
    ai = new GoogleGenAI({ apiKey: config.apiKey });
  }
  return ai;
}

/**
 * Generate a filename from prompt text.
 */
function slugify(text, maxLen = 40) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLen);
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

/**
 * Generate image(s) from a text prompt.
 *
 * @param {Object} opts
 * @param {string} opts.prompt - Text description
 * @param {string} [opts.output] - Output filename
 * @param {string} [opts.model] - Model override
 * @param {number} [opts.count=1] - Number of variations
 * @param {string} [opts.dir] - Output directory override
 * @returns {Promise<{success: boolean, files: string[], error?: string}>}
 */
export async function generateImage(opts) {
  validateConfig();
  const client = await getClient();
  const model = opts.model || config.model;
  const outDir = opts.dir || config.outputDir;
  const count = opts.count || 1;

  ensureDir(outDir);

  const files = [];
  let lastError = null;

  for (let i = 0; i < count; i++) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: opts.prompt }] }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          const ext = mime.includes('jpeg') ? '.jpg' : '.png';
          const suffix = count > 1 ? `-${i + 1}` : '';
          const filename = opts.output
            ? (count > 1 ? opts.output.replace(/(\.\w+)$/, `${suffix}$1`) : opts.output)
            : `${slugify(opts.prompt)}${suffix}${ext}`;
          const fullPath = resolve(outDir, filename);

          const imgData = Buffer.from(part.inlineData.data, 'base64');
          writeFileSync(fullPath, imgData);
          files.push(fullPath);
          break;
        }
      }
    } catch (err) {
      lastError = err.message || String(err);
    }
  }

  if (files.length === 0) {
    return { success: false, files: [], error: lastError || 'No image data in response' };
  }

  return { success: true, files };
}

/**
 * Edit an existing image based on a text prompt.
 *
 * @param {Object} opts
 * @param {string} opts.input - Path to source image
 * @param {string} opts.prompt - Edit description
 * @param {string} [opts.output] - Output filename
 * @param {string} [opts.model] - Model override
 * @param {string} [opts.dir] - Output directory override
 * @returns {Promise<{success: boolean, files: string[], error?: string}>}
 */
export async function editImage(opts) {
  validateConfig();
  const client = await getClient();
  const model = opts.model || config.model;
  const outDir = opts.dir || config.outputDir;

  ensureDir(outDir);

  const inputPath = resolve(opts.input);
  const imageData = readFileSync(inputPath).toString('base64');
  const inputExt = extname(inputPath).toLowerCase();
  const mimeType = inputExt === '.jpg' || inputExt === '.jpeg' ? 'image/jpeg' : 'image/png';

  try {
    const response = await client.models.generateContent({
      model,
      contents: [{
        role: 'user',
        parts: [
          { text: opts.prompt },
          { inlineData: { data: imageData, mimeType } },
        ],
      }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const outMime = part.inlineData.mimeType || 'image/png';
        const ext = outMime.includes('jpeg') ? '.jpg' : '.png';
        const filename = opts.output || `edit-${basename(inputPath, extname(inputPath))}${ext}`;
        const fullPath = resolve(outDir, filename);

        const imgData = Buffer.from(part.inlineData.data, 'base64');
        writeFileSync(fullPath, imgData);
        return { success: true, files: [fullPath] };
      }
    }

    return { success: false, files: [], error: 'No image data in response' };
  } catch (err) {
    return { success: false, files: [], error: err.message || String(err) };
  }
}
