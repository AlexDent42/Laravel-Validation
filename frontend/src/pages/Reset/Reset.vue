<template>
  <div class="auth-page">
    <b-container>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>Forgot password?</h3>"
        customHeader
      >
        <p class="widget-auth-info">Please fill your email below.</p>

        <form class="mt" @submit.prevent="submitHandler">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="password"
              required
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="confirmPassword"
              required
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <b-button
            :disabled="isFetching"
            type="submit"
            size="sm"
            class="auth-btn mt-0 mb-2 d-block w-100"
            variant="info"
          >
            {{ isFetching ? 'Loading...' : 'Send' }}
          </b-button>
        </form>

        <p class="widget-auth-info">Need to Login?</p>

        <router-link class="d-block mb-3 mt-1 fs-sm text-center" to="/login">
          Enter the account
        </router-link>
      </Widget>
    </b-container>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Widget from '@/components/Widget/Widget';

  export default {
    data() {
      return {
        password: '',
        confirmPassword: '',
      };
    },
    computed: {
      ...mapState('reset', {
        isFetching: (state) => state.isFetching,
        errorMessage: (state) => state.errorMessage,
      }),
    },
    methods: {
      ...mapActions('reset', ['reset']),
      async submitHandler() {
        if (this.password === this.confirmPassword) {
          const token = this.$route.query.token;
          await this.reset({ password: this.password, token });
          this.password = '';
          this.confirmPassword = '';
        }
      },
    },
  };
</script>
