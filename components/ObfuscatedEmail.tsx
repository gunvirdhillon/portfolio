"use client";

import { useEffect, useState } from "react";

export function ObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const u = "gunvirdhillon";
    const d = "gmail.com";
    setEmail(`${u}@${d}`);
  }, []);

  if (!email) {
    return <span className="text-subtle">Loading…</span>;
  }

  return (
    <a href={`mailto:${email}`} className="text-ink underline underline-offset-2">
      {email}
    </a>
  );
}
