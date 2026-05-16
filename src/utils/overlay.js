export function setBodyScrollLock(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
}

export function trapFocus(container, event) {
  if (!container || event.key !== "Tab") return;

  const focusables = container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])',
  );

  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
