<template >
    <div id="editScreen" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Edit Screen</h4>
                </div>
                <div class="modal-body">
                   <form class="form-horizontal" id='formEdit_validation' v-if="this.inputDisplay">
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtScreenCode">Screen Code</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="screenCodeUpd" class="form-control"  placeholder="Enter screenCode"  v-validate="'required'" v-model="inputDisplay.screen_code" v-bind:class="{'form-control': true, 'error': errors.has('screen code') }" name="screen code">
                                    </div>
                                    <span v-show="errors.has('screen code')" class="text-danger">{{ errors.first('screen code') }}</span>
                                </div>
                            </div>
                        </div>

                         <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtScreenName">Screen Name</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="screenNameUpd" class="form-control" placeholder="Enter screen name" v-model="inputDisplay.screen_name" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('screen name') }" name="screen name">
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
                                        <input type="text" id="descriptionUpd" class="form-control" placeholder="Enter description" v-model="inputDisplay.description" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('description') }" name="description">
                                    </div>
                                     <span v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtUpdatedBy">Updated By</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="employeeCodeUpd" name="updated by" v-model="inputDisplay.upd_user" v-validate="'required'"  v-bind:class="{'form-control': true, 'error': errors.has('updated by') }">
                                            <option value="">-- Select employee creat project --</option>
                                            <option v-for="(item, index) in listEmployee" :key="index" v-bind:value="item.staff_cd">{{item.staff_name}}</option>
                                        </select>
                                    </div>
                                    <span v-show="errors.has('updated by')" class="text-danger">{{ errors.first('updated by') }}</span>
                                </div>
                            </div>
                        </div>

                         <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtStatus">Status screen</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <select class="form-control show-tick" id="statusUpd" v-validate="'required'" placeholder="Choose status" v-model="inputDisplay.status_cd" name="status" :class="{'form-control': true, 'error': errors.has('status')}">
                                            <option value="">-- Select status screen--</option>
                                            <option value="1">Unresolved</option>
                                            <option value="0">Resolved</option>
                                        </select>
                                    </div>
                                     <span v-show="errors.has('status')" class="text-danger">{{ errors.first('status') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                                <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="onSubmit()">Save</button>
                                <button class="btn btn-primary m-t-15 waves-effect" data-dismiss="modal">Cancel</button>
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
        name: 'modal-edit-screen',
        data(){
            return {
                 dataBackEnd:{
                    screen_name:'',
                    screen_code:'',
                    description:'',
                    project_cd:'',
                    upd_user:'',
                    status_cd:'',
                    screen_cd:'',
                },
                dataDisplay:{
                    screen_name:'',
                    screen_code:'',
                    description:'',
                    project_cd:'',
                    upd_user:'',
                    status_cd:'',
                    screen_cd:''
                },
                dataUpdate:{
                    screen_name:'',
                    screen_code:'',
                    description:'',
                    ins_date:'',
                    staff_name:'',
                    screen_cd:''
                },
                listEmployee: [],
                submitted: false,
                valID:''
            }
            //inputDisplay = this.$parent.dataScreen
        },
        props: ['inputDisplay','myDataEdit'],
        created() {
            //this.loadScreenInformation();
            this.getListEmployee();
            // this.valID = this.$parent.editScreen
            // this.loadScreenInformation();
        },
        mounted(){
            //this.inputDisplay = this.$parent.dataScreen[0]
            //this.inputDisplay = this.$parent.dataScreen
        },
        methods:{
            //  loadScreenInformation(valID){
            //         axios.get(process.env.BASE_URL +"getScreenById", {
            //         params: {
            //         id: this.valID
            //         }
            //     })
            //     .then(response => {
            //         this.inputDisplay = response.data[0];
            //     //moment(this.input.end_date).format("YYYY-MM-DD");
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            //     .then(function() {
            //         // always executed
            //     });
            // },
            getProjectScreenList: function () {
                var id = this.$route.params.id
            axios({
                method: 'GET',
                url: 'http://localhost:8085/getListScreenByProjectId?id=' + id
            }).then(
                result => {
                this.myDataEdit = result.data
                console.log(this.myData)
                },
                error => {
                console.error(error)
                }
            )
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
            editScreen(value) {
                var screen_code = $('#screenCodeUpd').val();
                var screen_name = $('#screenNameUpd').val();
                var description = $('#descriptionUpd').val();
                var upd_user = $('#employeeCodeUpd').val();
                var screen_cd = this.inputDisplay.screen_cd
                var status_cd = $('#statusUpd').val()
                this.dataBackEnd.screen_name = screen_name;
                this.dataBackEnd.screen_code = screen_code;
                this.dataBackEnd.description = description;
                this.dataBackEnd.upd_user = upd_user;
                this.dataBackEnd.screen_cd = screen_cd;
                this.dataBackEnd.status_cd = status_cd;
                axios({
                    method: "POST",
                    url: process.env.BASE_URL +"editScreen",
                    data: this.dataBackEnd,
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        //this.inputDisplay = this.dataBackEnd;
                        //this.$parent.dataScreen[0].screen_name = this.dataBackEnd.screen_name;
                        //this.$parent.$options.methods.getProjectScreenList(this.$route.params.id);
                        //console.log(this.$parent.dataScreen[0].screen_name)
                        //this.inputDisplay.screen_name = this.dataBackEnd.screen_name;
                        this.updateData();
                        //this.getProjectScreenList();
                        //this.$emit("myDataUpdated", this.myDataEdit)
                        //this.$emit('click',inputDisplay)
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
                //this.inputDisplay = [];
                this.dataBackEnd = [];
                //this.$refs.projectName.focus();
                 this.errors.clear();
            },
            onSubmit(value){
                this.submitted = true;
                console.log(this.input);
                //console.log(this.myData);
                    this.$validator.validate().then(valid => {
                        if (valid) {
                            console.log('x');
                        this.editScreen();
                        }
                    });
            },
            updateData(){
                // this.dataUpdate.screen_name = this.inputDisplay.screen_name;
                // this.dataUpdate.screen_code = this.inputDisplay.screen_code;
                // this.dataUpdate.description = this.inputDisplay.description;
                // this.dataUpdate.ins_date = this.inputDisplay.ins_date;
                // this.dataUpdate.screen_cd = this.inputDisplay.screen_cd;
                // this.dataUpdate.staff_name = this.inputDisplay.staff_name;
                // var indexUpdate = this.myDataEdit.findIndex(i => i.screen_cd === this.inputDisplay.screen_cd);
                // this.myDataEdit[indexUpdate] = this.dataUpdate;
                this.$emit('updateMydata', this.inputDisplay)
                console.log(this.inputDisplay)
                //this.myData.splice(this.myData.findIndex(i => i.screen_cd === id),1)
            }
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
