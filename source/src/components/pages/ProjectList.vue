<template>
    <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h2>Project List</h2>
                        </div>
                        <div class="body">
                            <div class="row">
                              <div class="col-sm-10">
                                <div class="form-group">
                                  <div class="form-line">
                                    <input type="text" v-model="searchQuery" class="form-control" placeholder="Type to search..." />
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-2" style="float: right;">
                                <router-link to="/project-register"><button type="button" class="btn btn-success waves-effect">Create Project</button></router-link>
                              </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th class="sorting_asc" @click="sort('project_name')">Project Name</th>
                                            <th class="sorting" @click="sort('type')">Project Type</th>
                                            <th class="sorting" @click="sort('date_start')">Date Start</th>
                                            <th class="sorting" @click="sort('date_end')">Date End</th>
                                            <th class="sorting" @click="sort('staff_name')">Create By</th>
                                            <th class="sorting" @click="sort('discription')">Description</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in pagingData" :key="index">
                                            <td>{{data.project_name}}</td>
                                            <td>{{formatProjectType(data.type)}}</td>
                                            <td>{{displayDateFormat(data.date_start)}}</td>
                                            <td>{{displayDateFormat(data.date_end)}}</td>
                                            <td>{{data.staff_name}}</td>
                                            <td>{{data.discription}}</td>
                                            <td>
                                                <router-link class="edit-button" :to="{name:'ProjectEdit', params: {id: data.project_cd}}"><i class="material-icons">mode_edit</i></router-link>
                                                <i data-type="confirm" class="waves-effect material-icons detele" @click="showModal(data)">delete</i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                              <div class="col-sm-3" style="margin-top: 25px;">
                                Showing page {{currentPage}} of {{totalPages}}
                              </div>
                              <div class="col-sm-9 row">
                                <div class="col-sm-9" style="text-align: right;">
                                  <paginator :totalPage="totalPages" :activeBGColor="'danger'" :currentPage="currentPage" :pageRange="pageSize" @btnClick="loadPage"></paginator>
                                </div>
                                <div class="col-sm-3 form-inline" style="margin-top: 20px;">
                                  <div class="form-group">
                                    <span for="page-size">Page size:</span>
                                    <select id="page-size" class="bootstrap-select form-control show-tick" v-model="pageSize">
                                      <option v-for="(val, index) in pageSizeList" :key="index" :value="val">{{val}}<span class="bs-caret"><span class="caret"></span></span></option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                  </div>
                <!-- #END# Task Info -->
            </div>
          </div>
          <modal v-show="isModalVisible" @accept="deleteProject" @close="closeModal">
            <div slot="body" style="margin-left: 10px;">
              Do you want to delete project "{{delProject.project_name}}"?
            </div>
          </modal>
    </div>
</template>

<script>
/* eslint-disable */
import Paginator from './table/Paginator'
import Modal from '../common/Modal.vue'
import axios from 'axios'
import '../../../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/js/bootstrap-select.js'
import '../../../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.min.js'
import moment from 'moment'
export default {
  data () {
    return {
      searchQuery: '',
      myData: [],
      currentSort: 'project_name',
      currentSortDir: 'asc',
      pageSize: 10,
      pageSizeList: [5, 10, 25, 50, 100],
      currentPage: 1,
      delProject: {},
      isModalVisible: false
    }
  },
  components: {
    Paginator,
    Modal
  },
  created: function () {
    this.getProjectList()
  },
  methods: {
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
      var children = [].slice.call(event.target.closest('tr').children)
      children.forEach(element => {
        element.className = 'sorting'
      })
      event.target.className = 'sorting_' + this.currentSortDir
    },
    loadPage: function (selected, data) {
      this.currentPage = selected
    },
    getProjectList: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:8085/getProjectList'
      }).then(
        result => {
          this.myData = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    deleteProject: function () {
      axios({
        method: 'POST',
        url: 'http://localhost:8085/deleteProject',
        data: {'project_cd': this.delProject.project_cd}
      }).then((response) => {
        this.myData.splice(this.myData.indexOf(this.delProject), 1)
        this.closeModal()
      }).catch(e => {
        console.log(e)
      })
    },
    showModal: function (data) {
      console.log(data);
      this.delProject = data
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    },
    displayDateFormat(valueDate){
        return moment(valueDate).format('DD/MM/YYYY')
    },
    formatProjectType(typeValue){
      var result = "";
        switch(typeValue){
          case 1:
            return result = "WinForm"
            break;
          case 2:
            return result = "WebForm"
            break;
          case 3:
            return result = "Web Application"
            break;
          case 4:
            return result = "Mobile Application"
            break;
        }
    }
  },
  computed: {
    displayData: function () {
      var customData = this.myData.slice()
      // customData.forEach(data => {
      //   switch (data.type) {
      //     case 1:
      //       data.dev_lang_cd_display = 'WinForm'
      //       break;
      //     case 2:
      //       data.dev_lang_cd_display = 'WebForm'
      //       break;
      //     case 3:
      //       data.dev_lang_cd_display = 'Web Application'
      //       break;
      //     case 4:
      //       data.dev_lang_cd_display = 'Mobile Application'
      //       break;
      //     default:
      //       break;
      //   }
      // })
      return customData.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') {
          modifier = -1
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * modifier
        }
        return 0
      }).filter((row, index) => {
        if (!this.searchQuery) {
          return true
        }
        if (this.searchQuery) {
          var lowerSearch = this.searchQuery.toLowerCase()
          if ((row.project_name && row.project_name.toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.project_cd && row.project_cd.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.date_start && row.date_start.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.date_end && row.date_end.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.staff_name && row.staff_name.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.discription && row.discription.toString().toLowerCase().indexOf(lowerSearch) > -1)){
            return true
          }
        }
      })
    },
    pagingData: function () {
      return this.displayData.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.currentPage * this.pageSize
        if (index >= start && index < end) {
          return true
        }
      })
    },
    totalPages: function () {
      return Math.ceil(this.displayData.length / this.pageSize)
    }
  }
}
</script>
<style scoped>
@import "../../../node_modules/adminbsb-materialdesign/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css";
@import "../../../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/css/bootstrap-select.css";
@import "../../../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.css";

.material-icons.detele {
  cursor: pointer;
}
.edit-button {
  color: #555;
  margin-right: 10px;
}
.btn-success {
  background-color: #f44336 !important;
}
.bootstrap-select.form-control.show-tick {
  width: auto !important;
}
</style>
