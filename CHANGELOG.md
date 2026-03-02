# Changelog

## 0.1.2 (2026-03-02)

- Fix: version field in SKILL.md and package.json now correctly reflects the release version
- Default model changed to `gemini-3-pro-image-preview` (higher quality output)
- SKILL.md optimized per create-skill guidelines
- Script examples use absolute project-level paths

## 0.1.0 (2026-02-16)

- Initial release
- Text-to-image generation via Gemini API
- Image editing (modify existing images with text prompts)
- Proxy support (auto-detect from HTTPS_PROXY/HTTP_PROXY)
- Multi-model support: gemini-2.5-flash-image, gemini-3-pro-image-preview
- CLI scripts: generate.js, edit.js
- Programmatic API: generateImage(), editImage()
