function isRu(): boolean {
  if (typeof document === 'undefined') return false;
  return (document.documentElement.lang || '').toLowerCase().startsWith('ru');
}

const GLOBAL_SUGGESTIONS = [
  'What license does 1win have?',
  'What does promo code WINEX600 give?',
  'How fast are withdrawals?',
  'How do I download the app?',
] as const;

const GLOBAL_SUGGESTIONS_RU = [
  'Какая лицензия у 1win?',
  'Что даёт промокод WINEX600?',
  'Как быстро выводят деньги?',
  'Как скачать приложение?',
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
            'Что даёт промокод WINEX600?',
            'Какие условия отыгрыша?',
            'Как указать WINEX600?',
            'Как получить приветственный бонус?',
          ]
        : [
            'What does promo code WINEX600 give?',
            'What are the wagering terms?',
            'How do I enter WINEX600?',
            'How do I get the welcome bonus?',
          ]
    );
  }

  if (slug === 'payments') {
    return uniqueSuggestions(
      ru
        ? [
            'Как быстро выводят деньги?',
            'Можно ли пополнить криптой?',
            'Где смотреть лимиты вывода?',
            'Когда просят документы?',
          ]
        : [
            'How fast are withdrawals?',
            'Can I deposit with crypto?',
            'Where do I see withdrawal limits?',
            'When do they ask for documents?',
          ]
    );
  }

  if (slug === 'mobile') {
    return uniqueSuggestions(
      ru
        ? [
            'Как поставить Android APK?',
            'Можно ли зайти с iPhone?',
            'Можно ли открыть 1win в браузере?',
            'Откуда скачивать APK?',
          ]
        : [
            'How do I install the Android APK?',
            'Can I use 1win on iPhone?',
            'Can I open 1win in the browser?',
            'Where should I download the APK?',
          ]
    );
  }

  if (slug === 'games') {
    return uniqueSuggestions(
      ru
        ? [
            'Какие слоты есть в лобби?',
            'Какой RTP у Aviator?',
            'Есть ли живые столы?',
            'Учитываются ли слоты в бонусе?',
          ]
        : [
            'What slots are in the lobby?',
            'What is Aviator RTP?',
            'Are there live tables?',
            'Do slots count toward the bonus?',
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
            'Does Aviator count toward the welcome bonus?',
            'What is auto cash-out in Aviator?',
          ]
    );
  }

  if (slug === 'lucky-jet') {
    return uniqueSuggestions(
      ru
        ? [
            'Какой RTP у Lucky Jet?',
            'Lucky Jet — это то же, что Aviator?',
            'Идёт ли Lucky Jet в отыгрыш бонуса?',
            'Что такое автокэшаут в Lucky Jet?',
          ]
        : [
            'What is Lucky Jet RTP?',
            'Is Lucky Jet the same as Aviator?',
            'Does Lucky Jet count toward the welcome bonus?',
            'What is auto cash-out in Lucky Jet?',
          ]
    );
  }

  if (slug === 'sports') {
    return uniqueSuggestions(
      ru
        ? [
            'Как поставить на спорт?',
            'Есть ли кэшаут?',
            'Что такое бонус на экспресс?',
            'Бонусы казино и спорта на одном балансе?',
          ]
        : [
            'How do I place a sports bet?',
            'Can I cash out a sports bet?',
            'What is the multiple bet bonus?',
            'Do casino and sports bonuses share a balance?',
          ]
    );
  }

  if (slug === 'safety') {
    return uniqueSuggestions(
      ru
        ? [
            'Какая лицензия у 1win?',
            'Когда просят документы?',
            'Как понять, что сайт настоящий?',
            'Как включить 2FA?',
          ]
        : [
            'What license does 1win have?',
            'When do they ask for documents?',
            'How do I know the site is real?',
            'How do I turn on 2FA?',
          ]
    );
  }

  if (slug === 'faq') {
    return uniqueSuggestions(
      ru
        ? [
            'Как зарегистрироваться?',
            'Как быстро выводят деньги?',
            'Что даёт промокод WINEX600?',
            'Как скачать приложение?',
          ]
        : [
            'How do I register?',
            'How fast are withdrawals?',
            'What does promo code WINEX600 give?',
            'How do I download the app?',
          ]
    );
  }

  if (slug === 'responsible-gambling') {
    return uniqueSuggestions(
      ru
        ? [
            'Как поставить лимит или самоисключение?',
            'Как поставить лимит на депозит?',
            'Как работает самоисключение?',
            'Какая лицензия у 1win?',
          ]
        : [
            'How do I set a limit or self-exclusion?',
            'How do I set a deposit limit?',
            'How does self-exclusion work?',
            'What license does 1win have?',
          ]
    );
  }

  if (slug === 'crypto-casino') {
    return uniqueSuggestions(
      ru
        ? [
            'Как внести Bitcoin или USDT?',
            'Нужен ли KYC для крипты?',
            'Что делать, если крипта не пришла?',
            'Бонус действует на крипту?',
          ]
        : [
            'How do I deposit Bitcoin or USDT?',
            'Do I still need KYC for crypto?',
            'What if a crypto deposit did not arrive?',
            'Does the bonus work with crypto?',
          ]
    );
  }

  if (slug === 'not-working') {
    return uniqueSuggestions(
      ru
        ? [
            'Почему 1win не открывается?',
            'Что делать, если сайт не грузится?',
            'Поможет ли приложение?',
            'Как войти, если домен заблокирован?',
          ]
        : [
            'Why is 1win not opening?',
            'What if the site will not load?',
            'Will the app still work?',
            'How do I log in if the domain is blocked?',
          ]
    );
  }

  return uniqueSuggestions([...(ru ? GLOBAL_SUGGESTIONS_RU : GLOBAL_SUGGESTIONS)]);
}
