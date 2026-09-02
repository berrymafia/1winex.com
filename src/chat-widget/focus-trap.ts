/**
 * Simple focus trap for the open chat panel (Tab cycles inside).
 */
export function createFocusTrap(container: HTMLElement) {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusable(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const list = getFocusable();
    if (list.length === 0) {
      e.preventDefault();
      return;
    }
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return {
    activate() {
      container.addEventListener('keydown', onKeyDown);
      const list = getFocusable();
      (list[0] || container).focus();
    },
    deactivate() {
      container.removeEventListener('keydown', onKeyDown);
    },
  };
}
