import { parse } from "yaml";

function parseMarkdown(raw, source) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    throw new Error(`Missing YAML front matter in ${source}`);
  }

  return {
    ...parse(match[1]),
    body: raw.slice(match[0].length).trim(),
    source,
  };
}

function loadFiles(modules) {
  return Object.entries(modules).map(([source, raw]) =>
    parseMarkdown(raw, source),
  );
}

const pageModules = import.meta.glob("../content/pages/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const highlightModules = import.meta.glob("../content/highlights/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const eventModules = import.meta.glob("../content/events/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const pages = Object.fromEntries(
  loadFiles(pageModules).map((page) => [page.page_key, page]),
);

export const content = {
  site: pages.site,
  about: pages.about,
  contact: pages.contact,
  highlights: loadFiles(highlightModules).sort(
    (a, b) => Number(a.order ?? 999) - Number(b.order ?? 999),
  ),
  events: loadFiles(eventModules).sort((a, b) =>
    String(a.date).localeCompare(String(b.date)),
  ),
};

export function localized(entry, field, language) {
  return (
    entry?.[`${field}_${language}`] ??
    entry?.[`${field}_en`] ??
    entry?.[field] ??
    ""
  );
}

export function assetUrl(path = "") {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  const cleanPath = path.replace(/^\.\//, "").replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
