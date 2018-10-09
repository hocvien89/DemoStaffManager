<template>
    <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h2>Staff List</h2>
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
                                <router-link to="/add-employee"><button type="button" class="btn btn-success waves-effect">Add new</button></router-link>
                              </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th class="sorting_asc" @click="sort('staff_name')">Name</th>
                                            <th class="sorting" @click="sort('dev_lang_cd_display')">Coding Languages</th>
                                            <th class="sorting" @click="sort('email')">Email</th>
                                            <th class="sorting" @click="sort('address')">Address</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in pagingData" :key="index">
                                            <td>{{data.staff_name}}</td>
                                            <td>{{data.dev_lang_cd_display}}</td>
                                            <td>{{data.email}}</td>
                                            <td>{{data.address}}</td>
                                            <td><router-link class="edit-button" :to="{name:'EditStaff', params: {id: data.staff_cd}}"><i class="material-icons">mode_edit</i></router-link>
                                            <i data-type="confirm" class="waves-effect material-icons detele" @click="showModal(data)">delete</i></td>
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
          <modal v-show="isModalVisible" @accept="deleteStaff" @close="closeModal">
            <div slot="body" style="margin-left: 10px;">
              Do you want to delete staff "{{delStaff.staff_name}}"?
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
export default {
  data () {
    return {
      searchQuery: '',
      myData: [],
      currentSort: 'staff_name',
      currentSortDir: 'asc',
      pageSize: 10,
      pageSizeList: [5, 10, 25, 50, 100],
      currentPage: 1,
      delStaff: {},
      isModalVisible: false
    }
  },
  components: {
    Paginator,
    Modal
  },
  created: function () {
    this.getEmploy()
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
    getEmploy: function () {
      axios({
        method: 'GET',
        url: 'http://localhost:8085/getEmployeeList'
      }).then(
        result => {
          this.myData = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    deleteStaff: function () {
      axios({
        method: 'POST',
        url: 'http://localhost:8085/deleteEmployee',
        data: {'staff_cd': this.delStaff.staff_cd}
      }).then((response) => {
        this.myData.splice(this.myData.indexOf(this.delStaff), 1)
        this.closeModal()
      }).catch(e => {
        console.log(e)
      })
    },
    showModal: function (data) {
      console.log(data);
      this.delStaff = data
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    }
  },
  computed: {
    displayData: function () {
      var customData = this.myData.slice()
      // customData.forEach(data => {
      //   switch (data.dev_lang_cd) {
      //     case 1:
      //       data.dev_lang_cd_display = 'C#'
      //       break;
      //     case 2:
      //       data.dev_lang_cd_display = 'Java'
      //       break;
      //     case 3:
      //       data.dev_lang_cd_display = 'PHP'
      //       break;
      //     case 4:
      //       data.dev_lang_cd_display = 'NodeJS'
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
          if ((row.staff_name && row.staff_name.toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.dev_lang_cd && row.dev_lang_cd.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.email && row.email.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.address && row.address.toString().toLowerCase().indexOf(lowerSearch) > -1)) {
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
