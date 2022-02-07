<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">Edit Articles</h4>

      <b-form-group label="Title" label-for="06BD4-6BA9-18F1-75B1">
        <b-form-input
          v-model="title"
          type="text"
          id="06BD4-6BA9-18F1-75B1"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Body" label-for="body">
        <b-form-textarea
          :rows="3"
          id="0D009-19E5-9148-CA34"
          label="body"
          v-model="body"
        />
      </b-form-group>

      <b-form-group label="Author" label-for="F5554-AA33-4395-D60E">
        <v-select
          inputId="F5554-AA33-4395-D60E"
          v-model="author"
          :options="optionsAuthor"
          @search="searchAuthor"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Category" label-for="41B03-CA02-E90A-D471">
        <v-select
          inputId="41B03-CA02-E90A-D471"
          v-model="category"
          :options="optionsCategory"
          @search="searchCategory"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Tags" label-for="31ABD-EAD5-354A-B9F2">
        <v-select
          inputId="31ABD-EAD5-354A-B9F2"
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
        <input type="checkbox" v-model="featured" id="C7B0B-ADE3-4D3C-ABC4" />
        <label for="C7B0B-ADE3-4D3C-ABC4">Featured</label>
      </b-form-group>

      <ImageUploader
        label="Images"
        id="FA605-0B31-E872-A9CF"
        url="articles/images"
        :images="images"
        @change="imagesAdd"
        @del="imagesDel"
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
        getData: 'articlesForm/getData',

        searchAuthor: 'articlesForm/searchAuthor',

        searchCategory: 'articlesForm/searchCategory',

        searchTags: 'articlesForm/searchTags',

        edit: 'articlesForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.title = this.title;

        data.body = this.body;

        data.author = this.author;

        data.category = this.category;

        data.tags = this.tags;

        data.featured = this.featured;

        data.images = this.images;

        data.author = this.author.value;

        data.category = this.category.value;

        data.tags = this.tags.map((item) => item.id);

        try {
          await this.edit({ id: this.id, data });
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

      formatData() {
        this.title = this.data.title;

        this.body = this.data.body;

        this.author = dataFormatter.usersOneListFormatter(this.data.author);

        this.category = dataFormatter.categoriesOneListFormatter(
          this.data.category,
        );

        this.tags = dataFormatter.tagsManyListFormatterEdit(this.data.tags);

        this.images = this.data.images;
      },
    },
    async beforeMount() {
      try {
        await this.searchAuthor();

        await this.searchCategory();

        await this.searchTags();

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
