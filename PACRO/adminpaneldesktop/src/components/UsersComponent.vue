<template>
        <v-container>
            <v-row class="pt-10 pl-15">
                <v-col lg="3" md="3" sm="3" xl="3"><h1 class="font-weight-light heading" style="color:white;">Korisnici<v-icon class="pl-3 pb-1" style="color: yellow">mdi-account-circle</v-icon></h1></v-col>
                <v-col lg="3" md="3" sm="3" xl="3"><v-text-field
                  placeholder="Ime.."
      hide-details="auto"
      dark
      color="primary"
      v-model="name"
    ></v-text-field></v-col>
    <v-col lg="3" md="3" sm="3" xl="3"><v-text-field
      placeholder="Prezime.."
      color="green"
      dark
      v-model="surname"
      hide-details="auto"
    ></v-text-field></v-col>
    <v-col lg="1" md="1" sm="1" xl="1"><v-icon @click="getOneUsers(name, surname)" class="pl-3 pt-5" color="primary">mdi-account-search</v-icon></v-col>
    <v-col lg="1" md="1" sm="1" xl="1"><v-icon @click="getUsers()" class="pl-3 pt-5" color="green">mdi-close-circle</v-icon></v-col>
            </v-row>
  <v-row class="text-center pl-15">

    <v-col lg="3" md="3" sm="3" xl="3" v-for="user in users" :key="user">
        <template>
  <v-card
    class="mx-auto"
    max-width="400"
    color="grey darken-4"
    elevation="15"
  >
    <v-card-text class="text-h5" style="color: white;">
      {{ user.name }} {{ user.surname }}
    </v-card-text>
    <v-card-text style="color: white;">
        Broj tablice: {{ user.licenseplate }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        class="mx-auto font-weight-bold"
        @click="updateUserToWorker(user.id)"
      >
      <v-icon class="pl-3 pb-1 mx-auto" color="primary">mdi-account-hard-hat-outline</v-icon>
      </v-btn>

      <v-btn
        color="green"
        text
        class="mx-auto font-weight-bold"
        @click="deleteUser(user.id)"
      >
        Obriši
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
    </v-col>
  </v-row></v-container>
</template>

<script>
    import "firebase/compat/firestore";
import { db } from "@/main";
import "firebase/compat/auth";
export default {
data() {
    return {
        users: [],
        name: "",
        surname: ""
    }
},
mounted() {
    this.getUsers();
},
methods: {
    getUsers() {
            {
              this.users = [];
                db.collection("users").where("role", "==", "customer")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.users.push(doc.data());
                        });
                        console.log(this.users)
                    });
            }
        },
        deleteUser(a) {
          var delete_ref = db.collection("users").where("id", "==", a);
          var batch = db.batch();
          this.users = [];
          delete_ref.get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              this.getUsers();
              batch.delete(doc.ref);
              return batch.commit();
            });
          });
    },
    updateUserToWorker(a) {
        this.users = [];
        db.collection("users").doc(a).update({
                    role: 'worker',
                  });
                  this.getUsers();
    },
    getOneUsers(a, b) {
            
              this.users = [];
                db.collection("users").where("name", "==", a).where("surname", "==", b)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.users.push(doc.data());
                        });
                    });
            
        }
}
}
</script>

<style scoped>
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
.v-card{
    animation: 1s ease-out 0s 1 slideInTop;
}
.heading{
    animation: 1s ease-out 0s 1 slideInTop;
}
.v-text-field {
  animation: 1s ease-out 0s 1 slideInTop;
}
.v-icon {
  animation: 1s ease-out 0s 1 slideInTop;
}
</style>