<template>
    <div id="myModalu" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" v-on:click="formatForm()">×</button>
                    <h4 class="modal-title">Create Screen</h4>
                </div>
                <div class="modal-body">
                   <form class="form-horizontal" id='form_validation'>
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtScreenCode">Screen Code</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="screenCode" class="form-control" name ="screen code" placeholder="Enter screen code" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('screen code') }">
                                    </div>
                                    <span v-show="errors.has('screen code')" class="text-danger">{{ errors.first('screen code') }}</span>
                                </div>
                            </div>
                        </div>

                         <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtScreentName">Screen Name</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="screenName" class="form-control" placeholder="Enter screen name" name="screen name" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('screen name') }">
                                    </div>
                                    <span v-show="errors.has('screen name')" class="text-danger">{{ errors.first('screen name') }}</span>
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
                                        <input type="text" id="description" class="form-control" placeholder="Enter description" name="description" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('description') }">
                                    </div>
                                     <span v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</span>
                                </div>
                            </div>
                        </div>

                       <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtCreatedBy">Created By</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="employeeCode" name="created by" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('created by') }">
                                            <option value="">-- Select employee creat project --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('created by')" class="text-danger">{{ errors.first('created by') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">Add</button>
                                <button class="btn btn-primary m-t-15 waves-effect" data-dismiss="modal" v-on:click="formatForm()">Cancel</button>
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="formatForm()">Clear</button>
                           </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import axios from "axios"
    export default {
        name: 'modal-add-screen',
        data: function(){
            return {
                dataBackEnd:{
                    screen_name:'',
                    screen_code:'',
                    description:'',
                    project_cd:'',
                    ins_user:''
                },
                listEmployee: [],
                submitted: false
            }
        },
        mounted(){
        },
         created: function () {
            this.getEmployeeList();
        },
        methods:{
            getEmployeeList(){
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
            addScreen(){
                    var screen_code = $('#screenCode').val();
                    var screen_name = $('#screenName').val();
                    var description = $('#description').val();
                    var ins_user = $('#employeeCode').val();
                    this.dataBackEnd.screen_name = screen_name;
                    this.dataBackEnd.screen_code = screen_code;
                    this.dataBackEnd.description = description;
                    this.dataBackEnd.ins_user = ins_user;
                    this.dataBackEnd.project_cd = this.$route.params.id;
                axios({
                    method: "POST",
                    url: process.env.BASE_URL +"addScreen",
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
                    this.getProjectScreenList(this.$route.params.id)
                    //this.$parent.myData = this.$parent.option;
                    //console.log(this.$parent.$options.methods.getProjectScreenList(this.$route.params.id));
                    },
                    error => {
                    swal("Oops!", "Error! An error occurred. Please try again later", "error");
                    }
                );
            },
             formatForm(){
                $('input').val('');
                $('select').val('');
                this.errors.clear();
                $('.form-control').blur();
                $('#projectName').focus();
            },
            onSubmit(e){
                this.submitted = true;
                    this.$validator.validate().then(valid => {
                        if (valid) {
                        this.addScreen();
                        //console.log("a");
                        }
                    });
            },
             getProjectScreenList: function (id) {
                axios({
                    method: 'GET',
                    url: 'http://localhost:8085/getListScreenByProjectId?id=' + id
                }).then(
                    result => {
                    this.$parent.myData = result.data
                    },
                    error => {
                    console.error(error)
                    }
                )
            },


        }
    }
</script>
<style scoped>
    .modal {
  text-align: center;
  padding: 0!important;
}

.modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
</style>
