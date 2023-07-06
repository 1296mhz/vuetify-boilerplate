import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/Login.vue';
import RootPage from '../views/Root.vue';

Vue.use(VueRouter)
export const routes = [
  { path: '/', component: RootPage },
]
// console.log(process.env.VUE_APP_AUTH)
// console.log(typeof process.env.VUE_APP_AUTH)
const vueAppAuth = Boolean(process.env.VUE_APP_AUTH);

if (vueAppAuth) {routes.push({ path: '/login', component: LoginPage })}

export const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router