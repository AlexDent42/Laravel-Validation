import Vue from 'vue';
import Router from 'vue-router';
// Layout
import Layout from '@/components/Layout/Layout';
// Main
import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import Forgot from '@/pages/Forgot/Forgot';
import Reset from '@/pages/Reset/Reset';
import ChangePassword from '@/pages/ChangePassword/ChangePassword';
import Register from '@/pages/Register/Register';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail';
import ErrorPage from '@/pages/Error/Error';
import starterPage from '@/pages/Starter/StarterPage';

import UsersTable from '@/components/CRUD/Users/UsersTable';
import UsersEdit from '@/components/CRUD/Users/UsersEdit';
import UsersNew from '@/components/CRUD/Users/UsersNew';

import ArticlesTable from '@/components/CRUD/Articles/ArticlesTable';
import ArticlesEdit from '@/components/CRUD/Articles/ArticlesEdit';
import ArticlesNew from '@/components/CRUD/Articles/ArticlesNew';

import TagsTable from '@/components/CRUD/Tags/TagsTable';
import TagsEdit from '@/components/CRUD/Tags/TagsEdit';
import TagsNew from '@/components/CRUD/Tags/TagsNew';

import CategoriesTable from '@/components/CRUD/Categories/CategoriesTable';
import CategoriesEdit from '@/components/CRUD/Categories/CategoriesEdit';
import CategoriesNew from '@/components/CRUD/Categories/CategoriesNew';

import CommentsTable from '@/components/CRUD/Comments/CommentsTable';
import CommentsEdit from '@/components/CRUD/Comments/CommentsEdit';
import CommentsNew from '@/components/CRUD/Comments/CommentsNew';

// Profile
import Profile from '@/pages/Profile/Profile';

import { isAuthenticated } from './mixins/auth';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: { name: 'Dashboard' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot,
    },
    {
      path: '/password-reset',
      name: 'reset',
      component: Reset,
    },
    {
      path: '/verify-email',
      component: VerifyEmail,
    },
    {
      path: '/starter',
      name: 'starter',
      component: starterPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Dashboard' },
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/starter' });
      },
      children: [
        // main pages
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Dashboard' },
      component: Layout,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login' });
      },
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersTable,
        },
        {
          path: 'users/:id/edit',
          component: UsersEdit,
        },
        {
          path: 'users/new',
          component: UsersNew,
        },
        {
          path: 'users/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/users/${from.params.id}/edit`);
          },
        },

        {
          path: 'articles',
          name: 'Articles',
          component: ArticlesTable,
        },
        {
          path: 'articles/:id/edit',
          component: ArticlesEdit,
        },
        {
          path: 'articles/new',
          component: ArticlesNew,
        },
        {
          path: 'articles/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/articles/${from.params.id}/edit`);
          },
        },

        {
          path: 'tags',
          name: 'Tags',
          component: TagsTable,
        },
        {
          path: 'tags/:id/edit',
          component: TagsEdit,
        },
        {
          path: 'tags/new',
          component: TagsNew,
        },
        {
          path: 'tags/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/tags/${from.params.id}/edit`);
          },
        },

        {
          path: 'categories',
          name: 'Categories',
          component: CategoriesTable,
        },
        {
          path: 'categories/:id/edit',
          component: CategoriesEdit,
        },
        {
          path: 'categories/new',
          component: CategoriesNew,
        },
        {
          path: 'categories/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/categories/${from.params.id}/edit`);
          },
        },

        {
          path: 'comments',
          name: 'Comments',
          component: CommentsTable,
        },
        {
          path: 'comments/:id/edit',
          component: CommentsEdit,
        },
        {
          path: 'comments/new',
          component: CommentsNew,
        },
        {
          path: 'comments/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/comments/${from.params.id}/edit`);
          },
        },
      ],
    },
  ],
});

export default router;
