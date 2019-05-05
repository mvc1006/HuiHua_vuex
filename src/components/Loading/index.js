import Loading from './Loading';
import Vue from 'vue';
let LoadingConstructor = Vue.extend(Loading);

let seed = 1;
let index = 900;
const install = () => {
  Object.defineProperty(Vue.prototype, '$myLoading', {
    get() {
      let id = 'Loading' + seed++;
      const loadingmMsg = options => {
        if (options === undefined || options === null) {
          options = {
            content: ''
          };
        }
        let instance = new LoadingConstructor({
          propsData: options
        });
        index++;
        instance.id = id;
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.$el.style.zIndex = index;
        window.Loading = instance.vm;
        return instance.vm;
      };
      return loadingmMsg;
    }
  });
};
export default install;
