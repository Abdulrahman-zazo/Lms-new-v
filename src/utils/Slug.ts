//  remove icons, id, %20, and set title to improve SEO and scripts
export function slugify(str: string) {
  return str
    .normalize("NFKD") // Normalize Arabic and Unicode
    .replace(/[\u0300-\u036F]/g, "") // Remove accents
    .replace(/[^\w\s\u0600-\u06FF-]/g, "") // Remove non-word chars but keep Arabic
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .toLowerCase();
}
