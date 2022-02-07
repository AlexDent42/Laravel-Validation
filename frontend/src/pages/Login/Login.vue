<template>
  <div class="auth-page">
    <b-container>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>Login to your Web App</h3>"
        customHeader
      >
        <p class="widget-auth-info">Use your email to sign in.</p>
        <b-alert
          class="alert-sm text-center mt-2 widget-middle-overflow rounded-0"
          variant="default"
          show
        >
          This is a real app with Node.js backend - use
          <br />
          <span class="font-weight-bold">"admin@flatlogic.com / password"</span>
          <br />
          to login!
        </b-alert>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>

          <b-form-group label="Email" label-for="email">
            <b-input-group>
              <b-input-group-text slot="prepend"
                ><i class="la la-user text-white"></i
              ></b-input-group-text>
              <input
                id="email"
                v-model="email"
                class="form-control input-transparent pl-3"
                type="email"
                required
                placeholder="Email"
              />
            </b-input-group>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-input-group>
              <b-input-group-text slot="prepend"
                ><i class="la la-lock text-white"></i
              ></b-input-group-text>
              <input
                id="password"
                v-model="password"
                class="form-control input-transparent pl-3"
                type="password"
                required
                placeholder="Password"
              />
            </b-input-group>
          </b-form-group>

          <router-link class="d-block text-right mb-3 mt-1 fs-sm" to="/forgot">
            Forgot password?
          </router-link>

          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="danger" class="auth-btn" size="sm">
              <span class="auth-btn-circle">
                <i class="la la-caret-right"></i>
              </span>
              {{ this.isFetching ? 'Loading...' : 'Login' }}
            </b-button>
            <p class="widget-auth-info mt-4">
              Don't have an account? Sign up now!
            </p>
            <router-link class="d-block text-center mb-4" to="register"
              >Create an Account</router-link
            >
            <div class="social-buttons">
              <b-button
                @click="this.googleLogin"
                variant="primary"
                class="social-button"
              >
                <i class="social-icon social-google"></i>
                <p class="social-text">GOOGLE</p>
              </b-button>
              <b-button
                @click="this.microsoftLogin"
                variant="success"
                class="social-button"
              >
                <i class="social-icon social-microsoft"></i>
                <p class="social-text">MICROSOFT</p>
              </b-button>
            </div>
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      {{ new Date().getFullYear() }} &copy; Laravel Validation - Made by
      <a href="https://flatlogic.com/">Flatlogic</a>
    </footer>
  </div>
</template>

<script>
  import Widget from '@/components/Widget/Widget';
  import { mapState, mapActions } from 'vuex';
  import config from '../../config';
  import NavLink from '../../components/Sidebar/NavLink/NavLink';

  export default {
    components: { NavLink, Widget },
    data() {
      return {
        email: 'admin@flatlogic.com',
        password: 'password',
      };
    },
    computed: {
      ...mapState('auth', {
        isFetching: (state) => state.isFetching,
        errorMessage: (state) => state.errorMessage,
      }),
    },
    methods: {
      ...mapActions('auth', ['loginUser', 'receiveToken', 'receiveLogin']),
      login() {
        if (this.email && this.password) {
          this.loginUser({
            email: this.email,
            password: this.password,
          });
        }
      },
      googleLogin() {
        this.loginUser({ social: 'google' });
      },
      microsoftLogin() {
        this.loginUser({ social: 'microsoft' });
      },
    },
    created() {
      const token = this.$route.query.token;
      if (token) {
        this.receiveToken(token);
      } else if (this.isAuthenticated()) {
        this.receiveLogin();
      }
    },
    mounted() {
      const creds = config.auth;
      this.email = creds.email;
      this.password = creds.password;
    },
  };
</script>
