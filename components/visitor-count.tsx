"use client";

import { useEffect, useState } from "react";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" })
      .then((response) => response.ok ? response.json() as Promise<{ count: number }> : Promise.reject())
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;
  return <span className="visitor-count" title="Pengunjung unik per browser">👁 {new Intl.NumberFormat("id-ID").format(count)} pengunjung</span>;
}
