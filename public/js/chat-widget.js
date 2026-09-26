const J="1winex-chat-v2",te="1winex-chat-theme",ne=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"/api/chat":"https://api-chat.net/api/chat",ie="1winex",M="1winex-chat-root";function oe(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":e.startsWith("az")?"az":e.startsWith("bn")?"bn":e.startsWith("hi")?"hi":e.startsWith("fil")||e.startsWith("tl")?"fil":"en"}function W(e,a,t,i,o,r,d,l,b,g,h){const s=oe();return s==="fil"?h:s==="hi"?g:s==="bn"?b:s==="az"?l:s==="it"?d:s==="uk"?r:s==="de"?o:s==="fr"?i:s==="es"?t:s==="ru"?a:e}async function re(e,a,t){let i;try{i=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),signal:t})}catch(l){if(l?.name==="AbortError"){a.onDone();return}a.onError(W("Network error. Please try again.","Нет соединения. Попробуйте ещё раз.","No hay conexión. Inténtalo de nuevo.","Pas de connexion. Réessayez.","Netzwerkfehler. Versuch’s nochmal.","Немає з'єднання. Спробуйте ще раз.","Nessuna connessione. Riprova.","Şəbəkə xətası. Yenidən cəhd edin.","নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।","नेटवर्क समस्या। फिर कोशिश करें।","May problema sa network. Subukan muli."));return}if(!i.ok){const l=W("Request failed. Please try again.","Не удалось получить ответ. Попробуйте ещё раз.","No llegó la respuesta. Inténtalo de nuevo.","Pas de réponse. Réessayez.","Anfrage fehlgeschlagen. Versuch’s nochmal.","Не вдалося отримати відповідь. Спробуйте ще раз.","Richiesta non riuscita. Riprova.","Sorğu uğursuz oldu. Yenidən cəhd edin.","অনুরোধ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।","अनुरोध विफल रहा। फिर कोशिश करें।","Hindi natuloy ang kahilingan. Subukan muli.");a.onError(l);return}if(!i.body){a.onError(W("Empty response from server.","Сервер вернул пустой ответ.","El servidor no mandó nada.","Le serveur n’a rien renvoyé.","Leere Antwort vom Server.","Сервер повернув порожню відповідь.","Il server non ha inviato nulla.","Server boş cavab göndərdi.","সার্ভার খালি উত্তর পাঠিয়েছে।","सर्वर ने खाली जवाब भेजा।","Walang sagot mula sa server."));return}const o=i.body.getReader(),r=new TextDecoder;let d="";try{for(;;){const{done:l,value:b}=await o.read();if(l)break;d+=r.decode(b,{stream:!0});const g=d.split(`
`);d=g.pop()||"";for(const h of g){const s=h.trim();if(!s.startsWith("data:"))continue;const v=s.slice(5).trim();if(v){if(v==="[DONE]"){a.onDone();return}try{const p=JSON.parse(v);p.type==="delta"&&p.delta?a.onDelta(p.delta):p.type==="error"?a.onError(W("Assistant error.","Ошибка помощника.","Error del asistente.","Erreur de l’assistant.","Fehler des Assistenten.","Помилка помічника.","Errore dell’assistente.","Köməkçi ilə bağlı xəta baş verdi.","সহকারীর সমস্যা।","सहायक से जवाब देने में समस्या हुई।","May problema sa assistant.")):p.type}catch{}}}}a.onDone()}catch(l){if(l?.name==="AbortError"){a.onDone();return}a.onError(W("Stream interrupted. Please try again.","Ответ прервался. Попробуйте ещё раз.","Se cortó la respuesta. Inténtalo de nuevo.","La réponse s’est interrompue. Réessayez.","Antwort unterbrochen. Versuch’s nochmal.","Відповідь перервалася. Спробуйте ще раз.","Risposta interrotta. Riprova.","Cavab kəsildi. Yenidən cəhd edin.","উত্তর থেমে গেছে। আবার চেষ্টা করুন।","जवाब बीच में रुक गया। फिर कोशिश करें।","Naputol ang sagot. Subukan muli."))}}const se=3500;function le(){const e=document.title||"",a=location.href,i=(document.querySelector("main")||document.querySelector("article")||document.querySelector(".review-content")||document.querySelector(".page-content")||document.body).cloneNode(!0);i.querySelectorAll('script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]').forEach(r=>r.remove());const o=(i.textContent||"").replace(/\s+/g," ").trim().slice(0,se);return{title:e,url:a,snippet:o}}function ce(e){const a='a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function t(){return Array.from(e.querySelectorAll(a)).filter(o=>!o.hasAttribute("disabled")&&o.offsetParent!==null)}function i(o){if(o.key!=="Tab")return;const r=t();if(r.length===0){o.preventDefault();return}const d=r[0],l=r[r.length-1];o.shiftKey?document.activeElement===d&&(o.preventDefault(),l.focus()):document.activeElement===l&&(o.preventDefault(),d.focus())}return{activate(){e.addEventListener("keydown",i),(t()[0]||e).focus()},deactivate(){e.removeEventListener("keydown",i)}}}const de="modulepreload",ue=function(e,a){return new URL(e,a).href},G={},A=function(a,t,i){let o=Promise.resolve();if(t&&t.length>0){const d=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),b=l?.nonce||l?.getAttribute("nonce");o=Promise.allSettled(t.map(g=>{if(g=ue(g,i),g in G)return;G[g]=!0;const h=g.endsWith(".css"),s=h?'[rel="stylesheet"]':"";if(!!i)for(let x=d.length-1;x>=0;x--){const _=d[x];if(_.href===g&&(!h||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${g}"]${s}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":de,h||(p.as="script"),p.crossOrigin="",p.href=g,b&&p.setAttribute("nonce",b),document.head.appendChild(p),h)return new Promise((x,_)=>{p.addEventListener("load",x),p.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${g}`)))})}))}function r(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return o.then(d=>{for(const l of d||[])l.status==="rejected"&&r(l.reason);return a().catch(r)})};let R=null,q=null,D=null;async function pe(){return(await A(()=>import("./chat-widget-core-Cy0t5JvF.js"),[],import.meta.url)).default}async function me(){if(!R||!q){const[e,a]=await Promise.all([A(()=>import("./chat-widget-marked.esm-DweX3G3F.js"),[],import.meta.url),A(()=>import("./chat-widget-purify.es-BnINGy_Y.js"),[],import.meta.url)]);R=e,q=a,e.marked.setOptions({gfm:!0,breaks:!0})}return{marked:R.marked,DOMPurify:q.default}}async function ge(){if(D)return D;const e=await pe(),a=await Promise.all([A(()=>import("./chat-widget-javascript-DUNaicwC.js"),[],import.meta.url),A(()=>import("./chat-widget-typescript-5pldp2kO.js"),[],import.meta.url),A(()=>import("./chat-widget-json-DdsocbVI.js"),[],import.meta.url),A(()=>import("./chat-widget-bash-I8pq0VWm.js"),[],import.meta.url),A(()=>import("./chat-widget-xml-FcirFJJ2.js"),[],import.meta.url),A(()=>import("./chat-widget-css-AVCICof-.js"),[],import.meta.url),A(()=>import("./chat-widget-python-C7NRPp2R.js"),[],import.meta.url)]);return["javascript","typescript","json","bash","xml","css","python"].forEach((i,o)=>e.registerLanguage(i,a[o].default)),D=e,e}const X={ALLOWED_TAGS:["p","br","strong","em","u","s","code","pre","blockquote","ul","ol","li","a","h1","h2","h3","h4","table","thead","tbody","tr","th","td","hr","span","button","div"],ALLOWED_ATTR:["href","title","target","rel","class","data-lang","type","aria-label"]},he="nofollow noopener noreferrer",be=new Set(["1winex.com","www.1winex.com"]);function B(e){return!(!e||e.startsWith("#")||/^(mailto|tel|javascript|data):/i.test(e))}function fe(e){try{const a=typeof location<"u"?location.href:"https://1winex.com/",t=new URL(e,a).pathname.replace(/\/+$/,"")||"/";return t==="/go"||t==="/apk"}catch{return!1}}function we(e){const a=e.trim();if(!B(a)||fe(a))return!1;if(!/^https?:\/\//i.test(a)&&!a.startsWith("//"))return!/^[a-z][a-z0-9+.-]*:/i.test(a);try{const t=a.startsWith("//")?`https:${a}`:a,i=new URL(t).hostname.toLowerCase();if(be.has(i)||typeof location<"u"&&location.hostname&&i===location.hostname.toLowerCase())return!0}catch{return!1}return!1}function Y(e){e.querySelectorAll("a[href]").forEach(a=>{const t=a,i=(t.getAttribute("href")||"").trim();if(!B(i))return;const o=/^https?:\/\//i.test(i)||i.startsWith("//"),r=!o&&!/^[a-z][a-z0-9+.-]*:/i.test(i);if(!(!o&&!r)){if(we(i)){t.removeAttribute("target"),t.removeAttribute("rel");return}t.setAttribute("target","_blank"),t.setAttribute("rel",he)}})}function ve(e){const a=document.createElement("div");return a.innerHTML=e,Y(a),a.innerHTML}async function ye(e){const{marked:a,DOMPurify:t}=await me(),i=await a.parse(e||"");let o=t.sanitize(String(i),X);if(/<pre[\s>]/i.test(o)){const r=await ge(),d=document.createElement("div");d.innerHTML=o,d.querySelectorAll("pre code").forEach(l=>{const b=l,h=(b.className||"").match(/language-([\w-]+)/)?.[1];try{h&&r.getLanguage(h)?b.innerHTML=r.highlight(b.textContent||"",{language:h}).value:b.innerHTML=r.highlightAuto(b.textContent||"").value}catch{}const s=b.parentElement;if(s&&s.tagName==="PRE"&&!s.querySelector(".aw-code-copy")){s.setAttribute("data-lang",h||"code");const v=document.createElement("button");v.type="button",v.className="aw-code-copy";const p=(document.documentElement.lang||"").toLowerCase(),x=p.startsWith("uk")?{aria:"Копіювати код",text:"Копіювати"}:p.startsWith("ru")?{aria:"Копировать код",text:"Копировать"}:p.startsWith("es")?{aria:"Copiar código",text:"Copiar"}:p.startsWith("fr")?{aria:"Copier le code",text:"Copier"}:p.startsWith("de")?{aria:"Code kopieren",text:"Kopieren"}:p.startsWith("it")?{aria:"Copia codice",text:"Copia"}:p.startsWith("az")?{aria:"Kodu kopyala",text:"Kopyala"}:p.startsWith("bn")?{aria:"কোড কপি করুন",text:"কপি"}:p.startsWith("hi")?{aria:"कोड कॉपी करें",text:"कॉपी"}:p.startsWith("fil")||p.startsWith("tl")?{aria:"Kopyahin ang code",text:"Kopyahin"}:{aria:"Copy code",text:"Copy"};v.setAttribute("aria-label",x.aria),v.textContent=x.text,s.appendChild(v)}}),o=t.sanitize(d.innerHTML,X)}return ve(o)}function Q(){try{const e=localStorage.getItem(J);if(!e)return null;const a=JSON.parse(e);return!a||!Array.isArray(a.messages)?null:a}catch{return null}}function xe(e){try{localStorage.setItem(J,JSON.stringify(e))}catch{}}function _e(){const e=Q();return e?e.messages.slice(-60):[]}function Ae(){return!!Q()?.unread}function ke(e,a=!1){xe({messages:e.slice(-60),updatedAt:Date.now(),unread:!!a})}function Ce(){try{const e=localStorage.getItem(te);if(e==="light"||e==="dark")return e}catch{}return"dark"}function Ee(){if(typeof document>"u")return"en";const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":e.startsWith("az")?"az":e.startsWith("bn")?"bn":e.startsWith("hi")?"hi":e.startsWith("fil")||e.startsWith("tl")?"fil":"en"}function y(e,a,t,i,o,r,d,l,b,g){return e==="bn"?g:e==="az"?b:e==="it"?l:e==="uk"?d:e==="ru"?t:e==="es"?i:e==="fr"?o:e==="de"?r:a}const We=["What license does 1win have?","What does WINEX600 offer?","How fast are withdrawals?","How do I install the app?"],Se=["Какая лицензия у 1win?","Что входит в WINEX600?","Сколько времени занимает вывод?","Как установить приложение?"],Ie=["¿Qué licencia tiene 1win?","¿Qué incluye WINEX600?","¿Cuánto tarda un retiro?","¿Cómo instalo la app?"],Le=["Quelle licence a 1win ?","Que contient WINEX600 ?","Combien de temps pour un retrait ?","Comment installer l’app ?"],Pe=["Welche Lizenz hat 1win?","Was gehört zu WINEX600?","Wie schnell kommt die Auszahlung?","Wie installiere ich die App?"],Ne=["Яка ліцензія у 1win?","Що входить у WINEX600?","Скільки часу триває виведення?","Як установити додаток?"],Te=["Che licenza ha 1win?","Cosa include WINEX600?","Quanto ci mette un prelievo?","Come installo l’app?"],ze=["1win hansı lisenziyaya malikdir?","WINEX600-ə nə daxildir?","Çıxarış nə qədər vaxt aparır?","Tətbiqi necə quraşdırmaq olar?"],Ke=["1win-এর লাইসেন্স কী?","WINEX600-এ কী পাব?","টাকা তুলতে কত সময় লাগে?","অ্যাপ কীভাবে ইনস্টল করব?"],Re=["1win का लाइसेंस क्या है?","WINEX600 में क्या मिलता है?","निकासी में कितना समय लगता है?","ऐप कैसे इंस्टॉल करें?"],qe=["Anong lisensya mayroon ang 1win?","Ano ang kasama sa WINEX600?","Gaano katagal ang pag-withdraw?","Paano i-install ang app?"],De={bonuses:["WINEX600 में क्या मिलता है?","वेजरिंग की शर्तें क्या हैं?","WINEX600 कब डालें?","वेलकम बोनस कैसे पाएँ?"],payments:["निकासी में कितना समय लगता है?","कौन से भुगतान तरीके हैं?","KYC कब माँगा जाता है?","डिपॉजिट नहीं पहुँचा तो क्या करें?"],mobile:["ऐप कैसे इंस्टॉल करें?","Android APK कहाँ से डाउनलोड करें?","iPhone पर 1win कैसे खोलें?","ऐप और ब्राउज़र में क्या फर्क है?"],games:["1win पर कौन से गेम हैं?","Aviator और Lucky Jet में क्या फर्क है?","लाइव कैसीनो कैसे काम करता है?","RTP का मतलब क्या है?"],aviator:["Aviator कैसे खेलें?","Aviator किसका गेम है?","कैश आउट कैसे करें?","Aviator में बोनस लगता है?"],"lucky-jet":["Lucky Jet कैसे खेलें?","Lucky Jet 1win Original है?","कैश आउट कैसे करें?","Lucky Jet और Aviator में क्या फर्क है?"],sports:["स्पोर्ट्स बेट कैसे लगाएँ?","लाइव बेटिंग कैसे काम करती है?","कैश आउट कब मिलता है?","स्पोर्ट्स बोनस अलग है?"],safety:["1win का लाइसेंस क्या है?","2FA कैसे चालू करें?","फ़िशिंग कैसे पहचानें?","KYC दस्तावेज़ कहाँ अपलोड करें?"],faq:["1win का लाइसेंस क्या है?","WINEX600 में क्या मिलता है?","निकासी में कितना समय लगता है?","ऐप कैसे इंस्टॉल करें?"],"responsible-gambling":["डिपॉजिट लिमिट कैसे लगाएँ?","सेल्फ-एक्सक्लूजन कैसे करें?","मदद कहाँ मिलेगी?","जुआ बंद कैसे करें?"],"crypto-casino":["कौन सी क्रिप्टो चलती है?","क्या क्रिप्टो इस्तेमाल करने पर KYC से बच सकते हैं?","USDT डिपॉजिट कैसे करें?","क्रिप्टो निकासी कितनी देर में होती है?"],"not-working":["1win क्यों नहीं खुल रहा?","साइट न खुले तो क्या करें?","साइट बंद हो तो ऐप चलेगा?","ब्लॉक होने पर लॉगिन कैसे करें?"]},Oe={bonuses:["Ano ang kasama sa WINEX600?","Ano ang mga tuntunin sa wagering?","Kailan ilalagay ang WINEX600?","Paano makuha ang welcome bonus?"],payments:["Gaano katagal ang pag-withdraw?","Anong mga paraan ng pagbabayad ang available?","Kailan hinihingi ang KYC?","Ano ang gagawin kung hindi dumating ang deposito?"],mobile:["Paano i-install ang app?","Saan i-download ang Android APK?","Paano buksan ang 1win sa iPhone?","Ano ang pagkakaiba ng app at browser?"],games:["Anong mga laro ang nasa 1win?","Ano ang pagkakaiba ng Aviator at Lucky Jet?","Paano gumagana ang live casino?","Ano ang ibig sabihin ng RTP?"],aviator:["Paano laruin ang Aviator?","Kaninong laro ang Aviator?","Paano mag-cash out?","Puwede bang gamitin ang bonus sa Aviator?"],"lucky-jet":["Paano laruin ang Lucky Jet?","1win Original ba ang Lucky Jet?","Paano mag-cash out?","Ano ang pagkakaiba ng Lucky Jet at Aviator?"],sports:["Paano tumaya sa sports?","Paano gumagana ang live betting?","Kailan available ang cash out?","Hiwalay ba ang sports bonus?"],safety:["Anong lisensya mayroon ang 1win?","Paano i-on ang 2FA?","Paano makilala ang phishing?","Saan i-upload ang mga dokumento ng KYC?"],faq:["Anong lisensya mayroon ang 1win?","Ano ang kasama sa WINEX600?","Gaano katagal ang pag-withdraw?","Paano i-install ang app?"],"responsible-gambling":["Paano magtakda ng limitasyon sa deposito?","Paano mag-self-exclude?","Saan humingi ng tulong?","Paano ihinto ang pagsusugal?"],"crypto-casino":["Aling crypto ang tinatanggap?","Nalalampasan ba ng crypto ang KYC?","Paano magdeposito ng USDT?","Gaano katagal ang pag-withdraw ng crypto?"],"not-working":["Bakit hindi bumubukas ang 1win?","Ano ang gagawin kung hindi mag-load ang site?","Gagana ba ang app kung hindi bumubukas ang site?","Paano mag-login kung naka-block ang site?"]};function f(e,a=4){const t=[],i=new Set;for(const o of e){const r=String(o||"").replace(/\s+/g," ").trim();if(!r)continue;const d=r.toLowerCase();if(!i.has(d)&&(i.add(d),t.push(r),t.length>=a))break}return t}function Me(e=location.pathname){const t=(e.replace(/\/+$/,"")||"/").split("/").filter(Boolean);if(!t.length)return"index";let i=0;if((t[0]==="ru"||t[0]==="es"||t[0]==="fr"||t[0]==="de"||t[0]==="uk"||t[0]==="it"||t[0]==="az"||t[0]==="bn"||t[0]==="hi"||t[0]==="fil")&&(i=1),!t[i]||t[i]==="index")return"index";let o=t[i].replace(/\.html$/i,"");return o==="betting"?"sports":o==="app"?"mobile":o==="casino"?"games":o}function Ge(e=typeof location<"u"?location.pathname:"/"){const a=Me(e),t=Ee();return f(t==="hi"?[...De[a]??Re]:t==="fil"?[...Oe[a]??qe]:a==="bonuses"?y(t,["What does WINEX600 offer?","What are the wagering terms?","When do I enter WINEX600?","How do I get the welcome bonus?"],["Что входит в приветственный бонус?","Какие условия отыгрыша?","Как ввести WINEX600?","Как активировать WINEX600?"],["¿Qué incluye el bono de bienvenida?","¿Cuál es el rollover?","¿Cómo introduzco WINEX600?","¿Cómo activo WINEX600?"],["Que comprend le bonus de bienvenue ?","Quelles sont les conditions de mise ?","Comment saisir WINEX600 ?","Comment activer WINEX600 ?"],["Was gehört zum Willkommensbonus?","Welche Umsatzbedingungen gelten?","Wann gebe ich WINEX600 ein?","Wie aktiviere ich WINEX600?"],["Що входить у вітальний бонус?","Які умови відіграшу?","Як ввести WINEX600?","Як активувати WINEX600?"],["Cosa include il bonus di benvenuto?","Quali sono i requisiti di scommessa?","Come inserisco WINEX600?","Come attivo WINEX600?"],["Xoş gəldin bonusuna nə daxildir?","Oynatma şərtləri hansılardır?","WINEX600 kodunu harada daxil etməliyəm?","WINEX600 bonusunu necə aktivləşdirmək olar?"],["WINEX600-এ কী পাব?","ওয়েজারের শর্ত কী?","WINEX600 কোথায় লিখব?","স্বাগতম বোনাস কীভাবে পাব?"]):a==="payments"?y(t,["How fast are withdrawals?","Can I deposit with crypto?","Where do I see withdrawal limits?","When does KYC come up?"],["Сколько времени занимает вывод?","Можно ли пополнить криптой?","Где проверить лимиты вывода?","Когда просят документы?"],["¿Cuánto tarda un retiro?","¿Puedo depositar con cripto?","¿Dónde veo los límites de retiro?","¿Cuándo piden documentos?"],["Combien de temps pour un retrait ?","Peut-on déposer en crypto ?","Où voir les limites de retrait ?","Quand demande-t-on des documents ?"],["Wie schnell kommt die Auszahlung?","Kann ich mit Krypto einzahlen?","Wo sehe ich Auszahlungslimits?","Wann werden Dokumente verlangt?"],["Скільки часу триває виведення?","Чи можна поповнити криптою?","Де перевірити ліміти виведення?","Коли просять документи?"],["Quanto ci mette un prelievo?","Posso depositare in crypto?","Dove vedo i limiti di prelievo?","Quando chiedono il KYC?"],["Çıxarış nə qədər vaxt aparır?","Hesabı kriptovalyuta ilə doldurmaq olar?","Çıxarış limitlərinə harada baxmaq olar?","Sənədləri nə vaxt istəyirlər?"],["টাকা তুলতে কত সময় লাগে?","ক্রিপ্টো দিয়ে কি ডিপোজিট করা যায়?","উইথড্রয়াল সীমা কোথায় দেখব?","KYC কখন লাগে?"]):a==="mobile"?y(t,["How do I install the Android APK?","Can I use 1win on iPhone?","Can I open 1win in the browser?","Where should I download the APK?"],["Как установить Android APK?","Как играть в 1win на iPhone?","Можно ли играть без приложения — через браузер?","Где скачать APK?"],["¿Cómo instalo el APK de Android?","¿Cómo juego en 1win en iPhone?","¿Puedo jugar sin app — en el navegador?","¿De dónde descargo el APK?"],["Comment installer l’APK Android ?","Comment jouer à 1win sur iPhone ?","Peut-on jouer sans app dans le navigateur ?","D’où télécharger l’APK ?"],["Wie installiere ich die Android-APK?","Wie spiele ich 1win auf dem iPhone?","Kann ich ohne App im Browser spielen?","Wo lade ich die APK herunter?"],["Як установити Android APK?","Як грати в 1win на iPhone?","Чи можна грати без додатка — через браузер?","Де завантажити APK?"],["Come installo l’APK Android?","Come uso 1win su iPhone?","Posso giocare senza app, nel browser?","Dove scarico l’APK?"],["Android APK-nı necə quraşdırmaq olar?","iPhone-da 1win-i necə oynamaq olar?","Tətbiqsiz — brauzerdən oynamaq olar?","APK-nı haradan yükləmək olar?"],["Android APK কীভাবে ইনস্টল করব?","iPhone-এ 1win চলে?","ব্রাউজারেও কি 1win খোলা যায়?","APK কোথা থেকে ডাউনলোড করব?"]):a==="games"?y(t,["What games are in the casino?","Where do I see a game RTP?","Are there live tables?","Do slots count toward the bonus?"],["Какие игры есть в казино?","Где проверить RTP игры?","Есть ли живые столы?","Учитываются ли ставки в слотах при отыгрыше приветственного бонуса?"],["¿Qué juegos hay en el casino?","¿Dónde veo el RTP de un juego?","¿Hay mesas en vivo?","¿Las tragamonedas cuentan para el bono?"],["Quels jeux y a-t-il dans le casino ?","Où voir le RTP d’un jeu ?","Y a-t-il des tables en direct ?","Les machines à sous comptent pour le bonus ?"],["Welche Spiele gibt es im Casino?","Wo sehe ich den RTP eines Spiels?","Gibt es Live-Tische?","Zählen Slots für den Willkommensbonus?"],["Які ігри є в казино?","Де перевірити RTP гри?","Чи є живі столи?","Чи враховуються ставки в слотах у відіграші вітального бонусу?"],["Quali giochi ci sono nel casinò?","Dove vedo l’RTP di un gioco?","Ci sono tavoli live?","Le slot contano per il bonus di benvenuto?"],["Kazinoda hansı oyunlar var?","Oyunun RTP-sinə harada baxmaq olar?","Canlı masalar varmı?","Slotlar xoş gəldin bonusuna sayılır?"],["ক্যাসিনোতে কী কী গেম আছে?","গেমের RTP কোথায় দেখব?","লাইভ টেবিল আছে?","স্লট কি বোনাস ওয়েজারিংয়ে গণনা হয়?"]):a==="aviator"?y(t,["Where do I see Aviator RTP?","Is Aviator a 1win Original?","Does Aviator count toward the welcome bonus?","What is auto cash-out in Aviator?"],["Где проверить RTP Aviator?","Aviator — это 1win Original?","Учитываются ли ставки в Aviator при отыгрыше приветственного бонуса?","Что такое автокэшаут в Aviator?"],["¿Dónde veo el RTP de Aviator?","¿Aviator es un 1win Original?","¿Aviator cuenta para el bono de bienvenida?","¿Qué es el cobro automático en Aviator?"],["Où voir le RTP d’Aviator ?","Aviator, c’est un 1win Original ?","Aviator compte pour le bonus de bienvenue ?","Qu’est-ce que l’encaissement automatique ?"],["Wo sehe ich den RTP von Aviator?","Ist Aviator ein 1win Original?","Zählt Aviator für den Willkommensbonus?","Was ist Auto-Cashout in Aviator?"],["Де перевірити RTP Aviator?","Aviator — це 1win Original?","Чи враховуються ставки в Aviator у відіграші вітального бонусу?","Що таке автокешаут Aviator?"],["Dove vedo l’RTP di Aviator?","Aviator è un 1win Original?","Aviator conta per il bonus di benvenuto?","Cos’è l’incasso automatico in Aviator?"],["Aviator-un RTP-sinə harada baxmaq olar?","Aviator 1win Original-dır?","Aviator xoş gəldin bonusuna sayılır?","Aviator-da avto cash-out nədir?"],["Aviator-এর RTP কোথায় দেখব?","Aviator কি 1win Original?","Aviator কি বোনাস ওয়েজারিংয়ে গণনা হয়?","Aviator-এ অটো ক্যাশ-আউট কী?"]):a==="lucky-jet"?y(t,["Where do I see Lucky Jet RTP?","Is Lucky Jet the same as Aviator?","Does Lucky Jet count toward the welcome bonus?","What is auto cash-out in Lucky Jet?"],["Где проверить RTP Lucky Jet?","Lucky Jet — это то же, что Aviator?","Учитываются ли ставки в Lucky Jet при отыгрыше приветственного бонуса?","Что такое автокэшаут в Lucky Jet?"],["¿Dónde veo el RTP de Lucky Jet?","¿Lucky Jet es lo mismo que Aviator?","¿Lucky Jet cuenta para el bono de bienvenida?","¿Qué es el cobro automático en Lucky Jet?"],["Où voir le RTP de Lucky Jet ?","Lucky Jet, c’est le même jeu qu’Aviator ?","Lucky Jet compte pour le bonus de bienvenue ?","Qu’est-ce que l’encaissement automatique ?"],["Wo sehe ich den RTP von Lucky Jet?","Ist Lucky Jet dasselbe wie Aviator?","Zählt Lucky Jet für den Willkommensbonus?","Was ist Auto-Cashout in Lucky Jet?"],["Де перевірити RTP Lucky Jet?","Lucky Jet — це те саме, що Aviator?","Чи враховуються ставки в Lucky Jet у відіграші вітального бонусу?","Що таке автокешаут Lucky Jet?"],["Dove vedo l’RTP di Lucky Jet?","Lucky Jet è lo stesso di Aviator?","Lucky Jet conta per il bonus di benvenuto?","Cos’è l’incasso automatico in Lucky Jet?"],["Lucky Jet-in RTP-sinə harada baxmaq olar?","Lucky Jet Aviator ilə eynidir?","Lucky Jet xoş gəldin bonusuna sayılır?","Lucky Jet-də avto cash-out nədir?"],["Lucky Jet-এর RTP কোথায় দেখব?","Lucky Jet আর Aviator কি একই?","Lucky Jet কি বোনাস ওয়েজারিংয়ে গণনা হয়?","Lucky Jet-এ অটো ক্যাশ-আউট কী?"]):a==="sports"?y(t,["How do I place a sports bet?","Can I cash out a sports bet?","What is the multiple bet bonus?","Do casino and sports bonuses share a wallet?"],["Как поставить на спорт?","Есть ли кэшаут?","Что такое бонус на экспресс?","Бонусы казино и спорта на одном балансе?"],["¿Cómo apuesto al deporte?","¿Hay cash out en 1win?","¿Qué es el bono por combinada?","¿Los bonos de casino y de deporte van juntos?"],["Comment parier sur le sport ?","Peut-on encaisser un pari ?","Qu’est-ce que le bonus sur les paris combinés ?","Les bonus casino et sport vont ensemble ?"],["Wie wette ich auf Sport?","Gibt es Cash-out?","Was ist der Kombiwetten-Bonus?","Laufen Casino- und Sportboni auf demselben Guthaben?"],["Як зробити ставку на спорт?","Чи є кешаут?","Що таке бонус на експрес?","Чи зараховуються бонуси казино й спорту на один баланс?"],["Come scommetto sullo sport?","C’è il cash-out su 1win?","Cos’è il bonus sulle scommesse multiple?","I bonus casinò e sport condividono lo stesso saldo?"],["İdmana necə mərc etmək olar?","Cash-out varmı?","Ekspress bonusu nədir?","Kazino və idman bonusları eyni balansdadır?"],["স্পোর্টসে কীভাবে বাজি ধরব?","স্পোর্টস বেটে ক্যাশ-আউট করা যায়?","মাল্টিপল বেট বোনাস কী?","ক্যাসিনো ও স্পোর্টস বোনাস কি একই ব্যালেন্স ব্যবহার করে?"]):a==="safety"?y(t,["What license does 1win have?","When does KYC come up?","How do I know the site is real?","How do I turn on 2FA?"],["Какая лицензия у 1win?","Когда просят документы?","Как понять, что сайт настоящий?","Как включить 2FA?"],["¿Qué licencia tiene 1win?","¿Cuándo piden documentos?","¿Cómo sé que es el sitio de verdad?","¿Cómo activo el 2FA?"],["Quelle licence a 1win ?","Quand demande-t-on des documents ?","Comment savoir que c’est le vrai site ?","Comment activer le 2FA ?"],["Welche Lizenz hat 1win?","Wann werden Dokumente verlangt?","Wie erkenne ich die echte 1win-Seite?","Wie aktiviere ich 2FA?"],["Яка ліцензія у 1win?","Коли просять документи?","Як зрозуміти, що це справжній сайт 1win?","Як увімкнути 2FA?"],["Che licenza ha 1win?","Quando chiedono i documenti?","Come so che è il sito vero?","Come attivo il 2FA?"],["1win hansı lisenziyaya malikdir?","Sənədləri nə vaxt istəyirlər?","Saytın rəsmi olduğunu necə yoxlamaq olar?","2FA-nı necə aktivləşdirmək olar?"],["1win-এর লাইসেন্স কী?","KYC কখন লাগে?","সাইট আসল কিনা কীভাবে বুঝব?","2FA কীভাবে চালু করব?"]):a==="faq"?y(t,["How do I register?","How fast are withdrawals?","What does WINEX600 offer?","How do I install the app?"],["Как зарегистрироваться?","Сколько времени занимает вывод?","Что входит в WINEX600?","Как установить приложение?"],["¿Cómo me registro?","¿Cuánto tarda un retiro?","¿Qué incluye WINEX600?","¿Cómo instalo la app?"],["Comment s’inscrire ?","Combien de temps pour un retrait ?","Que contient WINEX600 ?","Comment installer l’app ?"],["Wie registriere ich mich?","Wie schnell kommt die Auszahlung?","Was gehört zu WINEX600?","Wie installiere ich die App?"],["Як зареєструватися?","Скільки часу триває виведення?","Що входить у WINEX600?","Як установити додаток?"],["Come mi registro?","Quanto ci mette un prelievo?","Cosa include WINEX600?","Come installo l’app?"],["Necə qeydiyyatdan keçmək olar?","Çıxarış nə qədər vaxt aparır?","WINEX600-ə nə daxildir?","Tətbiqi necə quraşdırmaq olar?"],["রেজিস্ট্রেশন কীভাবে করব?","টাকা তুলতে কত সময় লাগে?","WINEX600-এ কী পাব?","অ্যাপ কীভাবে ইনস্টল করব?"]):a==="responsible-gambling"?y(t,["How do I set a deposit limit or take a break?","Can I cancel self-exclusion early?","What should I do if I cannot stop gambling?","Where can I get independent gambling help?"],["Как установить лимит на депозит или сделать перерыв?","Можно ли досрочно отменить самоисключение?","Что делать, если не получается остановиться?","Где получить независимую помощь при проблемах с азартными играми?"],["¿Cómo configuro un límite de depósito o una pausa?","¿Puedo cancelar antes la autoexclusión?","¿Qué hago si no puedo dejar de jugar?","¿Dónde puedo obtener ayuda independiente para problemas con el juego de azar?"],["Comment définir une limite de dépôt ou une pause ?","Puis-je annuler l’auto-exclusion avant terme ?","Que faire si je n’arrive pas à arrêter de jouer ?","Où trouver une aide indépendante pour les problèmes liés aux jeux d’argent ?"],["Wie richte ich ein Einzahlungslimit oder eine Spielpause ein?","Kann ich die Selbstsperre vorzeitig aufheben?","Was kann ich tun, wenn ich nicht aufhören kann zu spielen?","Wo bekomme ich unabhängige Hilfe bei Glücksspielproblemen?"],["Як установити ліміт на депозит або зробити перерву?","Чи можна достроково скасувати самовиключення?","Що робити, якщо не вдається припинити грати?","Де отримати незалежну допомогу в разі проблем з азартними іграми?"],["Come imposto un limite di deposito o una pausa?","Posso annullare prima l’autoesclusione?","Cosa devo fare se non riesco a smettere di giocare?","Dove trovo assistenza indipendente per problemi di gioco d’azzardo?"],["Depozit limiti və ya fasilə necə təyin edilir?","Özünü kənarlaşdırmanı vaxtından əvvəl ləğv etmək olar?","Qumarı dayandıra bilmirəmsə, nə etməliyəm?","Qumarla bağlı müstəqil yardımı haradan almaq olar?"],["ডিপোজিট লিমিট বা বিরতি কীভাবে সেট করব?","সেলফ-এক্সক্লুশন কি আগেই বাতিল করা যায়?","গেম্বলিং বন্ধ করতে না পারলে কী করব?","গেম্বলিং নিয়ে স্বাধীন সাহায্য কোথায় পাব?"]):a==="crypto-casino"?y(t,["How do I deposit Bitcoin or USDT?","Do I still need KYC for crypto?","What if a crypto deposit did not arrive?","Does WINEX600 work with crypto?"],["Как внести Bitcoin или USDT?","Нужен ли KYC для крипты?","Что делать, если крипта не пришла?","Действует ли WINEX600 при пополнении криптовалютой?"],["¿Cómo deposito Bitcoin o USDT?","¿Piden KYC si pago con cripto?","¿Qué hago si el depósito cripto no llega?","¿WINEX600 funciona con cripto?"],["Comment déposer en Bitcoin ou USDT ?","On demande encore le KYC en crypto ?","Que faire si un dépôt crypto n’arrive pas ?","WINEX600 est-il compatible avec la crypto ?"],["Wie zahle ich mit Bitcoin oder USDT ein?","Brauche ich für Krypto trotzdem KYC?","Was tun, wenn eine Krypto-Einzahlung nicht ankommt?","Gilt WINEX600 auch mit Krypto?"],["Як поповнити Bitcoin або USDT?","Чи потрібен KYC для крипти?","Що робити, якщо депозит криптою не надійшов?","Чи діє WINEX600 для поповнення криптовалютою?"],["Come deposito Bitcoin o USDT?","Chiedono il KYC se pago in crypto?","Cosa faccio se il deposito crypto non arriva?","WINEX600 vale con la crypto?"],["Bitcoin və ya USDT ilə necə depozit qoymaq olar?","Kripto üçün də KYC lazımdır?","Kripto depoziti hesaba düşməzsə nə etməliyəm?","WINEX600 kripto ilə işləyir?"],["Bitcoin বা USDT দিয়ে কীভাবে ডিপোজিট করব?","ক্রিপ্টো দিয়ে ডিপোজিট করলেও কি KYC লাগে?","ক্রিপ্টো ডিপোজিট না এলে কী করব?","WINEX600 ক্রিপ্টোতে চলে?"]):a==="not-working"?y(t,["Why is 1win not opening?","What if the site will not load?","Will the app still open?","How do I sign in if the site is blocked?"],["Почему 1win не открывается?","Что делать, если сайт не грузится?","Откроется ли приложение?","Как войти, если сайт заблокирован?"],["¿Por qué 1win no abre?","¿Qué hago si el sitio no carga?","¿La app abre si el sitio no carga?","¿Cómo entro si el sitio está bloqueado?"],["Pourquoi 1win ne s’ouvre pas ?","Que faire si le site ne se charge pas ?","L’app s’ouvre-t-elle si le site ne se charge pas ?","Comment me connecter si le site est bloqué ?"],["Warum öffnet 1win nicht?","Was tun, wenn die Seite nicht lädt?","Öffnet die App trotzdem?","Wie melde ich mich an, wenn die Seite gesperrt ist?"],["Чому 1win не відкривається?","Що робити, якщо сайт не завантажується?","Чи спрацює додаток, якщо сайт не відкривається?","Як увійти, якщо сайт не відкривається?"],["Perché 1win non si apre?","Cosa faccio se il sito non si apre?","L’app si apre se il sito non si apre?","Come accedo se il sito è bloccato?"],["1win niyə açılmır?","Sayt yüklənmirsə nə etməliyəm?","Tətbiq işləyə bilərmi?","Sayt bloklanıbsa necə daxil olmaq olar?"],["1win খুলছে না কেন?","সাইট না খুললে কী করব?","সাইট না খুললে অ্যাপ কি চলবে?","সাইট ব্লক থাকলে কীভাবে লগইন করব?"]):[...y(t,[...We],[...Se],[...Ie],[...Le],[...Pe],[...Ne],[...Te],[...ze],[...Ke])])}const Xe=`
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
`;function je(){if(document.getElementById("1winex-chat-styles"))return;const e=document.createElement("style");e.id="1winex-chat-styles",e.textContent=Xe,document.head.appendChild(e)}function j(){return`m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function He(e){try{const a={en:"en",ru:"ru-RU",es:"es-ES",fr:"fr-FR",de:"de-DE",uk:"uk-UA",it:"it-IT",az:"az-AZ",bn:"bn-BD",hi:"hi-IN",fil:"fil-PH"}[$()];return new Intl.DateTimeFormat(a,{hour:"numeric",minute:"2-digit"}).format(new Date(e))}catch{return""}}const H={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'},Ue=new URL("../images/chat/anna.webp?v=3",import.meta.url).href;function U(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function $(){const e=(document.documentElement.lang||"").toLowerCase();return e.startsWith("uk")?"uk":e.startsWith("ru")?"ru":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.startsWith("de")?"de":e.startsWith("it")?"it":e.startsWith("az")?"az":e.startsWith("bn")?"bn":e.startsWith("hi")?"hi":e.startsWith("fil")||e.startsWith("tl")?"fil":"en"}function Je(){const e=$();return e==="ru"?{name:"Анна",subtitle:"Справочный помощник 1win",close:"Закрыть чат",placeholder:"Задайте вопрос о 1win…",message:"Сообщение",send:"Отправить",sendMessage:"Отправить сообщение",open:"Открыть чат с Анной",closeAnna:"Закрыть чат с Анной",openUnread:"Открыть чат с Анной — новое сообщение",typing:"Анна печатает",hello:"Здравствуйте! Я Анна, справочный помощник 1win.",intro:"Я могу объяснить бонусы, игры, спорт, платежи и установку приложения по информации этого сайта. У меня нет доступа к вашему аккаунту, поэтому я не могу пополнять счёт, выводить средства, менять лимиты или проводить KYC-верификацию.",suggests:"Выберите частый вопрос",noResponse:"Не удалось получить ответ. Попробуйте ещё раз.",copied:"Скопировано",copy:"Копировать",failed:"Не скопировано"}:e==="es"?{name:"Anna",subtitle:"Asistente informativa de 1win",close:"Cerrar chat",placeholder:"Pregunta sobre 1win…",message:"Mensaje",send:"Enviar",sendMessage:"Enviar mensaje",open:"Abrir chat con Anna",closeAnna:"Cerrar chat con Anna",openUnread:"Abrir chat con Anna — mensaje nuevo",typing:"Anna está escribiendo",hello:"Hola, soy Anna, tu guía de 1win.",intro:"Puedo explicar bonos, juegos, deportes, pagos e instalación de la app con la información de este sitio. No puedo acceder a tu cuenta ni realizar depósitos o retiros, cambiar límites ni gestionar la verificación KYC.",suggests:"Elige una pregunta frecuente",noResponse:"No pude obtener una respuesta. Inténtalo de nuevo.",copied:"Copiado",copy:"Copiar",failed:"No se pudo copiar"}:e==="fr"?{name:"Anna",subtitle:"Assistante d’information de 1win",close:"Fermer le chat",placeholder:"Posez une question sur 1win…",message:"Message",send:"Envoyer",sendMessage:"Envoyer le message",open:"Ouvrir le chat avec Anna",closeAnna:"Fermer le chat avec Anna",openUnread:"Ouvrir le chat avec Anna — nouveau message",typing:"Anna écrit",hello:"Bonjour, je suis Anna, votre guide 1win.",intro:"Je peux expliquer les bonus, les jeux, le sport, les paiements et l’installation de l’app à partir des informations de ce site. Je n’ai pas accès à votre compte et je ne peux ni effectuer de dépôts ou de retraits, ni modifier vos limites, ni gérer votre vérification KYC.",suggests:"Choisissez une question fréquente",noResponse:"Je n’ai pas pu obtenir de réponse. Réessayez.",copied:"Copié",copy:"Copier",failed:"Copie impossible"}:e==="de"?{name:"Anna",subtitle:"1win-Infoassistentin",close:"Chat schließen",placeholder:"Frage zu 1win stellen…",message:"Nachricht",send:"Senden",sendMessage:"Nachricht senden",open:"Chat mit Anna öffnen",closeAnna:"Chat mit Anna schließen",openUnread:"Chat mit Anna öffnen — neue Nachricht",typing:"Anna schreibt",hello:"Hallo, ich bin Anna, dein 1win-Guide.",intro:"Ich erkläre Boni, Spiele, Sport, Zahlungen und App-Installation anhand dieser Website. Ich habe keinen Kontozugriff und kann weder Ein- noch Auszahlungen vornehmen, Limits ändern oder KYC-Prüfungen verwalten.",suggests:"Häufige Frage auswählen",noResponse:"Ich konnte keine Antwort abrufen. Versuch es erneut.",copied:"Kopiert",copy:"Kopieren",failed:"Kopieren fehlgeschlagen"}:e==="uk"?{name:"Анна",subtitle:"Довідкова помічниця 1win",close:"Закрити чат",placeholder:"Запитайте про 1win…",message:"Повідомлення",send:"Надіслати",sendMessage:"Надіслати повідомлення",open:"Відкрити чат з Анною",closeAnna:"Закрити чат з Анною",openUnread:"Відкрити чат з Анною — нове повідомлення",typing:"Анна пише",hello:"Вітаю! Я Анна, довідкова помічниця 1win.",intro:"Я можу пояснити бонуси, ігри, спорт, платежі та встановлення додатка за інформацією цього сайту. Я не маю доступу до вашого акаунта й не можу поповнювати рахунок, виводити кошти, змінювати ліміти або проводити KYC-верифікацію.",suggests:"Виберіть поширене запитання",noResponse:"Не вдалося отримати відповідь. Спробуйте ще раз.",copied:"Скопійовано",copy:"Копіювати",failed:"Не скопійовано"}:e==="it"?{name:"Anna",subtitle:"Assistente informativa 1win",close:"Chiudi chat",placeholder:"Chiedi informazioni su 1win…",message:"Messaggio",send:"Invia",sendMessage:"Invia messaggio",open:"Apri la chat con Anna",closeAnna:"Chiudi la chat con Anna",openUnread:"Apri la chat con Anna — nuovo messaggio",typing:"Anna sta scrivendo",hello:"Ciao, sono Anna, la tua guida 1win.",intro:"Posso spiegare bonus, giochi, sport, pagamenti e installazione dell’app usando le informazioni del sito. Non posso accedere al tuo account né effettuare depositi o prelievi, modificare i limiti né gestire la verifica KYC.",suggests:"Scegli una domanda frequente",noResponse:"Non ho ricevuto una risposta. Riprova.",copied:"Copiato",copy:"Copia",failed:"Copia non riuscita"}:e==="az"?{name:"Anna",subtitle:"1win məlumat bələdçisi",close:"Söhbəti bağla",placeholder:"1win haqqında soruşun…",message:"Mesaj",send:"Göndər",sendMessage:"Mesaj göndər",open:"Anna ilə söhbəti aç",closeAnna:"Anna ilə söhbəti bağla",openUnread:"Anna ilə söhbəti aç — yeni mesaj",typing:"Anna yazır",hello:"Salam, mən Anna, 1win bələdçinizəm.",intro:"Bu saytdakı məlumata əsasən bonusları, oyunları, idmanı, ödənişləri və tətbiqin quraşdırılmasını izah edə bilərəm. Hesabınıza girişim yoxdur və depozit qoya, vəsait çıxara, limitləri dəyişə və ya KYC prosesini idarə edə bilmirəm.",suggests:"Tez-tez verilən suallardan birini seçin",noResponse:"Cavab alınmadı. Yenidən cəhd edin.",copied:"Kopyalandı",copy:"Kopyala",failed:"Kopyalanmadı"}:e==="bn"?{name:"Anna",subtitle:"1win তথ্য সহকারী",close:"চ্যাট বন্ধ করুন",placeholder:"1win সম্পর্কে প্রশ্ন করুন…",message:"বার্তা",send:"পাঠান",sendMessage:"বার্তা পাঠান",open:"Anna-র সাথে চ্যাট খুলুন",closeAnna:"Anna-র সাথে চ্যাট বন্ধ করুন",openUnread:"Anna-র সাথে চ্যাট — নতুন বার্তা",typing:"Anna লিখছেন",hello:"হ্যালো, আমি Anna, আপনার 1win গাইড।",intro:"এই সাইটের তথ্য ব্যবহার করে আমি বোনাস, গেম, স্পোর্টস, পেমেন্ট ও অ্যাপ ইনস্টলেশন সম্পর্কে বুঝিয়ে বলতে পারি। আপনার অ্যাকাউন্টে আমার অ্যাক্সেস নেই, তাই আমি আপনার হয়ে ডিপোজিট বা উইথড্রয়াল করতে, লিমিট বদলাতে বা KYC যাচাই সম্পন্ন করতে পারি না।",suggests:"একটি সাধারণ প্রশ্ন বেছে নিন",noResponse:"উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।",copied:"কপি হয়েছে",copy:"কপি",failed:"কপি হয়নি"}:e==="hi"?{name:"Anna",subtitle:"1win सहायता गाइड",close:"चैट बंद करें",placeholder:"1win के बारे में पूछें…",message:"संदेश",send:"भेजें",sendMessage:"संदेश भेजें",open:"Anna के साथ चैट खोलें",closeAnna:"Anna के साथ चैट बंद करें",openUnread:"Anna के साथ चैट — नया संदेश",typing:"Anna लिख रही हैं",hello:"नमस्ते, मैं Anna हूँ, आपकी 1win गाइड।",intro:"इस साइट की जानकारी के आधार पर मैं बोनस, गेम, स्पोर्ट्स, भुगतान और ऐप इंस्टॉल करने का तरीका समझा सकती हूँ। आपके अकाउंट तक मेरी पहुँच नहीं है, इसलिए मैं डिपॉजिट या निकासी नहीं कर सकती, लिमिट नहीं बदल सकती और KYC पूरा नहीं कर सकती।",suggests:"एक आम सवाल चुनें",noResponse:"जवाब नहीं मिला। फिर कोशिश करें।",copied:"कॉपी किया गया",copy:"कॉपी",failed:"कॉपी नहीं किया जा सका"}:e==="fil"?{name:"Anna",subtitle:"Gabay sa impormasyon ng 1win",close:"Isara ang chat",placeholder:"Magtanong tungkol sa 1win…",message:"Mensahe",send:"Ipadala",sendMessage:"Ipadala ang mensahe",open:"Buksan ang chat kasama si Anna",closeAnna:"Isara ang chat kasama si Anna",openUnread:"Buksan ang chat kasama si Anna — bagong mensahe",typing:"Nagsusulat si Anna",hello:"Kumusta, ako si Anna, ang gabay mo sa 1win.",intro:"Maaari kong ipaliwanag ang mga bonus, laro, sports, bayad at pag-install ng app gamit ang impormasyon sa site na ito. Wala akong access sa account mo, kaya hindi ako makakapagdeposito o makakapag-withdraw, makakapagbago ng limitasyon, o makakapamahala ng KYC.",suggests:"Pumili ng karaniwang tanong",noResponse:"Walang natanggap na sagot. Subukan muli.",copied:"Nakopya",copy:"Kopyahin",failed:"Hindi nakopya"}:{name:"Anna",subtitle:"1win information assistant",close:"Close chat",placeholder:"Ask about 1win…",message:"Message",send:"Send",sendMessage:"Send message",open:"Open chat with Anna",closeAnna:"Close chat with Anna",openUnread:"Open chat with Anna — new message",typing:"Anna is typing",hello:"Hi, I’m Anna, your 1win guide.",intro:"I can explain bonuses, games, sports, payments and app installation using this site. I cannot access your account, make deposits or withdrawals, change limits, or manage KYC.",suggests:"Choose a common question",noResponse:"I could not get a response. Please try again.",copied:"Copied",copy:"Copy",failed:"Copy failed"}}function Be(){if(document.getElementById(M))return;je();const e=Je();let a=_e(),t=!1,i=null,o=null;const r=document.createElement("div");r.id=M,r.className="aw-chat",r.dataset.theme=Ce(),r.setAttribute("data-nosnippet",""),r.innerHTML=`
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${Ue}" alt="${e.name}" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">${e.name}</strong>
            <span>${e.subtitle}</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="${e.close}">${H.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="2000" placeholder="${e.placeholder}" aria-label="${e.message}"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="${e.sendMessage}">${e.send}</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="${e.open}" aria-expanded="false" aria-controls="aw-chat-panel">
      ${H.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `,document.body.appendChild(r);const d=r.querySelector(".aw-chat__panel");d.id="aw-chat-panel";const l=r.querySelector(".aw-chat__messages"),b=r.querySelector(".aw-chat__composer"),g=b.querySelector("textarea"),h=b.querySelector(".aw-chat__send"),s=r.querySelector(".aw-chat__toggle"),v=s.querySelector(".aw-chat__badge"),p=ce(d);let x=null;const _=new Map;let k=0,S=Ae();function C(){ke(a.filter(n=>n.status!=="streaming"),S)}function F(n){l.querySelector(`[data-id="${n}"]`)?.scrollIntoView({block:"start",behavior:"smooth"})}function P(){const n=S&&!t;r.classList.toggle("has-unread",n),v.hidden=!n,v.setAttribute("aria-hidden",n?"false":"true"),t?s.setAttribute("aria-label",e.closeAnna):n?s.setAttribute("aria-label",e.openUnread):s.setAttribute("aria-label",e.open)}function N(){t||(S=!0,C(),P())}function I(n){t=n,r.classList.toggle("is-open",t),s.setAttribute("aria-expanded",String(t)),d.hidden=!t,d.setAttribute("aria-hidden",t?"false":"true"),t?(S=!1,C(),x=document.activeElement,p.activate()):(p.deactivate(),(x||s).focus()),P()}async function L(n,c){const m=(_.get(n.id)??0)+1;_.set(n.id,m);let w=c;w||(w=document.createElement("div"),w.className=`aw-msg aw-msg--${n.role}`,w.dataset.id=n.id,l.appendChild(w));const u=document.createElement("div");if(u.className="aw-msg__bubble",n.role==="assistant")if(n.status==="streaming"&&!n.content)u.innerHTML=`<span class="aw-typing" aria-label="${e.typing}"><i></i><i></i><i></i></span>`;else try{const K=await ye(n.content||"");if(_.get(n.id)!==m)return;u.innerHTML=K,Y(u)}catch{if(_.get(n.id)!==m)return;u.textContent=n.content||""}else u.textContent=n.content;if(_.get(n.id)!==m)return;const E=document.createElement("div");E.className="aw-msg__meta",E.textContent=He(n.createdAt),w.replaceChildren(u,E)}async function V(n){const c=l.scrollTop;if(l.replaceChildren(),a.length===0){const m=document.createElement("div");m.className="aw-chat__empty";const w=Ge().map(u=>`<button type="button" class="aw-chat__suggest" data-suggest="${U(u)}">${U(u)}</button>`).join("");m.innerHTML=`
        <strong>${e.hello}</strong>
        <p>${e.intro}</p>
        <div class="aw-chat__suggests" role="group" aria-label="${e.suggests}">${w}</div>
      `,l.appendChild(m);return}for(const m of a)await L(m);l.scrollTop=c}function T(n){h.className="aw-chat__send",h.textContent=e.send,h.type="submit",h.disabled=n,h.setAttribute("aria-label",e.sendMessage),h.onclick=null}function z(n){k&&(cancelAnimationFrame(k),k=0);const c=l.querySelector(`[data-id="${n.id}"]`);return L(n,c||void 0)}function Z(n){k||(k=requestAnimationFrame(()=>{k=0,z(n)}))}async function ee(n){const c={id:j(),role:"assistant",content:"",createdAt:Date.now(),status:"streaming"};a=[...n,c],o=c.id,T(!0),await L(c);const m=[...n].reverse().find(u=>u.role==="user");m&&F(m.id),i=new AbortController;const w={messages:n.filter(u=>u.role==="user"||u.role==="assistant").filter(u=>u.status!=="error").map(u=>({role:u.role,content:u.content.slice(0,2e3)})),pageContext:le(),site:ie};await re(w,{onDelta:u=>{c.content+=u,c.status="streaming",Z(c),c.content&&N()},onDone:()=>{const u=!!c.content;c.status=u?"ok":"error",u||(c.content=e.noResponse),o=null,i=null,T(!1),C(),z(c),N()},onError:u=>{c.content=u,c.status="error",o=null,i=null,T(!1),C(),z(c),N()}},i.signal)}async function O(n){const c=n.trim().slice(0,2e3);if(!c||o)return;const m=l.querySelector(".aw-chat__empty");m&&m.remove();const w={id:j(),role:"user",content:c,createdAt:Date.now(),status:"ok"},u=[...a,w];a=u,C(),await L(w),await ee(u)}function ae(){window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s.classList.remove("aw-chat__toggle--spin","aw-chat__toggle--enter"),s.offsetWidth,s.classList.add("aw-chat__toggle--spin"))}window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.classList.add("aw-chat__toggle--enter"),s.addEventListener("animationend",n=>{n.animationName==="aw-toggle-spin"&&s.classList.remove("aw-chat__toggle--spin"),n.animationName==="aw-toggle-enter"&&s.classList.remove("aw-chat__toggle--enter")}),s.addEventListener("click",()=>{ae(),I(!t)}),r.querySelector('[data-action="close"]').addEventListener("click",()=>I(!1)),b.addEventListener("submit",n=>{n.preventDefault();const c=g.value;g.value="",O(c)}),g.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),b.requestSubmit())}),l.addEventListener("click",async n=>{const c=n.target.closest(".aw-chat__suggest");if(c){const K=c.getAttribute("data-suggest")||c.textContent||"";O(K);return}const m=n.target.closest(".aw-code-copy");if(!m)return;const E=m.closest("pre")?.querySelector("code")?.textContent||"";try{await navigator.clipboard.writeText(E),m.textContent=e.copied,setTimeout(()=>{m.textContent=e.copy},1200)}catch{m.textContent=e.failed}}),document.addEventListener("keydown",n=>{n.key==="Escape"&&t&&(n.preventDefault(),I(!1))}),document.addEventListener("pointerdown",n=>{if(!t||o)return;const c=n.target;c&&(d.contains(c)||s.contains(c)||I(!1))},!0),V(),P()}Be();
//# sourceMappingURL=chat-widget.js.map
