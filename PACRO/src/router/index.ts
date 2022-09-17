import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import Firebase from "firebase/compat/app";
import 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/SlidePage.vue')
  },
  {
    path: '/signin',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/SignupPage.vue')
  },
  {
    path: '/',
    component: TabsPage,
    meta: {
      requiresAuth: true,
    },
    children: [

      {
        path: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'parkings',
        component: () => import('@/views/ParkingPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'receipts',
        component: () => import('@/views/ReceiptPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'tickets',
        component: () => import('@/views/WorkPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

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
      alert("No access!");
      next("/");
    }
  }else{
    next();
  }
});

export default router