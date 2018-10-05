<template>
    <div class="container-fluid">
      <div class="block-header">
        <h2>EDIT STAFF INFORMATION {{ input.staff_cd }}</h2>
      </div>
        <div class="row clearfix">
           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div class="card">
                <div class="body">
                    <form class="form-horizontal">
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtStaffName">Staff name</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtStaffName" class="form-control" placeholder="Enter staff name" v-model="input.staff_name">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtAddress">Adress</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtAddress" class="form-control" placeholder="Enter address" v-model="input.address">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtEmail">Email</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtEmail" class="form-control" placeholder="Enter email" v-model="input.email">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtPhone">Phone number</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtPhone" class="form-control" placeholder="Enter phone number" v-model="input.phone_number">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <!-- <label for="txtSex">Sex</label> -->
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                  <input type="radio" name="gender" id="male" class="with-gap" value="0" v-model="input.sex">
                                  <label for="male">Male</label>

                                  <input type="radio" name="gender" id="female" class="with-gap" value="1" v-model="input.sex">
                                  <label for="female" class="m-l-20">Female</label>
                                  <!-- <input type="radio" v-model="sex" id="male" value="0" class="with-gap">
                                  <input type="radio" v-model="sex" id="feMale" value="1" class="with-gap"> -->
                                </div>
                              </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtLang">Program language</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtLang" class="form-control" placeholder="Enter program language" v-model="input.dev_lang_cd">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtStartDate">Start date</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group">
                                    <div class="form-line">
                                        <input type="text" id="txtStartDate" class="form-control date" placeholder="Enter start date" v-model="input.start_date">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                <label for="txtEndDate">End date</label>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                <div class="form-group demo-masked-input">
                                    <div class="form-line">
                                        <input type="text" id="txtEndDate" class="form-control date" placeholder="Enter end date" v-model="input.end_date">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-4 col-xs-offset-5">
                              <button type="button" class="btn btn-primary m-t-15 waves-effect" v-on:click="Save">Save</button>
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
export default {
  data: function() {
    return {
      input: {
        staff_cd: "",
        staff_name: "",
        address: "",
        email: "",
        phone_number: "",
        sex: "",
        dev_lang_cd: "",
        start_date: "",
        end_date: ""
      }
    };
  },
  created() {
    this.input.staff_cd = this.$route.params.id;
    axios
      .get("http://localhost:8085/getEmployeeById", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(response => {
        this.input = response.data[0];
        this.input.start_date =  moment(this.input.start_date).format('YYYY-MM-DD');
        this.input.end_date =  moment(this.input.end_date).format('YYYY-MM-DD');
      })
      .catch(error => {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  },
  methods: {
    Save() {
      console.log('Save');
      console.log(this.input);
      axios({
        method: "POST",
        url: "http://localhost:8085/editEmployee",
        data: this.input,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          console.log("sucess");
        },
        error => {
          console.log("Falure");
        }
      );
    }
  }
};
</script>
