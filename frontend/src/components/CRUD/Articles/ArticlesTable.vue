<template>
  <div>
    <router-link :to="$route.fullPath + '/new'">
      <button class="btn btn-primary">New</button>
    </router-link>
    <button class="btn btn-primary m-3" @click="addFilter">Add filter</button>
    <b-row v-show="showFilters">
      <b-col md="12">
        <FilterForm
          v-for="(component, index) in config"
          :filters="filters"
          :key="index"
          :id="index"
          @apply="apply"
          @delFilter="delFilter(index)"
        />
      </b-col>

      <b-col md="12" class="d-flex justify-content-end">
        <button class="btn btn-primary mb-3" @click="submitHandler">
          Apply
        </button>
        <button class="btn btn-primary mx-3 mb-3" @click.prevent="clearFilters">
          Clear
        </button>
      </b-col>
    </b-row>
    <div v-if="loading"><Loader /></div>
    <v-client-table
      v-else
      :data="tableData"
      :columns="columns"
      :options="options"
      @row-click="onRowClick"
      class="mt-3"
    >
      <template #author="props">
        <span>
          {{ dataFormatter.usersOneListFormatter(props.row.author).label }}
        </span>
      </template>

      <template #category="props">
        <span>
          {{
            dataFormatter.categoriesOneListFormatter(props.row.category).label
          }}
        </span>
      </template>

      <template #tags="props">
        <span
          v-for="(item, idx) in dataFormatter.tagsManyListFormatter(
            props.row.tags,
          )"
          :key="idx + props.row.tags"
          class="d-block"
        >
          {{ item }}
        </span>
      </template>

      <template #featured="props">
        <span>
          {{ dataFormatter.booleanFormatter(props.row.featured) }}
        </span>
      </template>

      <template #images="props">
        <div
          :style="{
            background: `url(${dataFormatter.oneImageFormatter(
              props.row.images,
            )}) center center / cover`,
          }"
          class="table-img"
        ></div>
      </template>

      <template #actions="props">
        <div>
          <router-link :to="`/admin/articles/${props.row.id}/edit`">
            <button class="btn btn-primary btn-xs mx-1">Edit</button>
          </router-link>
          <button
            @click.stop="setDeleteId(props.row.id)"
            class="btn btn-danger mx-1 btn-xs"
            v-b-modal.del
          >
            Delete
          </button>
        </div>
      </template>
    </v-client-table>

    <b-modal id="del" title="Confirm delete" cancel-variant="default">
      Are you sure you want to delete this item?

      <template #modal-footer="props">
        <button class="btn btn-primary" @click="$bvModal.hide('del')">
          Cancel
        </button>
        <button class="btn btn-danger" @click="del">Delete</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import Loader from '@/components/Loader/Loader';
  import dataFormatter from '@/use/dataFormatter.js';
  import FilterForm from '@/components/Filter/Filter';

  export default {
    components: { FilterForm, Loader },
    data() {
      return {
        config: [],
        columns: [
          'title',

          'body',

          'author',

          'category',

          'tags',

          'featured',

          'images',
          'actions',
        ],
        options: {
          headings: {
            title: 'Title',

            body: 'Body',

            author: 'Author',

            category: 'Category',

            tags: 'Tags',

            featured: 'Featured',

            images: 'Images',
          },
        },
        showFilters: false,
        filters: [
          { label: 'Title', title: 'title' },
          { label: 'Body', title: 'body' },

          { label: 'Author', title: 'author' },
          { label: 'Category', title: 'category' },
        ],
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.articles.loading,
        tableData: (state) => state.articles.rows,
        modalOpen: (state) => state.articles.modalOpen,
        deleteId: (state) => state.articles.deleteId,
      }),
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      submitHandler() {
        let request = '?';
        this.config.forEach((item) => {
          item.number
            ? (request += `${item.filter}Range=${item.valueFrom}&${item.filter}Range=${item.valueTo}&`)
            : (request += `${item.filter}=${item.value}&`);
        });
        this.getFilteredData(request);
      },
      clearFilters() {
        this.getData();
      },
      delFilter(index) {
        this.config.splice(index, 1);
        this.config.length === 0 ? (this.showFilters = false) : null;
      },
      addFilter() {
        !this.showFilters ? (this.showFilters = true) : null;
        this.config.push({});
      },
      apply(data) {
        let id = data.id;
        this.config.splice(id, 1, data);
      },
      onRowClick({ row }) {
        this.$router.push(`/admin/articles/${row.id}/edit`);
      },
      ...mapActions({
        getData: 'articles/getData',
        getFilteredData: 'articles/getFilteredData',
        deleteItem: 'articles/deleteItem',
      }),
      ...mapMutations({
        setDeleteId: 'articles/setDeleteId',
      }),
      del() {
        this.$bvModal.hide('del');
        this.deleteItem();
      },
    },
    beforeMount() {
      this.getData();
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
  .table-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .file {
    display: block;
    white-space: nowrap;
  }
</style>
