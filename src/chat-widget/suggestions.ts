function uiLang(): 'en' | 'ru' | 'es' | 'fr' | 'de' {
  if (typeof document === 'undefined') return 'en';
  const raw = (document.documentElement.lang || '').toLowerCase();
  if (raw.startsWith('ru')) return 'ru';
  if (raw.startsWith('es')) return 'es';
  if (raw.startsWith('fr')) return 'fr';
  if (raw.startsWith('de')) return 'de';
  return 'en';
}

function pick<T>(lang: 'en' | 'ru' | 'es' | 'fr' | 'de', en: T, ru: T, es: T, fr: T, de: T): T {
  if (lang === 'ru') return ru;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  if (lang === 'de') return de;
  return en;
}

const GLOBAL_SUGGESTIONS = [
  'What license does 1win have?',
  'What does WINEX600 give?',
  'How fast are withdrawals?',
  'How do I install the app?',
] as const;

const GLOBAL_SUGGESTIONS_RU = [
  'Какая лицензия у 1win?',
  'Что даёт WINEX600?',
  'Как быстро выводят деньги?',
  'Как поставить приложение?',
] as const;

const GLOBAL_SUGGESTIONS_ES = [
  '¿Qué licencia tiene 1win?',
  '¿Qué da WINEX600?',
  '¿Cuánto tarda un retiro?',
  '¿Cómo instalo la app?',
] as const;

const GLOBAL_SUGGESTIONS_FR = [
  'Quelle licence a 1win ?',
  'Que donne WINEX600 ?',
  'Combien de temps pour un retrait ?',
  'Comment installer l’app ?',
] as const;

const GLOBAL_SUGGESTIONS_DE = [
  'Welche Lizenz hat 1win?',
  'Was bringt WINEX600?',
  'Wie schnell sind Auszahlungen?',
  'Wie installiere ich die App?',
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
  if (parts[0] === 'ru' || parts[0] === 'es' || parts[0] === 'fr' || parts[0] === 'de') i = 1;
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
          'What does WINEX600 give?',
          'What are the wagering terms?',
          'When do I enter WINEX600?',
          'How do I get the welcome bonus?',
        ],
        [
          'Что даёт WINEX600?',
          'Какие условия отыгрыша?',
          'Когда указывать WINEX600?',
          'Как получить приветственный бонус?',
        ],
        [
          '¿Qué da WINEX600?',
          '¿Cuál es el rollover?',
          '¿Cuándo pongo WINEX600?',
          '¿Cómo consigo el bono de bienvenida?',
        ],
        [
          'Que donne WINEX600 ?',
          'Quelles sont les conditions de mise ?',
          'Quand indiquer WINEX600 ?',
          'Comment obtenir le bonus de bienvenue ?',
        ],
        [
          'Was bringt WINEX600?',
          'Welche Umsatzbedingungen gelten?',
          'Wann gebe ich WINEX600 ein?',
          'Wie hole ich den Willkommensbonus?',
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
          'When does KYC come up?',
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
        ],
        [
          'Combien de temps pour un retrait ?',
          'On peut déposer en crypto ?',
          'Où sont les limites de retrait ?',
          'Quand on demande des documents ?',
        ],
        [
          'Wie schnell sind Auszahlungen?',
          'Kann ich mit Krypto einzahlen?',
          'Wo sehe ich Auszahlungslimits?',
          'Wann werden Dokumente verlangt?',
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
          '¿Puedo abrir 1win en el navegador?',
          '¿De dónde descargo el APK?',
        ],
        [
          'Comment installer l’APK Android ?',
          'Comment utiliser 1win sur iPhone ?',
          'On peut ouvrir 1win dans le navigateur ?',
          'D’où télécharger l’APK ?',
        ],
        [
          'Wie installiere ich die Android-APK?',
          'Kann ich 1win auf dem iPhone nutzen?',
          'Kann ich 1win im Browser öffnen?',
          'Wo sollte ich die APK herunterladen?',
        ]
      )
    );
  }

  if (slug === 'games') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What games are in the casino?',
          'Where do I see a game RTP?',
          'Are there live tables?',
          'Do slots count toward the bonus?',
        ],
        [
          'Какие игры есть в казино?',
          'Где смотреть RTP игры?',
          'Есть ли живые столы?',
          'Учитываются ли слоты в бонусе?',
        ],
        [
          '¿Qué juegos hay en el casino?',
          '¿Dónde veo el RTP de un juego?',
          '¿Hay mesas en vivo?',
          '¿Las tragamonedas cuentan para el bono?',
        ],
        [
          'Quels jeux il y a dans le casino ?',
          'Où voir le RTP d’un jeu ?',
          'Il y a des tables en direct ?',
          'Les machines à sous comptent pour le bonus ?',
        ],
        [
          'Welche Spiele gibt es im Casino?',
          'Wo sehe ich den RTP eines Spiels?',
          'Gibt es Live-Tische?',
          'Zählen Slots für den Bonus?',
        ]
      )
    );
  }

  if (slug === 'aviator') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'Where do I see Aviator RTP?',
          'Is Aviator a 1win Original?',
          'Does Aviator count toward the welcome bonus?',
          'What is auto cash-out in Aviator?',
        ],
        [
          'Где смотреть RTP Aviator?',
          'Aviator это 1win Original?',
          'Идёт ли Aviator в отыгрыш бонуса?',
          'Что такое автокэшаут в Aviator?',
        ],
        [
          '¿Dónde veo el RTP de Aviator?',
          '¿Aviator es un 1win Original?',
          '¿Aviator cuenta para el bono de bienvenida?',
          '¿Qué es el retiro automático?',
        ],
        [
          'Où voir le RTP d’Aviator ?',
          'Aviator, c’est un 1win Original ?',
          'Aviator compte pour le bonus de bienvenue ?',
          'C’est quoi l’encaissement automatique ?',
        ],
        [
          'Wo sehe ich den RTP von Aviator?',
          'Ist Aviator ein 1win Original?',
          'Zählt Aviator für den Willkommensbonus?',
          'Was ist Auto-Cashout in Aviator?',
        ]
      )
    );
  }

  if (slug === 'lucky-jet') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'Where do I see Lucky Jet RTP?',
          'Is Lucky Jet the same as Aviator?',
          'Does Lucky Jet count toward the welcome bonus?',
          'What is auto cash-out in Lucky Jet?',
        ],
        [
          'Где смотреть RTP Lucky Jet?',
          'Lucky Jet это то же, что Aviator?',
          'Идёт ли Lucky Jet в отыгрыш бонуса?',
          'Что такое автокэшаут в Lucky Jet?',
        ],
        [
          '¿Dónde veo el RTP de Lucky Jet?',
          '¿Lucky Jet es lo mismo que Aviator?',
          '¿Lucky Jet cuenta para el bono de bienvenida?',
          '¿Qué es el retiro automático?',
        ],
        [
          'Où voir le RTP de Lucky Jet ?',
          'Lucky Jet, c’est le même jeu qu’Aviator ?',
          'Lucky Jet compte pour le bonus de bienvenue ?',
          'C’est quoi l’encaissement automatique ?',
        ],
        [
          'Wo sehe ich den RTP von Lucky Jet?',
          'Ist Lucky Jet dasselbe wie Aviator?',
          'Zählt Lucky Jet für den Willkommensbonus?',
          'Was ist Auto-Cashout in Lucky Jet?',
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
          'Do casino and sports bonuses share a wallet?',
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
        ],
        [
          'Comment parier sur le sport ?',
          'On peut encaisser un pari ?',
          'C’est quoi le bonus combiné ?',
          'Les bonus casino et sport vont ensemble ?',
        ],
        [
          'Wie wette ich auf Sport?',
          'Kann ich eine Sportwette auszahlen?',
          'Was ist der Kombiwetten-Bonus?',
          'Teilen Casino- und Sportboni dasselbe Guthaben?',
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
          'When does KYC come up?',
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
        ],
        [
          'Quelle licence a 1win ?',
          'Quand on demande des documents ?',
          'Comment savoir que c’est le vrai site ?',
          'Comment activer le 2FA ?',
        ],
        [
          'Welche Lizenz hat 1win?',
          'Wann werden Dokumente verlangt?',
          'Wie erkenne ich die echte Seite?',
          'Wie aktiviere ich 2FA?',
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
          'What does WINEX600 give?',
          'How do I install the app?',
        ],
        [
          'Как зарегистрироваться?',
          'Как быстро выводят деньги?',
          'Что даёт WINEX600?',
          'Как поставить приложение?',
        ],
        [
          '¿Cómo me registro?',
          '¿Cuánto tarda un retiro?',
          '¿Qué da WINEX600?',
          '¿Cómo instalo la app?',
        ],
        [
          'Comment s’inscrire ?',
          'Combien de temps pour un retrait ?',
          'Que donne WINEX600 ?',
          'Comment installer l’app ?',
        ],
        [
          'Wie registriere ich mich?',
          'Wie schnell sind Auszahlungen?',
          'Was bringt WINEX600?',
          'Wie installiere ich die App?',
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
          'Where can I get gambling help?',
        ],
        [
          'Как поставить лимит или самоисключение?',
          'Как поставить лимит на депозит?',
          'Как работает самоисключение?',
          'Где получить независимую помощь?',
        ],
        [
          '¿Cómo pongo un límite o la autoexclusión?',
          '¿Cómo pongo un límite de depósito?',
          '¿Cómo funciona la autoexclusión?',
          '¿Dónde pido ayuda con el juego?',
        ],
        [
          'Comment mettre une limite ou l’auto-exclusion ?',
          'Comment mettre une limite de dépôt ?',
          'Comment marche l’auto-exclusion ?',
          'Où demander de l’aide pour le jeu ?',
        ],
        [
          'Wie setze ich ein Limit oder eine Selbstsperre?',
          'Wie setze ich ein Einzahlungslimit?',
          'Wie funktioniert die Selbstsperre?',
          'Wo bekomme ich Hilfe beim Glücksspiel?',
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
          'Does WINEX600 work with crypto?',
        ],
        [
          'Как внести Bitcoin или USDT?',
          'Нужен ли KYC для крипты?',
          'Что делать, если крипта не пришла?',
          'WINEX600 действует на крипту?',
        ],
        [
          '¿Cómo deposito Bitcoin o USDT?',
          '¿Piden KYC si pago con cripto?',
          '¿Qué hago si el depósito cripto no llega?',
          '¿WINEX600 vale con cripto?',
        ],
        [
          'Comment déposer en Bitcoin ou USDT ?',
          'On demande encore le KYC en crypto ?',
          'Que faire si un dépôt crypto n’arrive pas ?',
          'WINEX600 marche avec la crypto ?',
        ],
        [
          'Wie zahle ich mit Bitcoin oder USDT ein?',
          'Brauche ich für Krypto trotzdem KYC?',
          'Was tun, wenn eine Krypto-Einzahlung nicht ankommt?',
          'Gilt WINEX600 auch mit Krypto?',
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
          'Will the app still open?',
          'How do I sign in if the site is blocked?',
        ],
        [
          'Почему 1win не открывается?',
          'Что делать, если сайт не грузится?',
          'Откроется ли приложение?',
          'Как войти, если сайт заблокирован?',
        ],
        [
          '¿Por qué 1win no abre?',
          '¿Qué hago si el sitio no carga?',
          '¿La app abre si el sitio no carga?',
          '¿Cómo entro si el sitio está bloqueado?',
        ],
        [
          'Pourquoi 1win ne s’ouvre pas ?',
          'Que faire si le site ne charge pas ?',
          'L’app s’ouvre si le site ne charge pas ?',
          'Comment me connecter si le site est bloqué ?',
        ],
        [
          'Warum öffnet 1win nicht?',
          'Was tun, wenn die Seite nicht lädt?',
          'Öffnet die App trotzdem?',
          'Wie melde ich mich an, wenn die Seite gesperrt ist?',
        ]
      )
    );
  }

  return uniqueSuggestions([
    ...pick(lang, [...GLOBAL_SUGGESTIONS], [...GLOBAL_SUGGESTIONS_RU], [...GLOBAL_SUGGESTIONS_ES], [...GLOBAL_SUGGESTIONS_FR], [...GLOBAL_SUGGESTIONS_DE]),
  ]);
}
