const GLOBAL_SUGGESTIONS = [
  'Is 1win legit?',
  'How does the 500% bonus work?',
  'How fast are withdrawals?',
  'Does 1win have a mobile app?',
] as const;

function uniqueSuggestions(items: string[], max = 4): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of items) {
    const q = String(raw || '').replace(/\s+/g, ' ').trim();
    if (!q) continue;
    const key = q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
    if (out.length >= max) break;
  }
  return out;
}

function pageSlugFromLocation(pathname = location.pathname): string {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/' || p === '/index' || p === '/index.html') return 'index';
  const parts = p.split('/').filter(Boolean);
  if (!parts.length) return 'index';
  return parts[0].replace(/\.html$/i, '');
}

/**
 * Starter chips for an empty chat: page-aware prompts about 1win.
 */
export function getSuggestedQuestions(
  pathname = typeof location !== 'undefined' ? location.pathname : '/'
): string[] {
  const slug = pageSlugFromLocation(pathname);

  if (slug === 'bonuses') {
    return uniqueSuggestions([
      'How does the 500% bonus work?',
      'What are the wagering requirements?',
      'Is there a no-deposit bonus?',
      'How do I claim the welcome package?',
    ]);
  }

  if (slug === 'payments') {
    return uniqueSuggestions([
      'How fast are withdrawals?',
      'Does 1win support crypto?',
      'What is the minimum withdrawal?',
      'How long does KYC take?',
    ]);
  }

  if (slug === 'mobile') {
    return uniqueSuggestions([
      'How do I install the Android APK?',
      'Is there an iOS app?',
      'Can I play in the mobile browser?',
      'Does 1win have a mobile app?',
    ]);
  }

  if (slug === 'games') {
    return uniqueSuggestions([
      'Which 1win slots are worth trying?',
      'What is Aviator RTP?',
      'Does 1win have live casino?',
      'How does the 500% bonus work?',
    ]);
  }

  if (slug === 'safety') {
    return uniqueSuggestions([
      'Is 1win legit?',
      'What license does 1win have?',
      'Is my money safe at 1win?',
      'Does 1win have 2FA?',
    ]);
  }

  if (slug === 'faq') {
    return uniqueSuggestions([
      'How do I register at 1win?',
      'How fast are withdrawals?',
      'How does the 500% bonus work?',
      'Does 1win have a mobile app?',
    ]);
  }

  if (slug === 'responsible-gambling') {
    return uniqueSuggestions([
      'What responsible gambling tools does 1win offer?',
      'How do I set a deposit limit?',
      'How does self-exclusion work?',
      'Is 1win legit?',
    ]);
  }

  return uniqueSuggestions([...GLOBAL_SUGGESTIONS]);
}
