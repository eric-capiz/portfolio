/**
 * Injects crawlable HTML into dist/index.html after Vite build.
 * React still mounts with createRoot and replaces #root — no hydration,
 * no runtime behavior change. Safe for Vercel (no headless browser).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distIndex = join(root, "dist", "index.html");

const { projectsData } = await import(
  pathToFileURL(join(root, "src/data/projects.js")).href
);
const { siteCopy } = await import(
  pathToFileURL(join(root, "src/data/siteCopy.js")).href
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSnapshot() {
  const { hero, about, skills, contact } = siteCopy;

  const projectBlocks = projectsData
    .map((project) => {
      const tech = project.techStack.map(escapeHtml).join(", ");
      const code = project.codeLink
        ? `<p><a href="${escapeHtml(project.codeLink)}">View code</a></p>`
        : "";
      return `
        <article>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <p>Tech: ${tech}</p>
          <p><a href="${escapeHtml(project.liveLink)}">Live site</a></p>
          ${code}
        </article>`;
    })
    .join("\n");

  const skillBlocks = skills.groups
    .map((group) => {
      const items = group.items
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
      return `
        <section>
          <h3>${escapeHtml(group.title)}</h3>
          <ul>${items}</ul>
        </section>`;
    })
    .join("\n");

  return `
    <div id="seo-prerender">
      <header>
        <p>${escapeHtml(hero.eyebrow)}</p>
        <h1>${escapeHtml(hero.title)}</h1>
        <p>${escapeHtml(hero.lede)}</p>
      </header>

      <section id="about">
        <h2>${escapeHtml(about.title)}</h2>
        ${about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n")}
      </section>

      <section id="projects">
        <h2>Selected work</h2>
        ${projectBlocks}
      </section>

      <section id="skills">
        <h2>${escapeHtml(skills.title)}</h2>
        <p>${escapeHtml(skills.lede)}</p>
        ${skillBlocks}
      </section>

      <section id="contact">
        <h2>${escapeHtml(contact.title)}</h2>
        <p>${escapeHtml(contact.lede)}</p>
        <ul>
          <li><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></li>
          <li><a href="${escapeHtml(contact.github)}">GitHub</a></li>
          <li><a href="${escapeHtml(contact.linkedin)}">LinkedIn</a></li>
        </ul>
      </section>
    </div>
  `.trim();
}

function injectSnapshot(html, snapshot) {
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Could not find <div id="root"></div> in dist/index.html');
  }

  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${snapshot}</div>`,
  );
}

const html = readFileSync(distIndex, "utf8");
const nextHtml = injectSnapshot(html, buildSnapshot());
writeFileSync(distIndex, nextHtml, "utf8");

console.log("Prerender: injected SEO snapshot into dist/index.html");
