<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">New Categories</h4>

      <b-form-group label="Name" label-for="22E52-56A6-DFE4-7A14">
        <b-form-input
          v-model="name"
          type="text"
          id="22E52-56A6-DFE4-7A14"
        ></b-form-input>
      </b-form-group>

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

        name: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.categoriesForm.data,
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
        newHandler: 'categoriesForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          name: this.name,
        };

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/categories');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },

      resetData() {
        this.name = '';
      },
    },
    async beforeMount() {},
    components: { ImageUploader, FileUploader },
  };
</script>

<style scoped></style>
