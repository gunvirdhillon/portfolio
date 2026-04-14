"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectBrochure } from "@/lib/projects";

type ProjectDriveBrochureProps = {
  brochure: Extract<ProjectBrochure, { kind: "drive" }>;
};

export default function ProjectDriveBrochure({
  brochure,
}: ProjectDriveBrochureProps) {
  const id = brochure.driveFileId.trim();
  const previewSrc = id
    ? `https://drive.google.com/file/d/${id}/preview`
    : null;
  const viewHref = id
    ? `https://drive.google.com/file/d/${id}/view`
    : null;

  const [largePreview, setLargePreview] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewSrc) return;
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIframeReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [previewSrc]);

  const frameShell =
    largePreview
      ? "min-h-[520px] h-[min(88vh,960px)]"
      : "min-h-[380px] h-[min(64vh,560px)]";

  return (
    <div className="mt-14">
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-subtle">
        Brochure
      </h2>
      <div className="mt-6 overflow-hidden rounded-sm border border-rule bg-white/40">
        {previewSrc ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-cream/80 px-4 py-3">
              <p className="text-sm font-medium text-ink">10X Live brochure</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLargePreview((v) => !v)}
                  className="rounded-sm border border-rule bg-surface px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  {largePreview ? "Smaller preview" : "Larger preview"}
                </button>
                {viewHref ? (
                  <a
                    href={viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-rule bg-surface px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-accent transition-colors hover:border-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    Open in Google Drive
                  </a>
                ) : null}
              </div>
            </div>
            <div
              ref={containerRef}
              className={`relative w-full transition-[min-height,height] duration-300 ease-out ${frameShell}`}
            >
              {iframeReady ? (
                <iframe
                  title="10X Live brochure"
                  src={previewSrc}
                  className="absolute inset-0 h-full w-full border-0 bg-white"
                  allow="fullscreen"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white/50 text-sm text-muted"
                  aria-hidden
                >
                  Preview loads as you scroll…
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="px-4 py-8 text-sm text-muted leading-relaxed">
            To show the brochure here, upload the PDF to Google Drive, set access
            to &quot;Anyone with the link&quot; (Viewer), then add your file ID to{" "}
            <code className="rounded bg-cream px-1 font-mono text-xs text-ink">
              .env.local
            </code>
            :{" "}
            <code className="rounded bg-cream px-1 font-mono text-xs text-ink">
              NEXT_PUBLIC_10X_BROCHURE_DRIVE_FILE_ID=
            </code>
            . Use the ID from the share URL (
            <code className="rounded bg-cream px-1 font-mono text-xs text-ink">
              /file/d/
              <span className="text-accent">THIS_PART</span>
              /view
            </code>
            ). Restart the dev server after saving. Google&apos;s viewer shows the
            full file; upload a version with the last two pages removed if you
            want them hidden.
          </p>
        )}
      </div>
    </div>
  );
}
