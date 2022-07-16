import { createI18n } from "vue-i18n"
import en from './en';
import ua from './ua';
import { datetimeFormats } from "./dateTimeFormats";

const messages = {
    ua,
    en,
}

export const i18n = createI18n({
    locale: 'ua',
    fallbackLocale: 'en',
    messages,
    datetimeFormats
});