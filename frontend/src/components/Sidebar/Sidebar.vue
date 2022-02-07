<template>
  <b-collapse
    class="sidebar-collapse"
    id="sidebar-collapse"
    :visible="sidebarOpened"
  >
    <nav :class="{ sidebar: true }">
      <header class="logo">
        <router-link to="/"> Laravel Validation </router-link>
      </header>
      <ul class="nav">
        <NavLink
          :activeItem="activeItem"
          header="Dashboard"
          link="/app/dashboard"
          iconName="flaticon-home"
          index="Dashboard"
          isHeader
        />

        <NavLink
          v-if="currentUser && currentUser.role === 'admin'"
          :activeItem="activeItem"
          header="Users"
          link="/admin/users"
          iconName="flaticon-layers"
          index="users"
          isHeader
        />

        <NavLink
          v-if="currentUser && currentUser.role === 'admin'"
          :activeItem="activeItem"
          header="Articles"
          link="/admin/articles"
          iconName="flaticon-layers"
          index="articles"
          isHeader
        />

        <NavLink
          v-if="currentUser && currentUser.role === 'admin'"
          :activeItem="activeItem"
          header="Tags"
          link="/admin/tags"
          iconName="flaticon-layers"
          index="tags"
          isHeader
        />

        <NavLink
          v-if="currentUser && currentUser.role === 'admin'"
          :activeItem="activeItem"
          header="Categories"
          link="/admin/categories"
          iconName="flaticon-layers"
          index="categories"
          isHeader
        />

        <NavLink
          v-if="currentUser && currentUser.role === 'admin'"
          :activeItem="activeItem"
          header="Comments"
          link="/admin/comments"
          iconName="flaticon-layers"
          index="comments"
          isHeader
        />

        <NavLink
          :activeItem="activeItem"
          header="Profile"
          link="/app/profile"
          iconName="flaticon-user"
          index="profile"
          isHeader
        />

        <NavLink
          :activeItem="activeItem"
          header="Change password"
          link="/app/password"
          iconName="flaticon-user"
          index="profile"
          isHeader
        />

        <li :class="{ headerLink: true, className }">
          <a :href="externalLink" class="sidebar-link" target="_blank">
            <span class="icon">
              <i :class="'fi flaticon-user'"></i>
            </span>
            <span> API docs </span>
          </a>
        </li>
      </ul>
    </nav>
  </b-collapse>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NavLink from './NavLink/NavLink';

  export default {
    name: 'Sidebar',
    components: { NavLink },
    methods: {
      ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
      setActiveByRoute() {
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      },
    },
    created() {
      this.setActiveByRoute();
    },
    computed: {
      ...mapState('layout', {
        sidebarOpened: (state) => !state.sidebarClose,
        activeItem: (state) => state.sidebarActiveElement,
      }),
      ...mapState('auth', {
        currentUser: (state) => state.currentUser,
      }),
      externalLink: () => {
        return process.env.NODE_ENV === 'production'
          ? window.location.origin + '/api-docs'
          : 'http://localhost:8080/api-docs';
      },
    },
  };
</script>

<style src="./Sidebar.scss" lang="scss" scoped />
<style src="./NavLink/NavLink.scss" lang="scss" scoped />
