import { config } from './config.js';

/**
 * Set up global fetch proxy if HTTPS_PROXY/HTTP_PROXY is configured.
 * Must be called before any @google/genai API calls.
 */
export async function setupProxy() {
  if (!config.proxy) return;

  try {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new ProxyAgent(config.proxy));
  } catch (err) {
    console.error(`Warning: Failed to set up proxy (${config.proxy}): ${err.message}`);
  }
}
