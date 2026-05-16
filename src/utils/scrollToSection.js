const MOBILE_BREAKPOINT = 900;
const OFFSET_MOBILE = 88;
const OFFSET_DESKTOP = 32;

export function getScrollOffset() {
  return window.innerWidth < MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
}

export function scrollToId(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
