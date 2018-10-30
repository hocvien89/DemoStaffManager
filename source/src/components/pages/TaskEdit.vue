<template>
    <div class="container-fluid">
      <div class="block-header">
        <h2>Edit Task</h2>
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
                                        <input type="text" id="taskName" v-model="dataInput.task_name" class="form-control" placeholder="Enter task name" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('task name') }" name="task name" ref="taskName">
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
                                        <input type="text" id="description" v-model="dataInput.description" class="form-control" placeholder="Enter description" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('description') }" name="description">
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
                                        <input type="text" id="beginDate" v-model="dataInput.begin_date" class="form-control datepicker" placeholder="Enter date begin of task" name="begin date" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('begin date') }">
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
                                        <input type="text" id="endDate" v-model="dataInput.end_date" class="form-control datepicker" placeholder="Enter date end of task" name="end date" v-validate="'required'" v-on:change="updateEndInput()" v-bind:class="{'form-control': true, 'error': errors.has('end date') }">
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
                                        <select class="form-control show-tick" id="employeeCode" name="Assignee" v-validate="'required'"  v-model="dataInput.employee_cd" v-bind:class="{'form-control': true, 'error': errors.has('Assignee') }">
                                            <option value="0">-- Select employee to do the task --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('Assignee')" class="text-danger">{{ errors.first('Assignee') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtLang">Status</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="status" v-validate="'required'" placeholder="Choose project type" v-model="dataInput.status_cd" name="status" :class="{'form-control': true, 'error': errors.has('status')}">
                                            <option value="0">-- Update status--</option>
                                            <option value="1">Pending</option>
                                            <option value="2">Excuting</option>
                                            <option value="3">Done</option>
                                            <option value="4">Fix bug</option>
                                        </select>
                                    </div>
                                     <span v-show="errors.has('status')" class="text-danger">{{ errors.first('status') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">save</button>
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="formatForm()">Clear</button>
                                <router-link class="btn btn-primary m-t-15 waves-effect" :to="{name:'TaskList', params: {project_cd: this.dataInput.project_cd}}">Cancel</router-link>
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
      dataToUpdate: {
        task_cd: "",
        task_name: "",
        description: "",
        begin_date: "",
        end_date: "",
        employee_cd: "",
        status_cd: ""
      },
      dataInput: {
        project_cd: "",
        task_name: "",
        description: "",
        begin_date: "",
        end_date: "",
        employee_cd: "",
        status_cd: ""
      },
      listEmployee: [],
      listTimeWorking: [],
      submitted: false
    };
  },
  created() {
    this.getEmployeeList();
    this.getTaskData();
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
    getTaskData() {
      axios
        .get(process.env.BASE_URL + "getTaskData", {
          params: {
            task_cd: this.$route.params.task_cd
          }
        })
        .then(
          result => {
            this.dataInput = result.data[0];
            this.dataInput.begin_date = moment(
              this.dataInput.begin_date
            ).format("DD/MM/YYYY");
            this.dataInput.end_date = moment(this.dataInput.end_date).format(
              "DD/MM/YYYY"
            );
            this.getTimeWorking();
          },
          error => {
            console.error(error);
          }
        );
    },
    getTimeWorking() {
      axios
        .get(process.env.BASE_URL + "getTimeWorking", {
          params: {
            task_cd: this.$route.params.task_cd,
            employee_cd: this.dataInput.employee_cd
          }
        })
        .then(
          result => {
            this.listTimeWorking = result.data;
          },
          error => {
            console.error(error);
          }
        );
    },
    checkOverlappingTime() {
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
      this.dataToUpdate.task_cd = this.dataInput.task_cd;
      this.dataToUpdate.task_name = this.dataInput.task_name;
      this.dataToUpdate.description = this.dataInput.description;
      this.dataToUpdate.begin_date = moment(
        this.dataInput.begin_date,
        "DD/MM/YYYY"
      ).format("MM/DD/YYYY");
      this.dataToUpdate.end_date = moment(
        this.dataInput.end_date,
        "DD/MM/YYYY"
      ).format("MM/DD/YYYY");
      this.dataToUpdate.employee_cd = this.dataInput.employee_cd;
      this.dataToUpdate.status_cd = this.dataInput.status_cd;
      if (this.checkOverlappingTime()) {
        this.$validator.validate().then(valid => {
          if (valid) {
            axios({
              method: "POST",
              url: process.env.BASE_URL + "updateTask",
              data: this.dataToUpdate,
              headers: { "content-type": "application/json" }
            }).then(
              result => {
                console.log(result);
                swal({
                  title: "Success!",
                  text: "The task is update successfully",
                  type: "success"
                });
                this.formatForm();
                this.$router.push({
                  name: "TaskList",
                  params: { project_cd: this.dataInput.project_cd }
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