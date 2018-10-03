import Vue from 'vue'
import Router from 'vue-router'
import ReportPage from '@/components/pages/ReportPage'
import AddEmployeePage from '@/components/pages/AddEmployeePage'
import ViewEmployeePage from '@/components/pages/ViewEmployeePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReportPage',
      component: ReportPage
    },
    {
      path: '/add-employee',
      name: 'AddEmployeePage',
      component: AddEmployeePage
    },
    {
      path: '/view-employee',
      name: 'ViewEmployeePage',
      component: ViewEmployeePage
    }
  ]
})
