<template>
  <Widget>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Profile</b-breadcrumb-item>
    </b-breadcrumb>
    <form @submit.prevent="submitHandler">
      <b-form-group label="First Name" label-for="E16A4-EE44-13DE-633B">
        <b-form-input
          v-model="firstName"
          type="text"
          id="E16A4-EE44-13DE-633B"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name" label-for="166CA-AB9E-2BAD-D54C">
        <b-form-input
          v-model="lastName"
          type="text"
          id="166CA-AB9E-2BAD-D54C"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Phone Number" label-for="61C91-3ACE-8FE8-3159">
        <b-form-input
          v-model="phoneNumber"
          type="text"
          id="61C91-3ACE-8FE8-3159"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="E-mail" label-for="C983B-8EE5-FE7E-D7BF">
        <b-form-input
          v-model="email"
          type="text"
          id="C983B-8EE5-FE7E-D7BF"
        ></b-form-input>
      </b-form-group>

      <div v-if="isAdmin">
        <label>Role</label>
        <b-row>
          <b-col md="3">
            <b-form-group class="radio abc-radio">
              <input
                type="radio"
                name="role"
                value="admin"
                id="3300E-CE60-71EB-871C"
                v-model="role"
              />
              <label for="3300E-CE60-71EB-871C">admin</label>
            </b-form-group>
          </b-col>

          <b-col md="3">
            <b-form-group class="radio abc-radio">
              <input
                type="radio"
                name="role"
                value="user"
                id="584C8-601C-609C-4355"
                v-model="role"
              />
              <label for="584C8-601C-609C-4355">user</label>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-form-group v-if="isAdmin" class="abc-checkbox">
        <input type="checkbox" v-model="disabled" id="C7D35-7BB9-DCF1-045B" />
        <label for="C7D35-7BB9-DCF1-045B">Disabled</label>
      </b-form-group>

      <ImageUploader
        label="Avatar"
        id="C5A62-EE67-08ED-F131"
        url="users/avatar"
        :images="avatar"
        @change="avatarAdd"
        @del="avatarDel"
      />

      <b-row>
        <b-col>
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            @click="formatData"
            type="button"
            class="btn btn-default ml-2"
          >
            Reset
          </button>
          <router-link :to="cancelUrl">
            <button type="button" class="btn btn-danger ml-2">Cancel</button>
          </router-link>
        </b-col>
      </b-row>
    </form>
  </Widget>
</template>
<script>
  import DatePicker from 'vue2-datepicker';
  import vSelect from 'vue-select';
  import { mapState, mapActions } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';

  export default {
    components: { ImageUploader, FileUploader },
    data() {
      return {
        id: '',

        firstName: '',

        lastName: '',

        phoneNumber: '',

        email: '',

        role: false,

        disabled: false,

        avatar: [],
      };
    },
    computed: {
      ...mapState({
        isAdmin: (state) => {
          if (state.auth.currentUser) {
            return state.auth.currentUser.role === 'admin';
          }
          return false;
        },
        data: (state) => state.usersForm.data,
      }),
      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    async beforeMount() {
      const { user } = JSON.parse(localStorage.getItem('user'));
      const id = user.id;

      if (id) {
        this.id = id;
        await this.getData(id);
        this.formatData();
      }
    },
    methods: {
      ...mapActions({
        getData: 'usersForm/getData',

        edit: 'usersForm/edit',
      }),

      avatarAdd(val) {
        this.avatar.push(val);
      },
      avatarDel(id) {
        this.avatar = this.avatar.filter((img) => img.id !== id);
      },

      formatData() {
        this.firstName = this.data.firstName;

        this.lastName = this.data.lastName;

        this.phoneNumber = this.data.phoneNumber;

        this.email = this.data.email;

        this.role = this.data.role;

        this.avatar = this.data.avatar;
      },
      async submitHandler() {
        const data = this.data;

        data.firstName = this.firstName;

        data.lastName = this.lastName;

        data.phoneNumber = this.phoneNumber;

        data.email = this.email;

        data.role = this.role;

        data.disabled = this.disabled;

        data.avatar = this.avatar;

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/users');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },
    },
  };
</script>

<style scoped>
  .image-preview {
    width: 191px;
    height: 141px;
    background-size: cover;
    background-position: 50% center;
  }
</style>
