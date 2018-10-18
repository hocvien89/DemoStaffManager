<template>
    <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h2>Task List of {{project_data.project_name}}</h2>
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
                                <router-link :to="{name:'TaskRegister', params: {project_cd: project_data.project_cd}}"><button type="button" class="btn btn-success waves-effect">Create Task</button></router-link>
                              </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th class="sorting_asc" @click="sort('task_name')">Task Name</th>
                                            <th class="sorting" @click="sort('begin_date')">Begin Date</th>
                                            <th class="sorting" @click="sort('end_date')">End Date</th>
                                            <th class="sorting" @click="sort('description')">Description</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in pagingData" :key="index">
                                            <td>{{data.task_name}}</td>
                                            <td>{{displayDateFormat(data.begin_date)}}</td>
                                            <td>{{displayDateFormat(data.end_date)}}</td>
                                            <td>{{data.description}}</td>
                                            <td>
                                                <router-link class="edit-button" :to="{name:'TaskEdit', params: {taskData: data}}"><i class="material-icons">mode_edit</i></router-link>
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
                            <div>
                              <router-link class="btn btn-primary m-t-15 waves-effect" id="btnBackToProjectList" :to="{name:'ProjectList'}">Back</router-link>
                            </div>
                        </div>
                  </div>
                <!-- #END# Task Info -->
            </div>
          </div>
          <modal v-show="isModalVisible" @accept="deleteTask" @close="closeModal">
            <div slot="body" style="margin-left: 10px;">
              Do you want to delete project "{{delTask.task_name}}"?
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
      project_data: {
        project_cd: "",
        project_name: "",
        project_type: "",
        date_start: "",
        date_end: "",
        created_by: "",
        discription: "",
        staff_name:""
      },
      id: '',
      searchQuery: '',
      myData: [],
      currentSort: 'task_name',
      currentSortDir: 'asc',
      pageSize: 10,
      pageSizeList: [5, 10, 25, 50, 100],
      currentPage: 1,
      delTask: {},
      isModalVisible: false
    }
  },
  components: {
    Paginator,
    Modal
  },
  created () {
    this.getProjectData();
    this.getTaskList();
    this.id = this.$route.params.project_cd;
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
    getProjectData: function (){
            axios.get(process.env.BASE_URL +"getProjectById", {
            params: {
            id: this.$route.params.project_cd
            }
        })
        .then(response => {
          this.project_data = response.data[0];
        })
        .catch(error => {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
    },
    getTaskList: function () {
      axios.get(process.env.BASE_URL +"getTaskList", {
            params: {
            id: this.$route.params.project_cd
            }
      }).then(
        result => {
          this.myData = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    deleteTask: function () {
      axios({
        method: 'POST',
        url: process.env.BASE_URL +"deleteTask",
        data: {'task_cd': this.delTask.task_cd}
      }).then((response) => {
        this.myData.splice(this.myData.indexOf(this.delTask), 1)
        this.closeModal()
      }).catch(e => {
        console.log(e)
      })
    },
    showModal: function (data) {
      console.log(data);
      this.delTask = data
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    },
    displayDateFormat(valueDate){
        return moment(valueDate).format('DD/MM/YYYY')
    },        
  },
  computed: {
    displayData: function () {
      var customData = this.myData.slice()
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
          if ((row.task_name && row.task_name.toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.begin_date && row.begin_date.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.end_date && row.end_date.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.description && row.description.toString().toLowerCase().indexOf(lowerSearch) > -1)){
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
