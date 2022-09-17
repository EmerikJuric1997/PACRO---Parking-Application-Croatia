<template>
  <ion-page class="font">
    <header-component />
    <ion-content :fullscreen="true" color="dark">
      <ion-row>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Email</ion-label>
            <ion-input clear-input v-model="email"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="12">
          <ion-item color="alert">
            <ion-label position="floating">Lozinka</ion-label>
            <app-show-hide-password>
              <ion-input clear-input v-model="password"></ion-input>
            </app-show-hide-password>
          </ion-item>
        </ion-col>
        <ion-col style="display: flex; justify-content: center">
          <ion-button
            v-bind:id="idMsg"
            @click="signIn()"
            color="secondary"
            shape="round"
            fill="outline"
            >Prijavi se</ion-button
          >
        </ion-col>
        <pop-up-vue v-if="errorMsg == true"></pop-up-vue>
      </ion-row>
      <ion-row>
        <ion-col class="ion-text-center" size="12">
          <p style="font-size: 12px; color: lightblue">Ili se prijavite sa:</p>
        </ion-col>
        <ion-col class="ion-text-end">
          <ion-icon
            :icon="logoFacebook"
            class="ikona facebook"
            @click="signInFacebook()"
          />
        </ion-col>
        <ion-col class="ion-text-start">
          <ion-icon
            :icon="logoGoogle"
            class="ikona google"
            @click="signInGoogle()"
          />
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="ion-text-center">
          <p style="font-size: 10px; color: lightblue">
            Nemate korisnički račun?<a
              href="/signup"
              style="
                font-size: 11px;
                padding-left: 5px;
                text-decoration: none;
                color: aqua;
              "
              >Registrirajte se</a
            >
          </p>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import router from "../router";
import PopUpVue from "../components/PopUp.vue";
import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  data() {
    return {
      email: "",
      logoFacebook,
      logoGoogle,
      password: "",
      popUp: false,
      idMsg: "",
      errorMsg: false,
    };
  },
  methods: {
    async signIn() {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            router.push("/home");
          });
      } catch {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        console.log("Wrong input.");
      }
    },
    async signInGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            router.push("/home");
          });
      } catch {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        console.log("Error.");
      }
    },
    signInFacebook() {
      try {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            router.push("/home");
          });
      } catch {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        console.log("Error.");
      }
    },
  },
  name: "Tab1Page",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonLabel,
    IonInput,
    IonItem,
    HeaderComponent,
    IonButton,
    PopUpVue,
  },
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");
ion-content {
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
}
.ikona {
  width: 60px;
  height: 35px;
}
.facebook {
  color: rgb(0, 149, 255);
}
.google {
  color: rgb(0, 255, 140);
}

ion-content{
  --background: dark;
}
</style>