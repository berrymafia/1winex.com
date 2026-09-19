function isRu(): boolean {
  if (typeof document === 'undefined') return false;
  return (document.documentElement.lang || '').toLowerCase().startsWith('ru');
}

const GLOBAL_SUGGESTIONS = [
  'What license does 1win have?',
  'How does the 600% bonus work?',
  'How fast are withdrawals?',
  'Does 1win have a mobile app?',
] as const;

const GLOBAL_SUGGESTIONS_RU = [
  'Какая лицензия у 1win?',
  'Как работает бонус 600%?',
  'Как быстро выводят деньги?',
  'Есть ли у 1win приложение?',
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

export function pageSlugFromLocation(pathname = location.pathname): string {
  const p = pathname.replace(/\/+$/, '') || '/';
  const parts = p.split('/').filter(Boolean);
  if (!parts.length) return 'index';
  let i = 0;
  if (parts[0] === 'ru') i = 1;
  if (!parts[i] || parts[i] === 'index') return 'index';
  let slug = parts[i].replace(/\.html$/i, '');
  if (slug === 'betting') return 'sports';
  if (slug === 'app') return 'mobile';
  if (slug === 'casino') return 'games';
  return slug;
}

/**
 * Starter chips for an empty chat: page-aware prompts about 1win.
 */
export function getSuggestedQuestions(
  pathname = typeof location !== 'undefined' ? location.pathname : '/'
): string[] {
  const slug = pageSlugFromLocation(pathname);
  const ru = isRu();

  if (slug === 'bonuses') {
    return uniqueSuggestions(
      ru
        ? [
            'Как работает бонус 600%?',
            'Какие условия отыгрыша?',
            'Куда вводить WINEX600?',
            'Как получить приветственный бонус?',
          ]
        : [
            'How does the 600% bonus work?',
            'What are the wagering requirements?',
            'Where do I enter WINEX600?',
            'How do I claim the welcome package?',
          ]
    );
  }

  if (slug === 'payments') {
    return uniqueSuggestions(
      ru
        ? [
            'Как быстро выводят деньги?',
            'Поддерживает ли 1win криптовалюту?',
            'Какая минимальная сумма вывода?',
            'Сколько длится проверка KYC?',
          ]
        : [
            'How fast are withdrawals?',
            'Does 1win support crypto?',
            'What is the minimum withdrawal?',
            'How long does KYC take?',
          ]
    );
  }

  if (slug === 'mobile') {
    return uniqueSuggestions(
      ru
        ? [
            'Как установить Android APK?',
            'Есть ли приложение для iOS?',
            'Можно ли играть в мобильном браузере?',
            'Есть ли у 1win приложение?',
          ]
        : [
            'How do I install the Android APK?',
            'Is there an iOS app?',
            'Can I play in the mobile browser?',
            'Does 1win have a mobile app?',
          ]
    );
  }

  if (slug === 'games') {
    return uniqueSuggestions(
      ru
        ? [
            'Какие слоты есть в 1win?',
            'Какой RTP у Aviator?',
            'Есть ли в 1win live-казино?',
            'Как работает бонус 600%?',
          ]
        : [
            'What slots does 1win have?',
            'What is Aviator RTP?',
            'Does 1win have live casino?',
            'How does the 600% bonus work?',
          ]
    );
  }

  if (slug === 'aviator') {
    return uniqueSuggestions(
      ru
        ? [
            'Какой RTP у Aviator?',
            'Aviator — это 1win Original?',
            'Идёт ли Aviator в отыгрыш бонуса?',
            'Что такое автокэшаут в Aviator?',
          ]
        : [
            'What is Aviator RTP?',
            'Is Aviator a 1win Original?',
            'Does Aviator count toward bonus wagering?',
            'What is auto cash-out in Aviator?',
          ]
    );
  }

  if (slug === 'lucky-jet') {
    return uniqueSuggestions(
      ru
        ? [
            'Какой RTP у Lucky Jet?',
            'Lucky Jet — это то же самое, что Aviator?',
            'Идёт ли Lucky Jet в отыгрыш бонуса?',
            'Что такое автокэшаут в Lucky Jet?',
          ]
        : [
            'What is Lucky Jet RTP?',
            'Is Lucky Jet the same as Aviator?',
            'Does Lucky Jet count toward bonus wagering?',
            'What is auto cash-out in Lucky Jet?',
          ]
    );
  }

  if (slug === 'sports') {
    return uniqueSuggestions(
      ru
        ? [
            'Как сделать ставку на спорт в 1win?',
            'Есть ли кэшаут ставок?',
            'Что такое бустер на экспресс?',
            'У бонусов казино и спорта общий баланс?',
          ]
        : [
            'How do I place a 1win sports bet?',
            'Can I cash out a sports bet?',
            'What is Express booster?',
            'Do casino and sports bonuses share a balance?',
          ]
    );
  }

  if (slug === 'safety') {
    return uniqueSuggestions(
      ru
        ? [
            'Какая лицензия у 1win?',
            'Сколько длится проверка KYC?',
            'Надёжно ли хранятся средства в 1win?',
            'Есть ли в 1win 2FA?',
          ]
        : [
            'What license does 1win have?',
            'How long does KYC take?',
            'Is my money safe at 1win?',
            'Does 1win have 2FA?',
          ]
    );
  }

  if (slug === 'faq') {
    return uniqueSuggestions(
      ru
        ? [
            'Как зарегистрироваться в 1win?',
            'Как быстро выводят деньги?',
            'Как работает бонус 600%?',
            'Есть ли у 1win приложение?',
          ]
        : [
            'How do I register at 1win?',
            'How fast are withdrawals?',
            'How does the 600% bonus work?',
            'Does 1win have a mobile app?',
          ]
    );
  }

  if (slug === 'responsible-gambling') {
    return uniqueSuggestions(
      ru
        ? [
            'Какие есть лимиты и самоисключение в 1win?',
            'Как установить лимит на депозит?',
            'Как работает самоисключение?',
            'Какая лицензия у 1win?',
          ]
        : [
            'What responsible gambling tools does 1win offer?',
            'How do I set a deposit limit?',
            'How does self-exclusion work?',
            'What license does 1win have?',
          ]
    );
  }

  return uniqueSuggestions([...(ru ? GLOBAL_SUGGESTIONS_RU : GLOBAL_SUGGESTIONS)]);
}
