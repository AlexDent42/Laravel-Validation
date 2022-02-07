<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">New Comments</h4>

      <b-form-group label="Text" label-for="text">
        <b-form-textarea
          :rows="3"
          id="1316F-1A2D-E8DD-C5C0"
          label="text"
          v-model="text"
        />
      </b-form-group>

      <b-form-group label="Author" label-for="2C5B1-D7B7-CB15-3F61">
        <v-select
          inputId="2C5B1-D7B7-CB15-3F61"
          v-model="author"
          :options="optionsAuthor"
          @search="searchAuthor"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Article" label-for="F2E60-482B-D7C6-2D40">
        <v-select
          inputId="F2E60-482B-D7C6-2D40"
          v-model="article"
          :options="optionsArticle"
          @search="searchArticle"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group class="abc-checkbox">
        <input type="checkbox" v-model="moderated" id="8CF53-2469-60A4-CF56" />
        <label for="8CF53-2469-60A4-CF56">Moderated</label>
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

        text: '',

        author: '',

        article: '',

        moderated: false,
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.commentsForm.data,

        optionsAuthor: (state) => state.commentsForm.searchResultAuthor,

        optionsArticle: (state) => state.commentsForm.searchResultArticle,
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
        searchAuthor: 'commentsForm/searchAuthor',

        searchArticle: 'commentsForm/searchArticle',

        newHandler: 'commentsForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          text: this.text,

          author: this.author,

          article: this.article,

          moderated: this.moderated,
        };

        data.author = this.author.value;

        data.article = this.article.value;

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/comments');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },

      resetData() {
        this.text = '';

        this.author = '';

        this.article = '';

        this.moderated = false;
      },
    },
    async beforeMount() {
      await this.searchAuthor();

      await this.searchArticle();
    },
    components: { ImageUploader, FileUploader },
  };
</script>

<style scoped></style>
