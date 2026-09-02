(function() {
  'use strict';

  // Header scroll effect
  var header = document.querySelector('.site-header');

  function handleScroll() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  var mobileToggle = document.querySelector('.mobile-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      var isActive = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Intersection Observer for fade-in animations
  var observerOptions = {
    threshold: 0,
    rootMargin: '0px'
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  var fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  fadeElements.forEach(function(el) {
    observer.observe(el);
  });

  // Safety net: force-trigger any fade-in element already in the viewport
  // on load (covers edge cases where the observer callback misses it)
  setTimeout(function() {
    fadeElements.forEach(function(el) {
      if (!el.classList.contains('visible')) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        }
      }
    });
  }, 200);

  // Staggered cascade animation for cards inside grids
  var grids = document.querySelectorAll('.feature-grid, .scores-grid, .game-categories-grid, .steps-grid, .updates-grid, .getting-started-grid, .infographic-right');
  grids.forEach(function(grid) {
    var cards = grid.children;
    var delay = grid.classList.contains('feature-grid') ? 0.12 : 0.1;
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.transitionDelay = (i * delay) + 's';
    }
  });

  // Infographic: animate progress bars, counters, and donut on scroll
  var infographic = document.querySelector('.infographic');
  if (infographic) {
    var infographicObserved = false;

    function animateInfographic() {
      if (infographicObserved) return;
      infographicObserved = true;

      // Progress bars — double rAF ensures width:0 is painted first
      infographic.querySelectorAll('.infographic-bar-fill').forEach(function(bar) {
        var pct = parseFloat(bar.getAttribute('data-percent'));
        if (!isNaN(pct)) {
          bar.style.width = '0';
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              bar.style.width = pct + '%';
            });
          });
        }
      });

      // Donut chart — ensure strokeDasharray is set before animating offset
      var donut = infographic.querySelector('.infographic-donut-fill');
      if (donut) {
        var donutPct = parseFloat(donut.getAttribute('data-percent'));
        if (!isNaN(donutPct)) {
          var circumference = 314;
          var offset = circumference - (donutPct / 100) * circumference;
          donut.style.strokeDasharray = circumference;
          donut.style.strokeDashoffset = circumference;
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              donut.style.strokeDashoffset = offset;
            });
          });
        }
      }

      // Counters
      infographic.querySelectorAll('[data-count]').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var duration = 1600;
        var startTime = null;

        function tick(now) {
          if (!startTime) startTime = now;
          var progress = Math.min((now - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(eased * target);
          el.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(tick);
      });
    }

    var infoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateInfographic();
          infoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px' });

    infoObserver.observe(infographic);

    // Safety net: force-trigger infographic animation if already in viewport on load
    setTimeout(function() {
      if (!infographicObserved) {
        var rect = infographic.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateInfographic();
        }
      }
    }, 300);
  }

  // Animate score bars (score-bar-fill, mockup-score-fill) on scroll
  var scoreBars = document.querySelectorAll('.score-bar-fill, .mockup-score-fill');
  if (scoreBars.length) {
    var barObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var pct = parseFloat(bar.getAttribute('data-width'));
          if (!isNaN(pct)) {
            requestAnimationFrame(function() {
              requestAnimationFrame(function() {
                bar.style.width = pct + '%';
              });
            });
          }
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0, rootMargin: '0px' });

    scoreBars.forEach(function(bar) { barObserver.observe(bar); });

    setTimeout(function() {
      scoreBars.forEach(function(bar) {
        if (!bar.style.width) {
          var rect = bar.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            var pct = parseFloat(bar.getAttribute('data-width'));
            if (!isNaN(pct)) bar.style.width = pct + '%';
          }
        }
      });
    }, 300);
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function() {
        var isActive = item.classList.contains('active');

        faqItems.forEach(function(other) {
          if (other !== item) {
            other.classList.remove('active');
            var otherAnswer = other.querySelector('.faq-answer');
            var otherQuestion = other.querySelector('.faq-question');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
            if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
