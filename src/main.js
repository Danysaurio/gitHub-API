import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store"
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './assets/scss/main.scss'



Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
