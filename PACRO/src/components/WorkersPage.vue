<template>
  <ion-page>
    <ion-content>
      <ion-col size="12">
        <ion-card>
          <ion-row>
            <ion-col size="9">
              <ion-card-header style="color: white; font-size: 30px"><input id="search" v-model="search"
                  placeholder="Pretraži.." class="ion-text-center" /></ion-card-header>
            </ion-col>
            <ion-col size="3">
              <ion-icon @click="
                buttonOpenClose();
                getTickets();
                show();
              " v-if="showbuttonticket == false" :icon="searchCircleOutline" color="success" class="ion-padding-top"
                style="height: 55px; width: 55px"></ion-icon>
              <div v-if="showbuttonticket == true">
                <ion-icon @click="
                  show();
                  buttonOpenClose(); successsMess();
                " :icon="closeCircleOutline" class="ion-padding-top" style="height: 55px; width: 55px" color="dark">
                </ion-icon>
              </div>
            </ion-col>
          </ion-row>
          <div v-if="receiptButtonn == true">
            <ion-row v-if="receiptButtonn == true">
              <ion-col size="12" v-for="user in users" :key="user">
                <div id="cardTicket">
                  <ion-row>
                    <ion-col size="12" class="ion-text-center" v-if="mess == true">
                      <ion-text class="ion-text-center" style="color:white; font-size: 20px;"> Uspješno ste naplatili
                        kaznu. </ion-text>
                    </ion-col>
                  </ion-row>
                  <ion-card>
                    <ion-card-content>
                      <ion-row>
                        <ion-col size="12" v-if="user.paid == true" class="ion-text-center">
                          <ion-icon :icon="ellipse" color="success"></ion-icon>
                          <ion-text> Parking u tijeku</ion-text>
                        </ion-col>
                        <ion-col size="12" class="ion-text-center" v-if="user.paid == false">
                          <ion-icon :icon="ellipse" color="danger" style="height: 20px; width: 20px"></ion-icon>
                          <ion-text> Parking istekao</ion-text>
                        </ion-col>
                        <ion-col size="12" class="ion-text-center">
                          <ion-text></ion-text>
                          <ion-text>{{ user.zone }}</ion-text>
                        </ion-col>
                        <ion-col size="12" class="ion-text-center">
                          <ion-text style="font-size: 30px">{{
                          user.licenseplate
                          }}</ion-text>
                        </ion-col>
                        <ion-col size="12" class="ion-text-center">
                          <ion-text></ion-text>
                          <ion-text>{{ user.id }}</ion-text>
                        </ion-col>
                        <ion-col size="12" class="ion-text-center">
                          <ion-button color="dark" v-if="user.paid == false" @click="
                            ticketPayment(
                              user.id,
                              user.name,
                              user.surname,
                              user.licenseplate
                            );
                            getTickets(); successsMess();
                          ">Naplati kaznu<ion-icon :icon="cardOutline"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-card-content>
                  </ion-card>
                </div>
              </ion-col>
            </ion-row>
          </div>
          <ion-col size="12">
            <ion-card>
              <ion-card-content>
                <ion-row>
                  <ion-col size="10" style="font-size: 25px">
                    Nepostojeći korisnik
                  </ion-col>
                  <ion-col v-if="printPayment == false" size="2" class="ion-text-end">
                    <ion-icon @click="change()" color="dark" style="height: 40px; width: 40px" :icon="caretDownOutline">
                    </ion-icon>
                  </ion-col>
                  <ion-col v-if="printPayment == true" size="2" class="ion-text-end">
                    <ion-icon @click="change()" color="dark" style="height: 40px; width: 40px" :icon="caretUpOutline">
                    </ion-icon>
                  </ion-col>
                </ion-row>
              </ion-card-content>
              <ion-card id="form" v-if="printPayment == true">
                <ion-card-content>
                  <div class="container">
                    <div action="#" id="form1">
                      <input type="text" v-model="search">
                      <input disabled type="text" v-model="ticketPrice">
                      <input disabled type="text" v-model="accountNumber">
                      <input type="text" placeholder="Unesite naziv grada.." v-model="city">
                    </div>
                    <ion-row>
                      <ion-col class="ion-text-center">
                        <ion-button shape="round" color="dark" type="button" @click="printForm(search)">
                          Isprintaj kaznu</ion-button>
                      </ion-col>
                    </ion-row>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-card>
          </ion-col>
        </ion-card>
      </ion-col>
    </ion-content>
  </ion-page>
</template>
  
<script>
import { db } from "@/main";
import "firebase/compat/auth";
import { ellipse } from "ionicons/icons";
import Printjs from "print-js";
import {
  IonIcon,
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import {
  cardOutline,
  closeCircleOutline,
  searchCircleOutline,
  caretDownOutline,
  caretUpOutline,
} from "ionicons/icons";
export default {
  data() {
    return {
      users: [],
      showbuttonticket: false,
      accountNumber: "HR098324980830328490324",
      iconOpenClosee: true,
      ellipse,
      city: "",
      ticketPrice: "10€",
      mess: false,
      printPayment: false,
      plate: "",
      search: null,
      IonIcon,
      IonPage,
      IonContent,
      IonCardContent,
      IonRow,
      IonCol,
      IonLabel,
      IonInput,
      IonItem,
      IonButton,
      IonButtons,
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonCard,
      IonCardHeader,
      cardOutline,
      closeCircleOutline,
      searchCircleOutline,
      caretDownOutline,
      caretUpOutline,
    };
  },
  methods: {
    components: {
      ellipse,
      IonIcon,
      cardOutline,
      closeCircleOutline,
      searchCircleOutline,
      caretDownOutline,
      caretUpOutline,
      IonPage,
      IonCardContent,
      IonContent,
      IonRow,
      IonCol,
      IonLabel,
      IonInput,
      IonItem,
      IonButton,
      IonButtons,
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonCard,
      IonCardHeader,
    },
    show() {
      this.showbuttonticket = !this.showbuttonticket;
    },
    successsMess() {
      this.mess = !this.mess
    },
    buttonOpenClose() {
      this.receiptButtonn = !this.receiptButtonn;
      this.iconOpenClosee = !this.iconOpenClosee;
    },
    getTickets() {
      var a = this.search.toUpperCase();
      this.users = [];
      db.collection("users")
        .where("licenseplate", "==", a)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.users.push(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    ticketPayment(a, b, c, d) {
      var currentDateTime = new Date();
      var getTime = currentDateTime.getTime();
      var addHours = 24 * 60 * 60 * 1000;
      var expiredTime = new Date(getTime + addHours);
      db.collection("users").doc(a).update({
        paid: true,
        parkingExpirationTime: expiredTime,
      });
      db.collection("tickets").doc(`${currentDateTime}`).set({
        userId: a,
        userName: b,
        userSurname: c,
        licensePlate: d,
        ticketAddedAt: currentDateTime,
        price: 10,
        paid: false,
      });
    },
    printForm(lp) {
      var currentDateTime = new Date();
      var c = this.city;
      Printjs({
        printable: 'form1',
        type: 'html',
        targetStyles: ['*'],
        header: 'Parking kazna'
      });
      db.collection("tickets").doc(`${currentDateTime}`).set({
        licensePlate: lp,
        ticketAddedAt: currentDateTime,
        price: 10,
        paid: false,
        city: c,
      });
    },
    change() {
      this.printPayment = !this.printPayment;
    }
  },
};
</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");

ion-content {
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
}

@keyframes slideInTop {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }

  100% {
    transform: translateY(0%);
    opacity: 100;
  }
}

ion-card {
  --background: linear-gradient(to top left,
      rgb(52, 67, 168),
      rgb(35, 167, 95));
  color: white;
  animation: 1s ease-out 0s 1 slideInTop;
}

input#search {
  color: white;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 30px;
  height: 50px;
  width: 100%;
  animation: 1s ease-out 0s 1 slideInTop;
}

ion-icon {
  animation: 1s ease-out 0s 1 slideInTop;
}

::placeholder {
  color: white;
  opacity: 1;
}

input[type=text],
select,
textarea {
  width: 100%;
  padding: 12px;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  background: transparent;
  border-radius: 20px;
  border-color: rgb(37, 205, 231);
}

ion-card#form {
  --background: linear-gradient(to top left,
      rgba(31, 46, 139, 0.664),
      rgba(25, 108, 62, 0.649));
  color: white;
  animation: 1s ease-out 0s 1 slideInTop;
}
</style>