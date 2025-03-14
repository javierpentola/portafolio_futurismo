import { LanguageProvider } from "./contexts/LanguageContext"
import Home from "./components/Home"

export default function Page() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  )
}

