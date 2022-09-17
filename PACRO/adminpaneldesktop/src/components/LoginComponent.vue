<template>
    <v-container fluid>
      <v-row>
        <v-col cols="4" class="mx-auto">
          <v-form ref="form" v-model="valid" lazy-validation class="forma">
  
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              filled
              rounded
              color="primary"
              dark
            ></v-text-field>
  
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Lozinka"
              :counter="7"
              required
              color="green"
              darken-1
              filled
              rounded
              dark
            ></v-text-field>
            <v-col class="mx-auto text-center">
              <v-btn :disabled="!valid" color="amber darken-1" @click="login()">
                    Prijava
              </v-btn>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import 'firebase/compat/firestore';
  import router from '../router';
  export default {
    data: () => ({
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail je obavezan",
        (v) => /.+@.+\..+/.test(v) || "Unesite ispravan e-mail",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Lozinka je obavezna",
        (v) => (v && v.length > 6) || "Lozinka mora sadržavati minimalno 7 znakova",
      ],
    }),
  
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            console.log(user)
            router.push('/earnings')
          },
          (err) => {
            alert(err);
          }
        )
      },
    },
  };
  </script>
  <style scoped>
  .forma {
    margin-top: 200px;
  }
  </style>