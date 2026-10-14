/**
 * Typographer's apostrophes for copy stored with straight quotes, so the data
 * in lib/projects.ts stays easy to edit. Only apostrophes inside or closing a
 * word are touched; nothing else in the string changes.
 */
export function smart(text: string): string {
  return text.replace(/(\w)'(?=\w|\s|$)/g, "$1’");
}
