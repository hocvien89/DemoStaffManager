<template>
    <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <div class="card">
                        <div class="header">
                            <h2>TASK INFOS</h2>
                            <button v-on:click="getEmploy()">Employee</button>
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
                                            <th>#</th>
                                            <th>Task</th>
                                            <th>Status</th>
                                            <th>Manager</th>
                                            <th>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Task A</td>
                                            <td><span class="label bg-green">Doing</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-green" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="width: 62%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Task B</td>
                                            <td><span class="label bg-blue">To Do</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-blue" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Task C</td>
                                            <td><span class="label bg-light-blue">On Hold</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-light-blue" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style="width: 72%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Task D</td>
                                            <td><span class="label bg-orange">Wait Approvel</span></td>
                                            <td>John Doe</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-orange" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style="width: 95%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-for="(data, index) in myData" :key="index">
                                            <td>{{index + 5}}</td>
                                            <td>{{data.task}}</td>
                                            <td>
                                                <span class="label bg-red">{{data.status}}</span>
                                            </td>
                                            <td>{{data.name}}</td>
                                            <td>
                                                <div class="progress">
                                                    <div class="progress-bar bg-red" role="progressbar" :aria-valuenow="data.progress" aria-valuemin="0" aria-valuemax="100" :style="'width:' + data.progress +'%'"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Task Info -->
            </div>
            <div class="row clearfix">
              <table>
                <thead>
                  <tr>
                    <th @click="sort('name')">Name</th>
                    <th @click="sort('age')">Age</th>
                    <th @click="sort('breed')">Breed</th>
                    <th @click="sort('gender')">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cat, index) in myData" :key="index">
                    <td>{{cat.name}}</td>
                    <td>{{cat.age}}</td>
                    <td>{{cat.breed}}</td>
                    <td>{{cat.gender}}</td>
                  </tr>
                </tbody>
            </table>
            <paginator :totalPage="totalPages" :currentPage="currentPage" :pageRange="pageSize" @btnClick="loadPage"></paginator>
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
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 5,
      currentPage: 1
    }
  },
  components: {
    Paginator
  },
  created: function () {
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
        url: 'http://localhost:8085/getDevLanguage'
      }).then(
        result => {
          console.log(result)
        },
        error => {
          console.error(error)
        }
      )
    }
  },
  computed: {
    myData: function () {
      return this.myData.slice().sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
      })
    },
    totalPages: function () {
      return Math.ceil(this.myData.length / this.pageSize)
    }
  }
}
</script>
<style scoped>
</style>
