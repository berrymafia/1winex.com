const X="1winex-chat-v2",te="1winex-chat-theme",ae=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"/api/chat":"https://api-chat.net/api/chat",re="1winex",O="1winex-chat-root";function oe(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":"en"}function C(e,t,a){const o=oe();return o==="ru"?t:o==="es"?a:e}async function ne(e,t,a){let o;try{o=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),signal:a})}catch(l){if(l?.name==="AbortError"){t.onDone();return}t.onError(C("Network error. Please try again.","Нет соединения. Попробуйте ещё раз.","No hay conexión. Inténtalo de nuevo."));return}if(!o.ok){let l=C("Request failed. Please try again.","Не удалось получить ответ. Попробуйте ещё раз.","No llegó la respuesta. Inténtalo de nuevo.");try{const m=await o.json();m?.error&&(l=m.error)}catch{}t.onError(l);return}if(!o.body){t.onError(C("Empty response from server.","Сервер вернул пустой ответ.","El servidor no mandó nada."));return}const n=o.body.getReader(),i=new TextDecoder;let d="";try{for(;;){const{done:l,value:m}=await n.read();if(l)break;d+=i.decode(m,{stream:!0});const w=d.split(`
`);d=w.pop()||"";for(const h of w){const u=h.trim();if(!u.startsWith("data:"))continue;const b=u.slice(5).trim();if(b){if(b==="[DONE]"){t.onDone();return}try{const g=JSON.parse(b);g.type==="delta"&&g.delta?t.onDelta(g.delta):g.type==="error"?t.onError(g.error||C("Assistant error.","Ошибка помощника.","Error del asistente.")):g.type}catch{}}}}t.onDone()}catch(l){if(l?.name==="AbortError"){t.onDone();return}t.onError(C("Stream interrupted. Please try again.","Ответ прервался. Попробуйте ещё раз.","Se cortó la respuesta. Inténtalo de nuevo."))}}const ie=3500;function se(){const e=document.title||"",t=location.href,o=(document.querySelector("main")||document.querySelector("article")||document.querySelector(".review-content")||document.querySelector(".page-content")||document.body).cloneNode(!0);o.querySelectorAll('script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]').forEach(i=>i.remove());const n=(o.textContent||"").replace(/\s+/g," ").trim().slice(0,ie);return{title:e,url:t,snippet:n}}function le(e){const t='a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function a(){return Array.from(e.querySelectorAll(t)).filter(n=>!n.hasAttribute("disabled")&&n.offsetParent!==null)}function o(n){if(n.key!=="Tab")return;const i=a();if(i.length===0){n.preventDefault();return}const d=i[0],l=i[i.length-1];n.shiftKey?document.activeElement===d&&(n.preventDefault(),l.focus()):document.activeElement===l&&(n.preventDefault(),d.focus())}return{activate(){e.addEventListener("keydown",o),(a()[0]||e).focus()},deactivate(){e.removeEventListener("keydown",o)}}}const ce="modulepreload",de=function(e,t){return new URL(e,t).href},$={},A=function(t,a,o){let n=Promise.resolve();if(a&&a.length>0){const d=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),m=l?.nonce||l?.getAttribute("nonce");n=Promise.allSettled(a.map(w=>{if(w=de(w,o),w in $)return;$[w]=!0;const h=w.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!o)for(let x=d.length-1;x>=0;x--){const y=d[x];if(y.href===w&&(!h||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${w}"]${u}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":ce,h||(g.as="script"),g.crossOrigin="",g.href=w,m&&g.setAttribute("nonce",m),document.head.appendChild(g),h)return new Promise((x,y)=>{g.addEventListener("load",x),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${w}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return n.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};let H=null,R=null,j=null;async function ue(){return(await A(()=>import("./chat-widget-core-Cy0t5JvF.js"),[],import.meta.url)).default}async function pe(){if(!H||!R){const[e,t]=await Promise.all([A(()=>import("./chat-widget-marked.esm-DweX3G3F.js"),[],import.meta.url),A(()=>import("./chat-widget-purify.es-BnINGy_Y.js"),[],import.meta.url)]);H=e,R=t,e.marked.setOptions({gfm:!0,breaks:!0})}return{marked:H.marked,DOMPurify:R.default}}async function ge(){if(j)return j;const e=await ue(),t=await Promise.all([A(()=>import("./chat-widget-javascript-DUNaicwC.js"),[],import.meta.url),A(()=>import("./chat-widget-typescript-5pldp2kO.js"),[],import.meta.url),A(()=>import("./chat-widget-json-DdsocbVI.js"),[],import.meta.url),A(()=>import("./chat-widget-bash-I8pq0VWm.js"),[],import.meta.url),A(()=>import("./chat-widget-xml-FcirFJJ2.js"),[],import.meta.url),A(()=>import("./chat-widget-css-AVCICof-.js"),[],import.meta.url),A(()=>import("./chat-widget-python-C7NRPp2R.js"),[],import.meta.url)]);return["javascript","typescript","json","bash","xml","css","python"].forEach((o,n)=>e.registerLanguage(o,t[n].default)),j=e,e}const z={ALLOWED_TAGS:["p","br","strong","em","u","s","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","table","thead","tbody","tr","th","td","hr","span","button","div"],ALLOWED_ATTR:["href","title","target","rel","class","data-lang","type","aria-label"]},me="nofollow noopener noreferrer",he=new Set(["1winex.com","www.1winex.com"]);function K(e){return!(!e||e.startsWith("#")||/^(mailto|tel|javascript|data):/i.test(e))}function we(e){try{const t=typeof location<"u"?location.href:"https://1winex.com/",a=new URL(e,t).pathname.replace(/\/+$/,"")||"/";return a==="/go"||a==="/apk"}catch{return!1}}function fe(e){const t=e.trim();if(!K(t)||we(t))return!1;if(!/^https?:\/\//i.test(t)&&!t.startsWith("//"))return!/^[a-z][a-z0-9+.-]*:/i.test(t);try{const a=t.startsWith("//")?`https:${t}`:t,o=new URL(a).hostname.toLowerCase();if(he.has(o)||typeof location<"u"&&location.hostname&&o===location.hostname.toLowerCase())return!0}catch{return!1}return!1}function J(e){e.querySelectorAll("a[href]").forEach(t=>{const a=t,o=(a.getAttribute("href")||"").trim();if(!K(o))return;const n=/^https?:\/\//i.test(o)||o.startsWith("//"),i=!n&&!/^[a-z][a-z0-9+.-]*:/i.test(o);if(!(!n&&!i)){if(fe(o)){a.removeAttribute("target"),a.removeAttribute("rel");return}a.setAttribute("target","_blank"),a.setAttribute("rel",me)}})}function be(e){const t=document.createElement("div");return t.innerHTML=e,J(t),t.innerHTML}async function ve(e){const{marked:t,DOMPurify:a}=await pe(),o=await t.parse(e||"");let n=a.sanitize(String(o),z);if(/<pre[\s>]/i.test(n)){const i=await ge(),d=document.createElement("div");d.innerHTML=n,d.querySelectorAll("pre code").forEach(l=>{const m=l,h=(m.className||"").match(/language-([\w-]+)/)?.[1];try{h&&i.getLanguage(h)?m.innerHTML=i.highlight(m.textContent||"",{language:h}).value:m.innerHTML=i.highlightAuto(m.textContent||"").value}catch{}const u=m.parentElement;if(u&&u.tagName==="PRE"&&!u.querySelector(".aw-code-copy")){u.setAttribute("data-lang",h||"code");const b=document.createElement("button");b.type="button",b.className="aw-code-copy";const g=(document.documentElement.lang||"").toLowerCase(),x=g.startsWith("ru")?{aria:"Копировать код",text:"Копировать"}:g.startsWith("es")?{aria:"Copiar código",text:"Copiar"}:{aria:"Copy code",text:"Copy"};b.setAttribute("aria-label",x.aria),b.textContent=x.text,u.appendChild(b)}}),n=a.sanitize(d.innerHTML,z)}return be(n)}function F(){try{const e=localStorage.getItem(X);if(!e)return null;const t=JSON.parse(e);return!t||!Array.isArray(t.messages)?null:t}catch{return null}}function _e(e){try{localStorage.setItem(X,JSON.stringify(e))}catch{}}function xe(){const e=F();return e?e.messages.slice(-60):[]}function ye(){return!!F()?.unread}function Ae(e,t=!1){_e({messages:e.slice(-60),updatedAt:Date.now(),unread:!!t})}function Ee(){try{const e=localStorage.getItem(te);if(e==="light"||e==="dark")return e}catch{}return"dark"}function ke(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":"en"}function v(e,t,a,o){return e==="ru"?a:e==="es"?o:t}const Le=["What license does 1win have?","What does promo code WINEX600 give?","How fast are withdrawals?","How do I download the app?"],Ce=["Какая лицензия у 1win?","Что даёт промокод WINEX600?","Как быстро выводят деньги?","Как скачать приложение?"],Se=["¿Qué licencia tiene 1win?","¿Qué incluye el código promo WINEX600?","¿Cuánto tarda un retiro?","¿Cómo bajo la app?"];function _(e,t=4){const a=[],o=new Set;for(const n of e){const i=String(n||"").replace(/\s+/g," ").trim();if(!i)continue;const d=i.toLowerCase();if(!o.has(d)&&(o.add(d),a.push(i),a.length>=t))break}return a}function Ie(e=location.pathname){const a=(e.replace(/\/+$/,"")||"/").split("/").filter(Boolean);if(!a.length)return"index";let o=0;if((a[0]==="ru"||a[0]==="es")&&(o=1),!a[o]||a[o]==="index")return"index";let n=a[o].replace(/\.html$/i,"");return n==="betting"?"sports":n==="app"?"mobile":n==="casino"?"games":n}function Te(e=typeof location<"u"?location.pathname:"/"){const t=Ie(e),a=ke();return _(t==="bonuses"?v(a,["What does promo code WINEX600 give?","What are the wagering terms?","How do I enter WINEX600?","How do I get the welcome bonus?"],["Что даёт промокод WINEX600?","Какие условия отыгрыша?","Как указать WINEX600?","Как получить приветственный бонус?"],["¿Qué incluye el bono de bienvenida?","¿Cuál es el rollover?","¿Cómo pongo WINEX600?","¿Cuándo dan los giros gratis?"]):t==="payments"?v(a,["How fast are withdrawals?","Can I deposit with crypto?","Where do I see withdrawal limits?","When do they ask for documents?"],["Как быстро выводят деньги?","Можно ли пополнить криптой?","Где смотреть лимиты вывода?","Когда просят документы?"],["¿Cuánto tarda un retiro?","¿Puedo depositar con cripto?","¿Dónde salen los límites de retiro?","¿Cuándo piden documentos?"]):t==="mobile"?v(a,["How do I install the Android APK?","Can I use 1win on iPhone?","Can I open 1win in the browser?","Where should I download the APK?"],["Как поставить Android APK?","Можно ли зайти с iPhone?","Можно ли открыть 1win в браузере?","Откуда скачивать APK?"],["¿Cómo instalo el APK de Android?","¿Cómo uso 1win en iPhone?","¿Puedo jugar sin app, en el navegador?","¿De dónde bajo el APK?"]):t==="games"?v(a,["What slots are in the lobby?","What is Aviator RTP?","Are there live tables?","Do slots count toward the bonus?"],["Какие слоты есть в лобби?","Какой RTP у Aviator?","Есть ли живые столы?","Учитываются ли слоты в бонусе?"],["¿Qué tragamonedas hay en el lobby?","¿Dónde veo el RTP de un juego?","¿Hay mesas en vivo?","¿Las tragamonedas cuentan para el bono?"]):t==="aviator"?v(a,["What is Aviator RTP?","Is Aviator a 1win Original?","Does Aviator count toward the welcome bonus?","What is auto cash-out in Aviator?"],["Какой RTP у Aviator?","Aviator — это 1win Original?","Идёт ли Aviator в отыгрыш бонуса?","Что такое автокэшаут в Aviator?"],["¿Dónde veo el RTP de Aviator?","¿Aviator es un 1win Original?","¿Aviator cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"]):t==="lucky-jet"?v(a,["What is Lucky Jet RTP?","Is Lucky Jet the same as Aviator?","Does Lucky Jet count toward the welcome bonus?","What is auto cash-out in Lucky Jet?"],["Какой RTP у Lucky Jet?","Lucky Jet — это то же, что Aviator?","Идёт ли Lucky Jet в отыгрыш бонуса?","Что такое автокэшаут в Lucky Jet?"],["¿Dónde veo el RTP de Lucky Jet?","¿Lucky Jet es lo mismo que Aviator?","¿Lucky Jet cuenta para el bono de bienvenida?","¿Qué es el retiro automático?"]):t==="sports"?v(a,["How do I place a sports bet?","Can I cash out a sports bet?","What is the multiple bet bonus?","Do casino and sports bonuses share a balance?"],["Как поставить на спорт?","Есть ли кэшаут?","Что такое бонус на экспресс?","Бонусы казино и спорта на одном балансе?"],["¿Cómo apuesto al deporte?","¿Hay cash out en 1win?","¿Qué es el bono por combinada?","¿Los bonos de casino y de deporte van juntos?"]):t==="safety"?v(a,["What license does 1win have?","When do they ask for documents?","How do I know the site is real?","How do I turn on 2FA?"],["Какая лицензия у 1win?","Когда просят документы?","Как понять, что сайт настоящий?","Как включить 2FA?"],["¿Qué licencia tiene 1win?","¿Cuándo piden documentos?","¿Cómo sé que es el sitio de verdad?","¿Cómo activo el 2FA?"]):t==="faq"?v(a,["How do I register?","How fast are withdrawals?","What does promo code WINEX600 give?","How do I download the app?"],["Как зарегистрироваться?","Как быстро выводят деньги?","Что даёт промокод WINEX600?","Как скачать приложение?"],["¿Cómo me registro?","¿Cuánto tarda un retiro?","¿Qué incluye el código promo WINEX600?","¿Cómo bajo la app?"]):t==="responsible-gambling"?v(a,["How do I set a limit or self-exclusion?","How do I set a deposit limit?","How does self-exclusion work?","What license does 1win have?"],["Как поставить лимит или самоисключение?","Как поставить лимит на депозит?","Как работает самоисключение?","Какая лицензия у 1win?"],["¿Cómo pongo límites de depósito o la autoexclusión?","¿Cómo pongo un límite de depósito?","¿Cómo funciona la autoexclusión?","¿Dónde pido ayuda con el juego?"]):t==="crypto-casino"?v(a,["How do I deposit Bitcoin or USDT?","Do I still need KYC for crypto?","What if a crypto deposit did not arrive?","Does the bonus work with crypto?"],["Как внести Bitcoin или USDT?","Нужен ли KYC для крипты?","Что делать, если крипта не пришла?","Бонус действует на крипту?"],["¿Cómo deposito Bitcoin o USDT?","¿Piden KYC si pago con cripto?","¿Qué hago si el depósito cripto no llega?","¿El bono vale con cripto?"]):t==="not-working"?v(a,["Why is 1win not opening?","What if the site will not load?","Will the app still work?","How do I log in if the domain is blocked?"],["Почему 1win не открывается?","Что делать, если сайт не грузится?","Поможет ли приложение?","Как войти, если домен заблокирован?"],["¿Por qué 1win no abre?","¿Qué hago si el sitio no carga?","¿La app abre si el sitio no?","¿Cómo entro si el dominio está bloqueado?"]):[...v(a,[...Le],[...Ce],[...Se])])}const Pe=`
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
`;function Ne(){if(document.getElementById("1winex-chat-styles"))return;const e=document.createElement("style");e.id="1winex-chat-styles",e.textContent=Pe,document.head.appendChild(e)}function U(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function We(e){try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}catch{return""}}const B={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'},De=new URL("../images/chat/anna.webp?v=3",import.meta.url).href;function G(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Me(){const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("ru")?"ru":e.startsWith("es")?"es":"en"}function He(){const e=Me();return e==="ru"?{name:"Анна",subtitle:"Виртуальный помощник 1win",close:"Закрыть чат",placeholder:"Задайте вопрос…",message:"Сообщение",send:"Отправить",sendMessage:"Отправить сообщение",open:"Открыть чат с Анной",closeAnna:"Закрыть чат с Анной",openUnread:"Открыть чат с Анной — новое сообщение",typing:"Анна печатает",hello:"Привет! Я Анна. Чем могу помочь?",intro:"Могу помочь с казино, ставками, промокодом WINEX600, депозитом, выводом и Android APK.",suggests:"Популярные вопросы",noResponse:"Не удалось получить ответ.",copied:"Скопировано",copy:"Копировать",failed:"Ошибка"}:e==="es"?{name:"Anna",subtitle:"Asistente virtual de 1win",close:"Cerrar chat",placeholder:"Haz una pregunta…",message:"Mensaje",send:"Enviar",sendMessage:"Enviar mensaje",open:"Abrir chat con Anna",closeAnna:"Cerrar chat con Anna",openUnread:"Abrir chat con Anna — mensaje nuevo",typing:"Anna está escribiendo",hello:"Hola, soy Anna. ¿En qué te ayudo?",intro:"Te ayudo con casino, apuestas, el código promo WINEX600, depósito, retiro y el APK de Android.",suggests:"Preguntas frecuentes",noResponse:"No llegó la respuesta.",copied:"Copiado",copy:"Copiar",failed:"Error"}:{name:"Anna",subtitle:"Virtual 1win assistant",close:"Close chat",placeholder:"Ask a question…",message:"Message",send:"Send",sendMessage:"Send message",open:"Open chat with Anna",closeAnna:"Close chat with Anna",openUnread:"Open chat with Anna — new message",typing:"Anna is typing",hello:"Hi! I&rsquo;m Anna. How can I help?",intro:"I can help with casino and sports betting, promo code WINEX600, deposits, withdrawals, and the Android APK.",suggests:"Suggested questions",noResponse:"No response received.",copied:"Copied",copy:"Copy",failed:"Failed"}}function Re(){if(document.getElementById(O))return;Ne();const e=He();let t=xe(),a=!1,o=null,n=null;const i=document.createElement("div");i.id=O,i.className="aw-chat",i.dataset.theme=Ee(),i.setAttribute("data-nosnippet",""),i.innerHTML=`
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${De}" alt="${e.name}" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">${e.name}</strong>
            <span>${e.subtitle}</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="${e.close}">${B.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="2000" placeholder="${e.placeholder}" aria-label="${e.message}"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="${e.sendMessage}">${e.send}</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="${e.open}" aria-expanded="false" aria-controls="aw-chat-panel">
      ${B.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `,document.body.appendChild(i);const d=i.querySelector(".aw-chat__panel");d.id="aw-chat-panel";const l=i.querySelector(".aw-chat__messages"),m=i.querySelector(".aw-chat__composer"),w=m.querySelector("textarea"),h=m.querySelector(".aw-chat__send"),u=i.querySelector(".aw-chat__toggle"),b=u.querySelector(".aw-chat__badge"),g=le(d);let x=null;const y=new Map;let E=0,S=ye();function k(){Ae(t.filter(r=>r.status!=="streaming"),S)}function V(r){l.querySelector(`[data-id="${r}"]`)?.scrollIntoView({block:"start",behavior:"smooth"})}function P(){const r=S&&!a;i.classList.toggle("has-unread",r),b.hidden=!r,b.setAttribute("aria-hidden",r?"false":"true"),a?u.setAttribute("aria-label",e.closeAnna):r?u.setAttribute("aria-label",e.openUnread):u.setAttribute("aria-label",e.open)}function N(){a||(S=!0,k(),P())}function I(r){a=r,i.classList.toggle("is-open",a),u.setAttribute("aria-expanded",String(a)),d.hidden=!a,d.setAttribute("aria-hidden",a?"false":"true"),a?(S=!1,k(),x=document.activeElement,g.activate()):(g.deactivate(),(x||u).focus()),P()}async function T(r,s){const p=(y.get(r.id)??0)+1;y.set(r.id,p);let f=s;f||(f=document.createElement("div"),f.className=`aw-msg aw-msg--${r.role}`,f.dataset.id=r.id,l.appendChild(f));const c=document.createElement("div");if(c.className="aw-msg__bubble",r.role==="assistant")if(r.status==="streaming"&&!r.content)c.innerHTML=`<span class="aw-typing" aria-label="${e.typing}"><i></i><i></i><i></i></span>`;else try{const M=await ve(r.content||"");if(y.get(r.id)!==p)return;c.innerHTML=M,J(c)}catch{if(y.get(r.id)!==p)return;c.textContent=r.content||""}else c.textContent=r.content;if(y.get(r.id)!==p)return;const L=document.createElement("div");L.className="aw-msg__meta",L.textContent=We(r.createdAt),f.replaceChildren(c,L)}async function Y(r){const s=l.scrollTop;if(l.replaceChildren(),t.length===0){const p=document.createElement("div");p.className="aw-chat__empty";const f=Te().map(c=>`<button type="button" class="aw-chat__suggest" data-suggest="${G(c)}">${G(c)}</button>`).join("");p.innerHTML=`
        <strong>${e.hello}</strong>
        <p>${e.intro}</p>
        <div class="aw-chat__suggests" role="group" aria-label="${e.suggests}">${f}</div>
      `,l.appendChild(p);return}for(const p of t)await T(p);l.scrollTop=s}function W(r){h.className="aw-chat__send",h.textContent=e.send,h.type="submit",h.disabled=r,h.setAttribute("aria-label",e.sendMessage),h.onclick=null}function D(r){E&&(cancelAnimationFrame(E),E=0);const s=l.querySelector(`[data-id="${r.id}"]`);return T(r,s||void 0)}function Q(r){E||(E=requestAnimationFrame(()=>{E=0,D(r)}))}async function Z(r){const s={id:U(),role:"assistant",content:"",createdAt:Date.now(),status:"streaming"};t=[...r,s],n=s.id,W(!0),await T(s);const p=[...r].reverse().find(c=>c.role==="user");p&&V(p.id),o=new AbortController;const f={messages:r.filter(c=>c.role==="user"||c.role==="assistant").filter(c=>c.status!=="error").map(c=>({role:c.role,content:c.content.slice(0,2e3)})),pageContext:se(),site:re};await ne(f,{onDelta:c=>{s.content+=c,s.status="streaming",Q(s),s.content&&N()},onDone:()=>{const c=!!s.content;s.status=c?"ok":"error",c||(s.content=e.noResponse),n=null,o=null,W(!1),k(),D(s),N()},onError:c=>{s.content=c,s.status="error",n=null,o=null,W(!1),k(),D(s),N()}},o.signal)}async function q(r){const s=r.trim().slice(0,2e3);if(!s||n)return;const p=l.querySelector(".aw-chat__empty");p&&p.remove();const f={id:U(),role:"user",content:s,createdAt:Date.now(),status:"ok"},c=[...t,f];t=c,k(),await T(f),await Z(c)}function ee(){window.matchMedia("(prefers-reduced-motion: reduce)").matches||(u.classList.remove("aw-chat__toggle--spin","aw-chat__toggle--enter"),u.offsetWidth,u.classList.add("aw-chat__toggle--spin"))}window.matchMedia("(prefers-reduced-motion: reduce)").matches||u.classList.add("aw-chat__toggle--enter"),u.addEventListener("animationend",r=>{r.animationName==="aw-toggle-spin"&&u.classList.remove("aw-chat__toggle--spin"),r.animationName==="aw-toggle-enter"&&u.classList.remove("aw-chat__toggle--enter")}),u.addEventListener("click",()=>{ee(),I(!a)}),i.querySelector('[data-action="close"]').addEventListener("click",()=>I(!1)),m.addEventListener("submit",r=>{r.preventDefault();const s=w.value;w.value="",q(s)}),w.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),m.requestSubmit())}),l.addEventListener("click",async r=>{const s=r.target.closest(".aw-chat__suggest");if(s){const M=s.getAttribute("data-suggest")||s.textContent||"";q(M);return}const p=r.target.closest(".aw-code-copy");if(!p)return;const L=p.closest("pre")?.querySelector("code")?.textContent||"";try{await navigator.clipboard.writeText(L),p.textContent=e.copied,setTimeout(()=>{p.textContent=e.copy},1200)}catch{p.textContent=e.failed}}),document.addEventListener("keydown",r=>{r.key==="Escape"&&a&&(r.preventDefault(),I(!1))}),document.addEventListener("pointerdown",r=>{if(!a||n)return;const s=r.target;s&&(d.contains(s)||u.contains(s)||I(!1))},!0),Y(),P()}Re();
//# sourceMappingURL=chat-widget.js.map
