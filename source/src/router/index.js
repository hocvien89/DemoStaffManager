import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import AddEmployeePage from '@/components/pages/AddEmployeePage'
import ViewEmployeePage from '@/components/pages/ViewEmployeePage'
import EditStaff from '@/components/pages/EditStaff'
import ViewReportYear from '@/components/pages/ReportYear'
import ViewReportLanguage from '@/components/pages/ReportLanguage'
import ReportStaffByTime from '@/components/pages/ReportStaffByTime'
import ProjectRegister from '@/components/pages/ProjectRegister'
import ViewProjectList from '@/components/pages/ViewProjectList'
import EditProject from '@/components/pages/EditProject'
import ProjectDetail from '@/components/pages/ProjectDetail'
import ScreenDetail from '@/components/pages/ScreenDetail'

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
      path: '/view-project-list',
      name: 'ViewProjectList',
      component: ViewProjectList
    },
    {
      path: '/edit-project/:id',
      name: 'EditProject',
      component: EditProject
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
    }
  ]
})
