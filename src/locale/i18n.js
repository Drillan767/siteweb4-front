import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const locale = 'fr'

const messages = {
  fr: 'fr',
  en: 'en'
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
