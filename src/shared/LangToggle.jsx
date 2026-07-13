import { useTranslation } from "react-i18next";

export function LangToggle() {
  const { i18n } = useTranslation()

  const toggle = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  return (
    <button onClick={toggle}>
      {i18n.language === 'fr' ? 'FR' : 'EN'}
    </button>
  )
}