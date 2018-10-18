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
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">save</button>
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="formatForm()">Clear</button>
                                <router-link class="btn btn-primary m-t-15 waves-effect" to="/task-list">Cancel</router-link>
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
        dataToUpdate:{
            task_cd:'',
            task_name:'',
            description:'',
            begin_date:'',
            end_date:'',
        },
        dataInput:{
            task_name:'',
            description:'',
            begin_date:'',
            end_date:'',
        },
        listTask:[],
        submitted: false
    }
  },
  created() {
      this.dataInput.task_name = this.$route.params.taskData.task_name;
      this.dataInput.description = this.$route.params.taskData.description;
      this.dataInput.begin_date = moment(this.$route.params.taskData.begin_date).format('DD/MM/YYYY');
      this.dataInput.end_date = moment(this.$route.params.taskData.end_date).format('DD/MM/YYYY');
  },
   mounted(){
        $('#beginDate').bootstrapMaterialDatePicker({
            format: 'DD-MM-YYYY',
            clearButton: true,
            weekStart: 1,
            time: false
            }).on('change', () => {this.dataInput.begin_date = $('#beginDate').val()}
        );
        $('#endDate').bootstrapMaterialDatePicker({
            format: 'DD-MM-YYYY',
            clearButton: true,
            weekStart: 1,
            time: false
            }).on('change', () => {this.dataInput.end_date = $('#endDate').val()}
        );
  },
  methods: {
     formatForm(){
        $('input').val('');
        $('select').val('');
        this.input = [];
        this.dataBackEnd = [];
        $('.form-control').blur();
        $('#taskName').focus();
     },
     updateEndInput(){
        this.dataInput.end_date = $("#beginDate").val();
        console.log(this.dataInput.end_date);
     },
     onSubmit(e){
        this.submitted = true;
        this.dataToUpdate.task_cd = this.$route.params.taskData.task_cd;
        this.dataToUpdate.task_name = $('#taskName').val();
        this.dataToUpdate.description = $('#description').val();
        this.dataToUpdate.begin_date = this.formatDateBackEnd($("#beginDate").val());
        this.dataToUpdate.end_date =  this.formatDateBackEnd($("#endDate").val());

        this.$validator.validate().then(valid => {
            if (valid) {
                axios({
                    method: "POST",
                    url: process.env.BASE_URL +"updateTask",
                    data: this.dataToUpdate,
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        swal({
                            title: "Success!",
                            text: "The task is update successfully",
                            type: "success"
                        });
                        this.formatForm();
                        this.$router.push({name: 'TaskList', params: {project_cd: this.$route.params.taskData.project_cd }});
                    },
                    error => {
                        swal("Oops!", "Error! An error occurred. Please try again later", "error");
                    }
                );
            }
        });
     },
     formatDateBackEnd(dateValue){
        return moment(dateValue,'DD/MM/YYYY').format('MM/DD/YYYY');
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