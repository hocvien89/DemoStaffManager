import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import EmployeeRegister from '@/components/pages/EmployeeRegister'
import EmployeeList from '@/components/pages/EmployeeList'
import EmployeeEdit from '@/components/pages/EmployeeEdit'
import ViewReportYear from '@/components/pages/ReportYear'
import ViewReportLanguage from '@/components/pages/ReportLanguage'
import ReportStaffByTime from '@/components/pages/ReportStaffByTime'
import ProjectRegister from '@/components/pages/ProjectRegister'
import ProjectDetail from '@/components/pages/ProjectDetail'
import ScreenDetail from '@/components/pages/ScreenDetail'
import ProjectList from '@/components/pages/ProjectList'
import ProjectEdit from '@/components/pages/ProjectEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/employee-register',
      name: 'EmployeeRegister',
      component: EmployeeRegister
    },
    {
      path: '/employee-list',
      name: 'EmployeeList',
      component: EmployeeList
    },
    {
      path: '/employee-edit/:id',
      name: 'EmployeeEdit',
      component: EmployeeEdit
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
    },
    {
      path: '/report-staff-by-time',
      name: 'ReportStaffByTime',
      component: ReportStaffByTime
    },
    {
      path: '/project-register',
      name: 'ProjectRegister',
      component: ProjectRegister
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/project-detail/:id',
      name: 'ProjectDetail',
      component: ProjectDetail
    },
    {
      path: '/screen-detail/:id',
      name: 'ScreenDetail',
      component: ScreenDetail
    },
    {
      path: '/project-edit/:id',
      name: 'ProjectEdit',
      component: ProjectEdit
    }
  ]
})
