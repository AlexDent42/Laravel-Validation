<template>
  <div class="dashboard-page">
    <h1 class="page-title">
      Welcome,
      {{
        currentUser && currentUser.firstName ? currentUser.firstName : 'User'
      }}
    </h1>
    <div class="sidesWrapper">
      <div class="analyticsSide">
        <b-row>
          <b-col>
            <Widget>
              <img
                class="d-block mx-auto"
                src="../../assets/logo.png"
                alt="Vue"
              />
            </Widget>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Widget from '@/components/Widget/Widget';

  export default {
    name: 'Dashboard',
    components: {
      Widget,
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.auth.currentUser,
      }),
    },
  };
</script>

<style src="./Dashboard.scss" lang="scss" />
