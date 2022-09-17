<template>
  <ion-app>
    <ion-router-outlet>
      <transition name="fade" mode="out-in"></transition
    ></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default defineComponent({
  data() {
    return {
      isLoggedIn: false,
      bool: true,
    };
  },
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("You are loged in.");
        this.isLoggedIn = true;
      } else {
        console.log("No user");
        this.isLoggedIn = false;
      }
    });
  },
});
</script>
<style>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
ion-content {
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
  --background: linear-gradient(
    to bottom right,
    rgb(29, 40, 101),
    rgb(17, 87, 48)
  );
}
</style>