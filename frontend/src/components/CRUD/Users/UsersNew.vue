<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">New Users</h4>

      <b-form-group label="First Name" label-for="7F315-A528-5E9E-802E">
        <b-form-input
          v-model="firstName"
          type="text"
          id="7F315-A528-5E9E-802E"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name" label-for="DB563-7A64-C372-58EB">
        <b-form-input
          v-model="lastName"
          type="text"
          id="DB563-7A64-C372-58EB"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Phone Number" label-for="7D4CD-B8A3-65EB-E74A">
        <b-form-input
          v-model="phoneNumber"
          type="text"
          id="7D4CD-B8A3-65EB-E74A"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="E-mail" label-for="89045-FAE5-C238-6F0A">
        <b-form-input
          v-model="email"
          type="text"
          id="89045-FAE5-C238-6F0A"
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
              id="70FF5-A263-3E82-8B2B"
              v-model="role"
            />
            <label for="70FF5-A263-3E82-8B2B">admin</label>
          </b-form-group>
        </b-col>

        <b-col md="3">
          <b-form-group class="radio abc-radio">
            <input
              type="radio"
              name="role"
              value="user"
              id="754E8-382B-6527-DD47"
              v-model="role"
            />
            <label for="754E8-382B-6527-DD47">user</label>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group class="abc-checkbox">
        <input type="checkbox" v-model="disabled" id="64349-0A15-4D67-AB7D" />
        <label for="64349-0A15-4D67-AB7D">Disabled</label>
      </b-form-group>

      <ImageUploader
        label="Avatar"
        id="5C139-15DD-C6CD-D2E4"
        url="users/avatar"
        :images="avatar"
        @change="avatarAdd"
        @del="avatarDel"
      />

      <b-row>
        <b-col>
          <button type="submit" class="btn btn-primary">Save</button>
          <button @click="resetData" type="button" class="btn btn-default ml-2">
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
        newHandler: 'usersForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          firstName: this.firstName,

          lastName: this.lastName,

          phoneNumber: this.phoneNumber,

          email: this.email,

          role: this.role,

          disabled: this.disabled,

          avatar: this.avatar,
        };

        try {
          await this.newHandler({ data });
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

      resetData() {
        this.firstName = '';

        this.lastName = '';

        this.phoneNumber = '';

        this.email = '';

        this.role = false;

        this.disabled = false;

        this.avatar = [];
      },
    },
    async beforeMount() {},
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
