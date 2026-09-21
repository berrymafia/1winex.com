const $="1winex-chat-v2",te="1winex-chat-theme",ae=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"/api/chat":"https://api-chat.net/api/chat",ne="1winex",H="1winex-chat-root";function re(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":"en"}function W(e,t,a,r,o,s,c){const i=re();return i==="it"?c:i==="uk"?s:i==="ru"?t:i==="es"?a:i==="fr"?r:i==="de"?o:e}async function oe(e,t,a){let r;try{r=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),signal:a})}catch(i){if(i?.name==="AbortError"){t.onDone();return}t.onError(W("Network error. Please try again.","Нет соединения. Попробуйте ещё раз.","No hay conexión. Inténtalo de nuevo.","Pas de connexion. Réessayez.","Netzwerkfehler. Versuch’s nochmal.","Немає з'єднання. Спробуйте ще раз.","Nessuna connessione. Riprova."));return}if(!r.ok){let i=W("Request failed. Please try again.","Не удалось получить ответ. Попробуйте ещё раз.","No llegó la respuesta. Inténtalo de nuevo.","Pas de réponse. Réessayez.","Anfrage fehlgeschlagen. Versuch’s nochmal.","Не вдалося отримати відповідь. Спробуйте ще раз.","Richiesta non riuscita. Riprova.");try{const h=await r.json();h?.error&&(i=h.error)}catch{}t.onError(i);return}if(!r.body){t.onError(W("Empty response from server.","Сервер вернул пустой ответ.","El servidor no mandó nada.","Le serveur n’a rien renvoyé.","Leere Antwort vom Server.","Сервер повернув порожню відповідь.","Il server non ha inviato nulla."));return}const o=r.body.getReader(),s=new TextDecoder;let c="";try{for(;;){const{done:i,value:h}=await o.read();if(i)break;c+=s.decode(h,{stream:!0});const f=c.split(`
`);c=f.pop()||"";for(const g of f){const u=g.trim();if(!u.startsWith("data:"))continue;const b=u.slice(5).trim();if(b){if(b==="[DONE]"){t.onDone();return}try{const p=JSON.parse(b);p.type==="delta"&&p.delta?t.onDelta(p.delta):p.type==="error"?t.onError(p.error||W("Assistant error.","Ошибка помощника.","Error del asistente.","Erreur de l’assistant.","Fehler des Assistenten.","Помилка помічника.","Errore dell’assistente.")):p.type}catch{}}}}t.onDone()}catch(i){if(i?.name==="AbortError"){t.onDone();return}t.onError(W("Stream interrupted. Please try again.","Ответ прервался. Попробуйте ещё раз.","Se cortó la respuesta. Inténtalo de nuevo.","La réponse s’est interrompue. Réessayez.","Antwort unterbrochen. Versuch’s nochmal.","Відповідь перервалася. Спробуйте ще раз.","Risposta interrotta. Riprova."))}}const ie=3500;function se(){const e=document.title||"",t=location.href,r=(document.querySelector("main")||document.querySelector("article")||document.querySelector(".review-content")||document.querySelector(".page-content")||document.body).cloneNode(!0);r.querySelectorAll('script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]').forEach(s=>s.remove());const o=(r.textContent||"").replace(/\s+/g," ").trim().slice(0,ie);return{title:e,url:t,snippet:o}}function le(e){const t='a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function a(){return Array.from(e.querySelectorAll(t)).filter(o=>!o.hasAttribute("disabled")&&o.offsetParent!==null)}function r(o){if(o.key!=="Tab")return;const s=a();if(s.length===0){o.preventDefault();return}const c=s[0],i=s[s.length-1];o.shiftKey?document.activeElement===c&&(o.preventDefault(),i.focus()):document.activeElement===i&&(o.preventDefault(),c.focus())}return{activate(){e.addEventListener("keydown",r),(a()[0]||e).focus()},deactivate(){e.removeEventListener("keydown",r)}}}const ce="modulepreload",de=function(e,t){return new URL(e,t).href},K={},A=function(t,a,r){let o=Promise.resolve();if(a&&a.length>0){const c=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),h=i?.nonce||i?.getAttribute("nonce");o=Promise.allSettled(a.map(f=>{if(f=de(f,r),f in K)return;K[f]=!0;const g=f.endsWith(".css"),u=g?'[rel="stylesheet"]':"";if(!!r)for(let y=c.length-1;y>=0;y--){const x=c[y];if(x.href===f&&(!g||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${u}`))return;const p=document.createElement("link");if(p.rel=g?"stylesheet":ce,g||(p.as="script"),p.crossOrigin="",p.href=f,h&&p.setAttribute("nonce",h),document.head.appendChild(p),g)return new Promise((y,x)=>{p.addEventListener("load",y),p.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(c){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=c,window.dispatchEvent(i),!i.defaultPrevented)throw c}return o.then(c=>{for(const i of c||[])i.status==="rejected"&&s(i.reason);return t().catch(s)})};let O=null,z=null,M=null;async function ue(){return(await A(()=>import("./chat-widget-core-Cy0t5JvF.js"),[],import.meta.url)).default}async function pe(){if(!O||!z){const[e,t]=await Promise.all([A(()=>import("./chat-widget-marked.esm-DweX3G3F.js"),[],import.meta.url),A(()=>import("./chat-widget-purify.es-BnINGy_Y.js"),[],import.meta.url)]);O=e,z=t,e.marked.setOptions({gfm:!0,breaks:!0})}return{marked:O.marked,DOMPurify:z.default}}async function me(){if(M)return M;const e=await ue(),t=await Promise.all([A(()=>import("./chat-widget-javascript-DUNaicwC.js"),[],import.meta.url),A(()=>import("./chat-widget-typescript-5pldp2kO.js"),[],import.meta.url),A(()=>import("./chat-widget-json-DdsocbVI.js"),[],import.meta.url),A(()=>import("./chat-widget-bash-I8pq0VWm.js"),[],import.meta.url),A(()=>import("./chat-widget-xml-FcirFJJ2.js"),[],import.meta.url),A(()=>import("./chat-widget-css-AVCICof-.js"),[],import.meta.url),A(()=>import("./chat-widget-python-C7NRPp2R.js"),[],import.meta.url)]);return["javascript","typescript","json","bash","xml","css","python"].forEach((r,o)=>e.registerLanguage(r,t[o].default)),M=e,e}const j={ALLOWED_TAGS:["p","br","strong","em","u","s","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","table","thead","tbody","tr","th","td","hr","span","button","div"],ALLOWED_ATTR:["href","title","target","rel","class","data-lang","type","aria-label"]},he="nofollow noopener noreferrer",ge=new Set(["1winex.com","www.1winex.com"]);function B(e){return!(!e||e.startsWith("#")||/^(mailto|tel|javascript|data):/i.test(e))}function fe(e){try{const t=typeof location<"u"?location.href:"https://1winex.com/",a=new URL(e,t).pathname.replace(/\/+$/,"")||"/";return a==="/go"||a==="/apk"}catch{return!1}}function we(e){const t=e.trim();if(!B(t)||fe(t))return!1;if(!/^https?:\/\//i.test(t)&&!t.startsWith("//"))return!/^[a-z][a-z0-9+.-]*:/i.test(t);try{const a=t.startsWith("//")?`https:${t}`:t,r=new URL(a).hostname.toLowerCase();if(ge.has(r)||typeof location<"u"&&location.hostname&&r===location.hostname.toLowerCase())return!0}catch{return!1}return!1}function J(e){e.querySelectorAll("a[href]").forEach(t=>{const a=t,r=(a.getAttribute("href")||"").trim();if(!B(r))return;const o=/^https?:\/\//i.test(r)||r.startsWith("//"),s=!o&&!/^[a-z][a-z0-9+.-]*:/i.test(r);if(!(!o&&!s)){if(we(r)){a.removeAttribute("target"),a.removeAttribute("rel");return}a.setAttribute("target","_blank"),a.setAttribute("rel",he)}})}function be(e){const t=document.createElement("div");return t.innerHTML=e,J(t),t.innerHTML}async function ve(e){const{marked:t,DOMPurify:a}=await pe(),r=await t.parse(e||"");let o=a.sanitize(String(r),j);if(/<pre[\s>]/i.test(o)){const s=await me(),c=document.createElement("div");c.innerHTML=o,c.querySelectorAll("pre code").forEach(i=>{const h=i,g=(h.className||"").match(/language-([\w-]+)/)?.[1];try{g&&s.getLanguage(g)?h.innerHTML=s.highlight(h.textContent||"",{language:g}).value:h.innerHTML=s.highlightAuto(h.textContent||"").value}catch{}const u=h.parentElement;if(u&&u.tagName==="PRE"&&!u.querySelector(".aw-code-copy")){u.setAttribute("data-lang",g||"code");const b=document.createElement("button");b.type="button",b.className="aw-code-copy";const p=(document.documentElement.lang||"").toLowerCase(),y=p.startsWith("uk")?{aria:"Копіювати код",text:"Копіювати"}:p.startsWith("ru")?{aria:"Копировать код",text:"Копировать"}:p.startsWith("es")?{aria:"Copiar código",text:"Copiar"}:p.startsWith("fr")?{aria:"Copier le code",text:"Copier"}:p.startsWith("de")?{aria:"Code kopieren",text:"Kopieren"}:p.startsWith("it")?{aria:"Copia codice",text:"Copia"}:{aria:"Copy code",text:"Copy"};b.setAttribute("aria-label",y.aria),b.textContent=y.text,u.appendChild(b)}}),o=a.sanitize(c.innerHTML,j)}return be(o)}function Q(){try{const e=localStorage.getItem($);if(!e)return null;const t=JSON.parse(e);return!t||!Array.isArray(t.messages)?null:t}catch{return null}}function _e(e){try{localStorage.setItem($,JSON.stringify(e))}catch{}}function ye(){const e=Q();return e?e.messages.slice(-60):[]}function xe(){return!!Q()?.unread}function Ae(e,t=!1){_e({messages:e.slice(-60),updatedAt:Date.now(),unread:!!t})}function Ee(){try{const e=localStorage.getItem(te);if(e==="light"||e==="dark")return e}catch{}return"dark"}function Ce(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":"en"}function v(e,t,a,r,o,s,c,i){return e==="it"?i:e==="uk"?c:e==="ru"?a:e==="es"?r:e==="fr"?o:e==="de"?s:t}const ke=["What license does 1win have?","What does WINEX600 give?","How fast are withdrawals?","How do I install the app?"],We=["Какая лицензия у 1win?","Что входит в WINEX600?","Как быстро приходит вывод?","Как установить приложение?"],Le=["¿Qué licencia tiene 1win?","¿Qué incluye WINEX600?","¿Cuánto tarda un retiro?","¿Cómo instalo la app?"],Ie=["Quelle licence a 1win ?","Que contient WINEX600 ?","Combien de temps pour un retrait ?","Comment installer l’app ?"],Se=["Welche Lizenz hat 1win?","Was gehört zu WINEX600?","Wie schnell kommt die Auszahlung?","Wie installiere ich die App?"],Ne=["Яка ліцензія у 1win?","Що входить у WINEX600?","Як швидко приходить виведення?","Як установити додаток?"],Pe=["Che licenza ha 1win?","Cosa include WINEX600?","Quanto ci mette un prelievo?","Come installo l’app?"];function _(e,t=4){const a=[],r=new Set;for(const o of e){const s=String(o||"").replace(/\s+/g," ").trim();if(!s)continue;const c=s.toLowerCase();if(!r.has(c)&&(r.add(c),a.push(s),a.length>=t))break}return a}function Te(e=location.pathname){const a=(e.replace(/\/+$/,"")||"/").split("/").filter(Boolean);if(!a.length)return"index";let r=0;if((a[0]==="ru"||a[0]==="es"||a[0]==="fr"||a[0]==="de"||a[0]==="uk"||a[0]==="it")&&(r=1),!a[r]||a[r]==="index")return"index";let o=a[r].replace(/\.html$/i,"");return o==="betting"?"sports":o==="app"?"mobile":o==="casino"?"games":o}function Re(e=typeof location<"u"?location.pathname:"/"){const t=Te(e),a=Ce();return _(t==="bonuses"?v(a,["What does WINEX600 give?","What are the wagering terms?","When do I enter WINEX600?","How do I get the welcome bonus?"],["Что входит в приветственный бонус?","Какие условия отыгрыша?","Как ввести WINEX600?","Как активировать WINEX600?"],["¿Qué incluye el bono de bienvenida?","¿Cuál es el rollover?","¿Cómo introduzco WINEX600?","¿Cómo activo WINEX600?"],["Que comprend le bonus de bienvenue ?","Quelles sont les conditions de mise ?","Comment saisir WINEX600 ?","Comment activer WINEX600 ?"],["Was gehört zum Willkommensbonus?","Welche Umsatzbedingungen gelten?","Wann gebe ich WINEX600 ein?","Wie aktiviere ich WINEX600?"],["Що входить у вітальний бонус?","Які умови відіграшу?","Як ввести WINEX600?","Як активувати WINEX600?"],["Cosa include il bonus di benvenuto?","Qual è il rollover?","Come inserisco WINEX600?","Come attivo WINEX600?"]):t==="payments"?v(a,["How fast are withdrawals?","Can I deposit with crypto?","Where do I see withdrawal limits?","When does KYC come up?"],["Как быстро приходит вывод?","Можно ли пополнить криптой?","Где проверить лимиты вывода?","Когда просят документы?"],["¿Cuánto tarda un retiro?","¿Puedo depositar con cripto?","¿Dónde veo los límites de retiro?","¿Cuándo piden documentos?"],["Combien de temps pour un retrait ?","On peut déposer en crypto ?","Où voir les limites de retrait ?","Quand on demande des documents ?"],["Wie schnell kommt die Auszahlung?","Kann ich mit Krypto einzahlen?","Wo sehe ich Auszahlungslimits?","Wann werden Dokumente verlangt?"],["Як швидко приходить виведення?","Чи можна поповнити криптою?","Де перевірити ліміти виведення?","Коли просять документи?"],["Quanto ci mette un prelievo?","Posso depositare in crypto?","Dove vedo i limiti di prelievo?","Quando chiedono il KYC?"]):t==="mobile"?v(a,["How do I install the Android APK?","Can I use 1win on iPhone?","Can I open 1win in the browser?","Where should I download the APK?"],["Как установить Android APK?","Как играть в 1win на iPhone?","Можно ли играть без приложения — через браузер?","Где скачать APK?"],["¿Cómo instalo el APK de Android?","¿Cómo juego en 1win en iPhone?","¿Puedo jugar sin app — en el navegador?","¿De dónde descargo el APK?"],["Comment installer l’APK Android ?","Comment jouer à 1win sur iPhone ?","On peut jouer sans app — dans le navigateur ?","D’où télécharger l’APK ?"],["Wie installiere ich die Android-APK?","Wie spiele ich 1win auf dem iPhone?","Kann ich ohne App im Browser spielen?","Wo lade ich die APK herunter?"],["Як установити Android APK?","Як грати в 1win на iPhone?","Чи можна грати без додатка — через браузер?","Де завантажити APK?"],["Come installo l’APK Android?","Come uso 1win su iPhone?","Posso giocare senza app, nel browser?","Dove scarico l’APK?"]):t==="games"?v(a,["What games are in the casino?","Where do I see a game RTP?","Are there live tables?","Do slots count toward the bonus?"],["Какие игры есть в казино?","Где проверить RTP игры?","Есть ли живые столы?","Идут ли слоты в приветственный бонус?"],["¿Qué juegos hay en el casino?","¿Dónde veo el RTP de un juego?","¿Hay mesas en vivo?","¿Las tragamonedas cuentan para el bono?"],["Quels jeux il y a dans le casino ?","Où voir le RTP d’un jeu ?","Il y a des tables en direct ?","Les machines à sous comptent pour le bonus ?"],["Welche Spiele gibt es im Casino?","Wo sehe ich den RTP eines Spiels?","Gibt es Live-Tische?","Zählen Slots für den Willkommensbonus?"],["Які ігри є в казино?","Де перевірити RTP гри?","Чи є живі столи?","Чи йдуть слоти у вітальний бонус?"],["Quali giochi ci sono nel casino?","Dove vedo l’RTP di un gioco?","Ci sono tavoli live?","Le slot contano per il bonus di benvenuto?"]):t==="aviator"?v(a,["Where do I see Aviator RTP?","Is Aviator a 1win Original?","Does Aviator count toward the welcome bonus?","What is auto cash-out in Aviator?"],["Где проверить RTP Aviator?","Aviator это 1win Original?","Идёт ли Aviator в приветственный бонус?","Что такое автокэшаут в Aviator?"],["¿Dónde veo el RTP de Aviator?","¿Aviator es un 1win Original?","¿Aviator cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"],["Où voir le RTP d’Aviator ?","Aviator, c’est un 1win Original ?","Aviator compte pour le bonus de bienvenue ?","C’est quoi l’encaissement automatique ?"],["Wo sehe ich den RTP von Aviator?","Ist Aviator ein 1win Original?","Zählt Aviator für den Willkommensbonus?","Was ist Auto-Cashout in Aviator?"],["Де перевірити RTP Aviator?","Aviator — це 1win Original?","Чи йде Aviator у вітальний бонус?","Що таке автокешаут Aviator?"],["Dove vedo l’RTP di Aviator?","Aviator è un 1win Original?","Aviator conta per il bonus di benvenuto?","Cos’è l’incasso automatico in Aviator?"]):t==="lucky-jet"?v(a,["Where do I see Lucky Jet RTP?","Is Lucky Jet the same as Aviator?","Does Lucky Jet count toward the welcome bonus?","What is auto cash-out in Lucky Jet?"],["Где проверить RTP Lucky Jet?","Lucky Jet это то же, что Aviator?","Идёт ли Lucky Jet в приветственный бонус?","Что такое автокэшаут в Lucky Jet?"],["¿Dónde veo el RTP de Lucky Jet?","¿Lucky Jet es lo mismo que Aviator?","¿Lucky Jet cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"],["Où voir le RTP de Lucky Jet ?","Lucky Jet, c’est le même jeu qu’Aviator ?","Lucky Jet compte pour le bonus de bienvenue ?","C’est quoi l’encaissement automatique ?"],["Wo sehe ich den RTP von Lucky Jet?","Ist Lucky Jet dasselbe wie Aviator?","Zählt Lucky Jet für den Willkommensbonus?","Was ist Auto-Cashout in Lucky Jet?"],["Де перевірити RTP Lucky Jet?","Lucky Jet — це те саме, що Aviator?","Чи йде Lucky Jet у вітальний бонус?","Що таке автокешаут Lucky Jet?"],["Dove vedo l’RTP di Lucky Jet?","Lucky Jet è lo stesso di Aviator?","Lucky Jet conta per il bonus di benvenuto?","Cos’è l’incasso automatico in Lucky Jet?"]):t==="sports"?v(a,["How do I place a sports bet?","Can I cash out a sports bet?","What is the multiple bet bonus?","Do casino and sports bonuses share a wallet?"],["Как поставить на спорт?","Есть ли кэшаут?","Что такое бонус на экспресс?","Бонусы казино и спорта на одном балансе?"],["¿Cómo apuesto al deporte?","¿Hay cash out en 1win?","¿Qué es el bono por combinada?","¿Los bonos de casino y de deporte van juntos?"],["Comment parier sur le sport ?","On peut encaisser un pari ?","C’est quoi le bonus combiné ?","Les bonus casino et sport vont ensemble ?"],["Wie wette ich auf Sport?","Gibt es Cash-out?","Was ist der Kombiwetten-Bonus?","Laufen Casino- und Sportboni auf demselben Guthaben?"],["Як зробити ставку на спорт?","Чи є кешаут?","Що таке бонус на експрес?","Чи йдуть бонуси казино й спорту на одному балансі?"],["Come scommetto sullo sport?","C’è il cash-out su 1win?","Cos’è il bonus combinata?","I bonus casino e sport condividono lo stesso saldo?"]):t==="safety"?v(a,["What license does 1win have?","When does KYC come up?","How do I know the site is real?","How do I turn on 2FA?"],["Какая лицензия у 1win?","Когда просят документы?","Как понять, что сайт настоящий?","Как включить 2FA?"],["¿Qué licencia tiene 1win?","¿Cuándo piden documentos?","¿Cómo sé que es el sitio de verdad?","¿Cómo activo el 2FA?"],["Quelle licence a 1win ?","Quand on demande des documents ?","Comment savoir que c’est le vrai site ?","Comment activer le 2FA ?"],["Welche Lizenz hat 1win?","Wann werden Dokumente verlangt?","Wie erkenne ich die echte 1win-Seite?","Wie aktiviere ich 2FA?"],["Яка ліцензія у 1win?","Коли просять документи?","Як зрозуміти, що це справжній сайт 1win?","Як увімкнути 2FA?"],["Che licenza ha 1win?","Quando chiedono i documenti?","Come so che è il sito vero?","Come attivo il 2FA?"]):t==="faq"?v(a,["How do I register?","How fast are withdrawals?","What does WINEX600 give?","How do I install the app?"],["Как зарегистрироваться?","Как быстро приходит вывод?","Что входит в WINEX600?","Как установить приложение?"],["¿Cómo me registro?","¿Cuánto tarda un retiro?","¿Qué incluye WINEX600?","¿Cómo instalo la app?"],["Comment s’inscrire ?","Combien de temps pour un retrait ?","Que contient WINEX600 ?","Comment installer l’app ?"],["Wie registriere ich mich?","Wie schnell kommt die Auszahlung?","Was gehört zu WINEX600?","Wie installiere ich die App?"],["Як зареєструватися?","Як швидко приходить виведення?","Що входить у WINEX600?","Як установити додаток?"],["Come mi registro?","Quanto ci mette un prelievo?","Cosa include WINEX600?","Come installo l’app?"]):t==="responsible-gambling"?v(a,["How do I set a limit or self-exclusion?","How do I set a deposit limit?","How does self-exclusion work?","Where can I get gambling help?"],["Как установить лимит или самоисключение?","Как установить лимит на депозит?","Как работает самоисключение?","Где получить независимую помощь?"],["¿Cómo pongo un límite o la autoexclusión?","¿Cómo pongo un límite de depósito?","¿Cómo funciona la autoexclusión?","¿Dónde pido ayuda con el juego?"],["Comment mettre une limite ou l’auto-exclusion ?","Comment mettre une limite de dépôt ?","Comment marche l’auto-exclusion ?","Où demander de l’aide pour le jeu ?"],["Wie setze ich ein Limit oder eine Selbstsperre?","Wie setze ich ein Einzahlungslimit?","Wie funktioniert die Selbstsperre?","Wo bekomme ich Hilfe beim Glücksspiel?"],["Як установити ліміти або самовиключення?","Як установити ліміт на депозит?","Як працює самовиключення?","Де отримати допомогу з ігровою залежністю?"],["Come imposto i limiti di deposito o l’autoesclusione?","Come imposto un limite di deposito?","Come funziona l’autoesclusione?","Dove chiedo aiuto per il gioco?"]):t==="crypto-casino"?v(a,["How do I deposit Bitcoin or USDT?","Do I still need KYC for crypto?","What if a crypto deposit did not arrive?","Does WINEX600 work with crypto?"],["Как внести Bitcoin или USDT?","Нужен ли KYC для крипты?","Что делать, если крипта не пришла?","Идёт ли WINEX600 с криптой?"],["¿Cómo deposito Bitcoin o USDT?","¿Piden KYC si pago con cripto?","¿Qué hago si el depósito cripto no llega?","¿WINEX600 funciona con cripto?"],["Comment déposer en Bitcoin ou USDT ?","On demande encore le KYC en crypto ?","Que faire si un dépôt crypto n’arrive pas ?","WINEX600 marche avec la crypto ?"],["Wie zahle ich mit Bitcoin oder USDT ein?","Brauche ich für Krypto trotzdem KYC?","Was tun, wenn eine Krypto-Einzahlung nicht ankommt?","Gilt WINEX600 auch mit Krypto?"],["Як поповнити Bitcoin або USDT?","Чи потрібен KYC для крипти?","Що робити, якщо депозит криптою не надійшов?","Чи йде WINEX600 з криптою?"],["Come deposito Bitcoin o USDT?","Chiedono il KYC se pago in crypto?","Cosa faccio se il deposito crypto non arriva?","WINEX600 vale con la crypto?"]):t==="not-working"?v(a,["Why is 1win not opening?","What if the site will not load?","Will the app still open?","How do I sign in if the site is blocked?"],["Почему 1win не открывается?","Что делать, если сайт не грузится?","Откроется ли приложение?","Как войти, если сайт заблокирован?"],["¿Por qué 1win no abre?","¿Qué hago si el sitio no carga?","¿La app abre si el sitio no carga?","¿Cómo entro si el sitio está bloqueado?"],["Pourquoi 1win ne s’ouvre pas ?","Que faire si le site ne charge pas ?","L’app s’ouvre si le site ne charge pas ?","Comment me connecter si le site est bloqué ?"],["Warum öffnet 1win nicht?","Was tun, wenn die Seite nicht lädt?","Öffnet die App trotzdem?","Wie melde ich mich an, wenn die Seite gesperrt ist?"],["Чому 1win не відкривається?","Що робити, якщо сайт не завантажується?","Чи спрацює додаток, якщо сайт не відкривається?","Як увійти, якщо сайт не відкривається?"],["Perché 1win non si apre?","Cosa faccio se il sito non si apre?","L’app si apre se il sito non si apre?","Come accedo se il sito è bloccato?"]):[...v(a,[...ke],[...We],[...Le],[...Ie],[...Se],[...Ne],[...Pe])])}const De=`
.aw-chat {
  --aw-bg: var(--bg, var(--color-bg-secondary, #141415));
  --aw-panel: var(--card, var(--color-bg-card, #1c1c1e));
  --aw-elevated: var(--card-2, var(--color-bg-elevated, #222224));
  --aw-elevated-hover: var(--color-bg-card-hover, #2a2a2c);
  --aw-text: var(--text, var(--color-text-primary, #f0f2f5));
  --aw-text-secondary: var(--color-text-secondary, #c5c9d0);
  --aw-muted: var(--muted, var(--color-text-muted, #8b8f97));
  --aw-border: var(--line, var(--color-border-light, rgba(255,255,255,0.08)));
  --aw-border-soft: var(--color-border, rgba(255,255,255,0.06));
  --aw-primary: var(--blue, var(--color-primary, #0075ff));
  --aw-primary-light: var(--blue-hover, var(--color-primary-light, #1f84ff));
  --aw-primary-hover: var(--blue-press, var(--color-primary-hover, #0062d6));
  --aw-danger: var(--color-error, #ef4444);
  --aw-radius: var(--radius, var(--radius-lg, 20px));
  --aw-radius-md: var(--radius-btn, var(--radius-md, 12px));
  --aw-radius-sm: var(--radius-sm, 14px);
  --aw-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,117,255,0.08);
  --aw-font: var(--font, var(--font-primary, 'Inter', system-ui, sans-serif));
  --aw-font-display: var(--display, var(--font-display, 'Poppins', 'Inter', system-ui, sans-serif));
  --aw-transition: var(--transition-normal, 0.3s cubic-bezier(0.22, 1, 0.36, 1));
  --aw-gradient-btn: var(--gradient-btn-primary, linear-gradient(135deg, #0075ff 0%, #0062d6 100%));
  --aw-gradient-btn-hover: var(--gradient-btn-primary-hover, linear-gradient(135deg, #1f84ff 0%, #0075ff 100%));
  position: fixed;
  z-index: 99990;
  right: 20px;
  bottom: 20px;
  font-family: var(--aw-font);
  color: var(--aw-text);
  pointer-events: none;
  -webkit-font-smoothing: antialiased;
}

.aw-chat[data-theme="light"] {
  --aw-bg: #f1f5f9;
  --aw-panel: #ffffff;
  --aw-elevated: #e8eef6;
  --aw-elevated-hover: #dbe4f0;
  --aw-text: #0f172a;
  --aw-text-secondary: #334155;
  --aw-muted: #64748b;
  --aw-border: rgba(15, 23, 42, 0.12);
  --aw-border-soft: rgba(15, 23, 42, 0.08);
  --aw-shadow: 0 18px 48px rgba(15, 23, 42, 0.16), 0 4px 14px rgba(15, 23, 42, 0.08);
}

.aw-chat * { box-sizing: border-box; }

.aw-chat__toggle {
  pointer-events: auto;
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--color-primary-a25, rgba(0,117,255,0.25));
  background: linear-gradient(135deg, var(--aw-primary-light) 0%, var(--aw-primary) 45%, var(--aw-primary-hover) 100%);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transform-origin: center;
  box-shadow: var(--shadow-glow, 0 4px 30px rgba(0,117,255,0.15)), 0 8px 28px rgba(0,0,0,0.35);
  transition: transform var(--aw-transition), box-shadow var(--transition-fast, 0.15s ease);
}
.aw-chat__toggle:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: var(--shadow-glow-strong, 0 8px 40px rgba(0,117,255,0.25)), 0 10px 32px rgba(0,0,0,0.4);
}
.aw-chat__toggle:focus-visible {
  outline: 2px solid var(--aw-primary);
  outline-offset: 3px;
}
.aw-chat__toggle:active { transform: scale(0.94); }
.aw-chat__toggle svg { width: 26px; height: 26px; }
.aw-chat__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #f43f5e;
  border: 2px solid var(--aw-panel, #0b1220);
  box-shadow: 0 0 0 1px rgba(244, 63, 94, 0.35);
  pointer-events: none;
}
.aw-chat__badge[hidden] { display: none !important; }
@keyframes aw-badge-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
.aw-chat.has-unread .aw-chat__badge {
  animation: aw-badge-pulse 1.6s ease-in-out infinite;
}
@keyframes aw-toggle-enter {
  from { opacity: 0; transform: scale(0.45); }
  to { opacity: 1; transform: scale(1); }
}
.aw-chat__toggle--enter {
  animation: aw-toggle-enter 0.5s ease-out both;
}
@keyframes aw-toggle-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.aw-chat__toggle--spin {
  animation: aw-toggle-spin 0.5s ease;
}

.aw-chat__panel {
  pointer-events: auto;
  position: absolute;
  right: 0;
  bottom: 72px;
  width: min(400px, calc(100vw - 24px));
  height: min(560px, calc(100vh - 110px));
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(180deg, rgba(0,117,255,0.04) 0%, transparent 28%),
    var(--aw-panel);
  border: 1px solid var(--aw-border);
  border-radius: var(--aw-radius);
  box-shadow: var(--aw-shadow);
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px) scale(0.97);
  transform-origin: bottom right;
  transition: opacity var(--aw-transition), transform var(--aw-transition), visibility 0s linear 0.3s;
  visibility: hidden;
  isolation: isolate;
}
.aw-chat__panel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  z-index: 1;
}
.aw-chat.is-open .aw-chat__panel {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
  transition: opacity var(--aw-transition), transform var(--aw-transition), visibility 0s;
}

.aw-chat__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  background: linear-gradient(180deg, var(--aw-bg) 0%, rgba(16,24,39,0.92) 100%);
  border-bottom: 1px solid var(--aw-border);
  z-index: 2;
}
.aw-chat__header::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary-a20, rgba(0,117,255,0.2)), transparent);
  pointer-events: none;
}
.aw-chat__brand {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}
.aw-chat__brand-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  object-fit: cover;
  object-position: center top;
  border: 1px solid var(--color-primary-a25, rgba(0,117,255,0.25));
  box-shadow: 0 2px 10px var(--color-primary-a10, rgba(0,117,255,0.1));
  background: var(--aw-elevated);
}
.aw-chat__brand-text {
  min-width: 0;
}
.aw-chat__brand-text strong {
  display: block;
  font-family: var(--aw-font-display);
  font-size: var(--text-lg, 0.95rem);
  font-weight: var(--font-weight-bold, 700);
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--aw-text);
}
.aw-chat__brand-text span {
  display: block;
  margin-top: 2px;
  font-size: var(--text-2xs, 0.68rem);
  line-height: 1.35;
  color: var(--aw-muted);
}
.aw-chat__header-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.aw-chat__icon-btn {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: var(--aw-radius-sm);
  background: transparent;
  color: var(--aw-muted);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background var(--transition-fast, 0.15s ease), color var(--transition-fast, 0.15s ease);
}
.aw-chat__icon-btn:hover {
  background: var(--color-white-a06, rgba(255,255,255,0.06));
  color: var(--aw-text);
}
.aw-chat__icon-btn:focus-visible {
  outline: 2px solid var(--aw-primary);
  outline-offset: 1px;
}
.aw-chat__icon-btn svg { width: 22px; height: 22px; }

.aw-chat__messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
  background:
    radial-gradient(ellipse 80% 50% at 100% 0%, var(--color-primary-a08, rgba(0,117,255,0.08)), transparent 55%),
    radial-gradient(ellipse 60% 40% at 0% 100%, var(--color-primary-a03, rgba(0,117,255,0.03)), transparent 50%),
    var(--aw-panel);
  scrollbar-width: thin;
  scrollbar-color: var(--color-white-a12, rgba(255,255,255,0.12)) transparent;
}
.aw-chat__messages::-webkit-scrollbar { width: 6px; }
.aw-chat__messages::-webkit-scrollbar-thumb {
  background: var(--color-white-a12, rgba(255,255,255,0.12));
  border-radius: var(--radius-full, 9999px);
}

.aw-chat__empty {
  margin: auto;
  text-align: center;
  color: var(--aw-muted);
  font-size: var(--text-sm, 0.85rem);
  line-height: var(--leading-normal, 1.6);
  padding: 20px 12px 12px;
  max-width: 100%;
  width: 100%;
}
.aw-chat__empty strong {
  display: block;
  font-family: var(--aw-font-display);
  color: var(--aw-text);
  margin-bottom: 8px;
  font-size: 1.05rem;
  font-weight: var(--font-weight-bold, 700);
  letter-spacing: -0.02em;
  line-height: 1.3;
}
.aw-chat__empty p {
  margin: 0 0 14px;
  color: var(--aw-muted);
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}
.aw-chat__suggests {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
  max-width: 320px;
  margin: 0 auto;
  text-align: left;
}
.aw-chat__suggest {
  appearance: none;
  border: 1px solid var(--aw-border, rgba(255,255,255,0.12));
  background: var(--aw-surface, rgba(255,255,255,0.04));
  color: var(--aw-text, #e8eef8);
  border-radius: 12px;
  padding: 10px 12px;
  font: inherit;
  font-size: 0.82rem;
  line-height: 1.35;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
}
.aw-chat__suggest:hover {
  border-color: rgba(96, 165, 250, 0.45);
  background: rgba(59, 130, 246, 0.12);
}
.aw-chat__suggest:focus-visible {
  outline: 2px solid var(--color-primary, #3b82f6);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .aw-chat__suggest { transition: none; }
}

.aw-msg {
  max-width: 88%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  animation: aw-msg-in 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes aw-msg-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.aw-msg--user { align-self: flex-end; }
.aw-msg--assistant { align-self: flex-start; }

.aw-msg__bubble {
  padding: 11px 14px;
  border-radius: 16px;
  font-size: var(--text-md, 0.9rem);
  line-height: 1.55;
  word-break: break-word;
}
.aw-msg--user .aw-msg__bubble {
  background: linear-gradient(145deg, var(--aw-primary-light) 0%, var(--aw-primary) 55%, var(--aw-primary-hover) 100%);
  color: #fff;
  border-bottom-right-radius: 5px;
  box-shadow: 0 4px 14px var(--color-primary-a20, rgba(0,117,255,0.2));
}
.aw-msg--assistant .aw-msg__bubble {
  background: var(--aw-elevated);
  border: 1px solid var(--aw-border-soft);
  border-bottom-left-radius: 5px;
  color: var(--aw-text-secondary);
  box-shadow: 0 1px 0 rgba(255,255,255,0.03);
}
.aw-msg__meta {
  font-size: 0.62rem;
  letter-spacing: 0.02em;
  color: var(--aw-muted);
  opacity: 0.72;
  padding: 0 6px;
}
.aw-msg--user .aw-msg__meta { text-align: right; }

.aw-msg__bubble p { margin: 0 0 0.55em; }
.aw-msg__bubble p:last-child { margin-bottom: 0; }
.aw-msg__bubble ul, .aw-msg__bubble ol { margin: 0.4em 0; padding-left: 1.2em; }
.aw-msg__bubble a { color: var(--aw-primary-light); }
.aw-msg--user .aw-msg__bubble a { color: #fff; text-decoration: underline; }
.aw-msg__bubble code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.84em;
  background: rgba(0,0,0,0.25);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
.aw-msg__bubble pre {
  position: relative;
  margin: 0.6em 0;
  padding: 12px 12px 28px;
  border-radius: var(--aw-radius-sm);
  background: #0b1220;
  overflow-x: auto;
}
.aw-msg__bubble pre code {
  background: transparent;
  padding: 0;
  font-size: 0.8rem;
  color: #e2e8f0;
}
/* Minimal highlight.js token colors (github-dark inspired) */
.aw-msg__bubble .hljs-comment,
.aw-msg__bubble .hljs-quote { color: #8b949e; }
.aw-msg__bubble .hljs-keyword,
.aw-msg__bubble .hljs-selector-tag,
.aw-msg__bubble .hljs-type { color: #ff7b72; }
.aw-msg__bubble .hljs-string,
.aw-msg__bubble .hljs-attr { color: #a5d6ff; }
.aw-msg__bubble .hljs-number,
.aw-msg__bubble .hljs-literal { color: #79c0ff; }
.aw-msg__bubble .hljs-title,
.aw-msg__bubble .hljs-section { color: #d2a8ff; }
.aw-msg__bubble .hljs-built_in,
.aw-msg__bubble .hljs-name { color: #7ee787; }
.aw-msg__bubble .hljs-meta { color: #94a3b8; }
.aw-code-copy {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.68rem;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  color: #cbd5e1;
  cursor: pointer;
}
.aw-code-copy:hover { background: rgba(255,255,255,0.16); }

.aw-typing {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  padding: 4px 2px;
}
.aw-typing i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--aw-primary-light);
  opacity: 0.7;
  animation: aw-dot 1.1s ease-in-out infinite;
}
.aw-typing i:nth-child(2) { animation-delay: 0.15s; }
.aw-typing i:nth-child(3) { animation-delay: 0.3s; }
@keyframes aw-dot {
  0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
}

.aw-chat__composer {
  position: relative;
  border-top: 1px solid var(--aw-border);
  padding: 12px 14px 14px;
  background: linear-gradient(180deg, rgba(16,24,39,0.55) 0%, var(--aw-bg) 100%);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: end;
  z-index: 2;
}
.aw-chat__composer textarea {
  width: 100%;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  padding: 11px 14px;
  border-radius: var(--aw-radius-md);
  border: 1px solid var(--aw-border);
  background: var(--aw-panel);
  color: var(--aw-text);
  font: inherit;
  font-size: var(--text-md, 0.9rem);
  line-height: 1.4;
  transition: border-color var(--transition-fast, 0.15s ease), box-shadow var(--transition-fast, 0.15s ease);
}
.aw-chat__composer textarea::placeholder {
  color: var(--aw-muted);
  opacity: 0.85;
}
.aw-chat__composer textarea:focus {
  outline: none;
  border-color: var(--color-border-focus, rgba(0,117,255,0.4));
  box-shadow: 0 0 0 3px var(--color-primary-a15, rgba(0,117,255,0.15));
}
.aw-chat__send,
.aw-chat__stop {
  height: 44px;
  min-width: 72px;
  padding: 0 16px;
  border: 0;
  border-radius: var(--aw-radius-md);
  color: #fff;
  font-weight: var(--font-weight-semibold, 600);
  font-size: var(--text-sm, 0.85rem);
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform var(--transition-fast, 0.15s ease), box-shadow var(--transition-fast, 0.15s ease), background var(--transition-fast, 0.15s ease);
}
.aw-chat__send {
  background: linear-gradient(135deg, var(--aw-primary) 0%, var(--aw-primary-hover) 50%, var(--color-primary-dark, #178a52) 100%);
  box-shadow: 0 4px 14px rgba(23, 138, 82, 0.35);
}
.aw-chat__send:hover {
  background: linear-gradient(135deg, var(--aw-primary-hover) 0%, var(--color-primary-dark, #178a52) 55%, #146f43 100%);
  box-shadow: 0 6px 20px rgba(23, 138, 82, 0.45);
}
.aw-chat__send:active { transform: translateY(1px); }
.aw-chat__send:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}
.aw-chat__send:focus-visible,
.aw-chat__stop:focus-visible {
  outline: 2px solid var(--aw-primary-light);
  outline-offset: 2px;
}
.aw-chat__stop {
  background: var(--aw-danger);
  box-shadow: 0 4px 14px rgba(239,68,68,0.25);
}

@media (max-width: 480px) {
  .aw-chat { right: 10px; bottom: 10px; left: 10px; }
  .aw-chat__toggle { margin-left: auto; }
  .aw-chat__panel {
    right: 0;
    left: 0;
    width: 100%;
    height: min(78vh, calc(100vh - 86px));
    bottom: 66px;
    border-radius: var(--radius-xl, 20px) var(--radius-xl, 20px) var(--aw-radius) var(--aw-radius);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 -2px 24px rgba(0,0,0,0.2);
  }
  .aw-chat__header { padding: 14px 12px 14px 14px; }
  .aw-chat__messages { padding: 14px 12px 16px; gap: 12px; }
  .aw-chat__composer { padding: 12px; }
  .aw-msg { max-width: 92%; }
}

@media (prefers-reduced-motion: reduce) {
  .aw-chat__toggle,
  .aw-chat__panel,
  .aw-chat__icon-btn,
  .aw-chat__composer textarea,
  .aw-chat__send,
  .aw-chat__stop {
    transition: none !important;
  }
  .aw-chat__toggle--enter,
  .aw-chat__toggle--spin,
  .aw-chat.has-unread .aw-chat__badge,
  .aw-msg,
  .aw-typing i {
    animation: none !important;
  }
  .aw-chat__messages { scroll-behavior: auto; }
}
`;function Oe(){if(document.getElementById("1winex-chat-styles"))return;const e=document.createElement("style");e.id="1winex-chat-styles",e.textContent=De,document.head.appendChild(e)}function X(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function ze(e){try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}catch{return""}}const G={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'},Me=new URL("../images/chat/anna.webp?v=3",import.meta.url).href;function U(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function qe(){const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":"en"}function He(){const e=qe();return e==="ru"?{name:"Анна",subtitle:"Виртуальный помощник 1win",close:"Закрыть чат",placeholder:"Напишите вопрос…",message:"Сообщение",send:"Отправить",sendMessage:"Отправить сообщение",open:"Открыть чат с Анной",closeAnna:"Закрыть чат с Анной",openUnread:"Открыть чат с Анной — новое сообщение",typing:"Анна печатает",hello:"Привет. Я Анна. Чем помочь?",intro:"Могу помочь с казино и спортом, WINEX600, депозитом, выводом и Android APK.",suggests:"Частые вопросы",noResponse:"Не удалось получить ответ.",copied:"Скопировано",copy:"Копировать",failed:"Ошибка"}:e==="es"?{name:"Anna",subtitle:"Asistente virtual de 1win",close:"Cerrar chat",placeholder:"Escribe una pregunta…",message:"Mensaje",send:"Enviar",sendMessage:"Enviar mensaje",open:"Abrir chat con Anna",closeAnna:"Cerrar chat con Anna",openUnread:"Abrir chat con Anna — mensaje nuevo",typing:"Anna está escribiendo",hello:"Hola. Soy Anna. ¿En qué te ayudo?",intro:"Te ayudo con casino y deporte, WINEX600, depósito, retiro y el APK de Android.",suggests:"Preguntas frecuentes",noResponse:"No llegó la respuesta.",copied:"Copiado",copy:"Copiar",failed:"Error"}:e==="fr"?{name:"Anna",subtitle:"Assistante virtuelle 1win",close:"Fermer le chat",placeholder:"Écrivez une question…",message:"Message",send:"Envoyer",sendMessage:"Envoyer le message",open:"Ouvrir le chat avec Anna",closeAnna:"Fermer le chat avec Anna",openUnread:"Ouvrir le chat avec Anna — nouveau message",typing:"Anna écrit",hello:"Bonjour. Je suis Anna. Comment puis-je vous aider ?",intro:"Je vous aide pour le casino et le sport, WINEX600, le dépôt, le retrait et l’APK Android.",suggests:"Questions fréquentes",noResponse:"Pas de réponse.",copied:"Copié",copy:"Copier",failed:"Erreur"}:e==="de"?{name:"Anna",subtitle:"Virtuelle 1win-Assistentin",close:"Chat schließen",placeholder:"Schreib eine Frage…",message:"Nachricht",send:"Senden",sendMessage:"Nachricht senden",open:"Chat mit Anna öffnen",closeAnna:"Chat mit Anna schließen",openUnread:"Chat mit Anna öffnen — neue Nachricht",typing:"Anna schreibt",hello:"Hallo. Ich bin Anna. Wobei kann ich helfen?",intro:"Ich helfe dir bei Casino und Sport, WINEX600, Einzahlung, Auszahlung und der Android-APK.",suggests:"Häufige Fragen",noResponse:"Keine Antwort.",copied:"Kopiert",copy:"Kopieren",failed:"Fehler"}:e==="uk"?{name:"Анна",subtitle:"Віртуальна помічниця 1win",close:"Закрити чат",placeholder:"Напишіть запитання…",message:"Повідомлення",send:"Надіслати",sendMessage:"Надіслати повідомлення",open:"Відкрити чат з Анною",closeAnna:"Закрити чат з Анною",openUnread:"Відкрити чат з Анною — нове повідомлення",typing:"Анна пише",hello:"Привіт. Я Анна. Чим допомогти?",intro:"Можу допомогти з казино й спортом, WINEX600, депозитом, виведенням і Android APK.",suggests:"Часті питання",noResponse:"Не вдалося отримати відповідь.",copied:"Скопійовано",copy:"Копіювати",failed:"Помилка"}:e==="it"?{name:"Anna",subtitle:"Assistente virtuale 1win",close:"Chiudi chat",placeholder:"Scrivi una domanda…",message:"Messaggio",send:"Invia",sendMessage:"Invia messaggio",open:"Apri la chat con Anna",closeAnna:"Chiudi la chat con Anna",openUnread:"Apri la chat con Anna — nuovo messaggio",typing:"Anna sta scrivendo",hello:"Ciao. Sono Anna. Come posso aiutarti?",intro:"Ti aiuto con casino e scommesse, WINEX600, deposito, prelievo e l’APK Android.",suggests:"Domande suggerite",noResponse:"Nessuna risposta.",copied:"Copiato",copy:"Copia",failed:"Errore"}:{name:"Anna",subtitle:"Virtual 1win assistant",close:"Close chat",placeholder:"Ask a question…",message:"Message",send:"Send",sendMessage:"Send message",open:"Open chat with Anna",closeAnna:"Close chat with Anna",openUnread:"Open chat with Anna — new message",typing:"Anna is typing",hello:"Hi. I am Anna. How can I help?",intro:"I can help with casino and sports, WINEX600, deposits, withdrawals and the Android APK.",suggests:"Suggested questions",noResponse:"No response received.",copied:"Copied",copy:"Copy",failed:"Failed"}}function Ke(){if(document.getElementById(H))return;Oe();const e=He();let t=ye(),a=!1,r=null,o=null;const s=document.createElement("div");s.id=H,s.className="aw-chat",s.dataset.theme=Ee(),s.setAttribute("data-nosnippet",""),s.innerHTML=`
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${Me}" alt="${e.name}" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">${e.name}</strong>
            <span>${e.subtitle}</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="${e.close}">${G.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="2000" placeholder="${e.placeholder}" aria-label="${e.message}"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="${e.sendMessage}">${e.send}</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="${e.open}" aria-expanded="false" aria-controls="aw-chat-panel">
      ${G.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `,document.body.appendChild(s);const c=s.querySelector(".aw-chat__panel");c.id="aw-chat-panel";const i=s.querySelector(".aw-chat__messages"),h=s.querySelector(".aw-chat__composer"),f=h.querySelector("textarea"),g=h.querySelector(".aw-chat__send"),u=s.querySelector(".aw-chat__toggle"),b=u.querySelector(".aw-chat__badge"),p=le(c);let y=null;const x=new Map;let E=0,L=xe();function C(){Ae(t.filter(n=>n.status!=="streaming"),L)}function F(n){i.querySelector(`[data-id="${n}"]`)?.scrollIntoView({block:"start",behavior:"smooth"})}function N(){const n=L&&!a;s.classList.toggle("has-unread",n),b.hidden=!n,b.setAttribute("aria-hidden",n?"false":"true"),a?u.setAttribute("aria-label",e.closeAnna):n?u.setAttribute("aria-label",e.openUnread):u.setAttribute("aria-label",e.open)}function P(){a||(L=!0,C(),N())}function I(n){a=n,s.classList.toggle("is-open",a),u.setAttribute("aria-expanded",String(a)),c.hidden=!a,c.setAttribute("aria-hidden",a?"false":"true"),a?(L=!1,C(),y=document.activeElement,p.activate()):(p.deactivate(),(y||u).focus()),N()}async function S(n,l){const m=(x.get(n.id)??0)+1;x.set(n.id,m);let w=l;w||(w=document.createElement("div"),w.className=`aw-msg aw-msg--${n.role}`,w.dataset.id=n.id,i.appendChild(w));const d=document.createElement("div");if(d.className="aw-msg__bubble",n.role==="assistant")if(n.status==="streaming"&&!n.content)d.innerHTML=`<span class="aw-typing" aria-label="${e.typing}"><i></i><i></i><i></i></span>`;else try{const D=await ve(n.content||"");if(x.get(n.id)!==m)return;d.innerHTML=D,J(d)}catch{if(x.get(n.id)!==m)return;d.textContent=n.content||""}else d.textContent=n.content;if(x.get(n.id)!==m)return;const k=document.createElement("div");k.className="aw-msg__meta",k.textContent=ze(n.createdAt),w.replaceChildren(d,k)}async function Y(n){const l=i.scrollTop;if(i.replaceChildren(),t.length===0){const m=document.createElement("div");m.className="aw-chat__empty";const w=Re().map(d=>`<button type="button" class="aw-chat__suggest" data-suggest="${U(d)}">${U(d)}</button>`).join("");m.innerHTML=`
        <strong>${e.hello}</strong>
        <p>${e.intro}</p>
        <div class="aw-chat__suggests" role="group" aria-label="${e.suggests}">${w}</div>
      `,i.appendChild(m);return}for(const m of t)await S(m);i.scrollTop=l}function T(n){g.className="aw-chat__send",g.textContent=e.send,g.type="submit",g.disabled=n,g.setAttribute("aria-label",e.sendMessage),g.onclick=null}function R(n){E&&(cancelAnimationFrame(E),E=0);const l=i.querySelector(`[data-id="${n.id}"]`);return S(n,l||void 0)}function V(n){E||(E=requestAnimationFrame(()=>{E=0,R(n)}))}async function Z(n){const l={id:X(),role:"assistant",content:"",createdAt:Date.now(),status:"streaming"};t=[...n,l],o=l.id,T(!0),await S(l);const m=[...n].reverse().find(d=>d.role==="user");m&&F(m.id),r=new AbortController;const w={messages:n.filter(d=>d.role==="user"||d.role==="assistant").filter(d=>d.status!=="error").map(d=>({role:d.role,content:d.content.slice(0,2e3)})),pageContext:se(),site:ne};await oe(w,{onDelta:d=>{l.content+=d,l.status="streaming",V(l),l.content&&P()},onDone:()=>{const d=!!l.content;l.status=d?"ok":"error",d||(l.content=e.noResponse),o=null,r=null,T(!1),C(),R(l),P()},onError:d=>{l.content=d,l.status="error",o=null,r=null,T(!1),C(),R(l),P()}},r.signal)}async function q(n){const l=n.trim().slice(0,2e3);if(!l||o)return;const m=i.querySelector(".aw-chat__empty");m&&m.remove();const w={id:X(),role:"user",content:l,createdAt:Date.now(),status:"ok"},d=[...t,w];t=d,C(),await S(w),await Z(d)}function ee(){window.matchMedia("(prefers-reduced-motion: reduce)").matches||(u.classList.remove("aw-chat__toggle--spin","aw-chat__toggle--enter"),u.offsetWidth,u.classList.add("aw-chat__toggle--spin"))}window.matchMedia("(prefers-reduced-motion: reduce)").matches||u.classList.add("aw-chat__toggle--enter"),u.addEventListener("animationend",n=>{n.animationName==="aw-toggle-spin"&&u.classList.remove("aw-chat__toggle--spin"),n.animationName==="aw-toggle-enter"&&u.classList.remove("aw-chat__toggle--enter")}),u.addEventListener("click",()=>{ee(),I(!a)}),s.querySelector('[data-action="close"]').addEventListener("click",()=>I(!1)),h.addEventListener("submit",n=>{n.preventDefault();const l=f.value;f.value="",q(l)}),f.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),h.requestSubmit())}),i.addEventListener("click",async n=>{const l=n.target.closest(".aw-chat__suggest");if(l){const D=l.getAttribute("data-suggest")||l.textContent||"";q(D);return}const m=n.target.closest(".aw-code-copy");if(!m)return;const k=m.closest("pre")?.querySelector("code")?.textContent||"";try{await navigator.clipboard.writeText(k),m.textContent=e.copied,setTimeout(()=>{m.textContent=e.copy},1200)}catch{m.textContent=e.failed}}),document.addEventListener("keydown",n=>{n.key==="Escape"&&a&&(n.preventDefault(),I(!1))}),document.addEventListener("pointerdown",n=>{if(!a||o)return;const l=n.target;l&&(c.contains(l)||u.contains(l)||I(!1))},!0),Y(),N()}Ke();
//# sourceMappingURL=chat-widget.js.map
