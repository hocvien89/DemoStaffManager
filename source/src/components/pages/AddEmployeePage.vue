<template>
    <div class="container-fluid" id="addEmployee">
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
                                            <label class="form-label" id="staff_name_label">Staff Name</label>
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
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="datepicker form-control" id="start_date" required>
                                            <label class="form-label" id="start_date_label">Start Date </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="form-line">
                                            <input type="text" class="datepicker form-control" id="end_date" required>
                                            <label class="form-label" id="end_date_label">End Date </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="demo-radio-button">
                                        <label>Sex</label>
                                        <input name="sex" type="radio" id="sex_1" value="0" checked />
                                        <label for="sex_1">Male</label>
                                        <input name="sex" type="radio" id="sex_2" value="1" />
                                        <label for="sex_2">Female</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <select class="form-control show-tick" id="dev_lang_cd" required>
                                        <option value="0">-- Programing Language --</option>
                                        <option value="1">C#</option>
                                        <option value="2">Java</option>
                                        <option value="3">PHP</option>
                                        <option value="4">NodeJS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="button-demo">
                                <router-link to="/view-employee">
                                    <button type="button" class="btn btn-danger waves-effect">
                                        <i class="material-icons">home</i><span>Cancel</span>
                                    </button>
                                </router-link>
                                <button type="button" class="btn btn-warning waves-effect" v-on:click="clearData()">
                                    <i class="material-icons">content_cut</i><span>Clear</span>
                                </button>
                                <button type="button" class="btn btn-primary waves-effect" v-on:click="sendData()">
                                    <i class="material-icons">save</i><span>Create</span>
                                </button>
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
  name: "addEmployee",
  data: function() {
    return {
      input: {
        staff_name: "",
        address: "",
        email: "",
        phone_number: "",
        sex: "",
        dev_lang_cd: "",
        start_date: "",
        end_date: ""
      }
    }
  },
  mounted(){
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    //On focus event
    $('.form-control').focus(function () {
        $(this).parent().addClass('focused');
    });

    //On focusout event
    $('.form-control').focusout(function () {
        var $this = $(this);
        if ($this.parents('.form-group').hasClass('form-float')) {
            if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
        }
        else {
            $this.parents('.form-line').removeClass('focused');
        }
    });

    //On label click
    $('body').on('click', '.form-float .form-line .form-label', function () {
        $(this).parent().find('input').focus();
    });

    //Not blank form
    $('.form-control').each(function () {
        if ($(this).val() !== '') {
            $(this).parents('.form-line').addClass('focused');
        }
    });
  },
  methods: {
    sendData() {
      var staff_name = $('#staff_name').val();
      if (staff_name == ''){
        $('#staff_name').focus();
        $('#staff_name').parent().addClass('focused');
        $('#staff_name_label').text('Staff Name is required field');
        $('#staff_name_label').css('color', 'red');
        return;
      } else {
          $('#staff_name_label').text('Staff Name');
          $('#staff_name_label').css('color', '');
      }
      var address = $('#address').val();
      var email = $('#email').val();
      var phone_number = $('#phone_number').val();
      var sex = $("input:radio[name ='sex']:checked").val();
      var dev_lang_cd = $('#dev_lang_cd').val();
      var start_date = $('#start_date').val();
      var end_date = $('#end_date').val();
      if (start_date == '') {
        $('#start_date').focus();
        $('#start_date').parent().addClass('focused');
        $('#start_date_label').text('Start Date is not valid');
        $('#start_date_label').css('color', 'red');
        return;
      } else {
          $('#start_date_label').text('Start Date');
          $('#start_date_label').css('color', '');
      }

      if (end_date == '') {
        $('#end_date').focus();
        $('#end_date').parent().addClass('focused');
        $('#end_date_label').text('End Date is not valid');
        $('#end_date_label').css('color', 'red');
        return;
      } else {
          $('#end_date_label').text('End Date');
          $('#end_date_label').css('color', '');
      }

      this.input.staff_name = staff_name;
      this.input.address = address;
      this.input.email = email;
      this.input.phone_number = phone_number;
      this.input.sex = sex;
      this.input.dev_lang_cd = dev_lang_cd;
      this.input.start_date = start_date;
      this.input.end_date = end_date;
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
          this.clearData();
        },
        error => {
          swal("Oops!", "Something was wrong", "error");
        }
      );
      return false;
    },
    clearData() {
        $('#staff_name').val('');
        $('#address').val('');
        $('#address').parent().removeClass('focused');
        $('#email').val('');
        $('#email').parent().removeClass('focused');
        $('#phone_number').val('');
        $('#phone_number').parent().removeClass('focused');
        $('#dev_lang_cd').val('0');
        $('input[name=sex][value=0]').prop('checked', true);
        $('#start_date').val('');
        $('#start_date').parent().removeClass('focused');
        $('#end_date').val('');
        $('#end_date').parent().removeClass('focused');
        $('#staff_name').focus();
        $('#staff_name').parent().addClass('focused');
    }
  }
};
</script>
