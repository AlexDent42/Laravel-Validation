<template>
  <form :filters="filters" :entity="entity">
    <b-row>
      <b-col md="3">
        <b-form-group label="Field" label-for="idm214568400">
          <v-select
            @input="apply"
            v-model="selectedFilters"
            label="Filter"
            inputId="idm214568400"
            :options="filters.map((item) => item.label)"
            ref="value"
          >
          </v-select>
        </b-form-group>
      </b-col>

      <b-col md="3" v-if="filterType !== 'number'">
        <b-form-group label="Contains" label-for="idm194066656">
          <b-form-input
            @input="apply"
            v-model="filterValue"
            type="text"
            id="idm194066656"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col class="d-flex" md="3" v-else>
        <b-form-group class="mr-3" label="From" label-for="idm1940666">
          <b-form-input
            @input="apply"
            v-model="filterValueFrom"
            type="number"
            id="idm1940666"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="To" label-for="idm1940667">
          <b-form-input
            @input="apply"
            v-model="filterValueTo"
            type="number"
            id="idm1940667"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col md="3" class="align-self-end">
        <button class="btn btn-primary mb-3" @click="delFilter">Delete</button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
  export default {
    name: 'FilterForm',
    props: {
      id: Number,
      filters: Array,
      entity: String,
    },
    data() {
      return {
        showFilters: false,
        selectedFilters: '',
        filterValue: null,
        filterValueFrom: null,
        filterValueTo: null,
        filterType: 'string',
      };
    },

    methods: {
      apply() {
        let index = this.filters
          .map((item) => item.label)
          .indexOf(this.selectedFilters);
        this.$emit('apply', {
          id: this.id,
          number: !!this.filters[index].number,
          filter: this.filters[index].title,
          value: this.filterValue,
          valueFrom: this.filterValueFrom,
          valueTo: this.filterValueTo,
        });
      },
      delFilter() {
        this.$emit('delFilter');
      },
    },
    watch: {
      selectedFilters() {
        let numbers = this.filters.map((item) => item.number);
        let labels = this.filters.map((item) => item.label);
        let index = labels.indexOf(this.selectedFilters);
        index >= 0 && numbers[index]
          ? (this.filterType = 'number')
          : (this.filterType = 'string');
      },
    },
  };
</script>

<style src="./Filter.scss" lang="scss"></style>
