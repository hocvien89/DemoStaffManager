<template>
    <div>
        <section>
            <!-- Left Sidebar -->
            <aside id="leftsidebar" class="sidebar">
                <!-- User Info -->
                <div class="user-info">
                    <div class="image">
                        <img src="../assets/images/user.png" width="48" height="48" alt="User" />
                    </div>
                    <div class="info-container">
                        <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">John Doe</div>
                        <div class="email">john.doe@example.com</div>
                        <div class="btn-group user-helper-dropdown">
                            <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                            <ul class="dropdown-menu pull-right">
                                <li><a @click.stop><i class="material-icons">person</i>Profile</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a @click.stop><i class="material-icons">group</i>Followers</a></li>
                                <li><a @click.stop><i class="material-icons">shopping_cart</i>Sales</a></li>
                                <li><a @click.stop><i class="material-icons">favorite</i>Likes</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a @click.stop><i class="material-icons">input</i>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- #User Info -->
                <!-- Menu -->
                <div class="menu">
                    <ul class="list">
                        <li class="header">REPORT</li>
                        <li id="overview" :class="{'active':isActive == 'overview'}" @click="setActive">
                            <router-link to="/">
                                <i class="material-icons col-red">donut_large</i>
                                <span>Overview</span>
                            </router-link>
                        </li>
                        <li>
                          <a class="menu-toggle" @click="toggleMenu">
                              <i class="material-icons">group</i>
                              <span>Daily Reports</span>
                          </a>
                          <ul class="ml-menu" id="daily-report-menu" :style="{'display':isExpand.indexOf('daily-report-menu') > -1 ? 'block' : 'none'}">
                            <li id="report1" :class="{'active':isActive == 'report1'}" @click="setActive">
                                <router-link class="toggled" to="/">Report 1</router-link>
                            </li>
                            <li id="report2" :class="{'active':isActive == 'report2'}" @click="setActive">
                                <router-link class="toggled" to="/">Report 2</router-link>
                            </li>
                          </ul>
                        </li>
                        <li class="header">MANAGEMENT</li>
                        <li>
                          <a class="menu-toggle" @click="toggleMenu">
                              <i class="material-icons">group</i>
                              <span>Employees</span>
                          </a>
                          <ul class="ml-menu" id="employee-menu" :style="{'display':isExpand.indexOf('employee-menu') > -1 ? 'block' : 'none'}">
                            <li id="edit-staff" :class="{'active':isActive == 'edit-staff'}" @click="setActive">
                                <router-link class="toggled" :to="{ name: 'EditStaff', params: { id: 4}}">Edit Staff</router-link>
                            </li>
                            <li id="add-employee" :class="{'active':isActive == 'add-employee'}" @click="setActive">
                                <router-link class="toggled" to="/add-employee">Add Employee</router-link>
                            </li>
                            <li id="view-list" :class="{'active':isActive == 'view-list'}" @click="setActive">
                                <router-link class="toggled" to="/view-employee">View List</router-link>
                            </li>
                          </ul>
                        </li>
                    </ul>
                </div>
                <!-- #Menu -->
                <!-- Footer -->
                <div class="legal">
                    <div class="copyright">
                        &copy; 2018 <a @click.stop>Staff Management</a>.
                    </div>
                    <div class="version">
                        <b>Version: </b> 1.0
                    </div>
                </div>
                <!-- #Footer -->
            </aside>
            <!-- #END# Left Sidebar -->
            <!-- Right Sidebar -->
            <aside id="rightsidebar" class="right-sidebar">
                <ul class="nav nav-tabs tab-nav-right" role="tablist">
                    <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
                    <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>
                </ul>
                <div class="tab-content">
                </div>
            </aside>
            <!-- #END# Right Sidebar -->
        </section>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isActive: 'overview',
      isExpand: []
    }
  },
  methods: {
    toggleMenu: function () {
      var id = event.target.closest('li').querySelector('ul').id
      var index = this.isExpand.indexOf(id)
      if (index > -1) {
        this.isExpand.splice(index, 1)
      } else {
        this.isExpand.push(id)
      }
    },
    setActive: function () {
      this.isActive = event.target.closest('li').id
    }
  }
}
</script>
<style scoped>
</style>
