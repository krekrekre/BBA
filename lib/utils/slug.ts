export function generateSlug(text: string): string {
  const serbianMap: Record<string, string> = {
    č: "c",
    ć: "c",
    ž: "z",
    š: "s",
    đ: "d",
    Č: "c",
    Ć: "c",
    Ž: "z",
    Š: "s",
    Đ: "d",
  };

  let slug = text.toLowerCase();
  for (const [char, replacement] of Object.entries(serbianMap)) {
    slug = slug.replace(new RegExp(char, "g"), replacement);
  }
  return slug
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
