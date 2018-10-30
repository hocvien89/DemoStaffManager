<template>
    <div class="container-fluid">
      <div class="block-header">
        <h2>Create new Task for {{project_data.project_name}}</h2>
      </div>
        <div class="row clearfix">
           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div class="card">
                <div class="body">
                    <form class="form-horizontal" id='form_validation'>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtProjectName">Task name</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="taskName" class="form-control" placeholder="Enter task name" v-validate="'required'" v-model="dataInput.task_name" v-bind:class="{'form-control': true, 'error': errors.has('task name') }" name="project name" ref="projectName">
                                    </div>
                                    <span v-show="errors.has('task name')" class="text-danger">{{ errors.first('task name') }}</span>
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
                                        <input type="text" id="description" class="form-control" placeholder="Enter description" v-validate="'required'" v-model="dataInput.description" v-bind:class="{'form-control': true, 'error': errors.has('description') }" name="description">
                                    </div>
                                     <span v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="beginDate">Begin Date</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="beginDate" class="form-control datepicker" placeholder="Enter date begin of task" name="begin date" v-validate="'required'" v-model="dataInput.begin_date" v-bind:class="{'form-control': true, 'error': errors.has('begin date') }">
                                    </div>
                                     <span v-show="errors.has('begin date')" class="text-danger">{{ errors.first('begin date') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="endDate">End Date</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="endDate" class="form-control datepicker" placeholder="Enter date end of task" name="end date" v-validate="'required'" v-model="dataInput.end_date" v-bind:class="{'form-control': true, 'error': errors.has('end date') }">
                                    </div>
                                    <span v-show="errors.has('end date')" class="text-danger">{{ errors.first('end date') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtCreatBy">Assignee</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="employeeCode" name="Assignee" v-validate="'required'" v-on:change="getTimeWorking()" v-model="dataInput.employee_cd" v-bind:class="{'form-control': true, 'error': errors.has('Assignee') }">
                                            <option value="">-- Select employee to do the task --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('Assignee')" class="text-danger">{{ errors.first('Assignee') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">Register</button>
                                <router-link class="btn btn-primary m-t-15 waves-effect" id="btnCancel" :to="{name:'TaskList', params: {project_cd: project_cd}}">Cancel</router-link>
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
import pic from "../../../node_modules/adminbsb-materialdesign/images/thumbs-up.png";
import moment from "moment";
export default {
  data: function() {
    return {
      dataBackEnd: {
        task_name: "",
        description: "",
        begin_date: "",
        end_date: "",
        project_cd: "",
        status: "",
        employee_cd: ""
      },
      project_data: {
        project_cd: "",
        project_name: "",
        project_type: "",
        date_start: "",
        date_end: "",
        created_by: "",
        discription: "",
        staff_name: ""
      },
      dataInput: {
        task_name: "",
        description: "",
        begin_date: "",
        end_date: "",
        employee_cd: ""
      },
      listTimeWorking: [],
      project_cd: "",
      listEmployee: [],
      listTask: [],
      submitted: false
    };
  },
  created() {
    this.getProjectData();
    this.project_cd = this.$route.params.project_cd;
    this.getEmployeeList();
  },
  mounted() {
    $("#beginDate")
      .bootstrapMaterialDatePicker({
        format: "DD/MM/YYYY",
        clearButton: true,
        weekStart: 1,
        time: false
      })
      .on("change", () => {
        this.dataInput.begin_date = $("#beginDate").val();
      });
    $("#endDate")
      .bootstrapMaterialDatePicker({
        format: "DD/MM/YYYY",
        clearButton: true,
        weekStart: 1,
        time: false
      })
      .on("change", () => {
        this.dataInput.end_date = $("#endDate").val();
      });
  },
  methods: {
    RegisterTask() {
      this.dataBackEnd.task_name = $("#taskName").val();
      this.dataBackEnd.description = $("#description").val();
      this.dataBackEnd.begin_date = this.formatDateBackEnd(
        $("#beginDate").val()
      );
      this.dataBackEnd.end_date = this.formatDateBackEnd($("#endDate").val());
      this.dataBackEnd.project_cd = this.$route.params.project_cd;
      this.dataBackEnd.status = 1;
      this.dataBackEnd.employee_cd = $("#employeeCode").val();
      axios({
        method: "POST",
        url: process.env.BASE_URL + "taskRegister",
        data: this.dataBackEnd,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          swal({
            title: "Success!",
            text: "The task is created successfully",
            type: "success"
          });
          this.formatForm();
          this.$router.push({
            name: "TaskList",
            params: { project_cd: this.project_cd }
          });
        },
        error => {
          swal(
            "Oops!",
            "Error! An error occurred. Please try again later",
            "error"
          );
        }
      );
      return false;
    },
    getTimeWorking() {
      axios
        .get(process.env.BASE_URL + "getTimeWorking", {
          params: {
            employee_cd: this.dataInput.employee_cd
          }
        })
        .then(
          result => {
            console.log("ahihi");
            this.listTimeWorking = result.data;
          },
          error => {
            console.error(error);
          }
        );
    },
    checkOverlappingTime() {
      console.log(this.listTimeWorking[0].begin_date);
      for (let i = 0; i < this.listTimeWorking.length; i++) {
        if (
          (moment(this.dataInput.begin_date).format("DD/MM/YYYY") >=
            moment(this.listTimeWorking[i].begin_date).format("DD/MM/YYYY") &&
            moment(this.dataInput.begin_date).format("DD/MM/YYYY") <=
              moment(this.listTimeWorking[i].end_date).format("DD/MM/YYYY")) ||
          (moment(this.dataInput.end_date).format("DD/MM/YYYY") >=
            moment(this.listTimeWorking[i].begin_date).format("DD/MM/YYYY") &&
            moment(this.dataInput.end_date).format("DD/MM/YYYY") <=
              moment(this.listTimeWorking[i].end_date).format("DD/MM/YYYY")) ||
          (moment(this.dataInput.begin_date).format("DD/MM/YYYY") <=
            moment(this.listTimeWorking[i].begin_date).format("DD/MM/YYYY") &&
            moment(this.dataInput.end_date).format("DD/MM/YYYY") >=
              moment(this.listTimeWorking[i].end_date).format("DD/MM/YYYY"))
        ) {
          return false;
        }
      }
      return true;
    },
    getProjectData: function() {
      axios
        .get(process.env.BASE_URL + "getProjectById", {
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
    getEmployeeList() {
      axios({
        method: "GET",
        url: process.env.BASE_URL + "getEmployeeList"
      }).then(
        result => {
          this.listEmployee = result.data;
        },
        error => {
          console.error(error);
        }
      );
    },
    formatForm() {
      $("input").val("");
      $("select").val("");
      this.input = [];
      this.dataBackEnd = [];
      $(".form-control").blur();
      $("#taskName").focus();
    },
    onSubmit(e) {
      this.submitted = true;
      if (this.checkOverlappingTime()) {
        this.$validator.validate().then(valid => {
          if (valid) {
            this.RegisterTask();
          }
        });
      } else {
        swal("Oops!", "This user had a task in this period of time", "error");
      }
    },
    formatDateBackEnd(dateValue) {
      return moment(dateValue, "DD/MM/YYYY").format("MM/DD/YYYY");
    }
  }
};
</script>
<style scoped>
.form-control:focus {
  border-color: red; /*rgba(3, 169, 244, 0.5);*/
}
.datepicker:focus {
  border-color: gray;
}
</style>