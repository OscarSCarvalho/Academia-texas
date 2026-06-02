import { LanguageProvider } from "./language-context"

export default function TotemLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
    </LanguageProvider>
  )
}
