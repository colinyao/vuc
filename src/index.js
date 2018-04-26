import testA from '../packages/test-a.vue';
import testB from '../packages/test-b.vue';
import submenu from '../packages/submenu.vue'
import Supermenu from '../packages/Supermenu.vue'
const components=[
  testA,
  testB,
  submenu,
  Supermenu
]
const install = function(Vue, config = {}) {
  if (install.installed) return;
  components.forEach(component=>{
      Vue.component(component.name,component)
  })
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports={
  install,
  testA,
  testB,
  submenu,
  Supermenu
}
module.exports.default = module.exports;
