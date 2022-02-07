<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">Edit Comments</h4>

      <b-form-group label="Text" label-for="text">
        <b-form-textarea
          :rows="3"
          id="72610-EB8E-50AD-296A"
          label="text"
          v-model="text"
        />
      </b-form-group>

      <b-form-group label="Author" label-for="453A4-741C-3962-525E">
        <v-select
          inputId="453A4-741C-3962-525E"
          v-model="author"
          :options="optionsAuthor"
          @search="searchAuthor"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group label="Article" label-for="17BD9-48AC-748F-9A5E">
        <v-select
          inputId="17BD9-48AC-748F-9A5E"
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
        <input type="checkbox" v-model="moderated" id="7A8D8-AC8C-9C6A-A66B" />
        <label for="7A8D8-AC8C-9C6A-A66B">Moderated</label>
      </b-form-group>

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
        getData: 'commentsForm/getData',

        searchAuthor: 'commentsForm/searchAuthor',

        searchArticle: 'commentsForm/searchArticle',

        edit: 'commentsForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.text = this.text;

        data.author = this.author;

        data.article = this.article;

        data.moderated = this.moderated;

        data.author = this.author.value;

        data.article = this.article.value;

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/comments');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },

      formatData() {
        this.text = this.data.text;

        this.author = dataFormatter.usersOneListFormatter(this.data.author);

        this.article = dataFormatter.articlesOneListFormatter(
          this.data.article,
        );
      },
    },
    async beforeMount() {
      try {
        await this.searchAuthor();

        await this.searchArticle();

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

<style scoped></style>
