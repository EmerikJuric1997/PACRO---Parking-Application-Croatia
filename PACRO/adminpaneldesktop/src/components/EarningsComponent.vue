<template>
    <v-container>
        <v-row class="text-center pa-15">
            <v-col lg="6" md="6" sm="6" xl="6">
                <v-card class="mx-auto text-center" max-width="400">
                    <v-img class="white--text align-end pa-4 logo" height="200px" src="../assets/images/Logo.png">
                        <h3 class="text-center">Dobrodošao<span style="color:aqua"> {{ name }}</span></h3>
                    </v-img>


                </v-card>
            </v-col>
            <v-col lg="6" md="6" sm="6" xl="6">
                <v-card class="mx-auto text-center" color="green" dark max-width="400" height="200">
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline auto-draw :auto-draw-duration="2000" auto-draw-easing="linear" :value="value"
                                color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth
                                class="logo">
                            </v-sparkline>
                        </v-sheet>
                        <v-card-text>
                            <div class="text-h7 text-white font-weight-thin">
                                Zarada za 9. mjesec iznosi <h3>{{ currentEarning }} €</h3>
                            </div>
                        </v-card-text>
                    </v-card-text>


                </v-card>
            </v-col>
            <v-col lg="4" md="4" sm="4" xl="4">
                <v-card class="mx-auto logo" max-width="344" outlined color="grey darken-4" height="250">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-h7 text-white font-weight-thin" style="color:white">
                                Ukupna zarada
                            </div>
                            <v-list-item-title style="color:white" class="text-h5 mb-1">
                                {{ allEarnings }} €
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-avatar circle size="80" color="cyan accent-4">
                            <v-icon color="grey darken-4">mdi-cash-multiple</v-icon>
                        </v-list-item-avatar>
                    </v-list-item>
                    <div class="text-h7 text-white font-weight-thin" style="color:white">
                        Ukupna zarada za 2022. godinu do današnjeg datuma.
                    </div>
                </v-card>
            </v-col>
            <v-col lg="4" md="4" sm="4" xl="4">
                <v-card class="mx-auto text-center" color="cyan darken-3" dark max-width="400" height="250">
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline auto-draw :auto-draw-duration="2000" auto-draw-easing="linear"
                                :value="valuepast" color="rgba(255, 255, 255, .7)" height="100" padding="24"
                                stroke-linecap="round" smooth class="logo">
                            </v-sparkline>
                        </v-sheet>
                        <v-card-text>
                            <div class="text-h5 text-white font-weight-thin">
                                Zarada za 8. mjesec iznosi {{ pastMonthEarning }} €
                            </div>
                        </v-card-text>
                    </v-card-text>


                </v-card>
            </v-col>
            <v-col lg="4" md="4" sm="4" xl="4">
                <v-card class="mx-auto text-center" color="grey" dark height="250">
                    <v-icon @click="closeButton()" v-if="close == true" color="grey darken-4">mdi-close-circle</v-icon>
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline auto-draw :auto-draw-duration="2000" auto-draw-easing="linear"
                                :value="exactmonth" color="rgba(255, 255, 255, .7)" height="95" padding="24"
                                stroke-linecap="round" smooth class="logo">
                            </v-sparkline>
                        </v-sheet>
                        <v-card-text v-if="close == false">
                            <div class="text-h5 text-white font-weight-thin">
                                <v-col>
                                    <v-text-field label="upišite određeni mjesec za pregled zarade istoga "
                                        v-model="month" hide-details="auto" placeholder="npr. siječanj, veljača.."></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-btn @click="getExactMonth(month)">Pregledaj</v-btn>
                                </v-col>
                            </div>
                        </v-card-text>
                        <v-card-text style="font-size: 20px" class="font-weight-thin" v-else>Ukupna zarada za mjesec: {{ month }} iznosi: {{ exactMonth }} €</v-card-text>

                    </v-card-text>


                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
  import firebase from "firebase/compat/app";
  import { db } from "@/main";
import "firebase/compat/auth";
export default {
    name: 'EarningsComponent',

    data: () => ({
        allEarnings: null,
        currentEarning: null,
        pastMonthEarning: null,
        monthBeforePastEarning: null,
        month: "",
        exactMonth: null,
        close: false,
        name: "",
        value: [
            0,
            10000,
            20,
            5200,
            9800,
            22300,
        ],
        valuepast: [
            0,
            20000,
            2000,
            55200,
            9800,
            122300,
        ],
        valuebefore: [
            0,
            12000,
            23200432,
            552040,
            9804120,
            122300,
        ],
        exactmonth: [
            0,
            12230,
            2032130,
            550,
            9804120,
            122330,
        ],
    }),
    mounted() {
        this.allearnings()
        this.thisMonth();
        this.pastMonth();
        this.monthBeforePast();
        this.getCurrentUser();
    },
    methods: {
        allearnings() {
            {
                db.collection("earnings")
                    .where("name", "==", "allMonths")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.allEarnings = doc.data().total;
                        });
                    });
            }
        },
        thisMonth() {
            {
                const d = new Date();
                var cm = d.getMonth() + 1;
                db.collection("earnings")
                    .where("name", "==", cm)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.currentEarning = doc.data().total;
                        });
                    });
            }
        },
        pastMonth() {
            {
                const d = new Date();
                var cm = d.getMonth();
                db.collection("earnings")
                    .where("name", "==", cm)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.pastMonthEarning = doc.data().total;
                        });
                    });
            }
        },
        monthBeforePast() {
            {
                const d = new Date();
                var cm = d.getMonth() - 1;
                db.collection("earnings")
                    .where("name", "==", cm)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.monthBeforePastEarning = doc.data().total;
                        });
                    });
            }
        },
        getExactMonth(a) {
            {
                db.collection("earnings")
                    .where("monthname", "==", a)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.exactMonth = doc.data().total;
                        });
                        this.closeButton();
                    });
                    
            }
        },
        closeButton() {
            this.close = !this.close;
        },
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
                this.name = doc.data().name;
              });
            });
        }
      });
    },
    }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");

.v-row {
    font-family: "Plus Jakarta Sans", sans-serif;
}

.logo {
    transition: transform .5s;
}

.logo:hover {
    transform: scale(1.05);
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

.v-card {
    animation: 1s ease-out 0s 1 slideInTop;
}
</style>
  