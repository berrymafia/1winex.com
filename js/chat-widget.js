const B="1winex-chat-v2",te="1winex-chat-theme",ae=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"/api/chat":"https://api-chat.net/api/chat",re="1winex",H="1winex-chat-root";function ne(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":"en"}function W(e,t,a,n,o){const i=ne();return i==="ru"?t:i==="es"?a:i==="fr"?n:i==="de"?o:e}async function oe(e,t,a){let n;try{n=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),signal:a})}catch(l){if(l?.name==="AbortError"){t.onDone();return}t.onError(W("Network error. Please try again.","Нет соединения. Попробуйте ещё раз.","No hay conexión. Inténtalo de nuevo.","Pas de connexion. Réessayez.","Netzwerkfehler. Versuch’s nochmal."));return}if(!n.ok){let l=W("Request failed. Please try again.","Не удалось получить ответ. Попробуйте ещё раз.","No llegó la respuesta. Inténtalo de nuevo.","Pas de réponse. Réessayez.","Anfrage fehlgeschlagen. Versuch’s nochmal.");try{const m=await n.json();m?.error&&(l=m.error)}catch{}t.onError(l);return}if(!n.body){t.onError(W("Empty response from server.","Сервер вернул пустой ответ.","El servidor no mandó nada.","Le serveur n’a rien renvoyé.","Leere Antwort vom Server."));return}const o=n.body.getReader(),i=new TextDecoder;let d="";try{for(;;){const{done:l,value:m}=await o.read();if(l)break;d+=i.decode(m,{stream:!0});const f=d.split(`
`);d=f.pop()||"";for(const g of f){const u=g.trim();if(!u.startsWith("data:"))continue;const b=u.slice(5).trim();if(b){if(b==="[DONE]"){t.onDone();return}try{const p=JSON.parse(b);p.type==="delta"&&p.delta?t.onDelta(p.delta):p.type==="error"?t.onError(p.error||W("Assistant error.","Ошибка помощника.","Error del asistente.","Erreur de l’assistant.","Fehler des Assistenten.")):p.type}catch{}}}}t.onDone()}catch(l){if(l?.name==="AbortError"){t.onDone();return}t.onError(W("Stream interrupted. Please try again.","Ответ прервался. Попробуйте ещё раз.","Se cortó la respuesta. Inténtalo de nuevo.","La réponse s’est interrompue. Réessayez.","Antwort unterbrochen. Versuch’s nochmal."))}}const ie=3500;function se(){const e=document.title||"",t=location.href,n=(document.querySelector("main")||document.querySelector("article")||document.querySelector(".review-content")||document.querySelector(".page-content")||document.body).cloneNode(!0);n.querySelectorAll('script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]').forEach(i=>i.remove());const o=(n.textContent||"").replace(/\s+/g," ").trim().slice(0,ie);return{title:e,url:t,snippet:o}}function le(e){const t='a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function a(){return Array.from(e.querySelectorAll(t)).filter(o=>!o.hasAttribute("disabled")&&o.offsetParent!==null)}function n(o){if(o.key!=="Tab")return;const i=a();if(i.length===0){o.preventDefault();return}const d=i[0],l=i[i.length-1];o.shiftKey?document.activeElement===d&&(o.preventDefault(),l.focus()):document.activeElement===l&&(o.preventDefault(),d.focus())}return{activate(){e.addEventListener("keydown",n),(a()[0]||e).focus()},deactivate(){e.removeEventListener("keydown",n)}}}const ce="modulepreload",de=function(e,t){return new URL(e,t).href},j={},A=function(t,a,n){let o=Promise.resolve();if(a&&a.length>0){const d=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),m=l?.nonce||l?.getAttribute("nonce");o=Promise.allSettled(a.map(f=>{if(f=de(f,n),f in j)return;j[f]=!0;const g=f.endsWith(".css"),u=g?'[rel="stylesheet"]':"";if(!!n)for(let x=d.length-1;x>=0;x--){const y=d[x];if(y.href===f&&(!g||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${u}`))return;const p=document.createElement("link");if(p.rel=g?"stylesheet":ce,g||(p.as="script"),p.crossOrigin="",p.href=f,m&&p.setAttribute("nonce",m),document.head.appendChild(p),g)return new Promise((x,y)=>{p.addEventListener("load",x),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return o.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};let O=null,z=null,M=null;async function ue(){return(await A(()=>import("./chat-widget-core-Cy0t5JvF.js"),[],import.meta.url)).default}async function pe(){if(!O||!z){const[e,t]=await Promise.all([A(()=>import("./chat-widget-marked.esm-DweX3G3F.js"),[],import.meta.url),A(()=>import("./chat-widget-purify.es-BnINGy_Y.js"),[],import.meta.url)]);O=e,z=t,e.marked.setOptions({gfm:!0,breaks:!0})}return{marked:O.marked,DOMPurify:z.default}}async function he(){if(M)return M;const e=await ue(),t=await Promise.all([A(()=>import("./chat-widget-javascript-DUNaicwC.js"),[],import.meta.url),A(()=>import("./chat-widget-typescript-5pldp2kO.js"),[],import.meta.url),A(()=>import("./chat-widget-json-DdsocbVI.js"),[],import.meta.url),A(()=>import("./chat-widget-bash-I8pq0VWm.js"),[],import.meta.url),A(()=>import("./chat-widget-xml-FcirFJJ2.js"),[],import.meta.url),A(()=>import("./chat-widget-css-AVCICof-.js"),[],import.meta.url),A(()=>import("./chat-widget-python-C7NRPp2R.js"),[],import.meta.url)]);return["javascript","typescript","json","bash","xml","css","python"].forEach((n,o)=>e.registerLanguage(n,t[o].default)),M=e,e}const K={ALLOWED_TAGS:["p","br","strong","em","u","s","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","table","thead","tbody","tr","th","td","hr","span","button","div"],ALLOWED_ATTR:["href","title","target","rel","class","data-lang","type","aria-label"]},me="nofollow noopener noreferrer",ge=new Set(["1winex.com","www.1winex.com"]);function U(e){return!(!e||e.startsWith("#")||/^(mailto|tel|javascript|data):/i.test(e))}function fe(e){try{const t=typeof location<"u"?location.href:"https://1winex.com/",a=new URL(e,t).pathname.replace(/\/+$/,"")||"/";return a==="/go"||a==="/apk"}catch{return!1}}function we(e){const t=e.trim();if(!U(t)||fe(t))return!1;if(!/^https?:\/\//i.test(t)&&!t.startsWith("//"))return!/^[a-z][a-z0-9+.-]*:/i.test(t);try{const a=t.startsWith("//")?`https:${t}`:t,n=new URL(a).hostname.toLowerCase();if(ge.has(n)||typeof location<"u"&&location.hostname&&n===location.hostname.toLowerCase())return!0}catch{return!1}return!1}function J(e){e.querySelectorAll("a[href]").forEach(t=>{const a=t,n=(a.getAttribute("href")||"").trim();if(!U(n))return;const o=/^https?:\/\//i.test(n)||n.startsWith("//"),i=!o&&!/^[a-z][a-z0-9+.-]*:/i.test(n);if(!(!o&&!i)){if(we(n)){a.removeAttribute("target"),a.removeAttribute("rel");return}a.setAttribute("target","_blank"),a.setAttribute("rel",me)}})}function be(e){const t=document.createElement("div");return t.innerHTML=e,J(t),t.innerHTML}async function ve(e){const{marked:t,DOMPurify:a}=await pe(),n=await t.parse(e||"");let o=a.sanitize(String(n),K);if(/<pre[\s>]/i.test(o)){const i=await he(),d=document.createElement("div");d.innerHTML=o,d.querySelectorAll("pre code").forEach(l=>{const m=l,g=(m.className||"").match(/language-([\w-]+)/)?.[1];try{g&&i.getLanguage(g)?m.innerHTML=i.highlight(m.textContent||"",{language:g}).value:m.innerHTML=i.highlightAuto(m.textContent||"").value}catch{}const u=m.parentElement;if(u&&u.tagName==="PRE"&&!u.querySelector(".aw-code-copy")){u.setAttribute("data-lang",g||"code");const b=document.createElement("button");b.type="button",b.className="aw-code-copy";const p=(document.documentElement.lang||"").toLowerCase(),x=p.startsWith("ru")?{aria:"Копировать код",text:"Копировать"}:p.startsWith("es")?{aria:"Copiar código",text:"Copiar"}:p.startsWith("fr")?{aria:"Copier le code",text:"Copier"}:p.startsWith("de")?{aria:"Code kopieren",text:"Kopieren"}:{aria:"Copy code",text:"Copy"};b.setAttribute("aria-label",x.aria),b.textContent=x.text,u.appendChild(b)}}),o=a.sanitize(d.innerHTML,K)}return be(o)}function Q(){try{const e=localStorage.getItem(B);if(!e)return null;const t=JSON.parse(e);return!t||!Array.isArray(t.messages)?null:t}catch{return null}}function _e(e){try{localStorage.setItem(B,JSON.stringify(e))}catch{}}function xe(){const e=Q();return e?e.messages.slice(-60):[]}function ye(){return!!Q()?.unread}function Ae(e,t=!1){_e({messages:e.slice(-60),updatedAt:Date.now(),unread:!!t})}function Ee(){try{const e=localStorage.getItem(te);if(e==="light"||e==="dark")return e}catch{}return"dark"}function ke(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":"en"}function v(e,t,a,n,o,i){return e==="ru"?a:e==="es"?n:e==="fr"?o:e==="de"?i:t}const Ce=["What license does 1win have?","What does WINEX600 give?","How fast are withdrawals?","How do I install the app?"],We=["Какая лицензия у 1win?","Что даёт WINEX600?","Как быстро выводят деньги?","Как поставить приложение?"],Le=["¿Qué licencia tiene 1win?","¿Qué da WINEX600?","¿Cuánto tarda un retiro?","¿Cómo instalo la app?"],Se=["Quelle licence a 1win ?","Que donne WINEX600 ?","Combien de temps pour un retrait ?","Comment installer l’app ?"],Ie=["Welche Lizenz hat 1win?","Was bringt WINEX600?","Wie schnell sind Auszahlungen?","Wie installiere ich die App?"];function _(e,t=4){const a=[],n=new Set;for(const o of e){const i=String(o||"").replace(/\s+/g," ").trim();if(!i)continue;const d=i.toLowerCase();if(!n.has(d)&&(n.add(d),a.push(i),a.length>=t))break}return a}function Te(e=location.pathname){const a=(e.replace(/\/+$/,"")||"/").split("/").filter(Boolean);if(!a.length)return"index";let n=0;if((a[0]==="ru"||a[0]==="es"||a[0]==="fr"||a[0]==="de")&&(n=1),!a[n]||a[n]==="index")return"index";let o=a[n].replace(/\.html$/i,"");return o==="betting"?"sports":o==="app"?"mobile":o==="casino"?"games":o}function Ne(e=typeof location<"u"?location.pathname:"/"){const t=Te(e),a=ke();return _(t==="bonuses"?v(a,["What does WINEX600 give?","What are the wagering terms?","When do I enter WINEX600?","How do I get the welcome bonus?"],["Что даёт WINEX600?","Какие условия отыгрыша?","Когда указывать WINEX600?","Как получить приветственный бонус?"],["¿Qué da WINEX600?","¿Cuál es el rollover?","¿Cuándo pongo WINEX600?","¿Cómo consigo el bono de bienvenida?"],["Que donne WINEX600 ?","Quelles sont les conditions de mise ?","Quand indiquer WINEX600 ?","Comment obtenir le bonus de bienvenue ?"],["Was bringt WINEX600?","Welche Umsatzbedingungen gelten?","Wann gebe ich WINEX600 ein?","Wie hole ich den Willkommensbonus?"]):t==="payments"?v(a,["How fast are withdrawals?","Can I deposit with crypto?","Where do I see withdrawal limits?","When does KYC come up?"],["Как быстро выводят деньги?","Можно ли пополнить криптой?","Где смотреть лимиты вывода?","Когда просят документы?"],["¿Cuánto tarda un retiro?","¿Puedo depositar con cripto?","¿Dónde salen los límites de retiro?","¿Cuándo piden documentos?"],["Combien de temps pour un retrait ?","On peut déposer en crypto ?","Où sont les limites de retrait ?","Quand on demande des documents ?"],["Wie schnell sind Auszahlungen?","Kann ich mit Krypto einzahlen?","Wo sehe ich Auszahlungslimits?","Wann werden Dokumente verlangt?"]):t==="mobile"?v(a,["How do I install the Android APK?","Can I use 1win on iPhone?","Can I open 1win in the browser?","Where should I download the APK?"],["Как поставить Android APK?","Можно ли зайти с iPhone?","Можно ли открыть 1win в браузере?","Откуда скачивать APK?"],["¿Cómo instalo el APK de Android?","¿Cómo uso 1win en iPhone?","¿Puedo abrir 1win en el navegador?","¿De dónde descargo el APK?"],["Comment installer l’APK Android ?","Comment utiliser 1win sur iPhone ?","On peut ouvrir 1win dans le navigateur ?","D’où télécharger l’APK ?"],["Wie installiere ich die Android-APK?","Kann ich 1win auf dem iPhone nutzen?","Kann ich 1win im Browser öffnen?","Wo sollte ich die APK herunterladen?"]):t==="games"?v(a,["What games are in the casino?","Where do I see a game RTP?","Are there live tables?","Do slots count toward the bonus?"],["Какие игры есть в казино?","Где смотреть RTP игры?","Есть ли живые столы?","Учитываются ли слоты в бонусе?"],["¿Qué juegos hay en el casino?","¿Dónde veo el RTP de un juego?","¿Hay mesas en vivo?","¿Las tragamonedas cuentan para el bono?"],["Quels jeux il y a dans le casino ?","Où voir le RTP d’un jeu ?","Il y a des tables en direct ?","Les machines à sous comptent pour le bonus ?"],["Welche Spiele gibt es im Casino?","Wo sehe ich den RTP eines Spiels?","Gibt es Live-Tische?","Zählen Slots für den Bonus?"]):t==="aviator"?v(a,["Where do I see Aviator RTP?","Is Aviator a 1win Original?","Does Aviator count toward the welcome bonus?","What is auto cash-out in Aviator?"],["Где смотреть RTP Aviator?","Aviator это 1win Original?","Идёт ли Aviator в отыгрыш бонуса?","Что такое автокэшаут в Aviator?"],["¿Dónde veo el RTP de Aviator?","¿Aviator es un 1win Original?","¿Aviator cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"],["Où voir le RTP d’Aviator ?","Aviator, c’est un 1win Original ?","Aviator compte pour le bonus de bienvenue ?","C’est quoi l’encaissement automatique ?"],["Wo sehe ich den RTP von Aviator?","Ist Aviator ein 1win Original?","Zählt Aviator für den Willkommensbonus?","Was ist Auto-Cashout in Aviator?"]):t==="lucky-jet"?v(a,["Where do I see Lucky Jet RTP?","Is Lucky Jet the same as Aviator?","Does Lucky Jet count toward the welcome bonus?","What is auto cash-out in Lucky Jet?"],["Где смотреть RTP Lucky Jet?","Lucky Jet это то же, что Aviator?","Идёт ли Lucky Jet в отыгрыш бонуса?","Что такое автокэшаут в Lucky Jet?"],["¿Dónde veo el RTP de Lucky Jet?","¿Lucky Jet es lo mismo que Aviator?","¿Lucky Jet cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"],["Où voir le RTP de Lucky Jet ?","Lucky Jet, c’est le même jeu qu’Aviator ?","Lucky Jet compte pour le bonus de bienvenue ?","C’est quoi l’encaissement automatique ?"],["Wo sehe ich den RTP von Lucky Jet?","Ist Lucky Jet dasselbe wie Aviator?","Zählt Lucky Jet für den Willkommensbonus?","Was ist Auto-Cashout in Lucky Jet?"]):t==="sports"?v(a,["How do I place a sports bet?","Can I cash out a sports bet?","What is the multiple bet bonus?","Do casino and sports bonuses share a wallet?"],["Как поставить на спорт?","Есть ли кэшаут?","Что такое бонус на экспресс?","Бонусы казино и спорта на одном балансе?"],["¿Cómo apuesto al deporte?","¿Hay cash out en 1win?","¿Qué es el bono por combinada?","¿Los bonos de casino y de deporte van juntos?"],["Comment parier sur le sport ?","On peut encaisser un pari ?","C’est quoi le bonus combiné ?","Les bonus casino et sport vont ensemble ?"],["Wie wette ich auf Sport?","Kann ich eine Sportwette auszahlen?","Was ist der Kombiwetten-Bonus?","Teilen Casino- und Sportboni dasselbe Guthaben?"]):t==="safety"?v(a,["What license does 1win have?","When does KYC come up?","How do I know the site is real?","How do I turn on 2FA?"],["Какая лицензия у 1win?","Когда просят документы?","Как понять, что сайт настоящий?","Как включить 2FA?"],["¿Qué licencia tiene 1win?","¿Cuándo piden documentos?","¿Cómo sé que es el sitio de verdad?","¿Cómo activo el 2FA?"],["Quelle licence a 1win ?","Quand on demande des documents ?","Comment savoir que c’est le vrai site ?","Comment activer le 2FA ?"],["Welche Lizenz hat 1win?","Wann werden Dokumente verlangt?","Wie erkenne ich die echte Seite?","Wie aktiviere ich 2FA?"]):t==="faq"?v(a,["How do I register?","How fast are withdrawals?","What does WINEX600 give?","How do I install the app?"],["Как зарегистрироваться?","Как быстро выводят деньги?","Что даёт WINEX600?","Как поставить приложение?"],["¿Cómo me registro?","¿Cuánto tarda un retiro?","¿Qué da WINEX600?","¿Cómo instalo la app?"],["Comment s’inscrire ?","Combien de temps pour un retrait ?","Que donne WINEX600 ?","Comment installer l’app ?"],["Wie registriere ich mich?","Wie schnell sind Auszahlungen?","Was bringt WINEX600?","Wie installiere ich die App?"]):t==="responsible-gambling"?v(a,["How do I set a limit or self-exclusion?","How do I set a deposit limit?","How does self-exclusion work?","Where can I get gambling help?"],["Как поставить лимит или самоисключение?","Как поставить лимит на депозит?","Как работает самоисключение?","Где получить независимую помощь?"],["¿Cómo pongo un límite o la autoexclusión?","¿Cómo pongo un límite de depósito?","¿Cómo funciona la autoexclusión?","¿Dónde pido ayuda con el juego?"],["Comment mettre une limite ou l’auto-exclusion ?","Comment mettre une limite de dépôt ?","Comment marche l’auto-exclusion ?","Où demander de l’aide pour le jeu ?"],["Wie setze ich ein Limit oder eine Selbstsperre?","Wie setze ich ein Einzahlungslimit?","Wie funktioniert die Selbstsperre?","Wo bekomme ich Hilfe beim Glücksspiel?"]):t==="crypto-casino"?v(a,["How do I deposit Bitcoin or USDT?","Do I still need KYC for crypto?","What if a crypto deposit did not arrive?","Does WINEX600 work with crypto?"],["Как внести Bitcoin или USDT?","Нужен ли KYC для крипты?","Что делать, если крипта не пришла?","WINEX600 действует на крипту?"],["¿Cómo deposito Bitcoin o USDT?","¿Piden KYC si pago con cripto?","¿Qué hago si el depósito cripto no llega?","¿WINEX600 vale con cripto?"],["Comment déposer en Bitcoin ou USDT ?","On demande encore le KYC en crypto ?","Que faire si un dépôt crypto n’arrive pas ?","WINEX600 marche avec la crypto ?"],["Wie zahle ich mit Bitcoin oder USDT ein?","Brauche ich für Krypto trotzdem KYC?","Was tun, wenn eine Krypto-Einzahlung nicht ankommt?","Gilt WINEX600 auch mit Krypto?"]):t==="not-working"?v(a,["Why is 1win not opening?","What if the site will not load?","Will the app still open?","How do I sign in if the site is blocked?"],["Почему 1win не открывается?","Что делать, если сайт не грузится?","Откроется ли приложение?","Как войти, если сайт заблокирован?"],["¿Por qué 1win no abre?","¿Qué hago si el sitio no carga?","¿La app abre si el sitio no carga?","¿Cómo entro si el sitio está bloqueado?"],["Pourquoi 1win ne s’ouvre pas ?","Que faire si le site ne charge pas ?","L’app s’ouvre si le site ne charge pas ?","Comment me connecter si le site est bloqué ?"],["Warum öffnet 1win nicht?","Was tun, wenn die Seite nicht lädt?","Öffnet die App trotzdem?","Wie melde ich mich an, wenn die Seite gesperrt ist?"]):[...v(a,[...Ce],[...We],[...Le],[...Se],[...Ie])])}const Pe=`
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
`;function De(){if(document.getElementById("1winex-chat-styles"))return;const e=document.createElement("style");e.id="1winex-chat-styles",e.textContent=Pe,document.head.appendChild(e)}function X(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Re(e){try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}catch{return""}}const $={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'},Oe=new URL("../images/chat/anna.webp?v=3",import.meta.url).href;function G(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ze(){const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":"en"}function Me(){const e=ze();return e==="ru"?{name:"Анна",subtitle:"Виртуальный помощник 1win",close:"Закрыть чат",placeholder:"Задайте вопрос…",message:"Сообщение",send:"Отправить",sendMessage:"Отправить сообщение",open:"Открыть чат с Анной",closeAnna:"Закрыть чат с Анной",openUnread:"Открыть чат с Анной — новое сообщение",typing:"Анна печатает",hello:"Привет. Я Анна. Чем помочь?",intro:"Могу помочь с казино, спортом, WINEX600, депозитом, выводом и Android APK.",suggests:"Популярные вопросы",noResponse:"Не удалось получить ответ.",copied:"Скопировано",copy:"Копировать",failed:"Ошибка"}:e==="es"?{name:"Anna",subtitle:"Asistente virtual de 1win",close:"Cerrar chat",placeholder:"Haz una pregunta…",message:"Mensaje",send:"Enviar",sendMessage:"Enviar mensaje",open:"Abrir chat con Anna",closeAnna:"Cerrar chat con Anna",openUnread:"Abrir chat con Anna — mensaje nuevo",typing:"Anna está escribiendo",hello:"Hola. Soy Anna. ¿En qué te ayudo?",intro:"Te ayudo con casino, deporte, WINEX600, depósito, retiro y el APK de Android.",suggests:"Preguntas frecuentes",noResponse:"No llegó la respuesta.",copied:"Copiado",copy:"Copiar",failed:"Error"}:e==="fr"?{name:"Anna",subtitle:"Assistante virtuelle 1win",close:"Fermer le chat",placeholder:"Posez une question…",message:"Message",send:"Envoyer",sendMessage:"Envoyer le message",open:"Ouvrir le chat avec Anna",closeAnna:"Fermer le chat avec Anna",openUnread:"Ouvrir le chat avec Anna — nouveau message",typing:"Anna écrit",hello:"Bonjour. Je suis Anna. Je peux vous aider ?",intro:"Je vous aide pour le casino, le sport, WINEX600, le dépôt, le retrait et l’APK Android.",suggests:"Questions fréquentes",noResponse:"Pas de réponse.",copied:"Copié",copy:"Copier",failed:"Erreur"}:e==="de"?{name:"Anna",subtitle:"Virtuelle 1win-Assistentin",close:"Chat schließen",placeholder:"Stelle eine Frage…",message:"Nachricht",send:"Senden",sendMessage:"Nachricht senden",open:"Chat mit Anna öffnen",closeAnna:"Chat mit Anna schließen",openUnread:"Chat mit Anna öffnen — neue Nachricht",typing:"Anna schreibt",hello:"Hi. Ich bin Anna. Wobei kann ich helfen?",intro:"Ich helfe dir bei Casino, Sport, WINEX600, Einzahlung, Auszahlung und der Android-APK.",suggests:"Häufige Fragen",noResponse:"Keine Antwort.",copied:"Kopiert",copy:"Kopieren",failed:"Fehler"}:{name:"Anna",subtitle:"Virtual 1win assistant",close:"Close chat",placeholder:"Ask a question…",message:"Message",send:"Send",sendMessage:"Send message",open:"Open chat with Anna",closeAnna:"Close chat with Anna",openUnread:"Open chat with Anna — new message",typing:"Anna is typing",hello:"Hi. I am Anna. How can I help?",intro:"I can help with casino and sports, WINEX600, deposits, withdrawals and the Android APK.",suggests:"Suggested questions",noResponse:"No response received.",copied:"Copied",copy:"Copy",failed:"Failed"}}function qe(){if(document.getElementById(H))return;De();const e=Me();let t=xe(),a=!1,n=null,o=null;const i=document.createElement("div");i.id=H,i.className="aw-chat",i.dataset.theme=Ee(),i.setAttribute("data-nosnippet",""),i.innerHTML=`
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${Oe}" alt="${e.name}" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">${e.name}</strong>
            <span>${e.subtitle}</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="${e.close}">${$.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="2000" placeholder="${e.placeholder}" aria-label="${e.message}"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="${e.sendMessage}">${e.send}</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="${e.open}" aria-expanded="false" aria-controls="aw-chat-panel">
      ${$.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `,document.body.appendChild(i);const d=i.querySelector(".aw-chat__panel");d.id="aw-chat-panel";const l=i.querySelector(".aw-chat__messages"),m=i.querySelector(".aw-chat__composer"),f=m.querySelector("textarea"),g=m.querySelector(".aw-chat__send"),u=i.querySelector(".aw-chat__toggle"),b=u.querySelector(".aw-chat__badge"),p=le(d);let x=null;const y=new Map;let E=0,L=ye();function k(){Ae(t.filter(r=>r.status!=="streaming"),L)}function F(r){l.querySelector(`[data-id="${r}"]`)?.scrollIntoView({block:"start",behavior:"smooth"})}function T(){const r=L&&!a;i.classList.toggle("has-unread",r),b.hidden=!r,b.setAttribute("aria-hidden",r?"false":"true"),a?u.setAttribute("aria-label",e.closeAnna):r?u.setAttribute("aria-label",e.openUnread):u.setAttribute("aria-label",e.open)}function N(){a||(L=!0,k(),T())}function S(r){a=r,i.classList.toggle("is-open",a),u.setAttribute("aria-expanded",String(a)),d.hidden=!a,d.setAttribute("aria-hidden",a?"false":"true"),a?(L=!1,k(),x=document.activeElement,p.activate()):(p.deactivate(),(x||u).focus()),T()}async function I(r,s){const h=(y.get(r.id)??0)+1;y.set(r.id,h);let w=s;w||(w=document.createElement("div"),w.className=`aw-msg aw-msg--${r.role}`,w.dataset.id=r.id,l.appendChild(w));const c=document.createElement("div");if(c.className="aw-msg__bubble",r.role==="assistant")if(r.status==="streaming"&&!r.content)c.innerHTML=`<span class="aw-typing" aria-label="${e.typing}"><i></i><i></i><i></i></span>`;else try{const R=await ve(r.content||"");if(y.get(r.id)!==h)return;c.innerHTML=R,J(c)}catch{if(y.get(r.id)!==h)return;c.textContent=r.content||""}else c.textContent=r.content;if(y.get(r.id)!==h)return;const C=document.createElement("div");C.className="aw-msg__meta",C.textContent=Re(r.createdAt),w.replaceChildren(c,C)}async function V(r){const s=l.scrollTop;if(l.replaceChildren(),t.length===0){const h=document.createElement("div");h.className="aw-chat__empty";const w=Ne().map(c=>`<button type="button" class="aw-chat__suggest" data-suggest="${G(c)}">${G(c)}</button>`).join("");h.innerHTML=`
        <strong>${e.hello}</strong>
        <p>${e.intro}</p>
        <div class="aw-chat__suggests" role="group" aria-label="${e.suggests}">${w}</div>
      `,l.appendChild(h);return}for(const h of t)await I(h);l.scrollTop=s}function P(r){g.className="aw-chat__send",g.textContent=e.send,g.type="submit",g.disabled=r,g.setAttribute("aria-label",e.sendMessage),g.onclick=null}function D(r){E&&(cancelAnimationFrame(E),E=0);const s=l.querySelector(`[data-id="${r.id}"]`);return I(r,s||void 0)}function Y(r){E||(E=requestAnimationFrame(()=>{E=0,D(r)}))}async function Z(r){const s={id:X(),role:"assistant",content:"",createdAt:Date.now(),status:"streaming"};t=[...r,s],o=s.id,P(!0),await I(s);const h=[...r].reverse().find(c=>c.role==="user");h&&F(h.id),n=new AbortController;const w={messages:r.filter(c=>c.role==="user"||c.role==="assistant").filter(c=>c.status!=="error").map(c=>({role:c.role,content:c.content.slice(0,2e3)})),pageContext:se(),site:re};await oe(w,{onDelta:c=>{s.content+=c,s.status="streaming",Y(s),s.content&&N()},onDone:()=>{const c=!!s.content;s.status=c?"ok":"error",c||(s.content=e.noResponse),o=null,n=null,P(!1),k(),D(s),N()},onError:c=>{s.content=c,s.status="error",o=null,n=null,P(!1),k(),D(s),N()}},n.signal)}async function q(r){const s=r.trim().slice(0,2e3);if(!s||o)return;const h=l.querySelector(".aw-chat__empty");h&&h.remove();const w={id:X(),role:"user",content:s,createdAt:Date.now(),status:"ok"},c=[...t,w];t=c,k(),await I(w),await Z(c)}function ee(){window.matchMedia("(prefers-reduced-motion: reduce)").matches||(u.classList.remove("aw-chat__toggle--spin","aw-chat__toggle--enter"),u.offsetWidth,u.classList.add("aw-chat__toggle--spin"))}window.matchMedia("(prefers-reduced-motion: reduce)").matches||u.classList.add("aw-chat__toggle--enter"),u.addEventListener("animationend",r=>{r.animationName==="aw-toggle-spin"&&u.classList.remove("aw-chat__toggle--spin"),r.animationName==="aw-toggle-enter"&&u.classList.remove("aw-chat__toggle--enter")}),u.addEventListener("click",()=>{ee(),S(!a)}),i.querySelector('[data-action="close"]').addEventListener("click",()=>S(!1)),m.addEventListener("submit",r=>{r.preventDefault();const s=f.value;f.value="",q(s)}),f.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),m.requestSubmit())}),l.addEventListener("click",async r=>{const s=r.target.closest(".aw-chat__suggest");if(s){const R=s.getAttribute("data-suggest")||s.textContent||"";q(R);return}const h=r.target.closest(".aw-code-copy");if(!h)return;const C=h.closest("pre")?.querySelector("code")?.textContent||"";try{await navigator.clipboard.writeText(C),h.textContent=e.copied,setTimeout(()=>{h.textContent=e.copy},1200)}catch{h.textContent=e.failed}}),document.addEventListener("keydown",r=>{r.key==="Escape"&&a&&(r.preventDefault(),S(!1))}),document.addEventListener("pointerdown",r=>{if(!a||o)return;const s=r.target;s&&(d.contains(s)||u.contains(s)||S(!1))},!0),V(),T()}qe();
//# sourceMappingURL=chat-widget.js.map
