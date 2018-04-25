// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './src/App'
// import athena from './apps/common/athena'

Vue.config.productionTip = false
// Vue.prototype.athena = athena

/* eslint-disable no-new */
new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App),
});
