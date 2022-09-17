<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="informationCircleOutline" class="icon" />
        </ion-tab-button>

        <ion-tab-button tab="parking" href="/parkings">
          <ion-icon :icon="cardOutline" class="icon" />
        </ion-tab-button>

        <ion-tab-button tab="receipt" href="/receipts">
          <ion-icon :icon="hourglassOutline" class="icon" />
        </ion-tab-button>

        <ion-tab-button v-if="user.role == 'worker'" tab="ticket" href="/tickets">
          <ion-icon :icon="receiptOutline" class="icon" />
        </ion-tab-button>

        <ion-tab-button tab="logOut">
          <ion-icon :icon="personCircleOutline" class="icon" id="open-modal" expand="block" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <ion-modal trigger="open-modal" :initial-breakpoint="0.28" :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle">

      <ion-card>
        <ion-row>
          <ion-col size="12" class="ion-text-center" style="font-weight: 300; color: white">
            {{user.name}} {{ user.surname }}
          </ion-col>
          <ion-col size="12" class="ion-text-center" style="font-weight: 300; color: white">
            Trenutna tablica: {{user.licenseplate }}
          </ion-col>
        </ion-row>
        <ion-row><ion-col size="1"></ion-col>
          <ion-col size="8" class="ion-text-center">
            <input placeholder="Unesite drugu tablicu" class="ion-text-center ion-align-center ion-padding-top"
              id="inputComp" v-model="changePlate">
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-icon color="success" :icon="checkmarkCircleOutline" @click="updatePlate();pushUserWorker()"></ion-icon>
          </ion-col><ion-col size="1"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size=4></ion-col>
          <ion-col size=4 class="ion-padding-top ion-text-center">
            <ion-button shape="round" fill="outline" color="primary" @click="signOut();">Odjava</ion-button>
          </ion-col>
          <ion-col size=4></ion-col>
        </ion-row>
      </ion-card>

    </ion-modal>
  </ion-page>
</template>

<script>
import firebase from 'firebase/compat/app';
import { db } from "@/main";
import "firebase/compat/auth";
import router from '../router';
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonModal,
  IonRow,
  IonCol,
  IonButton,
  IonCard
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  home,
  receiptOutline,
  carSport,
  logIn,
  logOut,
  informationCircleOutline,
  cardOutline,
  hourglassOutline,
  logOutOutline,
  personCircleOutline,
  checkmarkCircleOutline
} from "ionicons/icons";

export default {
  data() {
    return {
      to: false,
      isLoggedIn: false,
      user: [],
      modal: false,
      changePlate: "",
    }
  },
  mounted() {
    this.pushUserWorker();
  },
  methods: {
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/signin');
          console.log("You are signed out.")
        })
        .catch((error) => {
          alert(error);
        });
    },
    pushUserWorker() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = [];
          this.isLoggedIn == true;
          const userid = user.uid;
          db.collection("users")
            .doc(userid)
            .get()
            .then((doc) => {
              this.user = (doc.data());
            });
        }
      })
    },
    updatePlate() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          var plate = this.changePlate.toUpperCase();
          db.collection("users").doc(userid).update({
            licenseplate: plate,
          });
        }
      })
    }
  },
  name: "TabsPage",
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonModal,

    IonRow,
    IonCol,
    IonButton,
    IonCard
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      home,
      receiptOutline,
      carSport,
      personCircleOutline,
      logIn,
      logOut,
      informationCircleOutline,
      cardOutline,
      hourglassOutline,
      logOutOutline,
      checkmarkCircleOutline
    };
  },
};
</script>
<style scoped>
.icon {
  color: rgb(0, 255, 162);
}

ion-tab-bar,
ion-tab-button {
  background-color: #005f75;
}

ion-icon {
  height: 40px;
  width: 40px;
  padding-top: 2px;
}

input#inputComp {
  font-size: 50px;
  padding-bottom: 15px;
  border-radius: 35px;
  justify-content: center;
  background: transparent;
  border-color: aqua;
  width: 100%;
  color: white;
  padding: 10px;
  font-size: 20px;
}

ion-card {
  --background: rgb(35, 35, 35);
}

ion-modal {
  --background: rgb(35, 35, 35);
}

::placeholder {
  color: rgb(163, 163, 163);
  opacity: 1;
}
</style>
