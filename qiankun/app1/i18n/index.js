import VueI18n from 'vue-i18n';

const i18n = new VueI18n({
  message,
  locale
});

window.locale.i18n((key, value) => i18n.t(key, value)); // 执行window上面的locale方法；
export default i18n;
