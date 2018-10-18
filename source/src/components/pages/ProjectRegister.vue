<template>
    <div class="container-fluid">
      <div class="block-header">
        <h2>Create new project</h2>
      </div>
        <div class="row clearfix">
           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div class="card">
                <div class="body">
                    <form class="form-horizontal" id='form_validation'>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtProjectName">Project name</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="projectName" class="form-control" placeholder="Enter project name" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('project name') }" name="project name" ref="projectName">
                                    </div>
                                    <span v-show="errors.has('project name')" class="text-danger">{{ errors.first('project name') }}</span>
                                </div>
                            </div>
                        </div>

                         <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtLang">Project type</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="projectType" v-validate="'required'" name="Project type" :class="{'form-control': true, 'error': errors.has('Project type')}">
                                            <option value="">-- Select project type--</option>
                                            <option value="1">WinForm</option>
                                            <option value="2">WebForm</option>
                                            <option value="3">Web Application</option>
                                            <option value="4">Mobile Application</option>
                                        </select>
                                    </div>
                                     <span v-show="errors.has('Project type')" class="text-danger">{{ errors.first('Project type') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtDescription">Description</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="description" class="form-control" placeholder="Enter description" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('description') }" name="description">
                                    </div>
                                     <span v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="dateStart">Date Start</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="dateStart" class="form-control datepicker" placeholder="Enter date start project" name="start date" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('start date') }">
                                    </div>
                                     <span v-show="errors.has('start date')" class="text-danger">{{ errors.first('start date') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="dateEnd">Date End</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="dateEnd" class="form-control datepicker" placeholder="Enter date end project" name="end date" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('end date') }">
                                    </div>
                                    <span v-show="errors.has('end date')" class="text-danger">{{ errors.first('end date') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtCreatBy">Creat By</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="employeeCode" name="create by" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('create by') }">
                                            <option value="">-- Select employee creat project --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('create by')" class="text-danger">{{ errors.first('create by') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">Register</button>
                                <router-link class="btn btn-primary m-t-15 waves-effect" to="/view-project-list">Cancel</router-link>
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="formatForm()">Clear</button>
                           </div>
                        </div>
                    </form>
                </div>
             </div>
           </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import axios from "axios"
import pic from "../../../node_modules/adminbsb-materialdesign/images/thumbs-up.png"
import moment from 'moment'
export default {
  data: function() {
    return {
      input: {
          project_name:"",
          type:"",
          discription:"",
          date_start:"",
          date_end:"",
          ins_user:""
      },
        dataBackEnd:{
            project_name:"",
          type:"",
          discription:"",
          date_start:"",
          date_end:"",
          ins_user:""
        },
      listEmployee:[],
      submitted: false
    }
  },
   mounted(){
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
  },
  created: function () {
    this.getEmployeeList();
  },
  methods: {
    RegisterProject() {
        var project_name = $('#projectName').val();
        var type = $('#projectType').val();
        var discription = $('#description').val();
        var date_start = $('#dateStart').val();
        var date_end = $('#dateEnd').val();
        var ins_user = $('#employeeCode').val();

        this.dataBackEnd.project_name = project_name;
        this.dataBackEnd.type = type;
        this.dataBackEnd.discription = discription;
        this.dataBackEnd.date_start = this.formatDateBackEnd(date_start);
        this.dataBackEnd.date_end =  this.formatDateBackEnd(date_end);
        this.dataBackEnd.ins_user = ins_user;
      axios({
        method: "POST",
        url: process.env.BASE_URL +"projectRegister",
        data: this.dataBackEnd,
        headers: { "content-type": "application/json" }
      }).then(
         result => {
          swal({
            title: "Success!",
            text: "The project is created successfully",
            type: "success"
          });
          this.formatForm();
        },
        error => {
          swal("Oops!", "Error! An error occurred. Please try again later", "error");
        }
      );
      //return false;
    },
     getEmployeeList() {
         axios({
        method: 'GET',
        url: 'http://localhost:8085/getEmployeeList'
      }).then(
        result => {
          this.listEmployee = result.data
        },
        error => {
          console.error(error)
        }
      )
     },
     formatForm(){
         $('input').val('');
         $('select').val('');
         this.input = [];
          this.dataBackEnd = [];
        $('.form-control').blur();
        //this.$refs.projectName.focus();
        $('#projectName').focus();
         // console.log('a');
     },
     onSubmit(e){
         this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                   this.RegisterProject();
                   //console.log("a");
                }
            });
     },
     formatDateBackEnd(dateValue){
        return moment(dateValue,'DD/MM/YYYY').format('MM/DD/YYYY')
     }
  }
};
</script>
<style scoped>
    .form-control:focus{
        border-color: red;/*rgba(3, 169, 244, 0.5);*/
    }
    .datepicker:focus{
        border-color: gray;
    }
</style>