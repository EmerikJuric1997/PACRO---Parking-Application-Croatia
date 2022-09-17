<template>
  <ion-page>
    <ion-content :fullscreen="true" v-if="user.name == '' || user.name == null || user.licenseplate == null || user.licenseplate == ''">
      <ion-row>
        <ion-col size="12" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-text-center ion-padding-top">

            <ion-label position="floating" color="success">{{
              nameValid
            }}</ion-label>
            <input placeholder="Ime" clear-input v-model="name" required />
     
        </ion-col><ion-col size="2"></ion-col><ion-col size="2"></ion-col>
        <ion-col size="12" class="ion-text-center ion-padding-top">
            <ion-label position="floating" color="success">{{
              surnameValid
            }}</ion-label>
            <input placeholder="Prezime" clear-input v-model="surname" required />

        </ion-col><ion-col size="2"></ion-col><ion-col size="2"></ion-col>
        <ion-col size="12" class="ion-text-center ion-padding-top">

            <ion-label position="floating" color="success">{{
              plateValid
            }}</ion-label>
          <input placeholder="Broj tablice" clear-input v-model="licensePlate" required />

        </ion-col>        <ion-col size="2" class="ion-padding-top"></ion-col>
        <ion-col size="12" class="ion-text-center">
          <ion-button
            color="secondary"
            shape="round"
            fill="outline"
            @click="confirm()"
            type="submit"
            >Potvrdi</ion-button
          >
        </ion-col><ion-col size="2"></ion-col>
      </ion-row>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-row>
        <ion-col size="12" class="ion-text-center">
          <ion-img
            style="margin: auto; display: block"
            src="../assets/Logo.png"
          ></ion-img>
        </ion-col>

        <ion-col></ion-col>
        <ion-col size="10" class="ion-text-center ion-text-justify">
          <h1 class="subHeading">Osnovno</h1>
          <p class="description">
            Jednostavno odaberite parking zonu, odredite način plaćanja i spremni
            ste. Također, uz PACRO možete i unaprijed rezervirati parking i
            platiti parking za određeni dan. Naša aplikacija koristi dvije
            metode plaćanja, pomoću bankovne kartice i paypala-a, a za sve dodatne
            upite, informacije i nejasnoće možete nas kontaktirati na email: pacro@podrska.com.
          </p> </ion-col
        ><ion-col></ion-col>
      </ion-row>
      <ion-row class="ion-text-center">
        <ion-col></ion-col>
        <ion-col size="10" class="ion-text-center ion-text-justify">
          <h1 class="subHeading">Način plaćanja</h1>
          <p class="description">
            Mobilna aplikacija PACRO koristi online način plaćanja koristeći
            isključivo PayPal ili bankovnu karticu. Potrebno je imati valjanu bankovnu
            karticu ili PayPal račun kako bi se izvršila uplata.
          </p> </ion-col
        ><ion-col></ion-col>
      </ion-row>
      <ion-row><ion-col></ion-col>
        <ion-col size="12" class="ion-text-center">
          <ion-button
            style="
              background-image: url('../assets/paypal.png');
              background-size: cover;
              width: 18vh;
              height: 17vh;
            "
          ></ion-button>
        </ion-col>
      </ion-row>
      <div>
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { logoPaypal } from "ionicons/icons";
import firebase from "firebase/compat/app";
import router from "../router";
import { db } from "@/main";
import "firebase/compat/auth";
export default defineComponent({
  name: "Tab1Page",
  components: { IonContent, IonPage },
  data() {
    return {
      logoPaypal,
      nameValid: "",
      surnameValid: "",
      plateValid: "",
      name: "",
      surname: "",
      licensePlate: "",
      user: []
    };
  },
  mounted() {
this.pushUserWorker();
  },
  methods: {
    pushUserWorker() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          db.collection("users")
            .doc(userid)
            .get()
            .then((doc) => {
                this.user = (doc.data());
            });
    }})},
    confirm() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          const useremail = user.email;
          var docData = {
            id: userid,
              email: useremail,
              name: this.name,
              surname: this.surname,
              licenseplate: this.licensePlate.toUpperCase(),
              paid: false,
              parkingExpirationTime: new Date(),
              role: "customer",
            };
            db.collection("users")
              .doc(userid)
              .set(docData)
              .then(() => {
                router.push("/parkings");
                console.log("Document successfully written!");
              });
              this.pushUserWorker();
        }})
    }
  }
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");
ion-header {
  background-color: rgb(24, 50, 60);
}
ion-content {
  --background: linear-gradient(
    to bottom right,
    rgb(30, 41, 104),
    rgb(16, 82, 46)
  );
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(107, 107, 107, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  80% {
    transform: translateY(-800px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 100%;
  }
}
ion-img {
  width: 40%;
}

.titleDescription {
  color: white;
  font-size: 2vh;
}

ion-button {
  --box-shadow: rgba(0, 0, 0, 0.419) 5px 5px 10px;
  --background: rgba(255, 255, 255, 0);
}

.description {
  color: white;
  font-size: 2vh;
  text-justify: inter-word;
}

.subHeading {
  color: rgb(0, 255, 234);
}

@keyframes slideInTop {
  0% {
    transform: translateX(10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 100;
  }
}
ion-row {
  animation: 1s ease-out 0s 1 slideInTop;
}
input {
    background-color: transparent;
    border: 2px solid rgb(33, 202, 103);
    border-radius: 25px;
    outline: none;
    min-width: 250px;
    padding: 15px 20px;
    font-size: 16px;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    color: white;
  }

ion-button {
  animation: 1s ease-out 0s 1 slideInTop;
}
::placeholder { 
  color: white;
  opacity: 1; 
}
</style>
