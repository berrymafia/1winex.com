function uiLang(): 'en' | 'ru' | 'es' {
  if (typeof document === 'undefined') return 'en';
  const raw = (document.documentElement.lang || '').toLowerCase();
  if (raw.startsWith('ru')) return 'ru';
  if (raw.startsWith('es')) return 'es';
  return 'en';
}

function pick<T>(lang: 'en' | 'ru' | 'es', en: T, ru: T, es: T): T {
  if (lang === 'ru') return ru;
  if (lang === 'es') return es;
  return en;
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

const GLOBAL_SUGGESTIONS_ES = [
  '¿Qué licencia tiene 1win?',
  '¿Qué incluye el código promo WINEX600?',
  '¿Cuánto tarda un retiro?',
  '¿Cómo bajo la app?',
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
  if (parts[0] === 'ru' || parts[0] === 'es') i = 1;
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
  const lang = uiLang();

  if (slug === 'bonuses') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What does promo code WINEX600 give?',
          'What are the wagering terms?',
          'How do I enter WINEX600?',
          'How do I get the welcome bonus?',
        ],
        [
          'Что даёт промокод WINEX600?',
          'Какие условия отыгрыша?',
          'Как указать WINEX600?',
          'Как получить приветственный бонус?',
        ],
        [
          '¿Qué incluye el bono de bienvenida?',
          '¿Cuál es el rollover?',
          '¿Cómo pongo WINEX600?',
          '¿Cuándo dan los giros gratis?',
        ]
      )
    );
  }

  if (slug === 'payments') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How fast are withdrawals?',
          'Can I deposit with crypto?',
          'Where do I see withdrawal limits?',
          'When do they ask for documents?',
        ],
        [
          'Как быстро выводят деньги?',
          'Можно ли пополнить криптой?',
          'Где смотреть лимиты вывода?',
          'Когда просят документы?',
        ],
        [
          '¿Cuánto tarda un retiro?',
          '¿Puedo depositar con cripto?',
          '¿Dónde salen los límites de retiro?',
          '¿Cuándo piden documentos?',
        ]
      )
    );
  }

  if (slug === 'mobile') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I install the Android APK?',
          'Can I use 1win on iPhone?',
          'Can I open 1win in the browser?',
          'Where should I download the APK?',
        ],
        [
          'Как поставить Android APK?',
          'Можно ли зайти с iPhone?',
          'Можно ли открыть 1win в браузере?',
          'Откуда скачивать APK?',
        ],
        [
          '¿Cómo instalo el APK de Android?',
          '¿Cómo uso 1win en iPhone?',
          '¿Puedo jugar sin app, en el navegador?',
          '¿De dónde bajo el APK?',
        ]
      )
    );
  }

  if (slug === 'games') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What slots are in the lobby?',
          'What is Aviator RTP?',
          'Are there live tables?',
          'Do slots count toward the bonus?',
        ],
        [
          'Какие слоты есть в лобби?',
          'Какой RTP у Aviator?',
          'Есть ли живые столы?',
          'Учитываются ли слоты в бонусе?',
        ],
        [
          '¿Qué tragamonedas hay en el lobby?',
          '¿Dónde veo el RTP de un juego?',
          '¿Hay mesas en vivo?',
          '¿Las tragamonedas cuentan para el bono?',
        ]
      )
    );
  }

  if (slug === 'aviator') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What is Aviator RTP?',
          'Is Aviator a 1win Original?',
          'Does Aviator count toward the welcome bonus?',
          'What is auto cash-out in Aviator?',
        ],
        [
          'Какой RTP у Aviator?',
          'Aviator — это 1win Original?',
          'Идёт ли Aviator в отыгрыш бонуса?',
          'Что такое автокэшаут в Aviator?',
        ],
        [
          '¿Dónde veo el RTP de Aviator?',
          '¿Aviator es un 1win Original?',
          '¿Aviator cuenta para el bono de bienvenida?',
          '¿Qué es el retiro automático?',
        ]
      )
    );
  }

  if (slug === 'lucky-jet') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What is Lucky Jet RTP?',
          'Is Lucky Jet the same as Aviator?',
          'Does Lucky Jet count toward the welcome bonus?',
          'What is auto cash-out in Lucky Jet?',
        ],
        [
          'Какой RTP у Lucky Jet?',
          'Lucky Jet — это то же, что Aviator?',
          'Идёт ли Lucky Jet в отыгрыш бонуса?',
          'Что такое автокэшаут в Lucky Jet?',
        ],
        [
          '¿Dónde veo el RTP de Lucky Jet?',
          '¿Lucky Jet es lo mismo que Aviator?',
          '¿Lucky Jet cuenta para el bono de bienvenida?',
          '¿Qué es el retiro automático?',
        ]
      )
    );
  }

  if (slug === 'sports') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I place a sports bet?',
          'Can I cash out a sports bet?',
          'What is the multiple bet bonus?',
          'Do casino and sports bonuses share a balance?',
        ],
        [
          'Как поставить на спорт?',
          'Есть ли кэшаут?',
          'Что такое бонус на экспресс?',
          'Бонусы казино и спорта на одном балансе?',
        ],
        [
          '¿Cómo apuesto al deporte?',
          '¿Hay cash out en 1win?',
          '¿Qué es el bono por combinada?',
          '¿Los bonos de casino y de deporte van juntos?',
        ]
      )
    );
  }

  if (slug === 'safety') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What license does 1win have?',
          'When do they ask for documents?',
          'How do I know the site is real?',
          'How do I turn on 2FA?',
        ],
        [
          'Какая лицензия у 1win?',
          'Когда просят документы?',
          'Как понять, что сайт настоящий?',
          'Как включить 2FA?',
        ],
        [
          '¿Qué licencia tiene 1win?',
          '¿Cuándo piden documentos?',
          '¿Cómo sé que es el sitio de verdad?',
          '¿Cómo activo el 2FA?',
        ]
      )
    );
  }

  if (slug === 'faq') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I register?',
          'How fast are withdrawals?',
          'What does promo code WINEX600 give?',
          'How do I download the app?',
        ],
        [
          'Как зарегистрироваться?',
          'Как быстро выводят деньги?',
          'Что даёт промокод WINEX600?',
          'Как скачать приложение?',
        ],
        [
          '¿Cómo me registro?',
          '¿Cuánto tarda un retiro?',
          '¿Qué incluye el código promo WINEX600?',
          '¿Cómo bajo la app?',
        ]
      )
    );
  }

  if (slug === 'responsible-gambling') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I set a limit or self-exclusion?',
          'How do I set a deposit limit?',
          'How does self-exclusion work?',
          'What license does 1win have?',
        ],
        [
          'Как поставить лимит или самоисключение?',
          'Как поставить лимит на депозит?',
          'Как работает самоисключение?',
          'Какая лицензия у 1win?',
        ],
        [
          '¿Cómo pongo límites de depósito o la autoexclusión?',
          '¿Cómo pongo un límite de depósito?',
          '¿Cómo funciona la autoexclusión?',
          '¿Dónde pido ayuda con el juego?',
        ]
      )
    );
  }

  if (slug === 'crypto-casino') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I deposit Bitcoin or USDT?',
          'Do I still need KYC for crypto?',
          'What if a crypto deposit did not arrive?',
          'Does the bonus work with crypto?',
        ],
        [
          'Как внести Bitcoin или USDT?',
          'Нужен ли KYC для крипты?',
          'Что делать, если крипта не пришла?',
          'Бонус действует на крипту?',
        ],
        [
          '¿Cómo deposito Bitcoin o USDT?',
          '¿Piden KYC si pago con cripto?',
          '¿Qué hago si el depósito cripto no llega?',
          '¿El bono vale con cripto?',
        ]
      )
    );
  }

  if (slug === 'not-working') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'Why is 1win not opening?',
          'What if the site will not load?',
          'Will the app still work?',
          'How do I log in if the domain is blocked?',
        ],
        [
          'Почему 1win не открывается?',
          'Что делать, если сайт не грузится?',
          'Поможет ли приложение?',
          'Как войти, если домен заблокирован?',
        ],
        [
          '¿Por qué 1win no abre?',
          '¿Qué hago si el sitio no carga?',
          '¿La app abre si el sitio no?',
          '¿Cómo entro si el dominio está bloqueado?',
        ]
      )
    );
  }

  return uniqueSuggestions([
    ...pick(lang, [...GLOBAL_SUGGESTIONS], [...GLOBAL_SUGGESTIONS_RU], [...GLOBAL_SUGGESTIONS_ES]),
  ]);
}
