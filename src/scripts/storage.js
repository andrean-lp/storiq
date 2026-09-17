/**
 * STORIQ localStorage helpers.
 * API keys and user preferences — never leave the browser.
 */

const PREFIX = 'storiq_';

export function saveApiKey(provider, key) {
  try {
    localStorage.setItem(`${PREFIX}apikey_${provider}`, key);
  } catch (e) {
    console.warn('Gagal menyimpan API key ke localStorage:', e);
  }
}

export function getApiKey(provider) {
  try {
    return localStorage.getItem(`${PREFIX}apikey_${provider}`) || '';
  } catch {
    return '';
  }
}

export function removeApiKey(provider) {
  try {
    localStorage.removeItem(`${PREFIX}apikey_${provider}`);
  } catch (e) {
    console.warn('Gagal menghapus API key dari localStorage:', e);
  }
}

export function getPreferences() {
  try {
    return JSON.parse(localStorage.getItem(`${PREFIX}prefs`) || '{}');
  } catch {
    return {};
  }
}

export function savePreferences(prefs) {
  try {
    const current = getPreferences();
    localStorage.setItem(`${PREFIX}prefs`, JSON.stringify({ ...current, ...prefs }));
  } catch (e) {
    console.warn('Gagal menyimpan preferensi ke localStorage:', e);
  }
}

export function clearAll() {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  } catch (e) {
    console.warn('Gagal menghapus seluruh storage STORIQ:', e);
  }
}
