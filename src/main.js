import Vue from 'vue'
import App from './App.vue'
import Bus from './utils/bus'

Vue.config.productionTip = false
Vue.prototype.$bus = new Bus()

// 事件总线
// Vue.prototype.$bus = new Vue()
// 实践中可以用Vue代替Bus，因为它已经实现了相应功能
// 实际工作中可以用Vue()代替, 因为Vue实现了 类似的功能


new Vue({
  render: h => h(App),
}).$mount('#app')
