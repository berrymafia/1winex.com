import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const locales = ['ru', 'es', 'fr', 'de', 'uk', 'it', 'az', 'bn'];
const pageNames = [
  'index.html',
  'safety.html',
  'bonuses.html',
  'casino.html',
  'aviator.html',
  'lucky-jet.html',
  'betting.html',
  'payments.html',
  'crypto-casino.html',
  'app.html',
  'responsible-gambling.html',
  'not-working.html',
  '404.html',
];
const pages = [
  ...pageNames,
  ...locales.flatMap((locale) => pageNames.map((name) => `${locale}/${name}`)),
];

const organizationId = 'https://1winex.com/#organization';
const websiteId = 'https://1winex.com/#website';

const titleUpdates = {
  'bonuses.html':
    'WINEX600 at 1win — Up to 600% + Up to 500 Free Spins',
  'betting.html':
    '1win Sportsbook — Sports Betting, Live Betting and Esports',
  'ru/index.html': '1win Казино и ставки — Вход и регистрация',
  'ru/casino.html':
    'Казино 1win — Слоты, Aviator и игры с живыми дилерами',
  'ru/bonuses.html':
    'Промокод WINEX600 — до 600% и до 500 фриспинов',
  'ru/responsible-gambling.html':
    'Ответственная игра в 1win — лимиты и самоисключение',
  'uk/index.html': '1win Казино й ставки — Вхід і реєстрація',
  'uk/casino.html':
    'Казино 1win — Слоти, Aviator та ігри з живими дилерами',
  'uk/bonuses.html':
    'Промокод WINEX600 — до 600% і до 500 фріспінів',
  'uk/responsible-gambling.html':
    'Відповідальна гра в 1win — ліміти й самовиключення',
  'uk/not-working.html': '1win не відкривається — перевірка доступу',
  'es/bonuses.html':
    'Código WINEX600 — hasta 600 % y hasta 500 giros gratis',
  'es/safety.html': 'Licencia de 1win — KYC y seguridad de la cuenta',
  'es/responsible-gambling.html':
    'Juego responsable en 1win — límites y autoexclusión',
  'fr/not-working.html':
    '1win ne s’ouvre pas — Site bloqué ou impossible à charger',
  'fr/betting.html': 'Paris sportifs 1win — En direct et esports',
  'fr/casino.html':
    'Casino 1win — Machines à sous, Aviator et jeux en direct',
  'fr/bonuses.html':
    'Code WINEX600 — jusqu’à 600 % et jusqu’à 500 tours gratuits',
  'fr/safety.html': 'Licence de 1win — KYC et sécurité du compte',
  'fr/responsible-gambling.html':
    'Jeu responsable sur 1win — limites et auto-exclusion',
  'de/aviator.html': 'Aviator bei 1win — Crash-Spiel von Spribe',
  'de/betting.html': '1win-Sportwetten — Live-Wetten und E-Sport',
  'de/bonuses.html':
    'WINEX600-Promo-Code — bis zu 600 % Bonus + bis zu 500 Freispiele',
  'de/casino.html':
    '1win-Casino — Spielautomaten, Aviator und Live-Casino',
  'de/crypto-casino.html':
    '1win-Krypto-Casino — BTC, ETH und USDT',
  'de/lucky-jet.html':
    'Lucky Jet bei 1win — Crash-Spiel von 1win Originals',
  'de/not-working.html':
    '1win lädt nicht — Website blockiert oder nicht erreichbar',
  'de/payments.html':
    '1win-Zahlungen — Einzahlungen, Auszahlungen und Krypto',
  'de/responsible-gambling.html':
    '1win Spielerschutz — Limits und Selbstsperre',
  'it/index.html': '1win Casinò e scommesse — Accedi e Registrati',
  'it/not-working.html':
    '1win non si apre — Sito bloccato o impossibile da caricare',
  'it/crypto-casino.html':
    'Casinò 1win con criptovalute — BTC, ETH e USDT',
  'it/casino.html': 'Casinò 1win — Slot, Aviator e live',
  'it/bonuses.html':
    'Codice WINEX600 — fino al 600 % e fino a 500 giri gratis',
  'it/safety.html': 'Licenza di 1win — KYC e sicurezza dell’account',
  'it/responsible-gambling.html':
    'Gioco responsabile su 1win — limiti e autoesclusione',
  'az/index.html':
    '1win-də kazino və idman mərcləri — giriş və qeydiyyat',
  'az/aviator.html':
    '1win-də Aviator — Spribe şirkətinin artan əmsallı oyunu',
  'az/betting.html':
    '1win idman mərcləri — canlı mərclər və kibersport',
  'az/bonuses.html':
    'WINEX600 promo kodu — 600%-dək bonus və 500-dək pulsuz fırlanma',
  'az/casino.html':
    '1win kazinosu — slotlar, Aviator və canlı masalar',
  'az/lucky-jet.html':
    '1win-də Lucky Jet — artan əmsallı Originals oyunu',
  'az/payments.html':
    '1win-də ödənişlər — depozit, pul çıxarma və kriptovalyuta',
  'az/responsible-gambling.html':
    '1win-də məsuliyyətli oyun — limitlər və özünü kənarlaşdırma',
  'bn/index.html':
    '1win ক্যাসিনো ও স্পোর্টস বেটিং — লগইন ও রেজিস্ট্রেশন',
  'bn/aviator.html': '1win-এ Aviator — Spribe ক্র্যাশ গেম',
  'bn/betting.html':
    '1win স্পোর্টস বেটিং — প্রি-ম্যাচ, লাইভ ও ইস্পোর্টস',
  'bn/bonuses.html':
    'WINEX600 প্রোমো কোড — 600% পর্যন্ত বোনাস ও 500 পর্যন্ত ফ্রি স্পিন',
  'bn/lucky-jet.html':
    'Lucky Jet — 1win Originals ক্র্যাশ গেম',
  'bn/payments.html':
    '1win পেমেন্ট — ডিপোজিট, উইথড্রয়াল ও ক্রিপ্টো',
};

const descriptionUpdates = {
  'app.html':
    'Download the 1win Android APK, use iOS when available, or play in your mobile browser. Includes installation and update steps. 18+.',
  'bonuses.html':
    'Enter WINEX600 when you register. On crypto it is up to 600% plus up to 500 free spins across four deposits. 18+.',
  'betting.html':
    'Pre-match and live betting with the same account as the casino. Football, tennis and esports. 18+.',
  'payments.html':
    'Cards, e-wallets and crypto are available in the cashier. Limits, fees and KYC requirements are shown before you send. 18+.',
  'de/app.html':
    'Lade die 1win Android-APK herunter, nutze iOS, sofern verfügbar, oder spiele im mobilen Browser. Mit Installations- und Update-Anleitung. 18+.',
  'casino.html':
    'Explore 1win slots, Aviator, live tables and Originals in one casino lobby. Check providers, RTP examples and game limits. 18+.',
  'ru/casino.html':
    'Слоты, Aviator, живые столы и 1win Originals в одном казино-лобби. Проверьте провайдеров, примеры RTP и лимиты игр. 18+.',
  'es/casino.html':
    'Explora slots, Aviator, mesas en vivo y 1win Originals en un solo lobby. Consulta proveedores, ejemplos de RTP y límites de juego. 18+.',
  'fr/casino.html':
    'Retrouvez machines à sous, Aviator, tables en direct et 1win Originals dans un même lobby. Consultez les fournisseurs, RTP et limites. 18+.',
  'de/casino.html':
    'Entdecke Slots, Aviator, Live-Tische und 1win Originals in einer Casino-Lobby. Prüfe Anbieter, RTP-Beispiele und Spieleinsätze. 18+.',
  'uk/casino.html':
    'Слоти, Aviator, живі столи й 1win Originals в одному казино-лобі. Перевірте провайдерів, приклади RTP та ліміти ігор. 18+.',
  'it/casino.html':
    'Slot, Aviator, tavoli live e 1win Originals in un’unica lobby. Scopri provider, esempi di RTP e limiti di gioco. 18+.',
  'az/casino.html':
    'Slotlar, Aviator, canlı masalar və 1win Originals eyni kazino lobisində. Provayderləri, RTP nümunələrini və oyun limitlərini yoxlayın. 18+.',
  'bn/casino.html':
    'একই 1win ক্যাসিনো লবিতে স্লট, Aviator, লাইভ টেবিল ও Originals দেখুন। প্রোভাইডার, RTP-এর উদাহরণ ও গেম লিমিট যাচাই করুন। 18+।',
  'bn/betting.html':
    '1win-এ প্রি-ম্যাচ, লাইভ ও ইস্পোর্টস বেটিং দেখুন। একই অ্যাকাউন্টে অডস, বেট স্লিপ ও মাল্টিপল-বেট বোনাস সম্পর্কে জানুন। 18+।',
};

const localizedDescriptionUpdates = {
  'ru/lucky-jet.html':
    'Lucky Jet — игра из линейки 1win Originals. Делайте ставку и забирайте выигрыш, пока джет в воздухе. Это не Aviator. 18+.',
  'ru/aviator.html':
    'В Aviator от Spribe коэффициент растёт, пока самолёт в воздухе: сделайте ставку и вовремя заберите выигрыш. Это не игра 1win Original. 18+.',
  'ru/casino.html':
    'Слоты, Aviator, игры с живыми дилерами и 1win Originals в одном казино-лобби. Смотрите данные о провайдерах, RTP и лимитах игр. 18+.',
  'ru/bonuses.html':
    'При регистрации введите WINEX600. При пополнении криптовалютой бонус — до 600% и до 500 фриспинов за четыре депозита. 18+.',
  'ru/index.html':
    'Казино и ставки в 1win. WINEX600 — бонус до 600% и до 500 фриспинов за четыре депозита. 18+.',
  'ru/safety.html':
    'Лицензия Curaçao OGL/2024/587/0621. KYC в аккаунте. Двухфакторная аутентификация (2FA) доступна, если её поддерживает 1win. 18+.',
  'ru/404.html':
    'Страница не найдена. Откройте меню или перейдите на главную. Не пользуйтесь случайными зеркалами.',
  'ru/crypto-casino.html':
    'Bitcoin, Ethereum или USDT в 1win. Те же игры и тот же аккаунт. Доступные сети и требования KYC указаны в кассе. 18+.',
  'ru/payments.html':
    'Карты, кошельки и криптовалюта доступны в кассе. Лимиты, комиссии и требования KYC отображаются до подтверждения платежа. 18+.',

  'uk/lucky-jet.html':
    'Lucky Jet — гра з лінійки 1win Originals. Робіть ставку й забирайте виграш, поки джет у повітрі. Це не Aviator. 18+.',
  'uk/aviator.html':
    'У грі Aviator від Spribe коефіцієнт зростає, поки літак у повітрі: зробіть ставку й вчасно заберіть виграш. Це не гра 1win Original. 18+.',
  'uk/app.html':
    'APK доступний лише для Android і лише на цій сторінці. На iPhone скористайтеся застосунком 1win, якщо він доступний у вашій країні, або відкрийте 1win у браузері. 18+.',
  'uk/casino.html':
    'Слоти, Aviator, ігри з живими дилерами та 1win Originals в одному казино-лобі. Перегляньте дані про провайдерів, RTP і ліміти ігор. 18+.',
  'uk/bonuses.html':
    'Під час реєстрації введіть WINEX600, щоб отримати вітальний бонус. За поповнення криптовалютою можна отримати до 600% і до 500 фріспінів за чотири депозити. 18+.',
  'uk/index.html':
    'Казино й ставки в 1win. WINEX600 — бонус до 600% і до 500 фріспінів за чотири депозити. 18+.',
  'uk/safety.html':
    'Ліцензія Curaçao OGL/2024/587/0621. KYC в особистому кабінеті. Двофакторна автентифікація (2FA) доступна, якщо її підтримує 1win. 18+.',
  'uk/404.html':
    'Сторінку не знайдено. Скористайтеся меню або поверніться на головну сторінку. Не користуйтеся випадковими дзеркалами.',
  'uk/not-working.html':
    'Якщо 1win відкривається в одній мережі, але не в іншій, доступ, імовірно, блокує провайдер. Спробуйте іншу мережу чи VPN або встановіть застосунок із цієї сторінки. 18+.',
  'uk/payments.html':
    'Картки, електронні гаманці й криптовалюта доступні в касі. Ліміти, комісії та вимоги KYC відображаються до підтвердження платежу. 18+.',
  'uk/crypto-casino.html':
    'Bitcoin, Ethereum або USDT доступні в касі. Той самий кабінет і ті самі ігри. Перед переказом перевірте в касі мережу та вимоги KYC. 18+.',
  'uk/responsible-gambling.html':
    'Ліміти на депозит, перерва та самовиключення доступні в кабінеті. Нижче — незалежні служби допомоги. Для осіб віком від 18 років, які досягли законного віку для азартних ігор.',

  'es/404.html':
    'Esta página no existe. Abre el menú o ve al inicio. No abras sitios espejo al azar desde buscadores o chats.',
  'es/not-working.html':
    'Si 1win no abre, tu proveedor puede estar bloqueando el dominio. Prueba a iniciar sesión, registrarte o abrir la app desde esta página. 18+.',
  'es/crypto-casino.html':
    'Bitcoin, Ethereum o USDT en 1win. Los mismos juegos y la misma cuenta. La red y los requisitos KYC se muestran en la caja. 18+.',
  'es/payments.html':
    'Tarjetas, billeteras y criptomonedas en la caja. Los límites, las comisiones y los requisitos KYC se muestran antes de confirmar la operación. 18+.',
  'es/betting.html':
    'Apuestas previas al partido y en vivo con la misma cuenta que usas en el casino. Fútbol, tenis y esports. 18+.',
  'es/lucky-jet.html':
    'Lucky Jet es un juego crash de 1win Originals. Apuesta y cobra antes de que desaparezca el multiplicador. No es Aviator. 18+.',
  'es/aviator.html':
    'Aviator es un juego crash de Spribe. Apuesta y cobra antes de que desaparezca el multiplicador. No es un juego de 1win Originals. 18+.',
  'es/bonuses.html':
    'Introduce WINEX600 al registrarte. Con depósitos en criptomonedas, obtén un bono de hasta el 600 % y hasta 500 giros gratis en cuatro depósitos. 18+.',
  'es/safety.html':
    'Licencia de Curazao OGL/2024/587/0621. KYC en la cuenta. Autenticación de dos factores si está disponible. 18+.',
  'es/index.html':
    'Casino y apuestas en 1win. WINEX600 — hasta 600 % y hasta 500 giros gratis en cuatro depósitos. 18+.',

  'fr/404.html':
    'Cette page n’existe pas. Ouvrez le menu ou allez à l’accueil. N’ouvrez pas au hasard des sites miroirs trouvés dans les résultats de recherche ou les chats.',
  'fr/not-working.html':
    'Si 1win ne s’ouvre pas, votre fournisseur bloque peut-être le domaine. Essayez de vous connecter, de vous inscrire ou d’ouvrir l’app depuis cette page. 18+.',
  'fr/responsible-gambling.html':
    'Gérez les limites de dépôt, la mise en pause et l’auto-exclusion depuis votre compte. Des ressources d’aide indépendantes sont disponibles ci-dessous. 18+.',
  'fr/app.html':
    'Téléchargez l’APK Android, utilisez l’app iOS si elle est disponible dans votre pays ou jouez dans le navigateur. 18+.',
  'fr/crypto-casino.html':
    'Bitcoin, Ethereum ou USDT sur 1win. Les mêmes jeux, le même compte. Le réseau et les exigences KYC sont indiqués à la caisse. 18+.',
  'fr/payments.html':
    'Utilisez des cartes, des portefeuilles électroniques ou des cryptomonnaies à la caisse. Les limites, frais et exigences KYC s’affichent avant validation. 18+.',
  'fr/betting.html':
    'Paris avant-match et en direct avec le même compte que pour le casino. Football, tennis et esports. 18+.',
  'fr/lucky-jet.html':
    'Lucky Jet est un jeu 1win Originals. Misez pendant que le multiplicateur augmente, puis encaissez avant que le jet ne s’envole. Ce n’est pas Aviator. 18+.',
  'fr/aviator.html':
    'Aviator est un jeu de Spribe. Misez pendant que le multiplicateur augmente, puis encaissez avant que l’avion ne s’envole. Ce n’est pas un jeu 1win Originals. 18+.',
  'fr/bonuses.html':
    'Saisissez WINEX600 à l’inscription. Avec les dépôts en cryptomonnaies, obtenez un bonus allant jusqu’à 600 % et jusqu’à 500 tours gratuits sur quatre dépôts. 18+.',
  'fr/safety.html':
    'Licence de Curaçao OGL/2024/587/0621. Vérification KYC dans le compte. Authentification à deux facteurs lorsqu’elle est disponible. 18+.',
  'fr/index.html':
    'Casino et paris sur 1win. WINEX600 — jusqu’à 600 % et jusqu’à 500 tours gratuits sur quatre dépôts. 18+.',

  'de/404.html':
    'Seite nicht gefunden. Nutze das Menü oder geh zur Startseite. Folge keinen unbekannten Links zu Spiegelseiten aus Suchergebnissen oder Chats.',
  'de/app.html':
    'Lade die 1win-Android-APK herunter, nutze die iOS-App, sofern verfügbar, oder spiele im mobilen Browser. Eine Installations- und Update-Anleitung ist enthalten. 18+.',
  'de/aviator.html':
    'Aviator von Spribe: Setze deinen Einsatz, verfolge den Multiplikator und sichere deinen Gewinn, bevor das Flugzeug wegfliegt. Kein 1win Original. 18+.',
  'de/betting.html':
    'Wette vor dem Spiel oder live mit demselben Konto wie im Casino. Fußball, Tennis und E-Sport. 18+.',
  'de/bonuses.html':
    'Gib WINEX600 bei der Registrierung ein. Bei vier Krypto-Einzahlungen erhältst du insgesamt bis zu 600 % Bonus und bis zu 500 Freispiele. 18+.',
  'de/index.html':
    'Casino und Sportwetten bei 1win. WINEX600 — bis zu 600 % Bonus und bis zu 500 Freispiele über vier Einzahlungen. 18+.',
  'de/casino.html':
    'Entdecke Slots, Aviator, Live-Tische und 1win Originals in einer Casino-Lobby. Prüfe Anbieter, RTP-Angaben und Einsatzlimits. 18+.',
  'de/crypto-casino.html':
    'Nutze Bitcoin, Ethereum oder USDT bei 1win. Spiele dieselben Spiele mit demselben Konto. Netzwerk und KYC-Anforderungen siehst du an der Kasse. 18+.',
  'de/lucky-jet.html':
    'Lucky Jet ist ein Spiel von 1win Originals. Setze deinen Einsatz, verfolge den Multiplikator und sichere deinen Gewinn, bevor der Jet wegfliegt. Nicht Aviator. 18+.',
  'de/not-working.html':
    'Wenn 1win nicht lädt, blockiert dein Anbieter möglicherweise die Domain. Nutze auf dieser Seite die Links zum Anmelden, Registrieren oder zur App. 18+.',
  'de/payments.html':
    'Karten, Wallets und Krypto stehen an der Kasse zur Verfügung. Limits, Gebühren und KYC-Anforderungen siehst du vor der Bestätigung. 18+.',
  'de/responsible-gambling.html':
    'Lege im Konto Einzahlungslimits oder eine Spielpause fest oder aktiviere die Selbstsperre. Unabhängige Hilfe findest du weiter unten. 18+.',
  'de/safety.html':
    'Curaçao-Lizenz OGL/2024/587/0621. Die KYC-Verifizierung erfolgt im Konto. Aktiviere 2FA, sofern 1win sie anbietet. 18+.',

  'it/404.html':
    'Questa pagina non esiste. Apri il menu o torna alla home. Non aprire a caso siti specchio trovati nei risultati di ricerca o nelle chat.',
  'it/not-working.html':
    'Se 1win non si apre, il tuo provider Internet potrebbe aver bloccato il dominio. Prova ad accedere, registrarti o aprire l’app da questa pagina. 18+.',
  'it/responsible-gambling.html':
    'Imposta limiti di deposito, sospendi l’account o attiva l’autoesclusione. In questa pagina trovi anche risorse di aiuto indipendenti. 18+.',
  'it/crypto-casino.html':
    'Bitcoin, Ethereum o USDT su 1win, con gli stessi giochi e lo stesso account. La rete e i requisiti KYC sono indicati nella sezione Cassa. 18+.',
  'it/payments.html':
    'Carte, portafogli elettronici e criptovalute sono disponibili nella sezione Cassa. Limiti, commissioni e requisiti KYC sono indicati prima della conferma. 18+.',
  'it/betting.html':
    'Scommesse pre-partita e live con lo stesso account usato per il casinò. Calcio, tennis ed esports. 18+.',
  'it/lucky-jet.html':
    'Lucky Jet è il gioco crash sviluppato da 1win. Punta e incassa prima che scompaia il moltiplicatore. Non è Aviator. 18+.',
  'it/aviator.html':
    'Aviator è un gioco crash di Spribe. Punta e incassa prima che scompaia il moltiplicatore. Non è un gioco 1win Originals. 18+.',
  'it/bonuses.html':
    'Inserisci WINEX600 alla registrazione. Con i depositi in criptovalute, ottieni un bonus fino al 600 % e fino a 500 giri gratis su quattro depositi. 18+.',
  'it/safety.html':
    'Licenza di Curaçao OGL/2024/587/0621. Verifica KYC nell’account. Autenticazione a due fattori se disponibile su 1win. 18+.',
  'it/index.html':
    'Casinò e scommesse su 1win. WINEX600 — fino a 600 % e fino a 500 giri gratis su quattro depositi. 18+.',

  'az/404.html':
    'Səhifə tapılmadı. Menyudan istifadə edin və ya ana səhifəyə qayıdın. Axtarışda və ya çatda rast gəldiyiniz naməlum güzgü saytlarına keçməyin.',
  'az/app.html':
    'Android APK-nı buradan yükləyin. Ölkənizdə iPhone tətbiqi varsa ondan, yoxdursa mobil brauzerdən istifadə edin. 18+.',
  'az/aviator.html':
    'Spribe tərəfindən hazırlanmış Aviator oyununda mərc edin, əmsalı izləyin və təyyarə uçub getməzdən əvvəl uduşu götürün. 1win Original deyil. 18+.',
  'az/betting.html':
    'Matçdan əvvəl və canlı mərclər üçün kazino ilə eyni hesabdan istifadə edin. Futbol, tennis və kibersport. 18+.',
  'az/bonuses.html':
    'Qeydiyyat zamanı WINEX600 promo kodunu daxil edin. Kriptovalyuta ilə edilən dörd depozit üzrə ümumilikdə 600%-dək bonus və 500-dək pulsuz fırlanma əldə edin. 18+.',
  'az/casino.html':
    'Slotları, Aviator-u, canlı masaları və 1win Originals oyunlarını bir kazino lobbisində tapın. Provayderləri, RTP göstəricilərini və mərc limitlərini yoxlayın. 18+.',
  'az/crypto-casino.html':
    '1win-də Bitcoin, Ethereum və ya USDT ilə eyni oyunları eyni hesabdan oynayın. Şəbəkə və KYC tələblərini kassada yoxlayın. 18+.',
  'az/index.html':
    '1win-də kazino və idman mərcləri oynayın. WINEX600 ilə kriptovalyuta üzrə dörd depozitə ümumilikdə 600%-dək bonus və 500-dək pulsuz fırlanma əldə edin. 18+.',
  'az/lucky-jet.html':
    'Lucky Jet 1win Originals seriyasına aid oyundur. Mərc edin, əmsalı izləyin və jet uçub getməzdən əvvəl uduşu götürün. Aviator deyil. 18+.',
  'az/not-working.html':
    '1win açılmırsa, internet provayderiniz domeni bloklamış ola bilər. Bu səhifədəki giriş, qeydiyyat və tətbiq keçidlərindən istifadə edin. 18+.',
  'az/payments.html':
    'Kassada bank kartları, elektron pul kisələri və kriptovalyuta mövcuddur. Limitlər, komissiyalar və KYC tələbləri əməliyyatı təsdiqləməzdən əvvəl göstərilir. 18+.',
  'az/responsible-gambling.html':
    'Hesabınızda depozit limiti təyin edin, fasilə götürün və ya özünüzü oyundan kənarlaşdırın. Müstəqil yardım mənbələri aşağıda göstərilib. 18+.',
  'az/safety.html':
    'Curaçao lisenziyası: OGL/2024/587/0621. KYC yoxlaması hesabda aparılır. 1win tərəfindən təklif edilirsə, 2FA-nı aktivləşdirin. 18+.',

  'bn/404.html':
    'পৃষ্ঠা খুঁজে পাওয়া যায়নি। মেনু ব্যবহার করুন অথবা হোমপেজে ফিরে যান। সার্চ বা চ্যাটে পাওয়া অজানা মিরর লিংক খুলবেন না।',
  'bn/app.html':
    'এই পৃষ্ঠা থেকে Android APK ডাউনলোড করুন। iPhone অ্যাপটি আপনার দেশে পাওয়া গেলে সেটি ব্যবহার করুন; না হলে মোবাইল সাইট ব্যবহার করুন। 18+।',
  'bn/aviator.html':
    'Spribe-এর Aviator গেমে প্লেন যত ওপরে ওঠে, মাল্টিপ্লায়ার তত বাড়ে। প্লেনটি উধাও হওয়ার আগে ক্যাশ আউট করুন। এটি 1win Original নয়। 18+।',
  'bn/casino.html':
    '1win ক্যাসিনোর একই লবিতে স্লট, Aviator, লাইভ টেবিল ও 1win Originals গেম দেখুন। প্রোভাইডার, RTP তথ্য ও বেটের সীমা যাচাই করুন। 18+।',
  'bn/crypto-casino.html':
    '1win ক্যাশিয়ারে Bitcoin, Ethereum ও USDT ব্যবহার করুন। একই অ্যাকাউন্টে একই গেম খেলুন। লেনদেন নিশ্চিত করার আগে নেটওয়ার্ক ও KYC-এর শর্ত দেখে নিন। 18+।',
  'bn/index.html':
    '1win-এ ক্যাসিনো গেম খেলুন ও স্পোর্টসে বাজি ধরুন। WINEX600 কোডে চারটি যোগ্য ক্রিপ্টো ডিপোজিট মিলিয়ে সর্বোচ্চ 600% বোনাস ও সর্বোচ্চ 500 ফ্রি স্পিন পান। 18+।',
  'bn/lucky-jet.html':
    'Lucky Jet একটি 1win Originals গেম। জেটটি যত ওপরে ওঠে, মাল্টিপ্লায়ার তত বাড়ে। জেট উধাও হওয়ার আগে ক্যাশ আউট করুন। এটি Aviator নয়। 18+।',
  'bn/not-working.html':
    'সাইট না খুললে আপনার ইন্টারনেট সেবাদাতা ডোমেইনটি ব্লক করে থাকতে পারে। এই পৃষ্ঠার লগইন, রেজিস্ট্রেশন বা অ্যাপ লিংক ব্যবহার করুন। 18+।',
  'bn/payments.html':
    'ক্যাশিয়ারে কার্ড, ই-ওয়ালেট ও ক্রিপ্টো ব্যবহার করুন। লেনদেন নিশ্চিত করার আগে সীমা, ফি ও KYC-এর শর্ত দেখুন। 18+।',
  'bn/responsible-gambling.html':
    'অ্যাকাউন্টে ডিপোজিট লিমিট সেট করুন, সাময়িক বিরতি নিন বা স্ব-বর্জন চালু করুন। স্বাধীন সহায়তার তথ্য নিচে দেওয়া আছে। 18+।',
  'bn/safety.html':
    'Curaçao লাইসেন্স: OGL/2024/587/0621। অ্যাকাউন্টে KYC সম্পন্ন করুন। 1win সুবিধাটি দিলে 2FA চালু করুন। 18+।',
  'bn/bonuses.html':
    'রেজিস্ট্রেশনে WINEX600 লিখুন। ক্রিপ্টোতে চার ডিপোজিট মিলিয়ে সর্বোচ্চ 600% বোনাস ও সর্বোচ্চ 500 ফ্রি স্পিন। 18+।',
};

const socialDescriptionUpdates = {
  '404.html':
    'This page could not be found. Use the menu or return home. Do not follow random mirror links.',
  'bn/404.html':
    'এই পাতা নেই। মেনু দিয়ে এগোবেন, বা হোমে ফিরুন। এলোমেলো মিরর খুলবেন না।',
};

const socialImageAltUpdates = {
  'ru/bonuses.html':
    'Приветственный бонус 1win — до 600% и до 500 фриспинов',
  'uk/bonuses.html':
    'Вітальний бонус 1win — до 600% і до 500 фріспінів',
  'es/bonuses.html':
    'Bono de bienvenida 1win — hasta 600 % y hasta 500 giros gratis',
  'fr/bonuses.html':
    'Bonus de bienvenue 1win — jusqu’à 600 % et jusqu’à 500 tours gratuits',
  'de/bonuses.html':
    'Willkommensbonus 1win — bis zu 600 % und bis zu 500 Freispiele',
  'it/index.html':
    'Gioca su 1win — casinò, scommesse e bonus di benvenuto',
  'it/casino.html':
    'Giochi del casinò 1win: slot, Aviator, casinò live e 1win Originals',
  'it/bonuses.html':
    'Bonus di benvenuto 1win — fino a 600 % e fino a 500 giri gratis',
  'az/bonuses.html':
    '1win xoş gəldin bonusu — 600%-dək və 500-dək pulsuz fırlanma',
  'bn/bonuses.html':
    '1win স্বাগতম বোনাস — সর্বোচ্চ 600% ও সর্বোচ্চ 500 ফ্রি স্পিন',
};

const h1Updates = {
  'bn/aviator.html': '1win-এ Aviator',
  'bn/lucky-jet.html': '1win-এ Lucky Jet',
};

const errorImageAltUpdates = {
  '404.html': '1win page not found illustration',
  'ru/404.html': 'Иллюстрация 1win: страница не найдена',
  'es/404.html': 'Ilustración de 1win: página no encontrada',
  'fr/404.html': 'Illustration 1win : page introuvable',
  'de/404.html': '1win-Illustration: Seite nicht gefunden',
  'uk/404.html': 'Ілюстрація 1win: сторінку не знайдено',
  'it/404.html': 'Illustrazione 1win: pagina non trovata',
  'az/404.html': '1win illüstrasiyası: səhifə tapılmadı',
  'bn/404.html': '1win পেজ খুঁজে পাওয়া যায়নি—ইলাস্ট্রেশন',
};

const localeCopyReplacements = {
  en: [
    ['up to 600% + 500 free spins', 'up to 600% + up to 500 free spins'],
    ['plus 500 free spins', 'plus up to 500 free spins'],
    [
      'A wrong network or address can permanently lose funds.',
      'Using the wrong network or address can cause a permanent loss of funds.',
    ],
    [
      'a wrong network, address or memo can permanently lose funds.',
      'using the wrong network, address or memo can cause a permanent loss of funds.',
    ],
    [
      'Limits, fees and KYC show before you send.',
      'Limits, fees and KYC requirements are shown before you send.',
    ],
    ['The catalogue is on casino.', 'The catalogue is on the Casino page.'],
    [
      'KYC in the account. 2FA where 1win offers it.',
      'Complete KYC in your account and enable 2FA where available.',
    ],
  ],
  ru: [
    ['до 600% и 500 фриспинов', 'до 600% и до 500 фриспинов'],
    [
      'Ни 600%, ни 500% не начисляются на один первый депозит.',
      'Ни 600%, ни 500% не начисляются полностью за первый депозит.',
    ],
    [
      'Как установить лимит на депозит, перерыв или самоисключение?',
      'Как установить лимит на депозит, включить паузу или самоисключение?',
    ],
    ['бюджетом денег и времени', 'бюджетом на игру и лимитом времени'],
    ['приложении Android', 'Android-приложении'],
  ],
  uk: [
    ['до 600% і 500 фріспінів', 'до 600% і до 500 фріспінів'],
    [
      'Ні 600%, ні 500% не нараховуються лише на перший депозит.',
      'Ні 600%, ні 500% не нараховуються повністю за перший депозит.',
    ],
    [
      'Як установити ліміт на депозит, перерву або самовиключення?',
      'Як установити ліміт на депозит, увімкнути паузу або самовиключення?',
    ],
    ['бюджетом грошей і часу', 'бюджетом на гру та лімітом часу'],
    ['Гайд казино', 'Посібник із казино'],
    ['Гід казино', 'Посібник із казино'],
    ['Можуть викрасти кабінет', 'Можуть викрасти акаунт'],
    ['кабінет могли зламати', 'акаунт могли зламати'],
    ['Скиньте доступ до кабінету', 'Відновіть захист акаунта'],
    ['додатку Android', 'Android-додатку'],
  ],
  de: [
    [
      'Eine Auszahlung vor erfülltem Umsatz storniert den aktiven Bonus.',
      'Eine Auszahlung vor Erfüllung der Umsatzbedingungen kann den aktiven Bonus stornieren.',
    ],
    ['unfertigem Bonus', 'noch nicht vollständig umgesetztem Bonus'],
    [
      'Zahle nicht ein, zahle nicht aus und bestätige keine Anmeldecodes.',
      'Veranlasse keine Einzahlung oder Auszahlung und bestätige keine Anmeldecodes.',
    ],
    [
      'Spiele und Sport in einem Konto.',
      'Casino-Spiele und Sportwetten in einem Konto.',
    ],
  ],
  es: [
    ['hasta 600 % y 500 giros gratis', 'hasta 600 % y hasta 500 giros gratis'],
    ['hasta 600 % + 500 giros gratis', 'hasta 600 % + hasta 500 giros gratis'],
    ['más 500 giros gratis', 'más hasta 500 giros gratis'],
    [
      '¿Dónde puedo obtener ayuda independiente con el juego?',
      '¿Dónde puedo obtener ayuda independiente para problemas con el juego de azar?',
    ],
    [
      'App 1win y el sitio del teléfono en Android e iOS',
      'App 1win y sitio web móvil en Android e iOS',
    ],
    ['Una computadora portátil', 'Un ordenador portátil'],
  ],
  fr: [
    [
      'jusqu’à 600 % et 500 tours gratuits',
      'jusqu’à 600 % et jusqu’à 500 tours gratuits',
    ],
    [
      'jusqu’à 600 % + 500 tours gratuits',
      'jusqu’à 600 % + jusqu’à 500 tours gratuits',
    ],
    ['plus 500 tours gratuits', 'plus jusqu’à 500 tours gratuits'],
    [
      'Où trouver une aide indépendante pour le jeu ?',
      'Où trouver une aide indépendante pour les problèmes liés aux jeux d’argent ?',
    ],
    ["Fil d'Ariane", 'Fil d’Ariane'],
  ],
  it: [
    ['fino al 600 % e 500 giri gratis', 'fino al 600 % e fino a 500 giri gratis'],
    ['fino a 600 % + 500 giri gratis', 'fino al 600 % + fino a 500 giri gratis'],
    ['più 500 giri gratis', 'più fino a 500 giri gratis'],
    [
      'Dove trovo supporto indipendente per il gioco?',
      'Dove trovo assistenza indipendente per problemi di gioco d’azzardo?',
    ],
    [
      'Prova anche una VPN o l’app 1win.',
      'Prova anche l’app 1win o una VPN, ma solo se il suo utilizzo e l’accesso a 1win sono legali nel luogo in cui ti trovi. Non usarla per aggirare restrizioni.',
    ],
    [
      'poi prova un altro dispositivo o una VPN.',
      'poi prova un altro dispositivo. Usa una VPN solo se è legale nel luogo in cui ti trovi e non per aggirare restrizioni.',
    ],
    ['Crea account', 'Crea un account'],
    [
      'Aviator è un gioco crash separato di Spribe',
      'Aviator è un gioco crash di Spribe, distinto dai 1win Originals',
    ],
    [
      'Un moltiplicatore alto o basso non rende più probabile l’opposto dopo.',
      'Un moltiplicatore alto o basso non rende più probabile il risultato opposto nella manche successiva.',
    ],
    [
      'riconoscere impersonificazione e phishing',
      'riconoscere i tentativi di impersonare 1win e il phishing',
    ],
    ['Una password tua', 'Una password unica'],
    ['2FA, se c’è', '2FA, se disponibile'],
  ],
  az: [
    ['lang-panel__title">Azərbaycan<', 'lang-panel__title">Azərbaycanca<'],
    ['lang-panel__desc">Azərbaycan<', 'lang-panel__desc">Azərbaycan dili<'],
    [
      'Göndərən adi yoxlamaları keçməyə məcbur edir.',
      'Göndərən sizi adi yoxlamalardan yan keçməyə məcbur edir.',
    ],
    ['Yalnız 18 yaşdan yuxarı şəxslər', 'Yalnız 18 və daha yuxarı yaşlı şəxslər'],
    [
      'yalnız 18 yaşdan yuxarı böyüklər',
      'yalnız 18 və daha yuxarı yaşlı böyüklər',
    ],
    ['yerli qanunları bilməlidirlər', 'yerli qanunlara riayət etməlidirlər'],
    ['yerli qanunları başa düşməlidir', 'yerli qanunlara riayət etməlidirlər'],
    [
      'bonusunun oynatması bitəndən sonra',
      'bonus üzrə oynatma tələbi yerinə yetirildikdən sonra',
    ],
    [
      'bonus oynadıldıqdan sonra',
      'bonus üzrə oynatma tələbi yerinə yetirildikdən sonra',
    ],
    [
      'bonus oynanıldıqdan sonra',
      'bonus üzrə oynatma tələbi yerinə yetirildikdən sonra',
    ],
    ['500 pulsuz fırlanma', '500-dək pulsuz fırlanma'],
    [
      'adətən şəxsiyyət vəsiqəsi, ünvan sübutu və ya ödəniş üsulu',
      'adətən şəxsiyyət vəsiqəsi, ünvanı təsdiqləyən sənəd və ya ödəniş üsulunu təsdiqləyən sənəd',
    ],
    [
      'cüzdan sirri',
      'kripto pul kisəsinin şəxsi açarı və ya bərpa ifadəsi',
    ],
    [
      'Başlığın RNG sertifikatı və ya provably fair yoxlaması varsa',
      'Oyunda RNG sertifikatı və ya nəticənin ədalətliliyini yoxlama aləti varsa',
    ],
    ['Bank və ya wallet', 'Bank və ya kripto pul kisəsi'],
    [
      'Android iPhone-a quraşdırılmayan APK-dan istifadə edir.',
      'Android tətbiqi APK formatındadır və bu fayl iPhone-a quraşdırılmır.',
    ],
    [
      'Yeni versiya açılıb daxil olana qədər mövcud tətbiqi silməyin.',
      'Yeni versiyanın açıldığına və hesabınıza daxil ola bildiyinizə əmin olanadək mövcud tətbiqi silməyin.',
    ],
    ['əlçatanlıq hesabla regiondan asılıdır', 'əlçatanlıq hesabdan və regiondan asılıdır'],
    ['Etibar etdiyiniz birinə danışın', 'Etibar etdiyiniz biri ilə danışın'],
    [
      'əsas xərclər üçün olan pulu istifadə etməyin',
      'əsas xərclər üçün nəzərdə tutulan puldan istifadə etməyin',
    ],
    [
      'Qumar imtina edə biləcəyiniz əyləncə olaraq qalmalıdır',
      'Qumar istənilən vaxt dayandıra biləcəyiniz əyləncə olaraq qalmalıdır',
    ],
    [
      'Kimsənin qumarı sizi narahat edirsə, sakit və şəxsi vaxt seçin.',
      'Kiminsə qumar oynaması sizi narahat edirsə, sakit, təkbətək söhbət üçün uyğun vaxt seçin.',
    ],
    [
      'Nəzarəti ələ almadan əlaqə qurmağa kömək edin.',
      'Şəxsin nəzarətini əlindən almadan yardım xidməti ilə əlaqə saxlamasına kömək edin.',
    ],
    ['itkiləri geri qaytarmağa çalışmayın', 'itkiləri geri qazanmağa çalışmayın'],
    ['itkiləri qaytarmaq təzyiqi', 'itkiləri geri qazanmaq təzyiqi'],
    ['1win hamı üçün dayanıb', '1win hamıda işləmir'],
    ['bu təlimatı əlfəcinə əlavə edin', 'bu təlimatı əlfəcin kimi saxlayın'],
    ['giriş yenə alınmırsa', 'yenə daxil ola bilmirsinizsə'],
    [
      'aşağı komissiya və ya az təsdiq',
      'aşağı şəbəkə komissiyası və ya kifayət qədər təsdiqin olmaması',
    ],
    ['mövcud nəticəni qeyd edin', 'mövcud seçimlərdən birini seçin'],
    [
      'Bir uduzma qalib kombinasiya saxlaya bilər.',
      'Bir seçim uduzsa belə, digər kombinasiyalar qalib qala bilər.',
    ],
    [
      'İstənilən uduzan seçim ekspressi uduzmuş edir və bonusu silir.',
      'Seçimlərdən hər hansı biri uduzarsa, ekspress uduzur və bonus ləğv olunur.',
    ],
    ['çoxoyunçulu crash oyunu', 'çoxnəfərlik crash oyunu'],
    [
      'RTP çoxsaylı mərclər üzrə nəzəri uzunmüddətli gəlirdir',
      'RTP çoxsaylı mərclər üzrə oyunçuya nəzəri uzunmüddətli geri qaytarılma faizidir',
    ],
    ['nəzəri gəliri', 'oyunçuya nəzəri geri qaytarılma faizini'],
    ['lobisində', 'lobbisində'],
    [' lobi', ' lobbi'],
    ['Matçöncəsi', 'Matçdan əvvəl'],
    ['Matç öncəsi', 'Matçdan əvvəl'],
    ['Spribe-in', 'Spribe şirkətinin'],
    ['Spribe-ın', 'Spribe şirkətinin'],
    ['Aviator vs Lucky Jet', 'Aviator və Lucky Jet'],
    ['Lucky Jet vs Aviator', 'Lucky Jet və Aviator'],
    ['hədəf əmsal təyin edin', 'hədəf əmsalı təyin edin'],
    ['e-cüzdan', 'elektron pul kisəsi'],
  ],
  bn: [
    ['এই সাইট শুধু প্রাপ্তবয়স্কদের।', 'এই সাইট শুধু প্রাপ্তবয়স্কদের জন্য।'],
    [
      'এই তথ্য থেকে সম্ভাব্য আর্থিক ক্ষতির দায় আমরা নিই না।',
      'এই তথ্য ব্যবহারের ফলে কোনো আর্থিক ক্ষতি হলে তার দায় আমরা নিই না।',
    ],
    [
      '© 2026 <a href="/bn">1Win</a>, 1Win N.V. পরিচালিত, Curaçao Gaming Authority লাইসেন্স <a href="/bn/safety#licensing">OGL/2024/587/0621</a>',
      '© 2026 <a href="/bn">1Win</a>। Curaçao Gaming Authority-এর B2C লাইসেন্স <a href="/bn/safety#licensing">OGL/2024/587/0621</a>-এর অধীনে সাইটটি 1Win N.V. দ্বারা পরিচালিত।',
    ],
    [
      'Curaçao Gaming Authority-এর B2C লাইসেন্স <a href="/bn/safety#licensing">OGL/2024/587/0621</a>-এর অধীনে 1Win N.V. পরিচালিত।',
      'Curaçao Gaming Authority-এর B2C লাইসেন্স <a href="/bn/safety#licensing">OGL/2024/587/0621</a>-এর অধীনে সাইটটি 1Win N.V. দ্বারা পরিচালিত।',
    ],
    ['সর্বোচ্চ 600% + 500 ফ্রি স্পিন', 'সর্বোচ্চ 600% + সর্বোচ্চ 500 ফ্রি স্পিন'],
    ['কার্ড বা ওয়ালেটে', 'যোগ্য কার্ড বা ই-ওয়ালেটে'],
    ['উইথড্র করলে চালু বোনাস বাতিল হয়', 'উইথড্র করলে চালু বোনাস বাতিল হতে পারে'],
    ['বাদ দেওয়া গেমের খেলা', 'বাদ দেওয়া গেমে খেলা'],
    [
      'যোগ্য কম্বো জয়ে 7–15% যোগ হতে পারে',
      'যোগ্য অ্যাকুমুলেটরের নিট মুনাফায় ৭–১৫% যোগ হতে পারে',
    ],
    ['নিরাপদ খেলার ব্যবহারিক নিয়ম', 'ঝুঁকি কমিয়ে খেলার ব্যবহারিক নিয়ম'],
    [
      'লিমিট দিন, বিরতি নিন বা সেলফ-এক্সক্লুড করুন',
      'সীমা নির্ধারণ করুন, বিরতি নিন বা সেলফ-এক্সক্লুশন চালু করুন',
    ],
    ['অ্যাকাউন্ট কেড়ে নেওয়া হয়েছে', 'অ্যাকাউন্টের নিয়ন্ত্রণ অন্যের হাতে গেছে'],
    ['স্ক্যাম ধরুন', 'এটি প্রতারণা বলে ধরে নিন'],
    ['না-চাওয়া সাপোর্ট মেসেজ', 'অনাকাঙ্ক্ষিত সাপোর্ট বার্তা'],
    ['কেউ 1win সাজার চেষ্টা', 'কেউ 1win সেজে প্রতারণার চেষ্টা'],
    ['এটা ফি দিয়ে উইথড্র খোলার প্রতারণা', 'এটি অগ্রিম ফি আদায়ের প্রতারণা'],
    [
      'সাধারণ চেক এড়াতে চাপ দিচ্ছে',
      'স্বাভাবিক যাচাই এড়িয়ে দ্রুত সিদ্ধান্ত নিতে চাপ দিচ্ছে',
    ],
    ['KYC অ্যাকাউন্টে আপলোড করুন', 'KYC নথি অ্যাকাউন্টে আপলোড করুন'],
    [
      'ক্রিপ্টোতে পেমেন্ট করলে কি KYC লাগে না?',
      'ক্রিপ্টো দিয়ে পেমেন্ট করলে কি KYC এড়ানো যায়?',
    ],
    ['শেষ সময়', 'কাট-অফ সময়'],
    ['দুবার টাকা কাটতে', 'দুবার টাকা কাটা যেতে পারে'],
    ['দুবার টাকা কাটা যেতে বা', 'দুবার টাকা কাটা যেতে পারে বা'],
    [
      'প্রাপক ও বর্তমান সময় নিশ্চিত করে',
      'প্রাপক ও বর্তমান আনুমানিক সময় নিশ্চিত করুন এবং',
    ],
    ['পেটেবল প্যানেল', 'পে-টেবিল প্যানেল'],
    ['সর্বোচ্চ জিত', 'সর্বোচ্চ পেআউট'],
    [
      'প্লেন উড়তে থাকা অবস্থায় সেটি পৌঁছালে গেম বাজিটি বন্ধ করে',
      'লক্ষ্য মাল্টিপ্লায়ারে পৌঁছালে গেমটি বাজিটি স্বয়ংক্রিয়ভাবে ক্যাশ আউট করে',
    ],
    [
      'ওই মানে Lucky Joe উড়তে থাকলে বাজিটি নিজে ক্যাশ আউট হবে; এই সেটিং ফলে প্রভাব ফেলে না।',
      'Lucky Joe ওই মানে পৌঁছালে বাজিটি স্বয়ংক্রিয়ভাবে ক্যাশ আউট হবে; এই সেটিং ফলকে প্রভাবিত করে না।',
    ],
    [
      'ক্যাসিনো, স্পোর্টস ও ক্যাশিয়ার একই অ্যাকাউন্ট ব্যবহার করে।',
      'ক্যাসিনো, স্পোর্টস ও ক্যাশিয়ার—সবই একই অ্যাকাউন্টে ব্যবহার করা যায়।',
    ],
    ['একবার উইথড্র করে অপেক্ষা করুন', 'একটি ট্রান্সফার পাঠিয়ে অপেক্ষা করুন'],
    ['memo/tag', 'মেমো বা ট্যাগ'],
    ['seed phrase', 'রিকভারি ফ্রেজ'],
    ['vs Lucky Jet', 'Lucky Jet-এর সঙ্গে তুলনা'],
    ['>Demo<', '>ডেমো<'],
    ['অ্যাপ মুছার', 'অ্যাপ মোছার'],
    ['ভাগ্যনির্ভর খেলায় আসল টাকা হারাতে পারে', 'ভাগ্যনির্ভর খেলায় খেলোয়াড় আসল টাকা হারাতে পারে'],
    ['4 ডিপোজিট', 'চারটি ডিপোজিট'],
  ],
};

function applyCopyReplacements(content, relativePath) {
  const locale = relativePath.includes('/') ? relativePath.split('/')[0] : 'en';
  for (const [from, to] of localeCopyReplacements[locale] ?? []) {
    content = content.replaceAll(from, to);
  }
  return content;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function updateMeta(content, attribute, name, value) {
  const pattern = new RegExp(
    `<meta ${attribute}="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" content="[^"]*">`,
  );
  return content.replace(
    pattern,
    `<meta ${attribute}="${name}" content="${escapeHtml(value)}">`,
  );
}

function normalizeJsonLd(content, relativePath, title, description) {
  const isEnglishHome = relativePath === 'index.html';
  const isLocalizedHome =
    relativePath.endsWith('/index.html') && relativePath !== 'index.html';

  return content.replace(
    /  <script type="application\/ld\+json">([\s\S]*?)<\/script>\r?\n/g,
    (full, source) => {
      let data;
      try {
        data = JSON.parse(source);
      } catch {
        return full;
      }

      const type = data['@type'];

      if (type === 'Organization') {
        if (isLocalizedHome) return '';
        if (isEnglishHome) {
          data['@id'] = organizationId;
          data.url = 'https://1winex.com/';
          data.logo = {
            '@type': 'ImageObject',
            url: 'https://1winex.com/apple-touch-icon.png',
            width: 180,
            height: 180,
          };
        }
      }

      if (type === 'WebSite') {
        if (isLocalizedHome) return '';
        if (isEnglishHome) {
          data['@id'] = websiteId;
          data.url = 'https://1winex.com/';
          data.publisher = { '@id': organizationId };
        }
      }

      if (type === 'WebPage' || type === 'CollectionPage') {
        if (title) data.name = title;
        if (description) data.description = description;
        if (data.isPartOf) data.isPartOf = { '@id': websiteId };
        if (data.author) data.author = { '@id': organizationId };
      }

      if (
        type === 'CollectionPage' &&
        (relativePath === 'de/casino.html' ||
          relativePath === 'it/casino.html') &&
        data.mainEntity?.['@type'] === 'ItemList'
      ) {
        for (const item of data.mainEntity.itemListElement ?? []) {
          if (typeof item.name === 'string') {
            item.name = item.name.replace(/(\d+)\.(\d{2})%/g, '$1,$2 %');
          }
        }
      }

      return `  <script type="application/ld+json">${JSON.stringify(data)}</script>\n`;
    },
  );
}

for (const relativePath of pages) {
  const filePath = resolve(root, relativePath);
  let content = await readFile(filePath, 'utf8');
  const title = titleUpdates[relativePath];
  const description =
    localizedDescriptionUpdates[relativePath] ?? descriptionUpdates[relativePath];
  const socialDescription = socialDescriptionUpdates[relativePath];
  const socialImageAlt = socialImageAltUpdates[relativePath];

  if (title) {
    content = content.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(title)}</title>`,
    );
    content = updateMeta(content, 'property', 'og:title', title);
    content = updateMeta(content, 'name', 'twitter:title', title);
  }

  if (description) {
    content = updateMeta(content, 'name', 'description', description);
    content = updateMeta(content, 'property', 'og:description', description);
    content = updateMeta(content, 'name', 'twitter:description', description);
  } else if (socialDescription) {
    content = updateMeta(
      content,
      'property',
      'og:description',
      socialDescription,
    );
    content = updateMeta(
      content,
      'name',
      'twitter:description',
      socialDescription,
    );
  }

  if (socialImageAlt) {
    content = updateMeta(
      content,
      'property',
      'og:image:alt',
      socialImageAlt,
    );
    content = updateMeta(
      content,
      'name',
      'twitter:image:alt',
      socialImageAlt,
    );
  }

  if (h1Updates[relativePath]) {
    content = content.replace(
      /<h1>[\s\S]*?<\/h1>/,
      `<h1>${escapeHtml(h1Updates[relativePath])}</h1>`,
    );
  }

  if (relativePath.startsWith('az/')) {
    content = content.replace(/Benqali+/g, 'Benqal');
  }

  content = content
    .replaceAll('Français (Côte d’Ivoire)', 'Français')
    .replaceAll('Recommandés', 'Recommandées')
    .replaceAll('©2026', '© 2026')
    .replaceAll('со статусом Active', 'со статусом «Active» (активна)')
    .replaceAll('зі статусом Active', 'зі статусом «Active» (активна)')
    .replaceAll('si le site ne charge pas', 'si le site ne se charge pas')
    .replaceAll('le site ne charge pas', 'le site ne se charge pas');

  content = applyCopyReplacements(content, relativePath);

  if (errorImageAltUpdates[relativePath]) {
    content = content.replace(
      /<img\b[^>]*1win-404-art\.webp[^>]*>/,
      (image) =>
        image
          .replace(
            'alt=""',
            `alt="${escapeHtml(errorImageAltUpdates[relativePath])}"`,
          )
          .replace(/\saria-hidden="true"/, ''),
    );
  }

  content = content.replace(
    /<img\b([^>]*\balt=""[^>]*)>/g,
    (full, attributes) =>
      attributes.includes('aria-hidden=')
        ? full
        : `<img${attributes} aria-hidden="true">`,
  );

  content = content.replace(
    /<link rel="sitemap" type="application\/xml" href="[^"]+">/,
    '<link rel="sitemap" type="application/xml" href="https://1winex.com/sitemap.xml">',
  );

  if (relativePath === 'index.html' && !content.includes('rel="preload" as="image"')) {
    content = content.replace(
      '  <link rel="preconnect" href="https://fonts.googleapis.com">',
      '  <link rel="preload" as="image" href="./images/1win-hero-fan.webp?v=1" type="image/webp" fetchpriority="high">\n  <link rel="preconnect" href="https://fonts.googleapis.com">',
    );
  } else if (
    relativePath.endsWith('/index.html') &&
    !content.includes('rel="preload" as="image"')
  ) {
    content = content.replace(
      '  <link rel="preconnect" href="https://fonts.googleapis.com">',
      '  <link rel="preload" as="image" href="/images/1win-hero-fan.webp?v=1" type="image/webp" fetchpriority="high">\n  <link rel="preconnect" href="https://fonts.googleapis.com">',
    );
  }

  content = normalizeJsonLd(content, relativePath, title, description);
  await writeFile(filePath, content);
}

console.log(`Applied SEO fixes to ${pages.length} HTML files.`);
