<template>
    <div class="container-fluid">
        <div class="row">
             <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="card">
                        <div class="header">
                            <h2>
                                Screen Detail
                            </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtScreenCode">Screen code</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="screenCode" class="form-control" disabled v-model="input.screen_code">
                                        </div>
                                        <span></span>
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
                                            <input type="text" id="screenName" class="form-control" disabled v-model="input.screen_name">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                                <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtDescription">Screen Description</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="description" class="form-control" disabled v-model="input.description">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtProjectName">Project Name </label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="projectName" class="form-control" disabled v-model="input.project_name">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtCreatedDate">Created Date</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="createdDate" class="form-control" disabled v-model="input.ins_date">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtCreatedUser">Created User </label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="createdUser" class="form-control" disabled v-model="input.ins_user_name">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtUpdatedDate">Updated Date</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="updatedUser" class="form-control" disabled v-model="input.upd_date">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                             <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtUpdatedUser">Updated User</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="updatedUser" class="form-control" disabled v-model="input.upd_user_name">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                             <div class="row clearfix">
                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                    <label for="txtStatus">Status</label>
                                </div>
                                <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" id="status" class="form-control" disabled v-model="input.status_cd">
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
             </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
/* eslint-disable */
    export default{
        data(){
            return {
                input: {
                    screen_code:'',
                    screen_name:'',
                    description:'',
                    project_name:'',
                    ins_date:'',
                    ins_user_name:'',
                    upd_date:'',
                    upd_user_name:'',
                    status_cd:'',

                }
            }
        },
        created: function () {
            this.getScreenById();
        },
        methods:{
            getScreenById(){
                 axios.get(process.env.BASE_URL +"GetDetailScreenById", {
                    params: {
                    id: this.$route.params.id
                    }
                })
                .then(response => {
                    this.input = response.data[0];
                    //console.log(this.input.date_start);
                    this.input.status_cd = this.displayStatus(this.input.status_cd);
                    this.input.ins_date = this.formatDateFrontEnd(this.input.ins_date);   //moment(this.input.start_date).format("YYYY-MM-DD");
                    this.input.upd_date =  this.formatDateFrontEnd(this.input.upd_date) //moment(this.input.end_date).format("YYYY-MM-DD");
                })
                .catch(error => {
                    console.log(error);
                })
                .then(function() {
                    // always executed
                });
            },
            formatDateFrontEnd(dateValue){
                return moment(dateValue).format('DD-MM-YYYY')
            },
            // formatDateBackEnd(dateValue){
            //     return moment(dateValue,'DD/MM/YYYY').format('MM/DD/YYYY')
            // },
            displayStatus(type){
                var result;
                switch(type){
                    case 1:
                         result = "Unresolved"
                        break;
                    case 0:
                        result = "Resolved"
                        break;
                }
                return result;
            }
        }
    };
</script>
<style scoped>
     .form-control[disabled], fieldset[disabled] .form-control{
        cursor: default;
    }
</style>