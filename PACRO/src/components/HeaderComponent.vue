<template>
  <ion-row>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-row>
          <ion-col size="4"></ion-col>
          <ion-col size="4" style="display: flex; justify-content: center">
            <ion-img src="../assets/Logo.png" class="ion-padding-top"></ion-img>
          </ion-col>
          <ion-col size="4"></ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
  </ion-row>
</template>
<script>
import {
  IonHeader, ionCol, IonImg, IonToolbar,
  ionRow
} from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      IonHeader, ionCol, IonImg, IonToolbar,
      ionRow
    };
  },
  components: {
    IonHeader, ionCol, IonImg, IonToolbar,
    ionRow
  },
  name: 'HeaderComponent',
})
</script>