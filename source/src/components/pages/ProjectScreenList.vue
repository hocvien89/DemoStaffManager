<template>
     <div class="container-fluid">
        <div class="row clearfix">
                <!-- Task Info -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h2>Screen List</h2>
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
                                <button type="button" class="btn btn-success waves-effect" data-toggle="modal" data-target="#myModalu">Create Screen</button>
                              </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th class="sorting_asc" @click="sort('screen_code')">Screen Code</th>
                                            <th class="sorting" @click="sort('screen_name')">Screen Name</th>
                                            <th class="sorting" @click="sort('description')">Description</th>
                                            <th class="sorting" @click="sort('ins_date')">Created Date</th>
                                            <th class="sorting" @click="sort('staff_name')">Create By</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in pagingData" :key="index">
                                            <td>{{data.screen_code}}</td>
                                            <td>{{data.screen_name}}</td>
                                            <td>{{data.description}}</td>
                                            <td>{{displayDateFormat(data.ins_date)}}</td>
                                            <td>{{data.staff_name}}</td>
                                            <td>
                                                <i class="material-icons" data-toggle="modal" data-target="#editScreen" style="cursor:pointer" @click="getScreenById(data.screen_cd)">mode_edit</i>
                                                <i data-type="confirm" class="waves-effect material-icons detele" @click="showModalDelete(data.screen_cd)">delete</i>
                                                <router-link :to="{name:'ScreenDetail', params:{id:data.screen_cd}}"><i class="material-icons" style="cursor:pointer; color:black">details</i></router-link>
                                                <!-- <router-link class="edit-button" :to="{name:'EditProject', params: {id: data.project_cd}}"><i class="material-icons">mode_edit</i></router-link>
                                                <i data-type="confirm" class="waves-effect material-icons detele" @click="showModal(data)">delete</i>
                                                <router-link :to="{name:'ProjectDetail', params:{id: data.project_cd}}" style="color:black"><i class="material-icons">details</i></router-link> -->
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
          <!-- <modal v-show="isModalVisible" @accept="deleteScreen" @close="closeModal">
            <div slot="body" style="margin-left: 10px;">
              Do you want to delete screen "{{delScreen.screen_name}}"?
            </div>
        </modal> -->
        <modal-add-screen>
        </modal-add-screen>
        <modal-edit-screen :inputDisplay="dataScreen[0]" :myDataEdit="myData" v-on:updateMydata="updateData($event)"></modal-edit-screen>

    </div>
</template>
<script>
import Paginator from './table/Paginator'
import axios from 'axios'
import ModalAddScreen from '../common/ModalAddScreen.vue'
import ModalEditScreen from '../common/ModalEditScreen.vue'
import '../../../node_modules/adminbsb-materialdesign/plugins/bootstrap-select/js/bootstrap-select.js'
import '../../../node_modules/adminbsb-materialdesign/plugins/sweetalert/sweetalert.min.js'

/* eslint-disable */
export default{
    name: 'ProjectScreenList',
    data(){
        return{
            searchQuery: '',
            myData: [],
            currentSort: 'screen_name',
            currentSortDir: 'asc',
            pageSize: 10,
            pageSizeList: [5, 10, 25, 50, 100],
            currentPage: 1,
            delScreen: {},
            isModalVisible: false,
            dataScreen:''
        }
    },
    components: {
            Paginator,
            ModalEditScreen,
            ModalAddScreen
    },
    created: function () {
        var id = this.$route.params.id;
        this.getProjectScreenList(id);
    },
    methods:{
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
        getProjectScreenList: function (id) {
            axios({
                method: 'GET',
                url: 'http://localhost:8085/getListScreenByProjectId?id=' + id
            }).then(
                result => {
                this.myData = result.data
                console.log(this.myData)
                },
                error => {
                console.error(error)
                }
            )
        },
         getScreenById: function (id) {
            axios({
                method: 'GET',
                url: 'http://localhost:8085/getScreenById?id=' + id
            }).then(
                result => {
                this.dataScreen = result.data;
                //this.$refs.editScreen.inputDisplay = this.dataScreen[0];
                //this.$children[1].inputDisplay = this.dataScreen[0];
                 console.log(this.dataScreen[0].description)
                },
                error => {
                console.error(error)
                }
            )

        },
        deleteScreen: function (id) {
            console.log(id)
            axios({
                method: 'POST',
                url: 'http://localhost:8085/deleteScreen',
                data: {'screen_cd': id}
            }).then((response) => {
                //console.log(index)
                console.log(this.myData.findIndex(i => i.screen_cd === id))
                this.myData.splice(this.myData.findIndex(i => i.screen_cd === id),1)
                //console.log(this.myData.splice(this.myData.indexOf(id),1))
                //this.myData.splice(index, 1)
                //this.closeModal()
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
         showModalDelete(id){
            swal({
                title: "Do you want delete this screen?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            isConfirm => {
                if(isConfirm){
                    this.deleteScreen(id);
                    //swal("Deleted!", "Your imaginary file has been deleted.", "success");
                }
                else{

                }
            }
            );
        },
        // getValueScreenCd(id){
        //     this.editScreen = id;
        // }
        updateData: function (newData) {
            console.log('newData:')
            console.log(newData)
            var indexUpdate = this.myData.findIndex(i => i.screen_cd === newData.screen_cd)
            var data = this.myData[indexUpdate]
            data.screen_name = newData.screen_name;
            data.screen_code = newData.screen_code;
            data.description = newData.description;
            data.ins_date = newData.ins_date;
            data.screen_cd = newData.screen_cd;
            data.staff_name = newData.staff_name;
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
      //console.log('aaaaaaaaaaaaaaaaaaaa')
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
          if ((row.screen_code && row.screen_code.toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.screen_name && row.screen_name.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.description && row.description.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.ins_date && row.ins_date.toString().toLowerCase().indexOf(lowerSearch) > -1) ||
              (row.staff_name && row.staff_name.toString().toLowerCase().indexOf(lowerSearch) > -1)){
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
  },
  watch:{
        myData: {
            handler: function(newValue) {
                console.log('mydata change')
            },
            deep: true
        }
    },
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