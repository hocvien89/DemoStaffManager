import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import AddEmployeePage from '@/components/pages/AddEmployeePage'
import ViewEmployeePage from '@/components/pages/ViewEmployeePage'
import EditStaff from '@/components/pages/EditStaff'
import ViewReportYear from '@/components/pages/ReportYear'
import ViewReportLanguage from '@/components/pages/ReportLanguage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
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
    },
    {
      path: '/edit-staff/:id',
      name: 'EditStaff',
      component: EditStaff
    },
    {
      path: '/view-report-year',
      name: 'ViewReportYear',
      component: ViewReportYear
    },
    {
      path: '/view-report-language',
      name: 'ViewReportLanguage',
      component: ViewReportLanguage
    }
  ]
})
