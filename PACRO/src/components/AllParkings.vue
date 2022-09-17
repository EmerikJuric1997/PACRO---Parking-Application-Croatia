<template>
  <ion-page fullscreen="true">
    <ion-content>
      <ion-row>
        <ion-col
          v-for="parking in parking1"
          :key="parking"
          size="12"
          class="ion-padding-top ion-justify-content-center ion-text-center"
        >
          <ion-card style="border-radius: 28px">
            <ion-card-header>
              <ion-card-title class="ion-text-start" color="light">{{
                parking.name
              }}</ion-card-title>
              <ion-card-subtitle
                class="ion-text-start"
                style="font-size: 15px; text-transform: none"
                color="light"
                >Cijena: {{ parking.price }} € / sat</ion-card-subtitle
              >
            </ion-card-header>

            <ion-card-content style="color: white" class="ion-text-start"
              >{{ parking.name }} uključuje sljedeće ulice:
              {{ parking.street }}</ion-card-content
            >
            <ion-col v-if="buttonPay1 == false"
              ><ion-icon
                :icon="caretDownOutline"
                @click="buttonPayy1()"
                color="dark"
              ></ion-icon
            ></ion-col>
            <ion-col v-else
              ><ion-icon
                v-if="showHidePayPal == true"
                :icon="caretUpOutline"
                color="dark"
                @click="buttonPayy1()"
              ></ion-icon
            ></ion-col>
            <div v-if="buttonPay1 == true">
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light">Unesite broj sati</ion-label>
                <input
                  type="number"
                  class="ion-text-center"
                  style="
                    width: 150px;
                    background-color: rgba(255, 255, 255, 0);
                    color: white;
                    border-radius: 20px;
                    border-color: white;
                  "
                  v-model="hoursAmount"
                /> </ion-item
              ><ion-col></ion-col>
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light"
                  >Ukupna cijena: {{ totalPrice1() }} €</ion-label
                >
              </ion-item>
              <ion-col></ion-col>
              <div v-if="showHidePayPal == true">
                <ion-button
                  expand="block"
                  @click="
                    showHide();
                    paypalPayment();
                  "
                  shape="round"
                  color="dark"
                  style="
                    display: flex;
                    padding-bottom: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 60px;
                  "
                  >Kupi kartu</ion-button
                >
              </div>
              <div v-if="showHidePayPal == false">
                <ion-icon
                  :icon="closeCircleOutline"
                  color="dark"
                  @click="
                    buttonPayy1();
                    showHide();
                  "
                ></ion-icon>
              </div>
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
                    >{{ totalPrice1() }} €</span
                  ></ion-text
                >
              </ion-col>
              <ion-col size="12"></ion-col>

              <div id="paypalButton1"></div>
            </div>
          </ion-card>
        </ion-col>
        <ion-col
          v-for="parking in parking2"
          :key="parking"
          size="12"
          class="ion-padding-top ion-justify-content-center ion-text-center"
        >
          <ion-card style="border-radius: 28px">
            <ion-card-header>
              <ion-card-title class="ion-text-start" color="light">{{
                parking.name
              }}</ion-card-title>
              <ion-card-subtitle
                class="ion-text-start"
                style="font-size: 15px; text-transform: none"
                color="light"
                >Cijena: {{ parking.price }} € / sat</ion-card-subtitle
              >
            </ion-card-header>

            <ion-card-content style="color: white" class="ion-text-start"
              >{{ parking.name }} uključuje sljedeće ulice:
              {{ parking.street }}</ion-card-content
            >
            <ion-col v-if="buttonPay2 == false"
              ><ion-icon
                :icon="caretDownOutline"
                @click="buttonPayy2()"
                color="dark"
              ></ion-icon
            ></ion-col>
            <ion-col v-else
              ><ion-icon
                v-if="showHidePayPal == true"
                :icon="caretUpOutline"
                color="dark"
                @click="buttonPayy2()"
              ></ion-icon
            ></ion-col>
            <div v-if="buttonPay2 == true">
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light">Unesite broj sati</ion-label>
                <input
                  type="number"
                  class="ion-text-center"
                  style="
                    width: 150px;
                    background-color: rgba(255, 255, 255, 0);
                    color: white;
                    border-radius: 20px;
                    border-color: white;
                  "
                  v-model="hoursAmount2"
                /> </ion-item
              ><ion-col></ion-col>
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light"
                  >Ukupna cijena: {{ totalPrice2() }} €</ion-label
                >
              </ion-item>
              <ion-col></ion-col>
              <div v-if="showHidePayPal == true">
                <ion-button
                  expand="block"
                  @click="
                    showHide();
                    paypalPayment2();
                  "
                  shape="round"
                  color="dark"
                  style="
                    display: flex;
                    padding-bottom: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 60px;
                  "
                  >Kupi kartu</ion-button
                >
              </div>
              <div v-if="showHidePayPal == false">
                <ion-icon
                  :icon="closeCircleOutline"
                  color="dark"
                  @click="
                    buttonPayy2();
                    showHide();
                  "
                ></ion-icon>
              </div>
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
                    >{{ totalPrice2() }} €</span
                  ></ion-text
                >
              </ion-col>
              <ion-col size="12"></ion-col>

              <div id="paypalButton2"></div>
            </div>
          </ion-card>
        </ion-col>
        <ion-col
          v-for="parking in parking3"
          :key="parking"
          size="12"
          class="ion-padding-top ion-justify-content-center ion-text-center"
        >
          <ion-card style="border-radius: 28px">
            <ion-card-header>
              <ion-card-title class="ion-text-start" color="light">{{
                parking.name
              }}</ion-card-title>
              <ion-card-subtitle
                class="ion-text-start"
                style="font-size: 15px; text-transform: none"
                color="light"
                >Cijena: {{ parking.price }} € / sat</ion-card-subtitle
              >
            </ion-card-header>

            <ion-card-content style="color: white" class="ion-text-start"
              >{{ parking.name }} uključuje sljedeće ulice:
              {{ parking.street }}</ion-card-content
            >
            <ion-col v-if="buttonPay3 == false"
              ><ion-icon
                :icon="caretDownOutline"
                @click="buttonPayy3()"
                color="dark"
              ></ion-icon
            ></ion-col>
            <ion-col v-else
              ><ion-icon
                v-if="showHidePayPal == true"
                :icon="caretUpOutline"
                color="dark"
                @click="buttonPayy3()"
              ></ion-icon
            ></ion-col>
            <div v-if="buttonPay3 == true">
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light">Unesite broj sati</ion-label>
                <input
                  type="number"
                  class="ion-text-center"
                  style="
                    width: 150px;
                    background-color: rgba(255, 255, 255, 0);
                    color: white;
                    border-radius: 20px;
                    border-color: white;
                  "
                  v-model="hoursAmount3"
                /> </ion-item
              ><ion-col></ion-col>
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light"
                  >Ukupna cijena: {{ totalPrice3() }} €</ion-label
                >
              </ion-item>
              <ion-col></ion-col>
              <div v-if="showHidePayPal == true">
                <ion-button
                  expand="block"
                  @click="
                    showHide();
                    paypalPayment3();
                  "
                  shape="round"
                  color="dark"
                  style="
                    display: flex;
                    padding-bottom: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 60px;
                  "
                  >Kupi kartu</ion-button
                >
              </div>
              <div v-if="showHidePayPal == false">
                <ion-icon
                  :icon="closeCircleOutline"
                  color="dark"
                  @click="
                    buttonPayy3();
                    showHide();
                  "
                ></ion-icon>
              </div>
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
                    >{{ totalPrice3() }} €</span
                  ></ion-text
                >
              </ion-col>
              <ion-col size="12"></ion-col>

              <div id="paypalButton3"></div>
            </div>
          </ion-card>
        </ion-col>
        <ion-col
          v-for="parking in parking4"
          :key="parking"
          size="12"
          class="ion-padding-top ion-justify-content-center ion-text-center"
        >
          <ion-card style="border-radius: 28px">
            <ion-card-header>
              <ion-card-title class="ion-text-start" color="light">{{
                parking.name
              }}</ion-card-title>
              <ion-card-subtitle
                class="ion-text-start"
                style="font-size: 15px; text-transform: none"
                color="light"
                >Cijena: {{ parking.price }} € / sat</ion-card-subtitle
              >
            </ion-card-header>

            <ion-card-content style="color: white" class="ion-text-start"
              >{{ parking.name }} uključuje sljedeće ulice:
              {{ parking.street }}</ion-card-content
            >
            <ion-col v-if="buttonPay4 == false"
              ><ion-icon
                :icon="caretDownOutline"
                @click="buttonPayy4()"
                color="dark"
              ></ion-icon
            ></ion-col>
            <ion-col v-else
              ><ion-icon
                v-if="showHidePayPal == true"
                :icon="caretUpOutline"
                color="dark"
                @click="buttonPayy4()"
              ></ion-icon
            ></ion-col>
            <div v-if="buttonPay4 == true">
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light">Unesite broj sati</ion-label>
                <input
                  type="number"
                  class="ion-text-center"
                  style="
                    width: 150px;
                    background-color: rgba(255, 255, 255, 0);
                    color: white;
                    border-radius: 20px;
                    border-color: white;
                  "
                  v-model="hoursAmount4"
                /> </ion-item
              ><ion-col></ion-col>
              <ion-item v-if="showHidePayPal == true">
                <ion-label color="light"
                  >Ukupna cijena: {{ totalPrice4() }} €</ion-label
                >
              </ion-item>
              <ion-col></ion-col>
              <div v-if="showHidePayPal == true">
                <ion-button
                  expand="block"
                  @click="
                    showHide();
                    paypalPayment4();
                  "
                  shape="round"
                  color="dark"
                  style="
                    display: flex;
                    padding-bottom: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 60px;
                  "
                  >Kupi kartu</ion-button
                >
              </div>
              <div v-if="showHidePayPal == false">
                <ion-icon
                  :icon="closeCircleOutline"
                  color="dark"
                  @click="
                    buttonPayy4();
                    showHide();
                  "
                ></ion-icon>
              </div>
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
                    >{{ totalPrice4() }} €</span
                  ></ion-text
                >
              </ion-col>
              <ion-col size="12"></ion-col>

              <div id="paypalButton4"></div>
            </div>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
<script>
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { db } from "@/main";
import "firebase/compat/auth";
import {
  caretDownOutline,
  caretUpOutline,
  closeCircleOutline,
} from "ionicons/icons";
import {
  IonPage,
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
IonCardTitle,
IonCardSubtitle,
IonCardContent,
IonText,
IonIcon,
} from "@ionic/vue";
import router from "@/router";
export default {
  data() {
    return {
      showHidePayPal: true,
      parking1: [],
      parking2: [],
      parking3: [],
      parking4: [],
      payButton: false,
      caretDownOutline,
      caretUpOutline,
      IonCard,
IonCardHeader,
IonText,
IonIcon,
IonCardTitle,
IonCardSubtitle,
      closeCircleOutline,
      buttonPay1: false,
      buttonPay2: false,
      buttonPay3: false,
      buttonPay4: false,
      hoursAmount: null,
      hoursAmount2: null,
      hoursAmount3: null,
      hoursAmount4: null,
      price1: "1",
      price2: "0.8",
      price3: "0.6",
      price4: "0.4",
      priceTotal: 0,
      moneyEarned: "",
      currentmonth: "",
      allEarnings: "",
      monthlyEarning: "",
      parkingZone1: "",
      IonCardContent,
      parkingZone2: "",
      parkingZone3: "",
      parkingZone4: "",
      email: "",
      id: "",
      name: "",
      surname: "",
      licensePlate: "",
      parkingExpirationTimeDb: "",
      user: {},
      receipts: [],
      parkingZone1Price: null,
      parkingZone2Price: null,
      parkingone3Price: null,
      parkingZone4Price: null,
    };
  },
  mounted() {
    this.allearnings();
    this.mothnlyEarnings();
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
    this.currentMonth();
    this.getParking1();
    this.getParking2();
    this.getParking3();
    this.getParking4();
  },
  methods: {
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
    paypalPayment() {
      const zone = this.parkingZone1;
      const zonePrice = this.parkingZone1Price;
      const cMonth = new String(this.currentmonth);
      const hoursAmount = this.hoursAmount;
      const allEarnings = this.allEarnings;
      const totalPrice = Math.round(this.priceTotal * 10) / 10;
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = (parseInt(allEarnings) + totalPrice);
      const addallMonthlyEarnings = (parseInt(monthlyEarnings) + totalPrice);
      /* eslint-disable */
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
                    value: totalPrice,
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
                  var currentDateTime = new Date();
                  var getTime = currentDateTime.getTime();
                  var addHours = hoursAmount * 60 * 60 * 1000;
                  var expiredTime = new Date(getTime + addHours);
                  const userid = user.uid;
                  db.collection("users").doc(userid).update({
                    parkingExpirationTime: expiredTime,
                    zone: zone,
                    paid: true,
                    zonePrice: zonePrice
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
                    paidAt: currentDateTime,
                    exiprationDate: expiredTime,
                    pricePaid: totalPrice,
                    zone: zone,
                  });
                  router.push("/receipts");
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton1");
    },
    paypalPayment2() {
      const zone = this.parkingZone2;
      const zonePrice = this.parkingZone2Price;
      const cMonth = new String(this.currentmonth);
      const hoursAmount = this.hoursAmount2;
      const allEarnings = this.allEarnings;
      const totalPrice = Math.round(this.priceTotal * 10) / 10;
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = (parseInt(allEarnings) + totalPrice);
      const addallMonthlyEarnings = (parseInt(monthlyEarnings) + totalPrice);
      /* eslint-disable */
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
                    value: totalPrice,
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
                  var currentDateTime = new Date();
                  var getTime = currentDateTime.getTime();
                  var addHours = hoursAmount * 60 * 60 * 1000;
                  var expiredTime = new Date(getTime + addHours);
                  const userid = user.uid;
                  db.collection("users").doc(userid).update({
                    parkingExpirationTime: expiredTime,
                    zone: zone,
                    paid: true,
                    zonePrice: zonePrice
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
                    paidAt: currentDateTime,
                    exiprationDate: expiredTime,
                    pricePaid: totalPrice,
                    zone: zone,
                  });
                  router.push("/receipts");
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton2");
    },
    paypalPayment3() {
      const zone = this.parkingZone3;
      const zonePrice = this.parkingZone3Price;
      const cMonth = new String(this.currentmonth);
      console.log(cMonth);
      const hoursAmount = this.hoursAmount3;
      const allEarnings = this.allEarnings;
      const totalPrice = Math.round(this.priceTotal * 10) / 10;
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = (parseInt(allEarnings) + totalPrice);
      const addallMonthlyEarnings = (parseInt(monthlyEarnings) + totalPrice);
      /* eslint-disable */
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
                    value: totalPrice,
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
                  var currentDateTime = new Date();
                  var getTime = currentDateTime.getTime();
                  var addHours = hoursAmount * 60 * 60 * 1000;
                  var expiredTime = new Date(getTime + addHours);
                  const userid = user.uid;
                  db.collection("users").doc(userid).update({
                    parkingExpirationTime: expiredTime,
                    zone: zone,
                    paid: true,
                    zonePrice: zonePrice
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
                    paidAt: currentDateTime,
                    exiprationDate: expiredTime,
                    pricePaid: totalPrice,
                    zone: zone,
                  });
                  router.push("/receipts");
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton3");
    },
    paypalPayment4() {
      const zone = this.parkingZone4;
      const zonePrice = this.parkingZone4Price;
      const cMonth = new String(this.currentmonth);
      console.log(cMonth);
      const hoursAmount = this.hoursAmount4;
      const allEarnings = this.allEarnings;
      const totalPrice = Math.round(this.priceTotal * 10) / 10;
      const monthlyEarnings = this.monthlyEarning;
      const addallEarnings = (parseInt(allEarnings) + totalPrice);
      const addallMonthlyEarnings = (parseInt(monthlyEarnings) + totalPrice);
      /* eslint-disable */
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
                    value: totalPrice,
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
                  var currentDateTime = new Date();
                  var getTime = currentDateTime.getTime();
                  var addHours = hoursAmount * 60 * 60 * 1000;
                  var expiredTime = new Date(getTime + addHours);
                  const userid = user.uid;
                  db.collection("users").doc(userid).update({
                    parkingExpirationTime: expiredTime,
                    zone: zone,
                    paid: true,
                    zonePrice: zonePrice
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
                    paidAt: currentDateTime,
                    exiprationDate: expiredTime,
                    pricePaid: totalPrice,
                    zone: zone,
                  });
                  router.push("/receipts");
                } else {
                }
              });
            });
          },
        })
        .render("#paypalButton4");
    },
    showHide() {
      this.showHidePayPal = !this.showHidePayPal;
      this.errorMessage = "";
    },
    totalPrice1() {
      return (this.priceTotal = this.price1 * this.hoursAmount);
    },
    totalPrice2() {
      return (this.priceTotal = this.price2 * this.hoursAmount2);
    },
    totalPrice3() {
      return (this.priceTotal = this.price3 * this.hoursAmount3);
    },
    totalPrice4() {
      return (this.priceTotal = this.price4 * this.hoursAmount4);
    },
    getParking1() {
      db.collection("Parkings")
        .where("name", "==", "1.Zona")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.parking1.push(doc.data());
            this.parkingZone1 = doc.data().name;
            this.parkingZone1Price = doc.data().price;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getParking2() {
      db.collection("Parkings")
        .where("name", "==", "2.Zona")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.parking2.push(doc.data());
            this.parkingZone2 = doc.data().name;
            this.parkingZone2Price = doc.data().price;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getParking3() {
      db.collection("Parkings")
        .where("name", "==", "3.Zona")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.parking3.push(doc.data());
            this.parkingZone3 = doc.data().name;
            this.parkingZone3Price = doc.data().price;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getParking4() {
      db.collection("Parkings")
        .where("name", "==", "4.Zona")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.parking4.push(doc.data());
            this.parkingZone4 = doc.data().name;
            this.parkingZone4Price = doc.data().price;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getReceipts() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userid = user.uid;
          const receiptsMount = db
            .collection("receipts")
            .where("id", "==", userid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.receipts.push(doc.data());
              });
            });
        } else {
          console.log("Error loading receipts");
        }
      });
    },
    buttonPayy1() {
      this.buttonPay1 = !this.buttonPay1;
    },
    buttonPayy2() {
      this.buttonPay2 = !this.buttonPay2;
    },
    buttonPayy3() {
      this.buttonPay3 = !this.buttonPay3;
    },
    buttonPayy4() {
      this.buttonPay4 = !this.buttonPay4;
    },
    paymentModalButton() {
      this.payButton = !this.payButton;
    },

    components: {
      IonCardTitle,
      IonCardContent,
      IonContent,
      IonPage,
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
      caretDownOutline,
      caretUpOutline,
      closeCircleOutline,
      IonCard,
      IonCardSubtitle,
IonCardHeader,
IonText,
IonIcon,
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");
ion-content {
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
  --background: linear-gradient(
    to bottom right,
    rgb(29, 40, 101),
    rgb(17, 87, 48)
  );
}
ion-card {
  --background: linear-gradient(
    to bottom right,
    rgb(49, 68, 171),
    rgb(30, 158, 88)
  );
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
}
ion-icon {
  animation: 1s ease-out 0s 1 slideInTop;
}
ion-button {
  animation: 1s ease-out 0s 1 slideInTop;
}
ion-icon {
  height: 50px;
  width: 50px;
  animation: 1s ease-out 0s 1 slideInTop;
}

ion-item {
  animation: 1s ease-out 0s 1 slideInTop;
  --background: linear-gradient(
    to bottom left,
    rgb(20, 28, 70),
    rgb(15, 74, 42)
  );
}
ion-modal {
  --width: fit-content;
  --min-width: 250px;
  --max-width: 250px;
  --min-height: 150px;
  --height: fit-content;
  --border-radius: 30px;
  --box-shadow: 0 10px 300px rgba(0, 0, 100);
  --background: linear-gradient(
    to bottom right,
    rgb(49, 68, 171),
    rgb(30, 158, 88)
  );
}
div #paypalButton {
  animation: 1s ease-out 0s 1 slideInTop;
  padding-top: 12px;
}
</style>