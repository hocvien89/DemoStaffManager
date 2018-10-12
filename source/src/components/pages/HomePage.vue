<template>
    <div class="container-fluid">
        <div class="block-header">
            <h2>DASHBOARD</h2>
        </div>
        <!-- Widgets -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <router-link class="toggled" to="/employee-list">
                <div class="info-box bg-pink hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">playlist_add</i>
                    </div>
                    <div class="content">
                        <div class="text">EMPLOYEE lIST</div>
                        <div class="number count-to" data-from="0" data-to="125" data-speed="15" data-fresh-interval="20"></div>
                    </div>
                </div>
                </router-link>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <router-link class="toggled" to="/view-report-year">
                <div class="info-box bg-cyan hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">show_chart</i>
                    </div>
                    <div class="content">
                        <div class="text">REPORT BY TIME</div>
                        <div class="number count-to" data-from="0" data-to="257" data-speed="1000" data-fresh-interval="20"></div>
                    </div>
                </div>
                </router-link>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <router-link class="toggled" to="/view-report-language">
                <div class="info-box bg-light-green hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">pie_chart</i>
                    </div>
                    <div class="content">
                        <div class="text">REPORT BY LANGUAGE</div>
                        <div class="number count-to" data-from="0" data-to="243" data-speed="1000" data-fresh-interval="20"></div>
                    </div>
                </div>
                </router-link>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <router-link class="toggled" to="/employee-register">
                <div class="info-box bg-orange hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">person_add</i>
                    </div>
                    <div class="content">
                        <div class="text">NEW EMPLOYEE</div>
                        <div class="number count-to" data-from="0" data-to="1225" data-speed="1000" data-fresh-interval="20"></div>
                    </div>
                </div>
                </router-link>
            </div>
        </div>
        <!-- #END# Widgets -->
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>
