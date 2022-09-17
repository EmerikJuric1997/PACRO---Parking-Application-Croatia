<template>
  <ion-page class="font">
    <header-component />
    <ion-content :fullscreen="true" color="dark">
      <ion-row>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Ime</ion-label>
            <ion-label position="floating" color="success">{{
              nameValid
            }}</ion-label>
            <ion-input clear-input v-model="name" required></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Prezime</ion-label>
            <ion-label position="floating" color="success">{{
              surnameValid
            }}</ion-label>
            <ion-input clear-input v-model="surname" required></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Broj tablice</ion-label>
            <ion-label position="floating" color="success">{{
              plateValid
            }}</ion-label>
            <ion-input
              clear-input
              v-model="licensePlate"
              placeholder="Primjer: OS123AB"
              required
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Email</ion-label>
            <ion-label position="floating" color="success">{{
              emailValid
            }}</ion-label>
            <ion-input clear-input v-model="email" required></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="12">
          <ion-item color="dark">
            <ion-label position="floating">Lozinka</ion-label>
            <ion-label position="floating" color="success">{{
              passwordValid
            }}</ion-label>
            <app-show-hide-password>
              <ion-input
                clear-input
                type="password"
                v-model="password"
                required
              ></ion-input>
            </app-show-hide-password>
          </ion-item>
        </ion-col>
        <ion-col style="display: flex; justify-content: center">
          <ion-button
            v-bind:id="idMsg"
            color="secondary"
            shape="round"
            fill="outline"
            @click="registerEmailPassword()"
            type="submit"
            >Registriraj se</ion-button
          >
        </ion-col>
        <pop-up-vue v-if="errorMsg == true"></pop-up-vue>
        <ion-col class="ion-text-center" size="12">
          <p style="font-size: 12px; color: lightblue">Ili se registrirajte sa:</p>
        </ion-col>
        <ion-col class="ion-text-end">
          <ion-icon
            :icon="logoFacebook"
            class="ikona facebook"
            @click="registerFacebook()"
          />
        </ion-col>
        <ion-col class="ion-text-start">
          <ion-icon
            :icon="logoGoogle"
            class="ikona google"
            @click="registerGoogle()"
          />
        </ion-col>
        <ion-col size="12" class="ion-text-center">
          <p style="font-size: 10px; color: lightblue">
            Već imate korisnički račun?<a
              href="/signin"
              style="
                font-size: 11px;
                padding-left: 5px;
                text-decoration: none;
                color: aqua;
              "
              >Prijavi se</a
            >
          </p>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import router from "@/router";
import { db } from "@/main";
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
      name: "",
      surname: "",
      licensePlate: "",
      password: "",
      logoFacebook,
      logoGoogle,
      errorMsg: false,
      idMsg: "",
      modal: false,
      emailValid: "",
      nameValid: "",
      surnameValid: "",
      plateValid: "",
      passwordValid: "",
    };
  },
  methods: {
    async register() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            const userid = user.user?.uid;
            var docData = {
              id: userid,
              name: this.name,
              surname: this.surname,
              licenseplate: this.licensePlate.toUpperCase(),
              email: this.email,
              paid: false,
              parkingExpirationTime: new Date(),
              role: "customer",
            };
            db.collection("users")
              .doc(userid)
              .set(docData)
              .then(() => {
                console.log("Document successfully written!");
              });
            router.push("/home");
          });
      } catch {
        console.log("error");
      }
    },
    registerEmailPassword() {
      if (
        this.email.length > 4 &&
        this.name.length > 2 &&
        this.surname.length > 2 &&
        this.licensePlate.length > 5 &&
        this.password.length > 5
      ) {
        this.register();
      } else {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        this.emailValid = "Unesite ispravnu email adresu";
        this.nameValid = "Unesite svoje ime";
        this.surnameValid = "Unesite svoje prezime";
        this.plateValid = "Unesite ispravni broj tablice";
        this.passwordValid = "Lozinka mora sadržavati minimalno 6 znakova";
      }
    },
    registerFacebook() {
      if (
        this.name.length > 2 &&
        this.surname.length > 2 &&
        this.licensePlate.length > 5
      ) {
        this.signInFacebook();
      } else {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        this.nameValid = "Unesite svoje ime";
        this.surnameValid = "Unesite svoje prezime";
        this.plateValid = "Unesite ispravni broj tablice";
      }
    },
    registerGoogle() {
      if (
        this.name.length > 2 &&
        this.surname.length > 2 &&
        this.licensePlate.length > 5
      ) {
        this.signInGoogle();
      } else {
        this.idMsg = "open-custom-dialog";
        this.errorMsg = true;
        this.nameValid = "Unesite svoje ime";
        this.surnameValid = "Unesite svoje prezime";
        this.plateValid = "Unesite ispravni broj tablice";
      }
    },
    async signInGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((user) => {
            const useremail = user.user?.email;
            const userid = user.user?.uid;
            var docData = {
              id: userid,
              name: this.name,
              surname: this.surname,
              licenseplate: this.licensePlate.toUpperCase(),
              email: useremail,
              parkingExpirationTime: new Date(),
              paid: false,
              role: "customer",
            };
            db.collection("users")
              .doc(userid)
              .set(docData)
              .then(() => {
                console.log("Document successfully written!");
              });
            router.push("/home");
          });
      } catch {
        console.log("Error.");
      }
    },
    async signInFacebook() {
      try {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((user) => {
            const useremail = user.user?.email;
            const userid = user.user?.uid;
            var docData = {
              id: userid,
              name: this.name,
              surname: this.surname,
              licenseplate: this.licensePlate.toUpperCase(),
              email: useremail,
              parkingExpirationTime: new Date(),
              paid: false,
              role: "customer",
            };

            db.collection("users")
              .doc(userid)
              .set(docData)
              .then(() => {
                console.log("Document successfully written!");
              });
            router.push("/home");
          });
      } catch {
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
</style>
