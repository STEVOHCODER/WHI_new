/**
 * Format plain text project content into well-structured HTML.
 * - Double newlines → paragraphs
 * - Single newlines → line breaks within paragraphs
 * - Lines starting with "-" or numbers → bullet/numbered lists
 * - Preserves existing HTML tags
 */
export function formatProjectContent(raw: string | null | undefined): string {
  if (!raw) return "";

  // If it already looks like HTML, return as-is
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw;

  const lines = raw.split("\n");
  const blocks: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let isNumbered = false;

  function flushList() {
    if (listItems.length === 0) return;
    const tag = isNumbered ? "ol" : "ul";
    const items = listItems
      .map((item) => `<li>${escapeHtml(item.trim())}</li>`)
      .join("");
    blocks.push(`<${tag} class="my-4 ml-4 space-y-1 list-disc">${items}</${tag}>`);
    listItems = [];
    inList = false;
    isNumbered = false;
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line → flush any open list, start new paragraph
    if (trimmed === "") {
      if (inList) flushList();
      continue;
    }

    // Bullet list: starts with -, *, or •
    if (/^[-*•]\s/.test(trimmed)) {
      if (!inList || isNumbered) flushList();
      inList = true;
      isNumbered = false;
      listItems.push(trimmed.replace(/^[-*•]\s/, ""));
      continue;
    }

    // Numbered list: starts with "1.", "2.", etc.
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || !isNumbered) flushList();
      inList = true;
      isNumbered = true;
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    // Regular text line
    if (inList) flushList();
    blocks.push(`<p class="my-3 leading-relaxed text-[var(--color-text)]">${escapeHtml(trimmed)}</p>`);
  }

  flushList();

  return blocks.join("");
}
