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
                              <div class="col-sm-4 col-md-2 col-xs-12">
                                <div class="form-group">
                                  <label>Page size:</label>
                                  <select class="bootstrap-select form-control show-tick" v-model="pageSize">
                                    <option v-for="(val, index) in pageSizeList" :key="index" :value="val">{{val}}<span class="bs-caret"><span class="caret"></span></span></option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-sm-8 col-md-6 col-xs-12" style="float: right;">
                                <div class="form-group">
                                  <label>Search:</label>
                                  <div class="form-line">
                                      <input type="text" v-model="searchQuery" class="form-control" placeholder="Type to search..." />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th class="sorting_asc" @click="sort('staff_name')">Name</th>
                                            <th class="sorting" @click="sort('dev_lang_cd')">Coding Languages</th>
                                            <th class="sorting" @click="sort('email')">Email</th>
                                            <th class="sorting" @click="sort('address')">Address</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in displayData" :key="index">
                                            <td>{{index + 1}}</td>
                                            <td>{{data.staff_name}}</td>
                                            <td>{{data.dev_lang_cd}}</td>
                                            <td>{{data.email}}</td>
                                            <td>{{data.address}}</td>
                                            <td><i data-type="confirm" class="waves-effect material-icons detele" @click="deleteStaff(data)">delete</i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <paginator :totalPage="totalPages" :activeBGColor="'danger'" :currentPage="currentPage" :pageRange="pageSize" @btnClick="loadPage"></paginator>
                        </div>
                  </div>
                <!-- #END# Task Info -->
            </div>
          </div>
    </div>
</template>
<script>
import Paginator from './table/Paginator'
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
      currentPage: 1
    }
  },
  components: {
    Paginator
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
    deleteStaff: function (data) {
    }
  },
  computed: {
    displayData: function () {
      return this.myData.slice().sort((a, b) => {
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
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.currentPage * this.pageSize
        if (index >= start && index < end) {
          return true
        }
      })
    },
    totalPages: function () {
      return Math.ceil(this.myData.length / this.pageSize)
    }
  }
}
</script>
<style scoped>
@import '../../../node_modules/adminbsb-materialdesign/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css';
@import '../../../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/css/bootstrap-select.css';
@import '../../../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.css';

.material-icons.detele {
  cursor: pointer;
}
</style>
