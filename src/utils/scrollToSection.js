import { prefersReducedMotion } from "./motion";

export const MOBILE_BREAKPOINT = 900;
const OFFSET_MOBILE = 88;
const OFFSET_DESKTOP = 32;

function getScrollOffset() {
  return window.innerWidth < MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
}

function scrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}

function normalizeSectionId(sectionId) {
  if (!sectionId || sectionId === "top") return "top";
  return sectionId.replace(/^#/, "");
}

export function scrollToId(sectionId, { updateHash = true } = {}) {
  const id = normalizeSectionId(sectionId);
  const element = document.getElementById(id);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({ top, behavior: scrollBehavior() });

  if (updateHash) {
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      history.pushState(null, "", nextHash);
    }
  }
}

export function scrollToTop(options) {
  scrollToId("top", options);
}

export function syncScrollFromHash() {
  const id = normalizeSectionId(window.location.hash.slice(1) || "top");
  if (!document.getElementById(id)) return;
  scrollToId(id, { updateHash: false });
}

/** Correct hash landing offset and keep Back/Forward in sync with sections. */
export function initHashScroll() {
  const sync = () => {
    requestAnimationFrame(() => syncScrollFromHash());
  };

  sync();
  window.addEventListener("popstate", sync);
  return () => window.removeEventListener("popstate", sync);
}
