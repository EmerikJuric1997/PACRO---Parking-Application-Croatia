<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      app
      class="navigation-drawer"
      dark 
    >
      <v-sheet
        class="v-sheet pa-4"
      >
        <v-avatar
          class="mb-4"
          size="64"
        >      <img
        src="./assets/images/user.png"
        alt="userImage"
      ></v-avatar>

        <div class="email">{{ u }}</div>
      </v-sheet>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link"
          link
          :to="link.href"
        >
          <v-list-item-icon>
            <v-icon class="v-icon">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="v-text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signout()">
          <v-list-item-icon><v-icon>mdi-logout-variant</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="v-text">Odjava</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="v-main">
<router-view />
    </v-main>
  </v-app>
</template>

<script>
  import firebase from "firebase/compat/app";
  import { db } from "@/main";
import "firebase/compat/auth";
import router from "./router";
  export default {
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: null,
      u: null,
      user: [],
      admin: false,
      loggedIn: false,
      links: [
        {icon: 'mdi-currency-eur', text: 'Zarada', href: '/earnings'},
        {icon: 'mdi-account-circle', text: 'Korisnici', href: '/users'},
        {icon: 'mdi-account-hard-hat-outline', text: 'Radnici', href: '/workers'},
      ],
    }),
    mounted() {
      this.getCurrentUser();
    },
    methods: {
      getCurrentUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
          this.u = user.email;
          db.collection("users")
            .where("role", "==", "admin")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.user.push(doc.data());
                this.u = user.email;
                this.admin = true;
              });
            });
        }
      });
    },
    signout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("You are signed out.");
          router.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    },
    
    },
  }
</script>
<style scoped>
  
  @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");
.navigation-drawer{
  background: linear-gradient(
    to bottom,
    rgb(50, 50, 50),
    rgb(16, 16, 16)
  );
  font-family: "Plus Jakarta Sans", sans-serif;
  }
  .v-sheet {
    background: linear-gradient(
    to top,
    rgb(44, 44, 44),
    rgb(16, 16, 16)
  );
  }
  .v-main {
    background: linear-gradient(
    to top right,
    rgb(19, 26, 66),
    rgb(14, 75, 62)
  );
  font-family: "Plus Jakarta Sans", sans-serif;
  }
  .email {
    color:rgb(145, 145, 145);
  }
  .v-text {
    color: rgb(117, 221, 255);
  }
  .v-icon {
    color:rgb(79, 255, 164);
  }
</style>