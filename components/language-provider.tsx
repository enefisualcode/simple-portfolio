"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("portfolio-language", next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "id" || saved === "en") {
      // The browser preference is intentionally read after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
