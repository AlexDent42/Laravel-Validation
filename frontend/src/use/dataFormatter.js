import moment from 'moment';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      name: item.name,
      publicUrl: item.publicUrl || '',
    }));
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return { label: null, value: null };
    return { label: val.firstName, value: val.id };
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: item.firstName,
      id: item.id,
    }));
  },

  articlesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  articlesOneListFormatter(val) {
    if (!val) return { label: null, value: null };
    return { label: val.title, value: val.id };
  },
  articlesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: item.title,
      id: item.id,
    }));
  },

  tagsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  tagsOneListFormatter(val) {
    if (!val) return { label: null, value: null };
    return { label: val.name, value: val.id };
  },
  tagsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: item.name,
      id: item.id,
    }));
  },

  categoriesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  categoriesOneListFormatter(val) {
    if (!val) return { label: null, value: null };
    return { label: val.name, value: val.id };
  },
  categoriesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => ({
      label: item.name,
      id: item.id,
    }));
  },
};
