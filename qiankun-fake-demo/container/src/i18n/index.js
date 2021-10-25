import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';

const i18n = new VueI18n({
  message,
  locale
});

locale.i18n((key, value) => i18n.t(key, value));
export default i18n;
