/**
 * Tiny deferred loader — keep this file dependency-free and under ~1KB.
 * Loads the ES module chat widget after idle so it does not compete with LCP.
 *
 * Build the widget with: npm run build:chat
 * Output: js/chat-widget.js (+ optional chunks)
 */
(function () {
  'use strict';

  if (window.__1winexChatLoading) return;
  window.__1winexChatLoading = true;

  var loaderSrc =
    (document.currentScript && document.currentScript.src) ||
    './js/chat-widget-loader.js?v=9';
  var widgetSrc = loaderSrc.replace(/chat-widget-loader\.js/i, 'chat-widget.js');
  if (widgetSrc === loaderSrc) widgetSrc = './js/chat-widget.js?v=9';

  function loadWidget() {
    var script = document.createElement('script');
    script.type = 'module';
    script.src = widgetSrc;
    script.dataset.onewinexChat = '1';
    document.head.appendChild(script);
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () { loadWidget(); }, { timeout: 8000 });
    } else {
      setTimeout(loadWidget, 2500);
    }
  }

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
})();
