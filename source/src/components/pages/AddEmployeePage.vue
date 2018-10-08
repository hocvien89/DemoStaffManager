<template>
    <div class="container-fluid">
        <div class="block-header">
            <h2>Register Staff Information</h2>
        </div>
        <!-- Input -->
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="body">
                        <form id="form_validation">
                            <div class="row clearfix">
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" class="form-control" id="staff_name" required>
                                            <label class="form-label">Staff Name</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" class="form-control" id="address" required>
                                            <label class="form-label">Address</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" class="form-control" id="email" required>
                                            <label class="form-label">Email</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" class="form-control" id="phone_number" required>
                                            <label class="form-label">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="demo-radio-button">
                                        <label>Sex</label>
                                        <input name="sex" type="radio" id="sex_1" value="1" checked />
                                        <label for="sex_1">Male</label>
                                        <input name="sex" type="radio" id="sex_2" value="0" />
                                        <label for="sex_2">Female</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control show-tick" id="dev_lang_cd" required>
                                        <option value="">-- Programing Language --</option>
                                        <option value="1">C#</option>
                                        <option value="2">Java</option>
                                        <option value="3">PHP</option>
                                        <option value="40">NodeJS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="button-demo">
                                <button type="button" class="btn btn-primary waves-effect" v-on:click="sendData()">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- #END# Input -->
    </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import pic from "../../../node_modules/adminbsb-materialdesign/images/thumbs-up.png";
export default {
  data: function() {
    return {
      input: {
        staff_name: "",
        address: "",
        email: "",
        "phone_number": "",
        "sex": "",
        dev_lang_cd: ""
      }
    }
  },
  methods: {
    sendData() {
      var staff_name = $('#staff_name').val();
      var address = $('#address').val();
      var email = $('#email').val();
      var phone_number = $('#phone_number').val();
      var sex = $("input:radio[name ='sex']:checked").val();
      var dev_lang_cd = $('#dev_lang_cd').val();
      this.input.staff_name = staff_name;
      this.input.address = address;
      this.input.email = email;
      this.input.phone_number = phone_number;
      this.input.sex = sex;
      this.input.dev_lang_cd = dev_lang_cd;
      axios({
        method: "POST",
        url: process.env.BASE_URL +"addEmployee",
        data: this.input,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          swal({
            title: "Success!",
            text: "The staff is created successfully",
            imageUrl: pic
          });
        },
        error => {
          swal("Oops!", "Something was wrong", "error");
        }
      );
      return false;
    }
  }
};
</script>