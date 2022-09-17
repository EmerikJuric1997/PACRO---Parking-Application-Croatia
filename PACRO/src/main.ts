import { ref, createApp, onMounted } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});

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


