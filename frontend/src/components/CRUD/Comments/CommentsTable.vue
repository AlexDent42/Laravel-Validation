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

      <template #article="props">
        <span>
          {{ dataFormatter.articlesOneListFormatter(props.row.article).label }}
        </span>
      </template>

      <template #moderated="props">
        <span>
          {{ dataFormatter.booleanFormatter(props.row.moderated) }}
        </span>
      </template>

      <template #actions="props">
        <div>
          <router-link :to="`/admin/comments/${props.row.id}/edit`">
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
        columns: ['text', 'author', 'article', 'moderated', 'actions'],
        options: {
          headings: {
            text: 'Text',

            author: 'Author',

            article: 'Article',

            moderated: 'Moderated',
          },
        },
        showFilters: false,
        filters: [
          { label: 'Text', title: 'text' },

          { label: 'Author', title: 'author' },
          { label: 'Article', title: 'article' },
        ],
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.comments.loading,
        tableData: (state) => state.comments.rows,
        modalOpen: (state) => state.comments.modalOpen,
        deleteId: (state) => state.comments.deleteId,
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
        this.$router.push(`/admin/comments/${row.id}/edit`);
      },
      ...mapActions({
        getData: 'comments/getData',
        getFilteredData: 'comments/getFilteredData',
        deleteItem: 'comments/deleteItem',
      }),
      ...mapMutations({
        setDeleteId: 'comments/setDeleteId',
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
