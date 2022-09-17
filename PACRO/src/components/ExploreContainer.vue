<template>
  <ion-page>
    <ion-row>
      <ion-col
        size="12"
        class="ion-text-center"
        v-if="secondsWatch < 0 || secondsWatch == null"
      >
        <ion-card>
          <ion-card-header style="font-size: 40px; color: white"
            >{{ userName }}, Vaš parking je istekao.</ion-card-header
          >
        </ion-card> </ion-col
      ><ion-col v-else size="12" class="ion-text-center">
        <ion-card>
          <ion-card-header style="color: white; font-size: 12px"
            >{{ userName }}, Vaš parking ističe za:
          </ion-card-header>
          <ion-card-content
            class="ion-text-center"
            style="font-size: 35px; color: white"
            >{{ finalExpiration }}</ion-card-content
          >

          <ion-card><ion-row><ion-col size="12"></ion-col>
            <ion-col size="12" class="ion-text-center" v-if="buttonPay1 == false"><ion-text  color="light">Produžite parking</ion-text></ion-col>
            <ion-col v-if="buttonPay1 == false" class="ion-text-center"
              >
              <ion-icon
                :icon="caretDownOutline"
                @click="buttonPayy1()"
                color="dark"
                style="height: 50px; width: 50px"
              ></ion-icon
            ></ion-col>
            <ion-col size="12" v-else class="ion-text-center"
              ><ion-icon
                v-if="showHidePayPal == true"
                :icon="caretUpOutline"
                color="dark"
                @click="buttonPayy1()"
                style="height: 50px; width: 50px"
              ></ion-icon
            ></ion-col></ion-row>
            <div v-if="buttonPay1 == true">
              <ion-row>
                <ion-col size="12" class="ion-text-center">
                  <div v-if="showHidePayPal == true">
                    <input
                      type="number"
                      class="ion-text-center"
                      placeholder="broj sati"
                      style="
                        background-color: transparent;
                        color: white;
                        border-radius: 20px;
                        border-color: white;
                      "
                      v-model="newNumber"
                    /></div
                ></ion-col>
                <ion-col
                  size="12"
                  v-if="showHidePayPal == true"
                  class="ion-text-center"
                >
                  <ion-button
                    class="ion-text-center"
                    expand="block"
                    @click="
                      showHide();
                      paypalExtendTicket();
                    "
                    shape="round"
                    color="dark"
                    >Kupi kartu</ion-button
                  ></ion-col
                >
              </ion-row>
              <ion-row
                ><ion-col size="12" class="ion-text-center">
                  <div v-if="showHidePayPal == false">
                    <ion-icon
                      :icon="closeCircleOutline"
                      color="dark"
                      class="ion-text-center"
                      style="height: 50px; width: 50px"
                      @click="
                        buttonPayy1();
                        showHide();
                      "
                    ></ion-icon></div
                ></ion-col>
                <ion-col
                  size="12"
                  class="ion-text-center ion-padding-bottom"
                  style="padding-bottom: 15px"
                  v-if="showHidePayPal == false"
                >
                  <ion-text
                    v-if="showHidePayPal == false"
                    color="light"
                    style="font-size: 20px"
                    >Ukupno za platiti:
                    <span style="font-size: 30px"
                      >{{ Math.round(totalPrice() * 10) / 10 }} €</span
                    ></ion-text
                  >
                </ion-col></ion-row
              >
              <ion-col size="12"></ion-col>

              <div id="paypalButton6"></div></div
          >
        </ion-card>
        </ion-card>
      </ion-col>
      <ion-col size="12">
        <ion-card>
          <ion-row>
            <ion-col size="9">
              <ion-card-header style="color: white; font-size: 30px"
                >Računi</ion-card-header
              ></ion-col
            >
            <ion-col size="3">
              <ion-icon
                @click="
                  buttonOpen();
                  getReceipts();
                "
                v-if="iconOpenClose == true"
                :icon="caretDownOutline"
                color="success"
                class="ion-padding-top"
                style="height: 50px; width: 50px"
              ></ion-icon>
              <ion-icon
                @click="buttonOpen()"
                v-if="iconOpenClose == false"
                :icon="caretUpOutline"
                color="success"
                class="ion-padding-top"
                style="height: 50px; width: 50px"
              ></ion-icon> </ion-col
          ></ion-row>
          <div v-if="receiptButton == true">
            <div v-if="receiptButton == true">
              <ion-row v-for="receipt in receipts" :key="receipt">
                <ion-col
                  size="12"
                  class="ion-text-start"
                  v-if="receipt.name == 'karta'"
                >
                  <ion-card id="inside">
                    <ion-card-header style="font-size: 25px">{{
                      receipt.name
                    }}</ion-card-header>
                    <ion-card-header style="color: white; font-size: 10px"
                      >Id: {{ receipt.id }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Datum uplate parkinga:
                      {{ new Date(receipt.paidAt * 1000).getMonth() + 1 }} /
                      {{ new Date(receipt.paidAt * 1000).getDate() }} /
                      {{
                        new Date(receipt.paidAt * 1000).getYear() - 69
                      }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Vrijeme uplate parkinga:
                      {{ new Date(receipt.paidAt * 1000).getHours() }}:{{
                        new Date(receipt.paidAt * 1000).getMinutes()
                      }}:{{
                        new Date(receipt.paidAt * 1000).getSeconds()
                      }}</ion-card-header
                    >
                    <ion-card-header
                      v-bind="parkingTimeDelete"
                      style="color: white; font-size: 15px"
                      >Vrijeme isteka parkinga:
                      {{
                        new Date(receipt.exiprationDate * 1000).getHours()
                      }}:{{
                        new Date(receipt.exiprationDate * 1000).getMinutes()
                      }}:{{
                        new Date(receipt.exiprationDate * 1000).getSeconds()
                      }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Zona: {{ receipt.zone }}</ion-card-header
                    >
                    <ion-row>
                      <ion-col size="8">
                        <ion-card-header style="color: white; font-size: 15px"
                          >Cijena: {{ Math.round(receipt.pricePaid * 10) / 10 }} €</ion-card-header
                        ></ion-col
                      >
                      <ion-col size="4" class="ion-text-end">
                        <ion-button
                          color="danger"
                          @click="deleteOneReceipt(receipt.paidAt)"
                          ><ion-icon
                            :icon="trashOutline"
                          ></ion-icon></ion-button></ion-col></ion-row></ion-card
                ></ion-col>
                <ion-col size="12" class="ion-text-start" v-else>
                  <ion-card id="inside">
                    <ion-card-header style="font-size: 25px">{{
                      receipt.name
                    }}</ion-card-header>
                    <ion-card-header style="color: white; font-size: 10px"
                      >Id: {{ receipt.id }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Datum izdatka kazne:
                      {{ new Date(receipt.paidAt * 1000).getMonth() + 1 }} /
                      {{ new Date(receipt.paidAt * 1000).getDate() }} /
                      {{
                        new Date(receipt.paidAt * 1000).getYear() - 69
                      }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Vrijeme izdatka parkinga:
                      {{ new Date(receipt.paidAt * 1000).getHours() }}:{{
                        new Date(receipt.paidAt * 1000).getMinutes()
                      }}:{{
                        new Date(receipt.paidAt * 1000).getSeconds()
                      }}</ion-card-header
                    >
                    <ion-card-header style="color: white; font-size: 15px"
                      >Cijena kazne: {{ receipt.pricePaid }}</ion-card-header
                    >
                    <ion-row>
                      <ion-col size="6">
                        <ion-card-header style="color: white; font-size: 15px"
                          >Cijena: {{ receipt.pricePaid }} €</ion-card-header
                        ></ion-col
                      >
                      <ion-col size="6" class="ion-text-end">
                        <ion-button
                          color="danger"
                          @click="deleteOneReceipt(receipt.paidAt)"
                          ><ion-icon
                            :icon="trashOutline"
                          ></ion-icon></ion-button></ion-col></ion-row></ion-card
                ></ion-col>
              </ion-row>
            </div>
          </div>
        </ion-card>
      </ion-col>
      <ion-col size="12">
        <ion-card>
          <ion-row>
            <ion-col size="9">
              <ion-card-header style="color: white; font-size: 30px"
                >Kazne</ion-card-header
              ></ion-col
            >
            <ion-col size="3">
              <ion-icon
                @click="
                  buttonOpenClose();
                  getTickets();
                "
                v-if="iconOpenClosee == true"
                :icon="caretDownOutline"
                color="primary"
                class="ion-padding-top"
                style="height: 50px; width: 50px"
              ></ion-icon>
              <div v-if="showbuttonticket == false">
                <ion-icon
                  @click="buttonOpenClose()"
                  v-if="iconOpenClosee == false"
                  :icon="caretUpOutline"
                  color="primary"
                  class="ion-padding-top"
                  style="height: 50px; width: 50px"
                ></ion-icon>
              </div>
              <div v-if="showbuttonticket == true">
                <ion-icon
                  @click="
                    show();
                    buttonOpenClose();
                    removePayButton();
                  "
                  :icon="closeCircleOutline"
                  class="ion-padding-top"
                  style="height: 50px; width: 50px"
                  color="dark"
                ></ion-icon></div></ion-col
          ></ion-row>
          <div v-if="receiptButtonn == true">
            <ion-row>
              <ion-card-content style="color: white; font-size: 15px"
                >Kaznu morate platiti najkasnije 5 dana od datuma izdavanja
                kazne.</ion-card-content
              >
            </ion-row>
            <ion-row v-if="receiptButtonn == true">
              <ion-card v-for="ticket in tickets" :key="ticket" id="inside">
                <div v-if="ticket.paid == false">
                  <ion-card-header style="color: white">
                    Ime i prezime: {{ ticket.userName }}
                    {{ ticket.userSurname }}
                  </ion-card-header>
                  <ion-card-header style="color: white">
                    Broj tablice: {{ ticket.licensePlate }}
                  </ion-card-header>
                  <ion-card-header style="color: white">
                    Cijena kazne: {{ ticket.price }} €
                  </ion-card-header>
                  <ion-card-header style="color: white">
                    Datum izdatka kazne: {{ ticket.ticketAddedAt.toDate() }}
                  </ion-card-header>
                </div>
                <ion-row v-if="ticket.paid == false">
                  <ion-col size="3"></ion-col>
                  <ion-col size="6" class="ion-text-center"
                    ><div>
                      <ion-button
                        v-if="payButton == true"
                        shape="round"
                        color="dark"
                        @click="
                          paypalPaymentTicket(ticket.ticketAddedAt);
                          show();
                          removePayButton();
                        "
                        ><ion-icon :icon="cardOutline"></ion-icon
                        >Plati</ion-button
                      >
                    </div>
                  </ion-col>
                  <ion-col size="3"></ion-col>
                  <ion-col size="12">
                    <div>
                      <div id="paypalButton5"></div></div
                  ></ion-col> </ion-row
              ></ion-card>
            </ion-row>
          </div>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-page>
</template>

<script>
import firebase from "firebase/compat/app";
import { db } from "@/main";
import "firebase/compat/auth";
import router from "@/router";
import { IonIcon,IonCol,
IonRow,
IonPage,
IonCard,
IonText,
IonButton,
IonCardHeader,
IonCardContent } from "@ionic/vue";
import {
  caretDownOutline,
  caretUpOutline,
  trashOutline,
  cardOutline,
  closeCircleOutline,
} from "ionicons/icons";
export default {
  name: "ExploreContainer",
  data() {
    return {
      IonCol,
IonRow,
IonIcon,
IonCardHeader,
IonCardContent,
      expirationTime: null,
      closeCircleOutline,
      showhidePayPal: false,
      currentDateTime: null,
      showbuttonticket: false,
      currentDt: Date.now(),
      caretDownOutline,
      cardOutline,
      secondsWatch: null,
      caretUpOutline,
      trashOutline,
      iconOpenClosee: true,
      curr: null,
      exp: null,
      finalExpiration: null,
      distance: null,
      timer: "",
      expiredText: false,
      distanceNull: false,
      userName: "",
      receipts: [],
      exiprationDate: "",
      receiptButton: false,
      receiptButtonn: false,
      iconOpenClose: true,
      parkingEndTime: [],
      hours: "",
      minutes: "",
      seconds: "",
      days: "",
      tickets: [],
      payButton: true,
      currentParkingDate: null,
      newNumber: null,
      monthlyEarning: null,
      allEarnings: null,
      currentmonth: "",
      priceTotal: 0,
      OpenCard: false,
      CloseCard: false,
      buttonPay1: false,
      showHidePayPal: true,
    };
  },
  mounted() {
    function loadScript(url, callback) {
      const el = document.querySelector(`script[src="${url}"]`);
      if (!el) {
        const s = document.createElement("script");
        s.setAttribute("src", url);
        s.onload = callback;
        document.head.insertBefore(s, document.head.firstElementChild);
      }
    }
    /* eslint-disable */
    loadScript(
      "https://www.paypal.com/sdk/js?client-id=AbNWkysO0jvK5JlJPl6U1sBdyQyNJ-heSYpy4YQexANlJRPk9mInBt9WIBG2u5FfUkGAMHUkFJHINMoO&currency=EUR",
      () => {
        /* eslint-disable */
        paypal.Buttons({
          // Set up the transaction
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "0.01",
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove(data, actions) {
            return actions.order.capture().then((details) => {
              // Show a success message to the buyer
              alert(
                `Transaction completed by ${details.payer.name.given_name}`
              );
            });
          },
        });
      }
    );
    this.getReceipts();
   // this.timer = setInterval(() => {
    this.getTimeFromDb();
    this.getUser();
    //}, 1000)
    this.mothnlyEarnings();
    this.allearnings();
    this.currentMonth();
  },

  created() {},
  methods: {
    components: {
      closeCircleOutline,
      IonIcon,
      caretDownOutline,
      caretUpOutline,
      trashOutline,
      cardOutline,
      IonCol,
IonRow,
IonPage, IonCard,
IonText,
IonButton,
IonCardHeader,
IonCardContent
    },
    buttonPayy1() {
      this.buttonPay1 = !this.buttonPay1;
    },
    totalPrice() {
      return (this.priceTotal = this.price * this.newNumber);
    },
    showHide() {
      this.showHidePayPal = !this.showHidePayPal;
      this.errorMessage = "";
    },
    mothnlyEarnings() {
      {
        const d = new Date();
        var cm = d.getMonth() + 1;
        db.collection("earnings")
          .where("name", "==", cm)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.monthlyEarning = doc.data().total;
            });
          });
      }
    },
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
    currentMonth() {
      const d = new Date();
      this.currentmonth = d.getMonth() + 1;
    },
    buyCard() {
      router.push("/parkings");
    },
    removePayButton() {
      this.payButton = !this.payButton;
    },
    buttonOpen() {
      this.receiptButton = !this.receiptButton;
      this.iconOpenClose = !this.iconOpenClose;
    },
    buttonOpenClose() {
      this.receiptButtonn = !this.receiptButtonn;
      this.iconOpenClosee = !this.iconOpenClosee;
    },
    showHidePP() {
      this.showhidePayPal = !this.showhidePayPal;
    },
    show() {
      this.showbuttonticket = !this.showbuttonticket;
    },
    getTimeFromDb() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const a = firebase.firestore.Timestamp.now().toDate();
          this.currentDateTime = a;
          var useremail = user.email;
          const userid = user.uid;
          db.collection("users")
            .where("email", "==", useremail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.expirationTime = doc.data().parkingExpirationTime.toDate();
                this.userName = doc.data().name;
                this.exp = this.expirationTime.getTime();
                this.curr = this.currentDateTime.getTime();
                this.distance = this.exp - this.curr;
                var days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                  (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                  (this.distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
                this.secondsWatch = seconds;
                this.finalExpiration =
                  days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                if (seconds < 0) {
                  db.collection("users").doc(userid).update({
                    paid: false,
                  });
                }
              });
            });
        } else {
          console.log("error");
        }
      });
    },
    getReceipts() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          this.receipts = [];
          db.collection("receipts")
            .where("id", "==", userid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.receipts.push(doc.data());
              });
            });
          db.collection("users")
            .where("id", "==", userid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.parkingEndTime.push(doc.data().parkingExpirationTime);
              });
            });
        } else {
          console.log("Error loading receipts");
        }
      });
    },
    deleteOneReceipt(a) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          var delete_ref = db.collection("receipts").where("paidAt", "==", a);
          var batch = db.batch();

          delete_ref.get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              this.getReceipts();
              batch.delete(doc.ref);
              return batch.commit();
            });
          });
        } else {
          console.log("Error loading receipts");
        }
      });
    },
    getTickets() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          this.tickets = [];
          db.collection("tickets")
            .where("userId", "==", userid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.tickets.push(doc.data());
              });
            });
        } else {
          console.log("Error loading tickets");
        }
      });
    },
    paypalPaymentTicket(a) {
      const allEarnings = this.allEarnings;
      const totalPrice = 10;
      const cMonth = new String(this.currentmonth);
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = parseInt(allEarnings) + totalPrice;
      const addallMonthlyEarnings = parseInt(monthlyEarnings) + totalPrice;
      paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "silver",
            layout: "vertical",
            label: "pay",
          },
          // Set up the transaction
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 10,
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove(data, actions) {
            return actions.order.capture().then((details) => {
              // Show a success message to the buyer
              alert(
                `Transaction completed by ${details.payer.name.given_name}`
              );
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  const userid = user.uid;
                  var currentDateTime = new Date();
                  const b = a.toDate();
                  db.collection("tickets").doc(`${b}`).update({
                    paid: true,
                  });
                  db.collection("earnings").doc("allMonths").update({
                    total: addallEarnings,
                  });
                  db.collection("earnings").doc(cMonth).update({
                    total: addallMonthlyEarnings,
                  });
                  db.collection("receipts").doc().set({
                    name: "kazna",
                    id: userid,
                    paidAt: currentDateTime,
                    pricePaid: 10,
                  });
                  
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton5");
    },
    paypalExtendTicket() {
      const priceTotall = Math.round((this.priceTotal = this.price * this.newNumber) * 10) / 10;
      const cMonth = new String(this.currentmonth);
      const hoursAmount = this.newNumber;
      const allEarnings = this.allEarnings;
      const totalPrice = this.priceTotal;
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = parseInt(allEarnings) + totalPrice;
      const addallMonthlyEarnings = parseInt(monthlyEarnings) + totalPrice;
      const curr = this.currentParkingDate.toDate();
      const zone = this.zone;
      paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "silver",
            layout: "vertical",
            label: "pay",
          },
          // Set up the transaction
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: priceTotall,
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove(data, actions) {
            return actions.order.capture().then((details) => {
              // Show a success message to the buyer
              alert(
                `Transaction completed by ${details.payer.name.given_name}`
              );
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  const userid = user.uid;
                  var getTime = curr.getTime();
                  var now = new Date();
                  var addHours = hoursAmount * 60 * 60 * 1000;
                  var expiredTime = new Date(getTime + addHours);
                  db.collection("users").doc(userid).update({
                    parkingExpirationTime: expiredTime,
                    paid: true,
                  });
                  db.collection("earnings").doc("allMonths").update({
                    total: addallEarnings,
                  });
                  db.collection("earnings").doc(cMonth).update({
                    total: addallMonthlyEarnings,
                  });
                  db.collection("receipts").doc().set({
                    id: userid,
                    name: "karta",
                    paidAt: now,
                    exiprationDate: expiredTime,
                    pricePaid: totalPrice,
                    zone: zone,
                  });
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton6");
    },
    getUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userEmail = user.email;
          db.collection("users")
            .where("email", "==", userEmail)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.currentParkingDate = doc.data().parkingExpirationTime;
                this.price = doc.data().zonePrice;
                this.zone = doc.data().zone;
              });
            });
        }
      });
    },
    openCard() {
      this.OpenCard = !this.OpenCard;
    },
    closeCard() {
      this.OpenCard = !this.OpenCard;
      this.CloseCard = !this.CloseCard;
    },
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
  animation: 1s ease-out 0s 1 slideInTop;
  --width: fit-content;
  --height: fit-content;
  --border-radius: 30px;
  --box-shadow: 0 10px 300px rgba(0, 0, 100);
  --background: linear-gradient(
    to bottom right,
    rgb(49, 68, 171),
    rgb(30, 158, 88)
  );
}
ion-card#inside {
  animation: 1s ease-out 0s 1 slideInTop;
  --width: fit-content;
  --height: fit-content;
  --border-radius: 30px;
  --box-shadow: 0 10px 300px rgba(0, 0, 100);
  --background: linear-gradient(
    to bottom right,
    rgb(29, 39, 100),
    rgb(17, 85, 48)
  );
}
ion-button {
  animation: 1s ease-out 0s 1 slideInTop;
}

ion-icon {
  animation: 1s ease-out 0s 1 slideInTop;
}
ion-card-content {
  animation: 1s ease-out 0s 1 slideInTop;
}
ion-card-header {
  color: white;
}
input {
  color: white;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 30px;
  height: 40px;
  width: 50%;
  animation: 1s ease-out 0s 1 slideInTop;
}
::placeholder { 
  color: white;
  opacity: 1; 
}
</style>
