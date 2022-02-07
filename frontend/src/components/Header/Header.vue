<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
      <b-nav-form class="d-sm-down-none mr-3">
        <b-input-group class="input-group-transparent">
          <b-input-group-text slot="prepend"
            ><i class="la la-search"></i
          ></b-input-group-text>
          <b-input
            class="input-transparent"
            id="search-input"
            placeholder="Search Dashboard"
          />
        </b-input-group>
      </b-nav-form>

      <div class="ml-auto d-flex align-items-center">
        <span class="avatar rounded-circle thumb-sm float-left mr-2">
          <img
            v-if="avatar"
            class="rounded-circle"
            :src="avatar"
            :alt="user.name"
          />
          <span v-else>{{ firstUserLetter }}</span>
        </span>
        <span class="small">{{
          currentUser && currentUser.firstName ? currentUser.firstName : 'User'
        }}</span>
      </div>

      <b-nav-item class="divider d-md-down-none"></b-nav-item>
      <b-nav-item-dropdown no-caret right menu-class="dropdown-menu-settings">
        <template slot="button-content">
          <i class="la la-cog px-2" />
        </template>
        <b-dropdown-item to="/app/profile"
          ><i class="la la-user" /> My Account</b-dropdown-item
        >
        <b-dropdown-divider />
        <b-dropdown-item-button @click="logoutUser">
          <i class="la la-sign-out" /> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <b-nav-item class="d-md-down-none" @click="logoutUser">
        <i class="la la-power-off px-2" />
      </b-nav-item>
      <b-nav-item class="d-md-none" @click="switchSidebarMethod">
        <i class="la la-navicon px-2" />
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Header',
    data() {
      return {
        user: JSON.parse(localStorage.getItem('user') || {}),
      };
    },
    computed: {
      ...mapState('layout', {
        sidebarClose: (state) => state.sidebarClose,
        sidebarStatic: (state) => state.sidebarStatic,
      }),
      ...mapState('auth', {
        currentUser: (state) => state.currentUser,
      }),
      avatar() {
        return this.currentUser &&
          this.currentUser.avatar &&
          this.currentUser.avatar.length
          ? this.currentUser.avatar[0].publicUrl
          : null;
      },
      firstUserLetter() {
        return this.currentUser && this.currentUser.firstName
          ? this.currentUser.firstName[0].toUpperCase()
          : 'U';
      },
    },
    methods: {
      ...mapActions('layout', [
        'toggleSidebar',
        'switchSidebar',
        'changeSidebarActive',
      ]),
      ...mapActions('auth', ['logoutUser']),
      switchSidebarMethod() {
        if (!this.sidebarClose) {
          this.switchSidebar(true);
          this.changeSidebarActive(null);
        } else {
          this.switchSidebar(false);
          const paths = this.$route.fullPath.split('/');
          paths.pop();
          this.changeSidebarActive(paths.join('/'));
        }
      },
    },
  };
</script>

<style src="./Header.scss" lang="scss" />
