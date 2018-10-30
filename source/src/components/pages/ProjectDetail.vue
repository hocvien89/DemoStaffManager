<template>
    <div class="container-fluid">
            <!-- Example Tab -->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>
                            Project Detail
                        </h2>
                    </div>
                    <div class="body">
                        <ul class="nav nav-tabs tab-nav-right" role="tablist">
                            <li role="presentation" class="active"><a href="#ProjectInformation" data-toggle="tab">Project Information</a></li>
                            <li role="presentation"><a href="#ScreenList" data-toggle="tab">Screen List</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade in active" id="ProjectInformation">
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label for="txtProjectName">Project name</label>
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
                                        <label for="txtProjectType">Project type</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" id="projectType" class="form-control" disabled v-model="input.type">
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                 <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label for="txtProjectType">Project Description</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" id="projectType" class="form-control" disabled v-model="input.discription">
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label for="txtProjectType">Date Start </label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" id="projectType" class="form-control" disabled v-model="input.date_start">
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label for="txtProjectType">Date End </label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" id="projectType" class="form-control" disabled v-model="input.date_end">
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                 <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label for="txtProjectType">Created User </label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" id="projectType" class="form-control" disabled v-model="input.staff_name">
                                            </div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="ScreenList">
                                <ProjectScreenList></ProjectScreenList>
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
import ProjectScreenList from './ProjectScreenList.vue'
/* eslint-disable */
    export default{
        data(){
            return {
                input: {
                    project_name:'',
                    type:'',
                    discription:'',
                    date_start:'',
                    date_end:'',
                    staff_name:''
                }
            }
        },
        components:{
            ProjectScreenList
        },
        created: function () {
            this.getProjectById();
        },
        methods:{
            getProjectById(){
                 axios.get(process.env.BASE_URL +"getProjectById", {
                    params: {
                    id: this.$route.params.id
                    }
                })
                .then(response => {
                    this.input = response.data[0];
                    console.log(this.input.date_start);
                    this.input.type = this.displayProjectType(this.input.type);
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
            formatDateFrontEnd(dateValue){
                return moment(dateValue).format('DD-MM-YYYY')
            },
            formatDateBackEnd(dateValue){
                return moment(dateValue,'DD/MM/YYYY').format('MM/DD/YYYY')
            },
            displayProjectType(type){
                var result;
                switch(type){
                    case 1:
                         result = "Winform"
                        break;
                    case 2:
                        result = "WebForm"
                        break;
                    case 3:
                        result = "Web Application"
                        break;
                    case 4:
                        result = "Mobile Application"
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
    /* #exampleModal{
        position: absolute;
        left: 40%;
        width: 20%;
        height: 400px;
        top: 100px;
    } */
</style>