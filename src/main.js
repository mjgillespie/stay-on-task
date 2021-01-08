import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import router from './router'
import 'bootstrap'
import '@/scss/custom.scss'
import VueSession from 'vue-session'


Amplify.configure(aws_exports);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueSession)


