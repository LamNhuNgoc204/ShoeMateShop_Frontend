import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../languages/en.json';
import vi from '../languages/vi.json';

export const languagesResources = {
  vi: {translation: vi},
  en: {translation: en},
};

i18next.use(initReactI18next).init({
  compatibility: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languagesResources,

  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
