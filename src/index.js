import a from '../packages/a.vue';
import b from '../packages/b.vue';

const install = function(Vue, config = {}) {
  if (install.installed) return;
  Vue.component('a', a);
  Vue.component('b',b)
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export{
  a,
  b
}
