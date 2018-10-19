<template>
    <div class="container-fluid">
      <div class="block-header">
        <h2>Edit Project</h2>
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
                                        <input type="text" id="projectName" class="form-control" placeholder="Enter project name" v-validate="'required'" v-model="input.project_name" v-bind:class="{'form-control': true, 'error': errors.has('project name') }" name="project name" ref="projectName">
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
                                        <select class="form-control show-tick" id="projectType" v-validate="'required'" placeholder="Choose project type" v-model="input.type" name="Project type" :class="{'form-control': true, 'error': errors.has('Project type')}">
                                            <option value="0">-- Select project type--</option>
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
                                        <input type="text" id="description" class="form-control" placeholder="Enter description" v-validate="'required'" v-model="input.discription"  v-bind:class="{'form-control': true, 'error': errors.has('description') }" name="description">
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
                                        <input type="text" id="dateStart" class="form-control datepicker" placeholder="Enter date start project" name="start date" v-validate="'required'" v-model="input.date_start" v-bind:class="{'form-control': true, 'error': errors.has('start date') }">
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
                                        <input type="text" id="dateEnd" class="form-control datepicker" placeholder="Enter date end project" name="end date" v-validate="'required'" v-model="input.date_end" v-bind:class="{'form-control': true, 'error': errors.has('end date') }">
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
                                        <select class="form-control show-tick" id="employeeCode" name="create by" v-validate="'required'"  v-model="input.ins_user" v-bind:class="{'form-control': true, 'error': errors.has('create by') }">
                                            <option value="0">-- Select employee creat project --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('create by')" class="text-danger">{{ errors.first('create by') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">Save</button>
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
import axios from "axios";
import moment from "moment";
import pic from "../../../node_modules/adminbsb-materialdesign/images/thumbs-up.png";
export default {
  data: function() {
    return {
      input: {
        project_cd: "",
        project_name: "",
        project_type: "",
        date_start: "",
        date_end: "",
        created_by: "",
        discription: "",
        staff_name:""
      },
      dataBackEnd:{
        project_cd: "",
        project_name: "",
        project_type: "",
        date_start: "",
        date_end: "",
        created_by: "",
        discription: "",
        staff_name:""
      },
      listEmployee:[],
      submitted: false
    };
  },
   mounted(){
        // $("#dateStart").bootstrapMaterialDatePicker().on(
     	// 	"changeDate", () => {this.input.date_start = $('#dateStart').val()}
        // );
        //  $("#dateEnd").bootstrapMaterialDatePicker().on(
     	// 	"changeDate", () => {this.input.date_start = $('#dateEnd').val()}
		// );

        // $('#date-start').bootstrapMaterialDatePicker({ weekStart : 0 }).on('change', function(e, date)
        // {
        // $('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
        // });


    $('#dateStart').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    }).on('change', () => {this.input.date_start = $('#dateStart').val()}
    );

    $('#dateEnd').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    }).on('change',() => {this.input.date_end = $('#dateEnd').val()}
    );
    // $('#dateEnd').bootstrapMaterialDatePicker({
    //     format: 'DD-MM-YYYY',
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false
    // }).on('change',function(){
    //     this.input.date_end = $('#dateEnd').val();
    // });
  },
  created() {
    //$('#projectName').focus();
    this.input.project_cd = this.$route.params.id;
    this.dataBackEnd.project_cd = this.$route.params.id;
    this.loadProjectInformation();
    this.getListEmployee();
  },
  methods: {
      loadProjectInformation(){
            axios.get(process.env.BASE_URL +"getProjectById", {
            params: {
            id: this.$route.params.id
            }
        })
        .then(response => {
             this.input = response.data[0];
             console.log(this.input.date_start);
        this.input.date_start = this.formatDateFrontEnd(this.input.date_start);   //moment(this.input.start_date).format("YYYY-MM-DD");
        this.input.date_end =  this.formatDateFrontEnd(this.input.date_end) //moment(this.input.end_date).format("YYYY-MM-DD");
        })
        .catch(error => {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
      },
      getListEmployee(){
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
        this.dataBackEnd.date_end = this.formatDateBackEnd(date_end);
        this.dataBackEnd.ins_user = ins_user;
        axios({
            method: "POST",
            url: process.env.BASE_URL +"editProject",
            data: this.dataBackEnd,
            headers: { "content-type": "application/json" }
        }).then(
            result => {
            swal({
                title: "Success!",
                text: "The Project is created successfully",
                type: "success"
            });
            },
            error => {
            swal("Oops!", "Error! An error occurred. Please try again later", "error");
            }
        );
      //return false;
    },
    formatForm(){
         $('input').val('');
         $('select').val('0');
         this.input = [];
         this.dataBackEnd = [];
         this.$refs.projectName.focus();
     },
     onSubmit(e){
         this.submitted = true;
         console.log(this.input);
         //console.log(this.myData);
            this.$validator.validate().then(valid => {
                if (valid) {
                    console.log('x');
                   this.RegisterProject();
                }
            });
     },
     formatDateFrontEnd(dateValue){
          return moment(dateValue).format('DD-MM-YYYY')
     },
      formatDateBackEnd(dateValue){
        return moment(dateValue,'DD/MM/YYYY').format('MM/DD/YYYY')
     }

  }
};
</script>
