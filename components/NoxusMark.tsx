"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type NoxusMarkProps = {
  /** "light" for paper backgrounds, "dark" for the navy band. */
  tone?: "light" | "dark";
  className?: string;
};

const WORDMARK_SRC = "/logos/noxus-wordmark.svg";

/**
 * Noxus wordmark. Tries the SVG first; until it loads (or if it 404s) the
 * styled text wordmark is shown, so there is never a broken image or a flash.
 */
export function NoxusMark({ tone = "light", className = "" }: NoxusMarkProps) {
  const [state, setState] = useState<"pending" | "loaded" | "failed">("pending");
  const imgRef = useRef<HTMLImageElement>(null);

  // The image may settle before hydration attaches onLoad/onError; check once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.complete) return;
    setState(img.naturalWidth > 0 ? "loaded" : "failed");
  }, []);

  const text = tone === "dark" ? "text-band-ink" : "text-ink";

  return (
    <span className={`relative inline-flex h-8 items-center ${className}`}>
      {state !== "loaded" ? (
        <span
          role="img"
          aria-label="Noxus"
          className={`select-none font-sans text-[1.375rem] font-bold leading-none tracking-[0.22em] ${text}`}
        >
          <span aria-hidden>NOXUS</span>
        </span>
      ) : null}
      {state !== "failed" ? (
        <Image
          ref={imgRef}
          src={WORDMARK_SRC}
          alt={state === "loaded" ? "Noxus" : ""}
          width={120}
          height={28}
          unoptimized
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={
            state === "loaded"
              ? "h-7 w-auto"
              : "pointer-events-none absolute left-0 top-0 h-7 w-auto opacity-0"
          }
        />
      ) : null}
    </span>
  );
}
