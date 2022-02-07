<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">New Articles</h4>

      <b-form-group label="Title" label-for="11F5F-504B-28E4-ECDA">
        <b-form-input
          v-model="title"
          type="text"
          id="11F5F-504B-28E4-ECDA"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Body" label-for="body">
        <b-form-textarea
          :rows="3"
          id="F7D79-B747-938D-E01D"
          label="body"
          v-model="body"
        />
      </b-form-group>

      <b-form-group label="Author" label-for="A8FC2-E1AD-5721-B71F">
        <v-select
          inputId="A8FC2-E1AD-5721-B71F"
          v-model="author"
          :options="optionsAuthor"
          @search="searchAuthor"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Category" label-for="96EF5-BD52-BFFC-368E">
        <v-select
          inputId="96EF5-BD52-BFFC-368E"
          v-model="category"
          :options="optionsCategory"
          @search="searchCategory"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Tags" label-for="C0A2D-ACB7-F26E-51A4">
        <v-select
          inputId="C0A2D-ACB7-F26E-51A4"
          :options="optionsTags"
          v-model="tags"
          @search="searchTags"
          multiple
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group class="abc-checkbox">
        <input type="checkbox" v-model="featured" id="C7D91-EDF5-7701-0349" />
        <label for="C7D91-EDF5-7701-0349">Featured</label>
      </b-form-group>

      <ImageUploader
        label="Images"
        id="8A30A-860C-6F7B-9658"
        url="articles/images"
        :images="images"
        @change="imagesAdd"
        @del="imagesDel"
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

        title: '',

        body: '',

        author: '',

        category: '',

        tags: [],

        featured: false,

        images: [],
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.articlesForm.data,

        optionsAuthor: (state) => state.articlesForm.searchResultAuthor,

        optionsCategory: (state) => state.articlesForm.searchResultCategory,

        optionsTags: (state) => state.articlesForm.searchResultTags,
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
        searchAuthor: 'articlesForm/searchAuthor',

        searchCategory: 'articlesForm/searchCategory',

        searchTags: 'articlesForm/searchTags',

        newHandler: 'articlesForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          title: this.title,

          body: this.body,

          author: this.author,

          category: this.category,

          tags: this.tags,

          featured: this.featured,

          images: this.images,
        };

        data.author = this.author.value;

        data.category = this.category.value;

        data.tags = this.tags.map((item) => item.id);

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/articles');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },

      imagesAdd(val) {
        this.images.push(val);
      },
      imagesDel(id) {
        this.images = this.images.filter((img) => img.id !== id);
      },

      resetData() {
        this.title = '';

        this.body = '';

        this.author = '';

        this.category = '';

        this.tags = [];

        this.featured = false;

        this.images = [];
      },
    },
    async beforeMount() {
      await this.searchAuthor();

      await this.searchCategory();

      await this.searchTags();
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
