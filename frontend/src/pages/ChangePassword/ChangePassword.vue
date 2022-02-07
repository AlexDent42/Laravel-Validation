<template>
  <Widget>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Change password</b-breadcrumb-item>
    </b-breadcrumb>
    <form @submit.prevent="submitHandler">
      <b-form-group label="Current Password" label-for="currentPassword">
        <b-form-input
          v-model="currentPassword"
          type="password"
          id="currentPassword"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="New Password" label-for="newPassword">
        <b-form-input
          v-model="newPassword"
          type="password"
          id="newPassword"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Confirm new Password" label-for="confirmPassword">
        <b-form-input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
        ></b-form-input>
      </b-form-group>

      <b-row>
        <b-col>
          <button :disabled="loading" type="submit" class="btn btn-primary">
            <Loader v-if="loading" />
            <span v-else>Change Password</span>
          </button>
          <router-link to="/app">
            <button type="button" class="ml-2 btn btn-danger">Cancel</button>
          </router-link>
        </b-col>
      </b-row>
    </form>
  </Widget>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import Loader from '@/components/Loader/Loader';

  export default {
    components: { Loader },
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.changePassword.loading,
      }),
    },
    methods: {
      ...mapActions({
        changePassword: 'changePassword/changePassword',
      }),
      submitHandler() {
        if (this.newPassword !== this.confirmPassword) return false;

        try {
          this.changePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
          });
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },
    },
  };
</script>
