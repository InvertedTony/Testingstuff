import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

Vue.directive('click-outside', vClickOutside.directive)
Vue.use(Toast, {
  hideProgressBar: true,
  draggable: false
})

Vue.prototype.$uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}