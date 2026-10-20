import { getHomeProjects } from "@/lib/projects";
import { PROFILE } from "@/lib/profile";

export const dynamic = "force-static";

/** Plain-text profile for AI agents and LLM crawlers (llmstxt.org format). */
function render(): string {
  const lines: string[] = [];
  lines.push(`# ${PROFILE.name}`, "");
  lines.push(`> ${PROFILE.headline}. ${PROFILE.location}.`, "");
  lines.push(PROFILE.summary, "");
  lines.push("## Earlier", "");
  for (const item of PROFILE.earlier) lines.push(`- ${item}`);
  lines.push("", `Award: ${PROFILE.award}`, `Education: ${PROFILE.education}`, "");
  lines.push(`Skills: ${PROFILE.skills.join("; ")}`, "");

  lines.push("## Case notes", "");
  for (const p of getHomeProjects()) {
    const where = p.place ? `, ${p.place}` : "";
    lines.push(`### ${p.title} (${p.period}${where})`, "", p.descriptor, "");
    const points = p.highlights?.length ? p.highlights : p.body.slice(0, 1);
    for (const point of points) lines.push(`- ${point}`);
    lines.push(`- Full case note: ${PROFILE.links.site}?p=${p.slug}`, "");
  }

  lines.push("## Contact", "");
  lines.push(`- Website: ${PROFILE.links.site}`);
  lines.push(`- LinkedIn: ${PROFILE.links.linkedin}`);
  lines.push(`- Email: shown in the contact section at ${PROFILE.links.contact}`, "");
  return lines.join("\n");
}

export function GET() {
  return new Response(render(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
