<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">Edit Users</h4>

      <b-form-group label="First Name" label-for="B4F36-4C6B-1182-D007">
        <b-form-input
          v-model="firstName"
          type="text"
          id="B4F36-4C6B-1182-D007"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name" label-for="B651C-EA43-05FF-3EBB">
        <b-form-input
          v-model="lastName"
          type="text"
          id="B651C-EA43-05FF-3EBB"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Phone Number" label-for="B158B-DB7B-8C22-49AC">
        <b-form-input
          v-model="phoneNumber"
          type="text"
          id="B158B-DB7B-8C22-49AC"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="E-mail" label-for="49755-1926-8444-228F">
        <b-form-input
          v-model="email"
          type="text"
          id="49755-1926-8444-228F"
        ></b-form-input>
      </b-form-group>

      <label>Role</label>
      <b-row>
        <b-col md="3">
          <b-form-group class="radio abc-radio">
            <input
              type="radio"
              name="role"
              value="admin"
              id="248E7-3D10-66EE-8CFE"
              v-model="role"
            />
            <label for="248E7-3D10-66EE-8CFE">admin</label>
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group class="radio abc-radio">
            <input
              type="radio"
              name="role"
              value="user"
              id="E00CF-EBF9-DD66-3E6F"
              v-model="role"
            />
            <label for="E00CF-EBF9-DD66-3E6F">user</label>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group class="abc-checkbox">
        <input type="checkbox" v-model="disabled" id="2B049-8521-9E00-FA46" />
        <label for="2B049-8521-9E00-FA46">Disabled</label>
      </b-form-group>

      <ImageUploader
        label="Avatar"
        id="B7A85-C117-0655-F6C0"
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
  import { mapState, mapActions } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';

  export default {
    data() {
      return {
        id: null,

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
    methods: {
      ...mapActions({
        getData: 'usersForm/getData',

        edit: 'usersForm/edit',
      }),
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
    },
    async beforeMount() {
      try {
        const pathArray = this.$route.fullPath.split('/');
        const id = pathArray[pathArray.length - 2];
        this.id = id;
        await this.getData(id);

        this.formatData();
      } catch (e) {
        this._vm.$toasted.show('Error ' + e, {
          type: 'error',
        });
      }
    },
    components: { ImageUploader, FileUploader },
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
