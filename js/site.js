(function () {
  if (/android/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("is-android");
  }

  var toggle = document.querySelector(".mobile-toggle");
  var panel = document.querySelector(".header-panel");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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

  document.querySelectorAll(".nav-menu a").forEach(function (link) {
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
    box.setAttribute("aria-label", "Cookie notice");
    box.innerHTML =
      '<p>This site uses cookies and local storage to keep pages working. See the <a href="responsible-gambling#cookies">cookie policy</a>.</p>' +
      '<button type="button" class="cookie-notice__ok">OK</button>';
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
      frame.title = "Aviator demo by Spribe";
      frame.src =
        "https://demo.spribe.io/launch/aviator?currency=USD&lang=EN&return_url=" +
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
        label.textContent = "Copied";
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
})();
