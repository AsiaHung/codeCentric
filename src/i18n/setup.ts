import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as de from './locales/de'

const resources = {
  de: {
    common: de.common,
    pages: de.pages,
    components: de.components,
    layout: de.layout,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    fallbackLng: 'de',
    ns: ['common', 'pages', 'components', 'layout'],
    defaultNS: 'common',
    lng: 'de', // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
