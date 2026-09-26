function uiLang(): 'en' | 'ru' | 'es' | 'fr' | 'de' | 'uk' | 'it' | 'az' | 'bn' | 'hi' | 'fil' {
  if (typeof document === 'undefined') return 'en';
  const raw = (document.documentElement.lang || '').toLowerCase();
  if (raw.startsWith('uk')) return 'uk';
  if (raw.startsWith('ru')) return 'ru';
  if (raw.startsWith('es')) return 'es';
  if (raw.startsWith('fr')) return 'fr';
  if (raw.startsWith('de')) return 'de';
  if (raw.startsWith('it')) return 'it';
  if (raw.startsWith('az')) return 'az';
  if (raw.startsWith('bn')) return 'bn';
  if (raw.startsWith('hi')) return 'hi';
  if (raw.startsWith('fil') || raw.startsWith('tl')) return 'fil';
  return 'en';
}

function pick<T>(
  lang: 'en' | 'ru' | 'es' | 'fr' | 'de' | 'uk' | 'it' | 'az' | 'bn' | 'hi' | 'fil',
  en: T,
  ru: T,
  es: T,
  fr: T,
  de: T,
  uk: T,
  it: T,
  az: T,
  bn: T
): T {
  if (lang === 'bn') return bn;
  if (lang === 'az') return az;
  if (lang === 'it') return it;
  if (lang === 'uk') return uk;
  if (lang === 'ru') return ru;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  if (lang === 'de') return de;
  return en;
}

const GLOBAL_SUGGESTIONS = [
  'What license does 1win have?',
  'What does WINEX600 offer?',
  'How fast are withdrawals?',
  'How do I install the app?',
] as const;

const GLOBAL_SUGGESTIONS_RU = [
  'Какая лицензия у 1win?',
  'Что входит в WINEX600?',
  'Сколько времени занимает вывод?',
  'Как установить приложение?',
] as const;

const GLOBAL_SUGGESTIONS_ES = [
  '¿Qué licencia tiene 1win?',
  '¿Qué incluye WINEX600?',
  '¿Cuánto tarda un retiro?',
  '¿Cómo instalo la app?',
] as const;

const GLOBAL_SUGGESTIONS_FR = [
  'Quelle licence a 1win ?',
  'Que contient WINEX600 ?',
  'Combien de temps pour un retrait ?',
  'Comment installer l’app ?',
] as const;

const GLOBAL_SUGGESTIONS_DE = [
  'Welche Lizenz hat 1win?',
  'Was gehört zu WINEX600?',
  'Wie schnell kommt die Auszahlung?',
  'Wie installiere ich die App?',
] as const;

const GLOBAL_SUGGESTIONS_UK = [
  'Яка ліцензія у 1win?',
  'Що входить у WINEX600?',
  'Скільки часу триває виведення?',
  'Як установити додаток?',
] as const;

const GLOBAL_SUGGESTIONS_IT = [
  'Che licenza ha 1win?',
  'Cosa include WINEX600?',
  'Quanto ci mette un prelievo?',
  'Come installo l’app?',
] as const;

const GLOBAL_SUGGESTIONS_AZ = [
  '1win hansı lisenziyaya malikdir?',
  'WINEX600-ə nə daxildir?',
  'Çıxarış nə qədər vaxt aparır?',
  'Tətbiqi necə quraşdırmaq olar?',
] as const;

const GLOBAL_SUGGESTIONS_BN = [
  '1win-এর লাইসেন্স কী?',
  'WINEX600-এ কী পাব?',
  'টাকা তুলতে কত সময় লাগে?',
  'অ্যাপ কীভাবে ইনস্টল করব?',
] as const;

const GLOBAL_SUGGESTIONS_HI = [
  '1win का लाइसेंस क्या है?',
  'WINEX600 में क्या मिलता है?',
  'निकासी में कितना समय लगता है?',
  'ऐप कैसे इंस्टॉल करें?',
] as const;

const GLOBAL_SUGGESTIONS_FIL = [
  'Anong lisensya mayroon ang 1win?',
  'Ano ang kasama sa WINEX600?',
  'Gaano katagal ang pag-withdraw?',
  'Paano i-install ang app?',
] as const;

const HI_SUGGESTIONS: Record<string, readonly string[]> = {
  bonuses: [
    'WINEX600 में क्या मिलता है?',
    'वेजरिंग की शर्तें क्या हैं?',
    'WINEX600 कब डालें?',
    'वेलकम बोनस कैसे पाएँ?',
  ],
  payments: [
    'निकासी में कितना समय लगता है?',
    'कौन से भुगतान तरीके हैं?',
    'KYC कब माँगा जाता है?',
    'डिपॉजिट नहीं पहुँचा तो क्या करें?',
  ],
  mobile: [
    'ऐप कैसे इंस्टॉल करें?',
    'Android APK कहाँ से डाउनलोड करें?',
    'iPhone पर 1win कैसे खोलें?',
    'ऐप और ब्राउज़र में क्या फर्क है?',
  ],
  games: [
    '1win पर कौन से गेम हैं?',
    'Aviator और Lucky Jet में क्या फर्क है?',
    'लाइव कैसीनो कैसे काम करता है?',
    'RTP का मतलब क्या है?',
  ],
  aviator: [
    'Aviator कैसे खेलें?',
    'Aviator किसका गेम है?',
    'कैश आउट कैसे करें?',
    'Aviator में बोनस लगता है?',
  ],
  'lucky-jet': [
    'Lucky Jet कैसे खेलें?',
    'Lucky Jet 1win Original है?',
    'कैश आउट कैसे करें?',
    'Lucky Jet और Aviator में क्या फर्क है?',
  ],
  sports: [
    'स्पोर्ट्स बेट कैसे लगाएँ?',
    'लाइव बेटिंग कैसे काम करती है?',
    'कैश आउट कब मिलता है?',
    'स्पोर्ट्स बोनस अलग है?',
  ],
  safety: [
    '1win का लाइसेंस क्या है?',
    '2FA कैसे चालू करें?',
    'फ़िशिंग कैसे पहचानें?',
    'KYC दस्तावेज़ कहाँ अपलोड करें?',
  ],
  faq: [
    '1win का लाइसेंस क्या है?',
    'WINEX600 में क्या मिलता है?',
    'निकासी में कितना समय लगता है?',
    'ऐप कैसे इंस्टॉल करें?',
  ],
  'responsible-gambling': [
    'डिपॉजिट लिमिट कैसे लगाएँ?',
    'सेल्फ-एक्सक्लूजन कैसे करें?',
    'मदद कहाँ मिलेगी?',
    'जुआ बंद कैसे करें?',
  ],
  'crypto-casino': [
    'कौन सी क्रिप्टो चलती है?',
    'क्या क्रिप्टो इस्तेमाल करने पर KYC से बच सकते हैं?',
    'USDT डिपॉजिट कैसे करें?',
    'क्रिप्टो निकासी कितनी देर में होती है?',
  ],
  'not-working': [
    '1win क्यों नहीं खुल रहा?',
    'साइट न खुले तो क्या करें?',
    'साइट बंद हो तो ऐप चलेगा?',
    'ब्लॉक होने पर लॉगिन कैसे करें?',
  ],
};

const FIL_SUGGESTIONS: Record<string, readonly string[]> = {
  bonuses: [
    'Ano ang kasama sa WINEX600?',
    'Ano ang mga tuntunin sa wagering?',
    'Kailan ilalagay ang WINEX600?',
    'Paano makuha ang welcome bonus?',
  ],
  payments: [
    'Gaano katagal ang pag-withdraw?',
    'Anong mga paraan ng pagbabayad ang available?',
    'Kailan hinihingi ang KYC?',
    'Ano ang gagawin kung hindi dumating ang deposito?',
  ],
  mobile: [
    'Paano i-install ang app?',
    'Saan i-download ang Android APK?',
    'Paano buksan ang 1win sa iPhone?',
    'Ano ang pagkakaiba ng app at browser?',
  ],
  games: [
    'Anong mga laro ang nasa 1win?',
    'Ano ang pagkakaiba ng Aviator at Lucky Jet?',
    'Paano gumagana ang live casino?',
    'Ano ang ibig sabihin ng RTP?',
  ],
  aviator: [
    'Paano laruin ang Aviator?',
    'Kaninong laro ang Aviator?',
    'Paano mag-cash out?',
    'Puwede bang gamitin ang bonus sa Aviator?',
  ],
  'lucky-jet': [
    'Paano laruin ang Lucky Jet?',
    '1win Original ba ang Lucky Jet?',
    'Paano mag-cash out?',
    'Ano ang pagkakaiba ng Lucky Jet at Aviator?',
  ],
  sports: [
    'Paano tumaya sa sports?',
    'Paano gumagana ang live betting?',
    'Kailan available ang cash out?',
    'Hiwalay ba ang sports bonus?',
  ],
  safety: [
    'Anong lisensya mayroon ang 1win?',
    'Paano i-on ang 2FA?',
    'Paano makilala ang phishing?',
    'Saan i-upload ang mga dokumento ng KYC?',
  ],
  faq: [
    'Anong lisensya mayroon ang 1win?',
    'Ano ang kasama sa WINEX600?',
    'Gaano katagal ang pag-withdraw?',
    'Paano i-install ang app?',
  ],
  'responsible-gambling': [
    'Paano magtakda ng limitasyon sa deposito?',
    'Paano mag-self-exclude?',
    'Saan humingi ng tulong?',
    'Paano ihinto ang pagsusugal?',
  ],
  'crypto-casino': [
    'Aling crypto ang tinatanggap?',
    'Nalalampasan ba ng crypto ang KYC?',
    'Paano magdeposito ng USDT?',
    'Gaano katagal ang pag-withdraw ng crypto?',
  ],
  'not-working': [
    'Bakit hindi bumubukas ang 1win?',
    'Ano ang gagawin kung hindi mag-load ang site?',
    'Gagana ba ang app kung hindi bumubukas ang site?',
    'Paano mag-login kung naka-block ang site?',
  ],
};

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
  if (parts[0] === 'ru' || parts[0] === 'es' || parts[0] === 'fr' || parts[0] === 'de' || parts[0] === 'uk' || parts[0] === 'it' || parts[0] === 'az' || parts[0] === 'bn' || parts[0] === 'hi' || parts[0] === 'fil') i = 1;
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

  if (lang === 'hi') {
    return uniqueSuggestions([...(HI_SUGGESTIONS[slug] ?? GLOBAL_SUGGESTIONS_HI)]);
  }

  if (lang === 'fil') {
    return uniqueSuggestions([...(FIL_SUGGESTIONS[slug] ?? GLOBAL_SUGGESTIONS_FIL)]);
  }

  if (slug === 'bonuses') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'What does WINEX600 offer?',
          'What are the wagering terms?',
          'When do I enter WINEX600?',
          'How do I get the welcome bonus?',
        ],
        [
          'Что входит в приветственный бонус?',
          'Какие условия отыгрыша?',
          'Как ввести WINEX600?',
          'Как активировать WINEX600?',
        ],
        [
          '¿Qué incluye el bono de bienvenida?',
          '¿Cuál es el rollover?',
          '¿Cómo introduzco WINEX600?',
          '¿Cómo activo WINEX600?',
        ],
        [
          'Que comprend le bonus de bienvenue ?',
          'Quelles sont les conditions de mise ?',
          'Comment saisir WINEX600 ?',
          'Comment activer WINEX600 ?',
        ],
        [
          'Was gehört zum Willkommensbonus?',
          'Welche Umsatzbedingungen gelten?',
          'Wann gebe ich WINEX600 ein?',
          'Wie aktiviere ich WINEX600?',
        ],
        [
          'Що входить у вітальний бонус?',
          'Які умови відіграшу?',
          'Як ввести WINEX600?',
          'Як активувати WINEX600?',
        ],
        [
          'Cosa include il bonus di benvenuto?',
          'Quali sono i requisiti di scommessa?',
          'Come inserisco WINEX600?',
          'Come attivo WINEX600?',
        ],
        [
          'Xoş gəldin bonusuna nə daxildir?',
          'Oynatma şərtləri hansılardır?',
          'WINEX600 kodunu harada daxil etməliyəm?',
          'WINEX600 bonusunu necə aktivləşdirmək olar?',
        ],
        [
          'WINEX600-এ কী পাব?',
          'ওয়েজারের শর্ত কী?',
          'WINEX600 কোথায় লিখব?',
          'স্বাগতম বোনাস কীভাবে পাব?',
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
          'Сколько времени занимает вывод?',
          'Можно ли пополнить криптой?',
          'Где проверить лимиты вывода?',
          'Когда просят документы?',
        ],
        [
          '¿Cuánto tarda un retiro?',
          '¿Puedo depositar con cripto?',
          '¿Dónde veo los límites de retiro?',
          '¿Cuándo piden documentos?',
        ],
        [
          'Combien de temps pour un retrait ?',
          'Peut-on déposer en crypto ?',
          'Où voir les limites de retrait ?',
          'Quand demande-t-on des documents ?',
        ],
        [
          'Wie schnell kommt die Auszahlung?',
          'Kann ich mit Krypto einzahlen?',
          'Wo sehe ich Auszahlungslimits?',
          'Wann werden Dokumente verlangt?',
        ],
        [
          'Скільки часу триває виведення?',
          'Чи можна поповнити криптою?',
          'Де перевірити ліміти виведення?',
          'Коли просять документи?',
        ],
        [
          'Quanto ci mette un prelievo?',
          'Posso depositare in crypto?',
          'Dove vedo i limiti di prelievo?',
          'Quando chiedono il KYC?',
        ],
        [
          'Çıxarış nə qədər vaxt aparır?',
          'Hesabı kriptovalyuta ilə doldurmaq olar?',
          'Çıxarış limitlərinə harada baxmaq olar?',
          'Sənədləri nə vaxt istəyirlər?',
        ],
        [
          'টাকা তুলতে কত সময় লাগে?',
          'ক্রিপ্টো দিয়ে কি ডিপোজিট করা যায়?',
          'উইথড্রয়াল সীমা কোথায় দেখব?',
          'KYC কখন লাগে?',
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
          'Как установить Android APK?',
          'Как играть в 1win на iPhone?',
          'Можно ли играть без приложения — через браузер?',
          'Где скачать APK?',
        ],
        [
          '¿Cómo instalo el APK de Android?',
          '¿Cómo juego en 1win en iPhone?',
          '¿Puedo jugar sin app — en el navegador?',
          '¿De dónde descargo el APK?',
        ],
        [
          'Comment installer l’APK Android ?',
          'Comment jouer à 1win sur iPhone ?',
          'Peut-on jouer sans app dans le navigateur ?',
          'D’où télécharger l’APK ?',
        ],
        [
          'Wie installiere ich die Android-APK?',
          'Wie spiele ich 1win auf dem iPhone?',
          'Kann ich ohne App im Browser spielen?',
          'Wo lade ich die APK herunter?',
        ],
        [
          'Як установити Android APK?',
          'Як грати в 1win на iPhone?',
          'Чи можна грати без додатка — через браузер?',
          'Де завантажити APK?',
        ],
        [
          'Come installo l’APK Android?',
          'Come uso 1win su iPhone?',
          'Posso giocare senza app, nel browser?',
          'Dove scarico l’APK?',
        ],
        [
          'Android APK-nı necə quraşdırmaq olar?',
          'iPhone-da 1win-i necə oynamaq olar?',
          'Tətbiqsiz — brauzerdən oynamaq olar?',
          'APK-nı haradan yükləmək olar?',
        ],
        [
          'Android APK কীভাবে ইনস্টল করব?',
          'iPhone-এ 1win চলে?',
          'ব্রাউজারেও কি 1win খোলা যায়?',
          'APK কোথা থেকে ডাউনলোড করব?',
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
          'Где проверить RTP игры?',
          'Есть ли живые столы?',
          'Учитываются ли ставки в слотах при отыгрыше приветственного бонуса?',
        ],
        [
          '¿Qué juegos hay en el casino?',
          '¿Dónde veo el RTP de un juego?',
          '¿Hay mesas en vivo?',
          '¿Las tragamonedas cuentan para el bono?',
        ],
        [
          'Quels jeux y a-t-il dans le casino ?',
          'Où voir le RTP d’un jeu ?',
          'Y a-t-il des tables en direct ?',
          'Les machines à sous comptent pour le bonus ?',
        ],
        [
          'Welche Spiele gibt es im Casino?',
          'Wo sehe ich den RTP eines Spiels?',
          'Gibt es Live-Tische?',
          'Zählen Slots für den Willkommensbonus?',
        ],
        [
          'Які ігри є в казино?',
          'Де перевірити RTP гри?',
          'Чи є живі столи?',
          'Чи враховуються ставки в слотах у відіграші вітального бонусу?',
        ],
        [
          'Quali giochi ci sono nel casinò?',
          'Dove vedo l’RTP di un gioco?',
          'Ci sono tavoli live?',
          'Le slot contano per il bonus di benvenuto?',
        ],
        [
          'Kazinoda hansı oyunlar var?',
          'Oyunun RTP-sinə harada baxmaq olar?',
          'Canlı masalar varmı?',
          'Slotlar xoş gəldin bonusuna sayılır?',
        ],
        [
          'ক্যাসিনোতে কী কী গেম আছে?',
          'গেমের RTP কোথায় দেখব?',
          'লাইভ টেবিল আছে?',
          'স্লট কি বোনাস ওয়েজারিংয়ে গণনা হয়?',
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
          'Где проверить RTP Aviator?',
          'Aviator — это 1win Original?',
          'Учитываются ли ставки в Aviator при отыгрыше приветственного бонуса?',
          'Что такое автокэшаут в Aviator?',
        ],
        [
          '¿Dónde veo el RTP de Aviator?',
          '¿Aviator es un 1win Original?',
          '¿Aviator cuenta para el bono de bienvenida?',
          '¿Qué es el cobro automático en Aviator?',
        ],
        [
          'Où voir le RTP d’Aviator ?',
          'Aviator, c’est un 1win Original ?',
          'Aviator compte pour le bonus de bienvenue ?',
          'Qu’est-ce que l’encaissement automatique ?',
        ],
        [
          'Wo sehe ich den RTP von Aviator?',
          'Ist Aviator ein 1win Original?',
          'Zählt Aviator für den Willkommensbonus?',
          'Was ist Auto-Cashout in Aviator?',
        ],
        [
          'Де перевірити RTP Aviator?',
          'Aviator — це 1win Original?',
          'Чи враховуються ставки в Aviator у відіграші вітального бонусу?',
          'Що таке автокешаут Aviator?',
        ],
        [
          'Dove vedo l’RTP di Aviator?',
          'Aviator è un 1win Original?',
          'Aviator conta per il bonus di benvenuto?',
          'Cos’è l’incasso automatico in Aviator?',
        ],
        [
          'Aviator-un RTP-sinə harada baxmaq olar?',
          'Aviator 1win Original-dır?',
          'Aviator xoş gəldin bonusuna sayılır?',
          'Aviator-da avto cash-out nədir?',
        ],
        [
          'Aviator-এর RTP কোথায় দেখব?',
          'Aviator কি 1win Original?',
          'Aviator কি বোনাস ওয়েজারিংয়ে গণনা হয়?',
          'Aviator-এ অটো ক্যাশ-আউট কী?',
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
          'Где проверить RTP Lucky Jet?',
          'Lucky Jet — это то же, что Aviator?',
          'Учитываются ли ставки в Lucky Jet при отыгрыше приветственного бонуса?',
          'Что такое автокэшаут в Lucky Jet?',
        ],
        [
          '¿Dónde veo el RTP de Lucky Jet?',
          '¿Lucky Jet es lo mismo que Aviator?',
          '¿Lucky Jet cuenta para el bono de bienvenida?',
          '¿Qué es el cobro automático en Lucky Jet?',
        ],
        [
          'Où voir le RTP de Lucky Jet ?',
          'Lucky Jet, c’est le même jeu qu’Aviator ?',
          'Lucky Jet compte pour le bonus de bienvenue ?',
          'Qu’est-ce que l’encaissement automatique ?',
        ],
        [
          'Wo sehe ich den RTP von Lucky Jet?',
          'Ist Lucky Jet dasselbe wie Aviator?',
          'Zählt Lucky Jet für den Willkommensbonus?',
          'Was ist Auto-Cashout in Lucky Jet?',
        ],
        [
          'Де перевірити RTP Lucky Jet?',
          'Lucky Jet — це те саме, що Aviator?',
          'Чи враховуються ставки в Lucky Jet у відіграші вітального бонусу?',
          'Що таке автокешаут Lucky Jet?',
        ],
        [
          'Dove vedo l’RTP di Lucky Jet?',
          'Lucky Jet è lo stesso di Aviator?',
          'Lucky Jet conta per il bonus di benvenuto?',
          'Cos’è l’incasso automatico in Lucky Jet?',
        ],
        [
          'Lucky Jet-in RTP-sinə harada baxmaq olar?',
          'Lucky Jet Aviator ilə eynidir?',
          'Lucky Jet xoş gəldin bonusuna sayılır?',
          'Lucky Jet-də avto cash-out nədir?',
        ],
        [
          'Lucky Jet-এর RTP কোথায় দেখব?',
          'Lucky Jet আর Aviator কি একই?',
          'Lucky Jet কি বোনাস ওয়েজারিংয়ে গণনা হয়?',
          'Lucky Jet-এ অটো ক্যাশ-আউট কী?',
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
          'Peut-on encaisser un pari ?',
          'Qu’est-ce que le bonus sur les paris combinés ?',
          'Les bonus casino et sport vont ensemble ?',
        ],
        [
          'Wie wette ich auf Sport?',
          'Gibt es Cash-out?',
          'Was ist der Kombiwetten-Bonus?',
          'Laufen Casino- und Sportboni auf demselben Guthaben?',
        ],
        [
          'Як зробити ставку на спорт?',
          'Чи є кешаут?',
          'Що таке бонус на експрес?',
          'Чи зараховуються бонуси казино й спорту на один баланс?',
        ],
        [
          'Come scommetto sullo sport?',
          'C’è il cash-out su 1win?',
          'Cos’è il bonus sulle scommesse multiple?',
          'I bonus casinò e sport condividono lo stesso saldo?',
        ],
        [
          'İdmana necə mərc etmək olar?',
          'Cash-out varmı?',
          'Ekspress bonusu nədir?',
          'Kazino və idman bonusları eyni balansdadır?',
        ],
        [
          'স্পোর্টসে কীভাবে বাজি ধরব?',
          'স্পোর্টস বেটে ক্যাশ-আউট করা যায়?',
          'মাল্টিপল বেট বোনাস কী?',
          'ক্যাসিনো ও স্পোর্টস বোনাস কি একই ব্যালেন্স ব্যবহার করে?',
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
          'Quand demande-t-on des documents ?',
          'Comment savoir que c’est le vrai site ?',
          'Comment activer le 2FA ?',
        ],
        [
          'Welche Lizenz hat 1win?',
          'Wann werden Dokumente verlangt?',
          'Wie erkenne ich die echte 1win-Seite?',
          'Wie aktiviere ich 2FA?',
        ],
        [
          'Яка ліцензія у 1win?',
          'Коли просять документи?',
          'Як зрозуміти, що це справжній сайт 1win?',
          'Як увімкнути 2FA?',
        ],
        [
          'Che licenza ha 1win?',
          'Quando chiedono i documenti?',
          'Come so che è il sito vero?',
          'Come attivo il 2FA?',
        ],
        [
          '1win hansı lisenziyaya malikdir?',
          'Sənədləri nə vaxt istəyirlər?',
          'Saytın rəsmi olduğunu necə yoxlamaq olar?',
          '2FA-nı necə aktivləşdirmək olar?',
        ],
        [
          '1win-এর লাইসেন্স কী?',
          'KYC কখন লাগে?',
          'সাইট আসল কিনা কীভাবে বুঝব?',
          '2FA কীভাবে চালু করব?',
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
          'What does WINEX600 offer?',
          'How do I install the app?',
        ],
        [
          'Как зарегистрироваться?',
          'Сколько времени занимает вывод?',
          'Что входит в WINEX600?',
          'Как установить приложение?',
        ],
        [
          '¿Cómo me registro?',
          '¿Cuánto tarda un retiro?',
          '¿Qué incluye WINEX600?',
          '¿Cómo instalo la app?',
        ],
        [
          'Comment s’inscrire ?',
          'Combien de temps pour un retrait ?',
          'Que contient WINEX600 ?',
          'Comment installer l’app ?',
        ],
        [
          'Wie registriere ich mich?',
          'Wie schnell kommt die Auszahlung?',
          'Was gehört zu WINEX600?',
          'Wie installiere ich die App?',
        ],
        [
          'Як зареєструватися?',
          'Скільки часу триває виведення?',
          'Що входить у WINEX600?',
          'Як установити додаток?',
        ],
        [
          'Come mi registro?',
          'Quanto ci mette un prelievo?',
          'Cosa include WINEX600?',
          'Come installo l’app?',
        ],
        [
          'Necə qeydiyyatdan keçmək olar?',
          'Çıxarış nə qədər vaxt aparır?',
          'WINEX600-ə nə daxildir?',
          'Tətbiqi necə quraşdırmaq olar?',
        ],
        [
          'রেজিস্ট্রেশন কীভাবে করব?',
          'টাকা তুলতে কত সময় লাগে?',
          'WINEX600-এ কী পাব?',
          'অ্যাপ কীভাবে ইনস্টল করব?',
        ]
      )
    );
  }

  if (slug === 'responsible-gambling') {
    return uniqueSuggestions(
      pick(
        lang,
        [
          'How do I set a deposit limit or take a break?',
          'Can I cancel self-exclusion early?',
          'What should I do if I cannot stop gambling?',
          'Where can I get independent gambling help?',
        ],
        [
          'Как установить лимит на депозит или сделать перерыв?',
          'Можно ли досрочно отменить самоисключение?',
          'Что делать, если не получается остановиться?',
          'Где получить независимую помощь при проблемах с азартными играми?',
        ],
        [
          '¿Cómo configuro un límite de depósito o una pausa?',
          '¿Puedo cancelar antes la autoexclusión?',
          '¿Qué hago si no puedo dejar de jugar?',
          '¿Dónde puedo obtener ayuda independiente para problemas con el juego de azar?',
        ],
        [
          'Comment définir une limite de dépôt ou une pause ?',
          'Puis-je annuler l’auto-exclusion avant terme ?',
          'Que faire si je n’arrive pas à arrêter de jouer ?',
          'Où trouver une aide indépendante pour les problèmes liés aux jeux d’argent ?',
        ],
        [
          'Wie richte ich ein Einzahlungslimit oder eine Spielpause ein?',
          'Kann ich die Selbstsperre vorzeitig aufheben?',
          'Was kann ich tun, wenn ich nicht aufhören kann zu spielen?',
          'Wo bekomme ich unabhängige Hilfe bei Glücksspielproblemen?',
        ],
        [
          'Як установити ліміт на депозит або зробити перерву?',
          'Чи можна достроково скасувати самовиключення?',
          'Що робити, якщо не вдається припинити грати?',
          'Де отримати незалежну допомогу в разі проблем з азартними іграми?',
        ],
        [
          'Come imposto un limite di deposito o una pausa?',
          'Posso annullare prima l’autoesclusione?',
          'Cosa devo fare se non riesco a smettere di giocare?',
          'Dove trovo assistenza indipendente per problemi di gioco d’azzardo?',
        ],
        [
          'Depozit limiti və ya fasilə necə təyin edilir?',
          'Özünü kənarlaşdırmanı vaxtından əvvəl ləğv etmək olar?',
          'Qumarı dayandıra bilmirəmsə, nə etməliyəm?',
          'Qumarla bağlı müstəqil yardımı haradan almaq olar?',
        ],
        [
          'ডিপোজিট লিমিট বা বিরতি কীভাবে সেট করব?',
          'সেলফ-এক্সক্লুশন কি আগেই বাতিল করা যায়?',
          'গেম্বলিং বন্ধ করতে না পারলে কী করব?',
          'গেম্বলিং নিয়ে স্বাধীন সাহায্য কোথায় পাব?',
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
          'Действует ли WINEX600 при пополнении криптовалютой?',
        ],
        [
          '¿Cómo deposito Bitcoin o USDT?',
          '¿Piden KYC si pago con cripto?',
          '¿Qué hago si el depósito cripto no llega?',
          '¿WINEX600 funciona con cripto?',
        ],
        [
          'Comment déposer en Bitcoin ou USDT ?',
          'On demande encore le KYC en crypto ?',
          'Que faire si un dépôt crypto n’arrive pas ?',
          'WINEX600 est-il compatible avec la crypto ?',
        ],
        [
          'Wie zahle ich mit Bitcoin oder USDT ein?',
          'Brauche ich für Krypto trotzdem KYC?',
          'Was tun, wenn eine Krypto-Einzahlung nicht ankommt?',
          'Gilt WINEX600 auch mit Krypto?',
        ],
        [
          'Як поповнити Bitcoin або USDT?',
          'Чи потрібен KYC для крипти?',
          'Що робити, якщо депозит криптою не надійшов?',
          'Чи діє WINEX600 для поповнення криптовалютою?',
        ],
        [
          'Come deposito Bitcoin o USDT?',
          'Chiedono il KYC se pago in crypto?',
          'Cosa faccio se il deposito crypto non arriva?',
          'WINEX600 vale con la crypto?',
        ],
        [
          'Bitcoin və ya USDT ilə necə depozit qoymaq olar?',
          'Kripto üçün də KYC lazımdır?',
          'Kripto depoziti hesaba düşməzsə nə etməliyəm?',
          'WINEX600 kripto ilə işləyir?',
        ],
        [
          'Bitcoin বা USDT দিয়ে কীভাবে ডিপোজিট করব?',
          'ক্রিপ্টো দিয়ে ডিপোজিট করলেও কি KYC লাগে?',
          'ক্রিপ্টো ডিপোজিট না এলে কী করব?',
          'WINEX600 ক্রিপ্টোতে চলে?',
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
          'Que faire si le site ne se charge pas ?',
          'L’app s’ouvre-t-elle si le site ne se charge pas ?',
          'Comment me connecter si le site est bloqué ?',
        ],
        [
          'Warum öffnet 1win nicht?',
          'Was tun, wenn die Seite nicht lädt?',
          'Öffnet die App trotzdem?',
          'Wie melde ich mich an, wenn die Seite gesperrt ist?',
        ],
        [
          'Чому 1win не відкривається?',
          'Що робити, якщо сайт не завантажується?',
          'Чи спрацює додаток, якщо сайт не відкривається?',
          'Як увійти, якщо сайт не відкривається?',
        ],
        [
          'Perché 1win non si apre?',
          'Cosa faccio se il sito non si apre?',
          'L’app si apre se il sito non si apre?',
          'Come accedo se il sito è bloccato?',
        ],
        [
          '1win niyə açılmır?',
          'Sayt yüklənmirsə nə etməliyəm?',
          'Tətbiq işləyə bilərmi?',
          'Sayt bloklanıbsa necə daxil olmaq olar?',
        ],
        [
          '1win খুলছে না কেন?',
          'সাইট না খুললে কী করব?',
          'সাইট না খুললে অ্যাপ কি চলবে?',
          'সাইট ব্লক থাকলে কীভাবে লগইন করব?',
        ]
      )
    );
  }

  return uniqueSuggestions([
    ...pick(lang, [...GLOBAL_SUGGESTIONS], [...GLOBAL_SUGGESTIONS_RU], [...GLOBAL_SUGGESTIONS_ES], [...GLOBAL_SUGGESTIONS_FR], [...GLOBAL_SUGGESTIONS_DE], [...GLOBAL_SUGGESTIONS_UK], [...GLOBAL_SUGGESTIONS_IT], [...GLOBAL_SUGGESTIONS_AZ], [...GLOBAL_SUGGESTIONS_BN]),
  ]);
}
