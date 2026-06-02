"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Lang, translations } from "./translations"

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (typeof translations)[Lang]
}

const LangContext = createContext<LangContextType>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("totem-lang") as Lang | null
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLangState(saved)
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("totem-lang", l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
