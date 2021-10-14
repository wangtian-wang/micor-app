import Vue from 'vue';
import VueStore from 'vue-store';
Vue.use(VueStore);
const store = new VueStore({
  state: {
    loading: false
  },
  mutation: {
    changeLoading(state, loading) {
      state.loading = loading;
    }
  }
});
export default store;
