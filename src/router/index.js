import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/Home.vue"),
    meta: {
      showTab: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import("../views/Category.vue"),
    meta: {
      showTab: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue"),
    meta: {
      showTab: false,
    },
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import("../views/Cart.vue"),
    meta: {
      showTab: true
    },
    props: true,
    beforeEnter: (to, from, next) => {
      // let state = localStorage.getItem('state')
      // console.dir("beforeEnter");
      let loginData = localStorage.getItem('token');
      // console.log(loginData);
      if (loginData != null) {
        next();
      } else {
        next({
          path: '/login',
          query: { fullPath: to.fullPath }
        });
      }
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import("../views/User.vue"),
    meta: {
      showTab: true
    },
    props: true,
    beforeEnter: (to, from, next) => {
      // let state = localStorage.getExpire('state')
      // let fullpath = to.fullPath
      let loginData = localStorage.getItem('token');
      if (loginData != null) {
        next();
      } else {

        next({
          path: '/login',
          // params: { fullPath: fullpath} 传不了
          query: { fullPath: to.fullPath }
        });
      }
    }
  },
  {
    path: '/detail/:id',
    component: () => import("../views/Detail.vue"),
    meta: {
      showTab: false
    },
  },
  {
    path: '/search',
    name:"Search",
    component: () => import("../views/Search.vue"),
    meta: {
      showTab: false
    },
  },
  {
    path: '/buy/:id',
    component: () => import("../views/Buynow.vue"),
    meta: {
      showTab: false
    },
  },
  {
    path: '/setting',
    name:"Setting",
    component: () => import("../views/Setting.vue"),
    meta: {
      showTab: false
    },
    beforeEnter: (to, from, next) => {
      // let state = localStorage.getExpire('state')
      // let fullpath = to.fullPath
      let loginData = localStorage.getItem('token');
      if (loginData != null) {
        next();
      } else {

        next({
          path: '/login',
          // params: { fullPath: fullpath} 传不了
          query: { fullPath: to.fullPath }
        });
      }
    }
  },
  {
    path: '/fastchose',
    name:"Fastchose",
    props:true,
    component: () => import("../views/Fastchose.vue"),
    meta: {
      showTab: false
    },
  },

]
// Storage.prototype.getExpire = key => {
//   let val = JSON.parse(localStorage.getItem(key));
//   console.log(val.timeout - Date.now());
//   if (val.timeout - Date.now() <= 0) {
//     console.log("del");
//     localStorage.removeItem(key);
//     return null;
//   } else if (!val.token) {
//     return val.token;
//   }
//   return val.token;
// }
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
