import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyB_cleuSRK6WoHvptZ-vxh8sYSuJcz44gI",
  authDomain: "pacro2-22f1b.firebaseapp.com",
  projectId: "pacro2-22f1b",
  storageBucket: "pacro2-22f1b.appspot.com",
  messagingSenderId: "897970496466",
  appId: "1:897970496466:web:0b564c7e4fab947ef5de0b",
  measurementId: "G-5LM2LN6RY8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export {
  db
}
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
