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
      <h2 className="running-head">Brochure</h2>
      <div className="mt-6 overflow-hidden border border-rule">
        {previewSrc ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-3">
              <p className="text-[1rem]">10X Live brochure</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLargePreview((v) => !v)}
                  className="border border-rule px-3 py-1 text-[0.9375rem] transition-colors hover:border-ink"
                >
                  {largePreview ? "Smaller preview" : "Larger preview"}
                </button>
                {viewHref ? (
                  <a
                    href={viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-rule px-3 py-1 text-[0.9375rem] transition-colors hover:border-ink"
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
                  className="absolute inset-0 flex items-center justify-center text-[0.9375rem] text-muted"
                  aria-hidden
                >
                  Preview loads as you scroll…
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="px-4 py-8 text-[0.9375rem] text-muted">
            To show the brochure here, upload the PDF to Google Drive, set access
            to &quot;Anyone with the link&quot; (Viewer), then add your file ID to{" "}
            <code className="font-mono text-[0.8125rem]">
              .env.local
            </code>
            :{" "}
            <code className="font-mono text-[0.8125rem]">
              NEXT_PUBLIC_10X_BROCHURE_DRIVE_FILE_ID=
            </code>
            . Use the ID from the share URL (
            <code className="font-mono text-[0.8125rem]">
              /file/d/
              <span className="text-ink">THIS_PART</span>
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
