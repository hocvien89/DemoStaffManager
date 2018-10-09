// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../node_modules/adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css'
import '../node_modules/adminbsb-materialdesign/plugins/node-waves/waves.css'
import '../node_modules/adminbsb-materialdesign/plugins/animate-css/animate.css'
import '../node_modules/adminbsb-materialdesign/plugins/morrisjs/morris.css'
import '../node_modules/adminbsb-materialdesign/css/themes/all-themes.css'
import '../node_modules/adminbsb-materialdesign/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
import '../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.css'
import '../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/css/bootstrap-select.css'
import './assets/css/style.css'

import '../node_modules/jquery/src/jquery.js'
import '../node_modules/adminbsb-materialdesign/plugins/jquery/jquery.min.js'
import '../node_modules/adminbsb-materialdesign/plugins/bootstrap/js/bootstrap.js'
import '../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/js/bootstrap-select.js'
import '../node_modules/adminbsb-materialdesign/plugins/jquery-slimscroll/jquery.slimscroll.js'
import '../node_modules/adminbsb-materialdesign/plugins/node-waves/waves.js'
import '../node_modules/adminbsb-materialdesign/plugins/autosize/autosize.js'
import '../node_modules/adminbsb-materialdesign/js/admin.js'
import '../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.min.js'
import '../node_modules/moment/moment.js'
import '../node_modules/adminbsb-materialdesign/js/pages/forms/basic-form-elements.js'
import '../node_modules/adminbsb-materialdesign/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
