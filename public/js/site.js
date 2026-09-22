(function () {
  if (/android/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("is-android");
  }

  var lang = (function () {
    var raw = (document.documentElement.lang || "").toLowerCase();
    if (raw.indexOf("ru") === 0) return "ru";
    if (raw.indexOf("uk") === 0) return "uk";
    if (raw.indexOf("es") === 0) return "es";
    if (raw.indexOf("fr") === 0) return "fr";
    if (raw.indexOf("de") === 0) return "de";
    if (raw.indexOf("it") === 0) return "it";
    if (raw.indexOf("az") === 0) return "az";
    if (raw.indexOf("bn") === 0) return "bn";
    return "en";
  })();
  var copy = {
    en: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      cookieLabel: "Cookie notice",
      cookieHtml:
        '<p>We use cookies and local storage to run the site. Learn more in our <a href="/responsible-gambling#cookies">cookie policy</a>.</p><button type="button" class="cookie-notice__ok">Got it</button>',
      copied: "Copied",
      aviatorDemo: "Aviator demo by Spribe",
      spribeLang: "EN",
    },
    ru: {
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      cookieLabel: "Уведомление о cookie",
      cookieHtml:
        '<p>Мы используем cookie и локальное хранилище для работы сайта. Подробнее — в <a href="/ru/responsible-gambling#cookies">политике файлов cookie</a>.</p><button type="button" class="cookie-notice__ok">Понятно</button>',
      copied: "Скопировано",
      aviatorDemo: "Демо Aviator от Spribe",
      spribeLang: "RU",
    },
    es: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      cookieLabel: "Aviso de cookies",
      cookieHtml:
        '<p>Usamos cookies y almacenamiento local para que el sitio funcione. Más información en la <a href="/es/responsible-gambling#cookies">política de cookies</a>.</p><button type="button" class="cookie-notice__ok">Entendido</button>',
      copied: "Copiado",
      aviatorDemo: "Demo de Aviator de Spribe",
      spribeLang: "ES",
    },
    fr: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      cookieLabel: "Avis sur les cookies",
      cookieHtml:
        '<p>Nous utilisons des cookies et le stockage local pour faire fonctionner le site. En savoir plus dans la <a href="/fr/responsible-gambling#cookies">politique relative aux cookies</a>.</p><button type="button" class="cookie-notice__ok">Compris</button>',
      copied: "Copié",
      aviatorDemo: "Démo Aviator par Spribe",
      spribeLang: "FR",
    },
    de: {
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      cookieLabel: "Cookie-Hinweis",
      cookieHtml:
        '<p>Wir verwenden Cookies und lokalen Speicher für den Betrieb der Website. Mehr dazu in der <a href="/de/responsible-gambling#cookies">Cookie-Richtlinie</a>.</p><button type="button" class="cookie-notice__ok">Verstanden</button>',
      copied: "Kopiert",
      aviatorDemo: "Aviator-Demo von Spribe",
      spribeLang: "DE",
    },
    uk: {
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      cookieLabel: "Повідомлення про cookie",
      cookieHtml:
        '<p>Ми використовуємо cookie й локальне сховище для роботи сайту. Докладніше — у <a href="/uk/responsible-gambling#cookies">політиці файлів cookie</a>.</p><button type="button" class="cookie-notice__ok">Зрозуміло</button>',
      copied: "Скопійовано",
      aviatorDemo: "Демо Aviator від Spribe",
      spribeLang: "UK",
    },
    it: {
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
      cookieLabel: "Avviso sui cookie",
      cookieHtml:
        '<p>Usiamo cookie e archiviazione locale per far funzionare il sito. Leggi la nostra <a href="/it/responsible-gambling#cookies">informativa sui cookie</a>.</p><button type="button" class="cookie-notice__ok">Ho capito</button>',
      copied: "Copiato",
      aviatorDemo: "Demo Aviator di Spribe",
      spribeLang: "IT",
    },
    az: {
      openMenu: "Menyunu aç",
      closeMenu: "Menyunu bağla",
      cookieLabel: "Kuki bildirişi",
      cookieHtml:
        '<p>Saytın işləməsi üçün kukilərdən və lokal yaddaşdan istifadə edirik. Ətraflı məlumat üçün <a href="/az/responsible-gambling#cookies">kuki siyasətinə</a> baxın.</p><button type="button" class="cookie-notice__ok">Aydındır</button>',
      copied: "Kopyalandı",
      aviatorDemo: "Spribe Aviator demosu",
      spribeLang: "AZ",
    },
    bn: {
      openMenu: "মেনু খুলুন",
      closeMenu: "মেনু বন্ধ করুন",
      cookieLabel: "কুকি নোটিশ",
      cookieHtml:
        '<p>সাইট সচল রাখতে আমরা কুকি ও লোকাল স্টোরেজ ব্যবহার করি। বিস্তারিত <a href="/bn/responsible-gambling#cookies">কুকি নীতিতে</a> দেখুন।</p><button type="button" class="cookie-notice__ok">বুঝেছি</button>',
      copied: "কপি হয়েছে",
      aviatorDemo: "Spribe-এর Aviator ডেমো",
      spribeLang: "EN",
    },
  };
  var t = copy[lang] || copy.en;

  document.querySelectorAll("a[href]").forEach(function (link) {
    var href = (link.getAttribute("href") || "").trim();
    if (!href) return;
    var path = href.split("?")[0];
    var isExit = path === "/go" || path === "/apk";
    var isHttp = /^https?:\/\//i.test(href) || href.indexOf("//") === 0;
    if (isHttp) {
      try {
        var host = new URL(href, location.href).hostname.replace(/^www\./i, "").toLowerCase();
        var here = location.hostname.replace(/^www\./i, "").toLowerCase();
        if (host === here || host === "1winex.com") return;
      } catch (err) {
        return;
      }
    } else if (!isExit) {
      return;
    }
    var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (rel.indexOf("nofollow") === -1) rel.push("nofollow");
    if (link.getAttribute("target") === "_blank") {
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
    }
    link.setAttribute("rel", rel.join(" "));
  });

  var toggle = document.querySelector(".mobile-toggle");
  var panel = document.querySelector(".header-panel");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? t.closeMenu : t.openMenu);
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }

  document.addEventListener("click", function (e) {
    if (!document.body.classList.contains("nav-open")) return;
    var t = e.target;
    if (toggle && toggle.contains(t)) return;
    if (panel && panel.contains(t)) return;
    setNav(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      setNav(false);
      if (toggle) toggle.focus();
    }
  });

  document.querySelectorAll(".nav-menu > a").forEach(function (link) {
    link.addEventListener("click", function () {
      setNav(false);
    });
  });

  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector("button");
    var body = item.querySelector(".faq-body");

    if (body && !body.querySelector(".faq-body-inner")) {
      var inner = document.createElement("div");
      inner.className = "faq-body-inner";
      while (body.firstChild) inner.appendChild(body.firstChild);
      body.appendChild(inner);
    }

    if (!btn || btn.dataset.faqBound) return;
    btn.dataset.faqBound = "1";

    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("open");
      if (willOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        if (body) {
          body.style.maxHeight = "0px";
          body.offsetHeight;
          body.style.maxHeight = body.scrollHeight + "px";
        }
        return;
      }
      if (body) {
        body.style.maxHeight = body.scrollHeight + "px";
        body.offsetHeight;
        body.style.maxHeight = "0px";
      }
      item.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".welcome-row").forEach(function (block) {
    var row = block.querySelector(".welcome-cards");
    var prev = block.querySelector('[data-welcome-dir="-1"]');
    var next = block.querySelector('[data-welcome-dir="1"]');
    if (!row || (!prev && !next)) return;

    function update() {
      var max = row.scrollWidth - row.clientWidth;
      if (prev) prev.disabled = row.scrollLeft <= 2;
      if (next) next.disabled = row.scrollLeft >= max - 2;
    }

    if (prev) {
      prev.addEventListener("click", function () {
        row.scrollBy({ left: -240, behavior: "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        row.scrollBy({ left: 240, behavior: "smooth" });
      });
    }
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  (function () {
    var els = document.querySelectorAll("[data-welcome-timer]");
    if (!els.length) return;
    var end = Date.now() + 30 * 24 * 60 * 60 * 1000;
    function pad(n) {
      return String(n).padStart(2, "0");
    }
    function tick() {
      var s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      var d = Math.floor(s / 86400);
      s -= d * 86400;
      var h = Math.floor(s / 3600);
      s -= h * 3600;
      var m = Math.floor(s / 60);
      s -= m * 60;
      var vals = [pad(d), pad(h), pad(m), pad(s)];
      els.forEach(function (el) {
        var parts = el.querySelectorAll("[data-t]");
        for (var i = 0; i < parts.length; i++) parts[i].textContent = vals[i];
      });
    }
    tick();
    setInterval(tick, 1000);
  })();

  document.querySelectorAll(".games-block").forEach(function (block) {
    var row = block.querySelector(".games-row");
    var prev = block.querySelector('[data-games-dir="-1"]');
    var next = block.querySelector('[data-games-dir="1"]');
    if (!row || (!prev && !next)) return;

    function update() {
      var max = row.scrollWidth - row.clientWidth;
      if (prev) prev.disabled = row.scrollLeft <= 2;
      if (next) next.disabled = row.scrollLeft >= max - 2;
    }

    if (prev) {
      prev.addEventListener("click", function () {
        row.scrollBy({ left: -row.clientWidth, behavior: "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        row.scrollBy({ left: row.clientWidth, behavior: "smooth" });
      });
    }
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  (function () {
    var imgs = document.querySelectorAll(".games-row img[data-src]");
    if (!imgs.length) return;

    function load(img) {
      var src = img.getAttribute("data-src");
      if (!src) return;
      img.src = src;
      img.removeAttribute("data-src");
    }

    if (!("IntersectionObserver" in window)) {
      imgs.forEach(load);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          load(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "240px 120px", threshold: 0.01 }
    );

    imgs.forEach(function (img) {
      io.observe(img);
    });
  })();

  document.querySelectorAll(".table-wrapper").forEach(function (wrap) {
    if (wrap.querySelector(":scope > .table-scroll")) return;
    var inner = document.createElement("div");
    inner.className = "table-scroll";
    while (wrap.firstChild) inner.appendChild(wrap.firstChild);
    wrap.appendChild(inner);
  });

  (function () {
    var key = "1winex-cookie-ok";
    try {
      if (window.localStorage.getItem(key) === "1") return;
    } catch (err) {}

    var box = document.createElement("div");
    box.id = "cookie-notice";
    box.className = "cookie-notice";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", t.cookieLabel);
    box.innerHTML = t.cookieHtml;
    document.body.appendChild(box);

    function hide() {
      try {
        window.localStorage.setItem(key, "1");
      } catch (err) {}
      box.classList.add("is-leaving");
      window.setTimeout(function () {
        if (box.parentNode) box.parentNode.removeChild(box);
      }, 280);
    }

    box.querySelector(".cookie-notice__ok").addEventListener("click", hide);
    window.requestAnimationFrame(function () {
      box.classList.add("is-visible");
    });
  })();

  (function () {
    var stage = document.querySelector("[data-aviator-demo]");
    if (!stage) return;
    var start = stage.querySelector("[data-aviator-demo-start]");
    if (!start) return;
    start.addEventListener("click", function () {
      if (stage.querySelector("iframe")) return;
      var holder = stage.querySelector(".aviator-demo__stage") || stage;
      var frame = document.createElement("iframe");
      frame.title = t.aviatorDemo;
      frame.src =
        "https://demo.spribe.io/launch/aviator?currency=USD&lang=" +
        (t.spribeLang) +
        "&return_url=" +
        encodeURIComponent(location.origin + location.pathname);
      frame.setAttribute("allow", "autoplay; fullscreen");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("scrolling", "no");
      frame.setAttribute("referrerpolicy", "origin-when-cross-origin");
      holder.appendChild(frame);
      stage.classList.add("is-playing");
    });
  })();

  document.querySelectorAll("[data-copy]").forEach(function (el) {
    el.addEventListener("click", function () {
      var value = el.getAttribute("data-copy");
      var label = el.querySelector("[data-copy-label]") || el;
      var prev = label.textContent;
      var done = function () {
        el.classList.add("is-copied");
        label.textContent = t.copied;
        setTimeout(function () {
          el.classList.remove("is-copied");
          label.textContent = prev;
        }, 1600);
      };
      var fallback = function () {
        var ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (err) {}
        document.body.removeChild(ta);
        done();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  });

  function preferredSiteLang() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    var i;
    var code;
    for (i = 0; i < list.length; i++) {
      code = String(list[i] || "").toLowerCase();
      if (code === "es" || code.indexOf("es-") === 0) return "es";
      if (code === "uk" || code.indexOf("uk-") === 0) return "uk";
      if (code === "ru" || code.indexOf("ru-") === 0) return "ru";
      if (code === "fr" || code.indexOf("fr-") === 0) return "fr";
      if (code === "de" || code.indexOf("de-") === 0) return "de";
      if (code === "it" || code.indexOf("it-") === 0) return "it";
      if (code === "az" || code.indexOf("az-") === 0) return "az";
      if (code === "bn" || code.indexOf("bn-") === 0) return "bn";
      if (code === "en" || code.indexOf("en-") === 0) return "en";
    }
    return "en";
  }

  var LANG_ORDER = ["en", "az", "bn", "fr", "de", "it", "ru", "es", "uk"];

  function langRank(code) {
    var i = LANG_ORDER.indexOf(String(code || "").toLowerCase());
    return i === -1 ? 99 : i;
  }

  function arrangeLangPanels() {
    var want = preferredSiteLang() || "en";
    document.querySelectorAll(".lang-panel").forEach(function (panel) {
      var sections = panel.querySelectorAll(".lang-panel__section");
      if (sections.length < 2) return;
      var rec = sections[0];
      var all = sections[1];
      var recLink = null;
      var others = [];
      panel.querySelectorAll("a[hreflang]").forEach(function (link) {
        var code = (link.getAttribute("hreflang") || "").toLowerCase();
        if (want && !recLink && (code === want || code.indexOf(want + "-") === 0)) recLink = link;
        else others.push(link);
      });
      others.sort(function (a, b) {
        return langRank(a.getAttribute("hreflang")) - langRank(b.getAttribute("hreflang"));
      });
      if (recLink) {
        rec.removeAttribute("hidden");
        rec.insertAdjacentElement("afterend", recLink);
      } else {
        rec.setAttribute("hidden", "");
      }
      var i;
      for (i = others.length - 1; i >= 0; i--) {
        all.insertAdjacentElement("afterend", others[i]);
      }
    });
  }

  arrangeLangPanels();

  function footerSocialHref(href) {
    try {
      return new URL(href, location.href).href;
    } catch (err) {
      return href;
    }
  }

  function expandFooterSocials() {
    document.querySelectorAll(".footer-social-and-lang").forEach(function (row) {
      var nav = row.querySelector(".footer-social");
      var more = nav && nav.querySelector(".footer-social-more");
      if (!nav || !more) return;
      var seen = {};
      nav.querySelectorAll(":scope > a[href]").forEach(function (link) {
        seen[footerSocialHref(link.href)] = true;
      });
      more.querySelectorAll(".footer-social-panel__list a[href]").forEach(function (src) {
        var href = footerSocialHref(src.href);
        if (seen[href]) return;
        var clone = document.createElement("a");
        clone.href = src.getAttribute("href") || src.href;
        if (src.target) clone.target = src.target;
        if (src.rel) clone.rel = src.rel;
        var label = src.getAttribute("aria-label");
        if (label) clone.setAttribute("aria-label", label);
        var svg = src.querySelector("svg");
        if (svg) clone.appendChild(svg.cloneNode(true));
        nav.insertBefore(clone, more);
        seen[href] = true;
      });
    });
  }

  function fitFooterSocials() {
    document.querySelectorAll(".footer-social-and-lang").forEach(function (row) {
      var nav = row.querySelector(".footer-social");
      var lang = row.querySelector(".footer-lang");
      var more = nav && nav.querySelector(".footer-social-more");
      if (!nav || !lang || !more) return;
      var links = nav.querySelectorAll(":scope > a");
      var i;
      for (i = 0; i < links.length; i++) links[i].hidden = false;
      more.hidden = false;
      var available = row.clientWidth - lang.offsetWidth - 8;
      function rowWidth(count, withMore) {
        var n = count + (withMore ? 1 : 0);
        if (n <= 0) return 0;
        return n * 36 + (n - 1) * 4;
      }
      var show = links.length;
      var showMore = false;
      if (rowWidth(show, false) > available) {
        showMore = true;
        while (show > 1 && rowWidth(show, true) > available) show -= 1;
      }
      for (i = 0; i < links.length; i++) links[i].hidden = i >= show;
      more.hidden = !showMore;
      if (!showMore) more.open = false;
    });
  }

  expandFooterSocials();
  fitFooterSocials();
  if (window.ResizeObserver) {
    document.querySelectorAll(".footer-social-and-lang").forEach(function (row) {
      new ResizeObserver(fitFooterSocials).observe(row);
    });
  }

  function placeFloatingPanel(details) {
    var panel = details && details.querySelector(".footer-social-panel, .lang-panel");
    if (!panel) return;
    if (!details.open) {
      panel.style.position = "";
      panel.style.left = "";
      panel.style.top = "";
      panel.style.bottom = "";
      return;
    }
    panel.style.position = "fixed";
    panel.style.bottom = "auto";
    var btn = details.querySelector("summary");
    var br = btn.getBoundingClientRect();
    var w = panel.offsetWidth;
    var h = panel.offsetHeight;
    var gap = 10;
    var left = details.classList.contains("lang-picker") ? br.right - w : br.left;
    var top = details.classList.contains("lang-picker") ? br.bottom + gap : br.top - h - gap;
    if (top < 12) top = br.bottom + gap;
    if (top + h > window.innerHeight - 12) top = Math.max(12, window.innerHeight - h - 12);
    if (left + w > window.innerWidth - 12) left = Math.max(12, window.innerWidth - w - 12);
    if (left < 12) left = 12;
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }

  document.querySelectorAll(".footer-social-more__close, .lang-panel__close").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var details = btn.closest("details");
      if (details) details.open = false;
    });
  });

  document.addEventListener("click", function (e) {
    var raw = e.target;
    if (raw && raw.nodeType === 3) raw = raw.parentElement;
    var closeBtn = raw && raw.closest ? raw.closest(".footer-social-more__close, .lang-panel__close") : null;
    if (closeBtn) {
      var panel = closeBtn.closest("details");
      if (panel) panel.open = false;
      e.preventDefault();
      return;
    }
    document.querySelectorAll(".footer-lang[open], .lang-picker[open], .footer-social-more[open]").forEach(function (el) {
      if (!el.contains(e.target)) el.open = false;
    });
  });

  document.querySelectorAll(".footer-lang, .lang-picker, .footer-social-more").forEach(function (el) {
    el.addEventListener("toggle", function () {
      placeFloatingPanel(el);
      if (!el.open) return;
      document.querySelectorAll(".footer-lang, .lang-picker, .footer-social-more").forEach(function (other) {
        if (other !== el) other.removeAttribute("open");
      });
    });
  });

  window.addEventListener("resize", function () {
    fitFooterSocials();
    document.querySelectorAll(".footer-lang[open], .lang-picker[open], .footer-social-more[open]").forEach(placeFloatingPanel);
  });
})();
