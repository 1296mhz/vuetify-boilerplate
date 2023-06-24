// import Vue from 'vue';
// import Router from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue';
import RootPage from '../views/Root.vue';

// Vue.use(Router);

export const routes = [
    { path: '/', component: RootPage },
    { path: '/login', component: LoginPage },
    { path: '/:pathMatch(.*)', redirect: '/' }
  ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

  router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    // const publicPages = ['/login'];
    // const authRequired = !publicPages.includes(to.path);
    // const loggedIn = localStorage.getItem('user');
  
    // if (authRequired && !loggedIn) {
    //   return next('/login');
    // }
  
    next();
  })

export default router