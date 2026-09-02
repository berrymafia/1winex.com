const W="1winex-chat-v1",Q="1winex-chat-theme",Z="/api/chat",O="1winex-chat-root";async function ee(t,e,i){let o;try{o=await fetch(Z,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),signal:i})}catch(c){if(c?.name==="AbortError"){e.onDone();return}e.onError("Network error. Please try again.");return}if(!o.ok){let c="Request failed. Please try again.";try{const m=await o.json();m?.error&&(c=m.error)}catch{}e.onError(c);return}if(!o.body){e.onError("Empty response from server.");return}const r=o.body.getReader(),p=new TextDecoder;let s="";try{for(;;){const{done:c,value:m}=await r.read();if(c)break;s+=p.decode(m,{stream:!0});const g=s.split(`
`);s=g.pop()||"";for(const d of g){const b=d.trim();if(!b.startsWith("data:"))continue;const f=b.slice(5).trim();if(f){if(f==="[DONE]"){e.onDone();return}try{const h=JSON.parse(f);h.type==="delta"&&h.delta?e.onDelta(h.delta):h.type==="error"?e.onError(h.error||"Assistant error."):h.type}catch{}}}}e.onDone()}catch(c){if(c?.name==="AbortError"){e.onDone();return}e.onError("Stream interrupted. Please try again.")}}const te=3500;function ae(){const t=document.title||"",e=location.href,o=(document.querySelector("main")||document.querySelector("article")||document.querySelector(".review-content")||document.querySelector(".page-content")||document.body).cloneNode(!0);o.querySelectorAll('script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]').forEach(p=>p.remove());const r=(o.textContent||"").replace(/\s+/g," ").trim().slice(0,te);return{title:t,url:e,snippet:r}}function re(t){const e='a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function i(){return Array.from(t.querySelectorAll(e)).filter(r=>!r.hasAttribute("disabled")&&r.offsetParent!==null)}function o(r){if(r.key!=="Tab")return;const p=i();if(p.length===0){r.preventDefault();return}const s=p[0],c=p[p.length-1];r.shiftKey?document.activeElement===s&&(r.preventDefault(),c.focus()):document.activeElement===c&&(r.preventDefault(),s.focus())}return{activate(){t.addEventListener("keydown",o),(i()[0]||t).focus()},deactivate(){t.removeEventListener("keydown",o)}}}const oe="modulepreload",ne=function(t,e){return new URL(t,e).href},R={},x=function(e,i,o){let r=Promise.resolve();if(i&&i.length>0){const s=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),m=c?.nonce||c?.getAttribute("nonce");r=Promise.allSettled(i.map(g=>{if(g=ne(g,o),g in R)return;R[g]=!0;const d=g.endsWith(".css"),b=d?'[rel="stylesheet"]':"";if(!!o)for(let _=s.length-1;_>=0;_--){const v=s[_];if(v.href===g&&(!d||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${b}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":oe,d||(h.as="script"),h.crossOrigin="",h.href=g,m&&h.setAttribute("nonce",m),document.head.appendChild(h),d)return new Promise((_,v)=>{h.addEventListener("load",_),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${g}`)))})}))}function p(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&p(c.reason);return e().catch(p)})};let N=null,H=null,q=null;async function ie(){return(await x(()=>import("./chat-widget-core-Cy0t5JvF.js"),[],import.meta.url)).default}async function se(){if(!N||!H){const[t,e]=await Promise.all([x(()=>import("./chat-widget-marked.esm-DweX3G3F.js"),[],import.meta.url),x(()=>import("./chat-widget-purify.es-BnINGy_Y.js"),[],import.meta.url)]);N=t,H=e,t.marked.setOptions({gfm:!0,breaks:!0})}return{marked:N.marked,DOMPurify:H.default}}async function le(){if(q)return q;const t=await ie(),e=await Promise.all([x(()=>import("./chat-widget-javascript-DUNaicwC.js"),[],import.meta.url),x(()=>import("./chat-widget-typescript-5pldp2kO.js"),[],import.meta.url),x(()=>import("./chat-widget-json-DdsocbVI.js"),[],import.meta.url),x(()=>import("./chat-widget-bash-I8pq0VWm.js"),[],import.meta.url),x(()=>import("./chat-widget-xml-FcirFJJ2.js"),[],import.meta.url),x(()=>import("./chat-widget-css-AVCICof-.js"),[],import.meta.url),x(()=>import("./chat-widget-python-C7NRPp2R.js"),[],import.meta.url)]);return["javascript","typescript","json","bash","xml","css","python"].forEach((o,r)=>t.registerLanguage(o,e[r].default)),q=t,t}const j={ALLOWED_TAGS:["p","br","strong","em","u","s","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","table","thead","tbody","tr","th","td","hr","span","button","div"],ALLOWED_ATTR:["href","title","target","rel","class","data-lang","type","aria-label"]},ce="nofollow noopener noreferrer",de=new Set(["1winex.com","www.1winex.com"]);function G(t){return!(!t||t.startsWith("#")||/^(mailto|tel|javascript|data):/i.test(t))}function pe(t){const e=t.trim();if(!G(e))return!1;if(!/^https?:\/\//i.test(e)&&!e.startsWith("//"))return!/^[a-z][a-z0-9+.-]*:/i.test(e);try{const i=e.startsWith("//")?`https:${e}`:e,o=new URL(i).hostname.toLowerCase();if(de.has(o)||typeof location<"u"&&location.hostname&&o===location.hostname.toLowerCase())return!0}catch{return!1}return!1}function V(t){t.querySelectorAll("a[href]").forEach(e=>{const i=e,o=(i.getAttribute("href")||"").trim();if(!G(o))return;const r=/^https?:\/\//i.test(o)||o.startsWith("//"),p=!r&&!/^[a-z][a-z0-9+.-]*:/i.test(o);if(!(!r&&!p)){if(pe(o)){i.removeAttribute("target"),i.removeAttribute("rel");return}i.setAttribute("target","_blank"),i.setAttribute("rel",ce)}})}function ue(t){const e=document.createElement("div");return e.innerHTML=t,V(e),e.innerHTML}async function ge(t){const{marked:e,DOMPurify:i}=await se(),o=await e.parse(t||"");let r=i.sanitize(String(o),j);if(/<pre[\s>]/i.test(r)){const p=await le(),s=document.createElement("div");s.innerHTML=r,s.querySelectorAll("pre code").forEach(c=>{const m=c,d=(m.className||"").match(/language-([\w-]+)/)?.[1];try{d&&p.getLanguage(d)?m.innerHTML=p.highlight(m.textContent||"",{language:d}).value:m.innerHTML=p.highlightAuto(m.textContent||"").value}catch{}const b=m.parentElement;if(b&&b.tagName==="PRE"&&!b.querySelector(".aw-code-copy")){b.setAttribute("data-lang",d||"code");const f=document.createElement("button");f.type="button",f.className="aw-code-copy",f.setAttribute("aria-label","Copy code"),f.textContent="Copy",b.appendChild(f)}}),r=i.sanitize(s.innerHTML,j)}return ue(r)}function F(){try{const t=localStorage.getItem(W);if(!t)return null;const e=JSON.parse(t);return!e||!Array.isArray(e.messages)?null:e}catch{return null}}function me(t){try{localStorage.setItem(W,JSON.stringify(t))}catch{}}function he(){const t=F();return t?t.messages.slice(-60):[]}function we(){return!!F()?.unread}function be(t,e=!1){me({messages:t.slice(-60),updatedAt:Date.now(),unread:!!e})}function fe(){try{const t=localStorage.getItem(Q);if(t==="light"||t==="dark")return t}catch{}return"dark"}const _e=["Is 1win legit?","How does the 500% bonus work?","How fast are withdrawals?","Does 1win have a mobile app?"];function y(t,e=4){const i=[],o=new Set;for(const r of t){const p=String(r||"").replace(/\s+/g," ").trim();if(!p)continue;const s=p.toLowerCase();if(!o.has(s)&&(o.add(s),i.push(p),i.length>=e))break}return i}function ve(t=location.pathname){const e=t.replace(/\/+$/,"")||"/";if(e==="/"||e==="/index"||e==="/index.html")return"index";const i=e.split("/").filter(Boolean);return i.length?i[0].replace(/\.html$/i,""):"index"}function xe(t=typeof location<"u"?location.pathname:"/"){const e=ve(t);return y(e==="bonuses"?["How does the 500% bonus work?","What are the wagering requirements?","Is there a no-deposit bonus?","How do I claim the welcome package?"]:e==="payments"?["How fast are withdrawals?","Does 1win support crypto?","What is the minimum withdrawal?","How long does KYC take?"]:e==="mobile"?["How do I install the Android APK?","Is there an iOS app?","Can I play in the mobile browser?","Does 1win have a mobile app?"]:e==="games"?["Which 1win slots are worth trying?","What is Aviator RTP?","Does 1win have live casino?","How does the 500% bonus work?"]:e==="safety"?["Is 1win legit?","What license does 1win have?","Is my money safe at 1win?","Does 1win have 2FA?"]:e==="faq"?["How do I register at 1win?","How fast are withdrawals?","How does the 500% bonus work?","Does 1win have a mobile app?"]:e==="responsible-gambling"?["What responsible gambling tools does 1win offer?","How do I set a deposit limit?","How does self-exclusion work?","Is 1win legit?"]:[..._e])}const ye=`
.aw-chat {
  --aw-bg: var(--color-bg-secondary, #101827);
  --aw-panel: var(--color-bg-card, #1a2332);
  --aw-elevated: var(--color-bg-elevated, #1e2a3d);
  --aw-elevated-hover: var(--color-bg-card-hover, #243044);
  --aw-text: var(--color-text-primary, #f1f5f9);
  --aw-text-secondary: var(--color-text-secondary, #cbd5e1);
  --aw-muted: var(--color-text-muted, #94a3b8);
  --aw-border: var(--color-border-light, rgba(255,255,255,0.1));
  --aw-border-soft: var(--color-border, rgba(255,255,255,0.06));
  --aw-primary: var(--color-primary, #4b8ff8);
  --aw-primary-light: var(--color-primary-light, #60a5fa);
  --aw-primary-hover: var(--color-primary-hover, #2563eb);
  --aw-danger: var(--color-error, #ef4444);
  --aw-radius: var(--radius-lg, 16px);
  --aw-radius-md: var(--radius-md, 12px);
  --aw-radius-sm: var(--radius-sm, 8px);
  --aw-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.28), 0 0 0 1px rgba(75,143,248,0.08);
  --aw-font: var(--font-primary, 'Inter', system-ui, sans-serif);
  --aw-font-display: var(--font-display, 'Montserrat', 'Inter', system-ui, sans-serif);
  --aw-transition: var(--transition-normal, 0.3s cubic-bezier(0.22, 1, 0.36, 1));
  --aw-gradient-btn: var(--gradient-btn-primary, linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%));
  --aw-gradient-btn-hover: var(--gradient-btn-primary-hover, linear-gradient(135deg, #2563eb 0%, #1e40af 100%));
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
  border: 1px solid var(--color-primary-a25, rgba(75,143,248,0.25));
  background: linear-gradient(135deg, var(--aw-primary-light) 0%, var(--aw-primary) 45%, var(--aw-primary-hover) 100%);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transform-origin: center;
  box-shadow: var(--shadow-glow, 0 4px 30px rgba(75,143,248,0.15)), 0 8px 28px rgba(0,0,0,0.35);
  transition: transform var(--aw-transition), box-shadow var(--transition-fast, 0.15s ease);
}
.aw-chat__toggle:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: var(--shadow-glow-strong, 0 8px 40px rgba(75,143,248,0.25)), 0 10px 32px rgba(0,0,0,0.4);
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
    linear-gradient(180deg, rgba(75,143,248,0.04) 0%, transparent 28%),
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
  background: linear-gradient(90deg, transparent, var(--color-primary-a20, rgba(75,143,248,0.2)), transparent);
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
  border: 1px solid var(--color-primary-a25, rgba(75,143,248,0.25));
  box-shadow: 0 2px 10px var(--color-primary-a10, rgba(75,143,248,0.1));
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
    radial-gradient(ellipse 80% 50% at 100% 0%, var(--color-primary-a08, rgba(75,143,248,0.08)), transparent 55%),
    radial-gradient(ellipse 60% 40% at 0% 100%, var(--color-primary-a03, rgba(75,143,248,0.03)), transparent 50%),
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
  box-shadow: 0 4px 14px var(--color-primary-a20, rgba(75,143,248,0.2));
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
  border-color: var(--color-border-focus, rgba(75,143,248,0.4));
  box-shadow: 0 0 0 3px var(--color-primary-a15, rgba(75,143,248,0.15));
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
`;function ke(){if(document.getElementById("1winex-chat-styles"))return;const t=document.createElement("style");t.id="1winex-chat-styles",t.textContent=ye,document.head.appendChild(t)}function z(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Ee(t){try{return new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit"}).format(new Date(t))}catch{return""}}const $={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'},Ae=new URL("../images/chat/anna.webp?v=3",import.meta.url).href;function B(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Se(){if(document.getElementById(O))return;ke();let t=he(),e=!1,i=null,o=null;const r=document.createElement("div");r.id=O,r.className="aw-chat",r.dataset.theme=fe(),r.setAttribute("data-nosnippet",""),r.innerHTML=`
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${Ae}" alt="Anna" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">Anna</strong>
            <span>Ask about 1win bonuses, payouts &amp; the app</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="Close chat">${$.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="2000" placeholder="Ask a question…" aria-label="Message"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="Send message">Send</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="Open chat with Anna" aria-expanded="false" aria-controls="aw-chat-panel">
      ${$.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `,document.body.appendChild(r);const p=r.querySelector(".aw-chat__panel");p.id="aw-chat-panel";const s=r.querySelector(".aw-chat__messages"),c=r.querySelector(".aw-chat__composer"),m=c.querySelector("textarea"),g=c.querySelector(".aw-chat__send"),d=r.querySelector(".aw-chat__toggle"),b=d.querySelector(".aw-chat__badge"),f=re(p);let h=null;const _=new Map;let v=0,A=we();function k(){be(t.filter(a=>a.status!=="streaming"),A)}function U(a){s.querySelector(`[data-id="${a}"]`)?.scrollIntoView({block:"start",behavior:"smooth"})}function T(){const a=A&&!e;r.classList.toggle("has-unread",a),b.hidden=!a,b.setAttribute("aria-hidden",a?"false":"true"),e?d.setAttribute("aria-label","Close chat with Anna"):a?d.setAttribute("aria-label","Open chat with Anna — new message"):d.setAttribute("aria-label","Open chat with Anna")}function C(){e||(A=!0,k(),T())}function S(a){e=a,r.classList.toggle("is-open",e),d.setAttribute("aria-expanded",String(e)),p.hidden=!e,p.setAttribute("aria-hidden",e?"false":"true"),e?(A=!1,k(),h=document.activeElement,f.activate()):(f.deactivate(),(h||d).focus()),T()}async function L(a,n){const u=(_.get(a.id)??0)+1;_.set(a.id,u);let w=n;w||(w=document.createElement("div"),w.className=`aw-msg aw-msg--${a.role}`,w.dataset.id=a.id,s.appendChild(w));const l=document.createElement("div");if(l.className="aw-msg__bubble",a.role==="assistant")if(a.status==="streaming"&&!a.content)l.innerHTML='<span class="aw-typing" aria-label="Anna is typing"><i></i><i></i><i></i></span>';else try{const M=await ge(a.content||"");if(_.get(a.id)!==u)return;l.innerHTML=M,V(l)}catch{if(_.get(a.id)!==u)return;l.textContent=a.content||""}else l.textContent=a.content;if(_.get(a.id)!==u)return;const E=document.createElement("div");E.className="aw-msg__meta",E.textContent=Ee(a.createdAt),w.replaceChildren(l,E)}async function Y(a){const n=s.scrollTop;if(s.replaceChildren(),t.length===0){const u=document.createElement("div");u.className="aw-chat__empty";const w=xe().map(l=>`<button type="button" class="aw-chat__suggest" data-suggest="${B(l)}">${B(l)}</button>`).join("");u.innerHTML=`
        <strong>Hi, I&rsquo;m Anna — how can I help?</strong>
        <p>Ask about casino reviews, bonuses, or payments — or pick a suggestion:</p>
        <div class="aw-chat__suggests" role="group" aria-label="Suggested questions">${w}</div>
      `,s.appendChild(u);return}for(const u of t)await L(u);s.scrollTop=n}function D(a){g.className="aw-chat__send",g.textContent="Send",g.type="submit",g.disabled=a,g.setAttribute("aria-label","Send message"),g.onclick=null}function I(a){v&&(cancelAnimationFrame(v),v=0);const n=s.querySelector(`[data-id="${a.id}"]`);return L(a,n||void 0)}function K(a){v||(v=requestAnimationFrame(()=>{v=0,I(a)}))}async function X(a){const n={id:z(),role:"assistant",content:"",createdAt:Date.now(),status:"streaming"};t=[...a,n],o=n.id,D(!0),await L(n);const u=[...a].reverse().find(l=>l.role==="user");u&&U(u.id),i=new AbortController;const w={messages:a.filter(l=>l.role==="user"||l.role==="assistant").filter(l=>l.status!=="error").map(l=>({role:l.role,content:l.content.slice(0,2e3)})),pageContext:ae()};await ee(w,{onDelta:l=>{n.content+=l,n.status="streaming",K(n),n.content&&C()},onDone:()=>{const l=!!n.content;n.status=l?"ok":"error",l||(n.content="No response received."),o=null,i=null,D(!1),k(),I(n),C()},onError:l=>{n.content=l,n.status="error",o=null,i=null,D(!1),k(),I(n),C()}},i.signal)}async function P(a){const n=a.trim().slice(0,2e3);if(!n||o)return;const u=s.querySelector(".aw-chat__empty");u&&u.remove();const w={id:z(),role:"user",content:n,createdAt:Date.now(),status:"ok"},l=[...t,w];t=l,k(),await L(w),await X(l)}function J(){window.matchMedia("(prefers-reduced-motion: reduce)").matches||(d.classList.remove("aw-chat__toggle--spin","aw-chat__toggle--enter"),d.offsetWidth,d.classList.add("aw-chat__toggle--spin"))}window.matchMedia("(prefers-reduced-motion: reduce)").matches||d.classList.add("aw-chat__toggle--enter"),d.addEventListener("animationend",a=>{a.animationName==="aw-toggle-spin"&&d.classList.remove("aw-chat__toggle--spin"),a.animationName==="aw-toggle-enter"&&d.classList.remove("aw-chat__toggle--enter")}),d.addEventListener("click",()=>{J(),S(!e)}),r.querySelector('[data-action="close"]').addEventListener("click",()=>S(!1)),c.addEventListener("submit",a=>{a.preventDefault();const n=m.value;m.value="",P(n)}),m.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),c.requestSubmit())}),s.addEventListener("click",async a=>{const n=a.target.closest(".aw-chat__suggest");if(n){const M=n.getAttribute("data-suggest")||n.textContent||"";P(M);return}const u=a.target.closest(".aw-code-copy");if(!u)return;const E=u.closest("pre")?.querySelector("code")?.textContent||"";try{await navigator.clipboard.writeText(E),u.textContent="Copied",setTimeout(()=>{u.textContent="Copy"},1200)}catch{u.textContent="Failed"}}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e&&(a.preventDefault(),S(!1))}),document.addEventListener("pointerdown",a=>{if(!e||o)return;const n=a.target;n&&(p.contains(n)||d.contains(n)||S(!1))},!0),Y(),T()}Se();
//# sourceMappingURL=chat-widget.js.map
