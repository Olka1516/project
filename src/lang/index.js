import { createI18n } from 'vue-i18n'
const messages = {
    en: {
        message: {
            hello: 'Hello ',
            question: ' Have you trained and want to reduce the number of workouts',
            advice: 'If you want to increase the number of workouts click on the button.',
            topUp: 'Top up on',
            decrease: 'Reduce the number of workouts',
            totalNumber: 'Your number of workouts is equal ',
            howMuch: 'I have ',
            language: {
                eng: 'English',
                ukr: 'Ukraine'
            }
        }
    },
    ua: {
        message: {
            hello: 'Привіт ',
            question: ' Ти потренувалась і хочеш зменшити кількість тренувань',
            advice: 'Якщо хочеш збільшити кількість тренувань натисни на кнопку.',
            topUp: 'Поповнити на',
            decrease: 'Зменшити кількість тренувань',
            totalNumber: 'Твоя кількість тренувань дорівнює ',
            howMuch: 'У мене залишилося ',
            language: {
                eng: 'Англіська',
                ukr: 'Українська'
            },
        }
    }
};

// 2. Create i18n instance with options
export const i18n = createI18n({
    locale: 'ua', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

