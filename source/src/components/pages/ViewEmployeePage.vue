<template>
    <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <div class="card">
                        <div class="header">
                            <h2>Staff List</h2>
                            <!-- <button v-on:click="getEmploy()">Employee</button> -->
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="javascript:void(0);">Action</a></li>
                                        <li><a href="javascript:void(0);">Another action</a></li>
                                        <li><a href="javascript:void(0);">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-hover dashboard-task-infos">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th @click="sort('staff_name')">Name</th>
                                            <th @click="sort('dev_lang_cd')">Coding Languages</th>
                                            <th @click="sort('email')">Email</th>
                                            <th @click="sort('address')">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in displayData" :key="index">
                                            <td>{{index + 1}}</td>
                                            <td>{{data.staff_name}}</td>
                                            <td>{{data.dev_lang_cd}}</td>
                                            <td>{{data.email}}</td>
                                            <td>{{data.address}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <paginator :totalPage="totalPages" :currentPage="currentPage" :pageRange="pageSize" @btnClick="loadPage"></paginator>
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
export default {
  data () {
    return {
      myData: [],
      currentSort: 'staff_name',
      currentSortDir: 'asc',
      pageSize: 3,
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
    },
    loadPage: function (selected, data) {
      this.currentPage = selected
    },
    getEmploy () {
      axios({
        method: 'GET',
        url: 'http://localhost:8085/getEmployeeList'
      }).then(
        result => {
          this.myData = result.data
          console.log(result)
        },
        error => {
          console.error(error)
        }
      )
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
.dashboard-task-infos {
  height: 100px;
}
</style>
