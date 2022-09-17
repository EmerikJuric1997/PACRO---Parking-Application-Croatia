import Vue from 'vue'
import VueRouter from 'vue-router'
import Firebase from "firebase/compat/app";
import 'firebase/auth';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/earnings',
    name: 'earnings',
    component: () => import('../views/EarningsView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/UsersView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/workers',
    name: 'workers',
    component: () => import('../views/WorkersView.vue'),
    meta: {
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  routes
})

export default router

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
}; 

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Nemate pristup!");
      next("/");
    }
  }else{
    next();
  }
});