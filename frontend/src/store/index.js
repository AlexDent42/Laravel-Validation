import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import auth from './auth';
import register from './register';
import dashboard from './dashboard';
import forgot from './forgot';
import reset from './reset';
import changePassword from './changePassword';
import users from './lists/usersList';
import usersForm from './forms/usersForm';

import articles from './lists/articlesList';
import articlesForm from './forms/articlesForm';

import tags from './lists/tagsList';
import tagsForm from './forms/tagsForm';

import categories from './lists/categoriesList';
import categoriesForm from './forms/categoriesForm';

import comments from './lists/commentsList';
import commentsForm from './forms/commentsForm';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    register,
    dashboard,
    forgot,
    reset,
    changePassword,

    users,
    usersForm,

    articles,
    articlesForm,

    tags,
    tagsForm,

    categories,
    categoriesForm,

    comments,
    commentsForm,
  },
});
