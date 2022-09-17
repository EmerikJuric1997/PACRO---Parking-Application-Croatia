<template>
  <ion-page>
    <ion-content :fullscreen="true" color="dark">
      <ion-slides :options="slideOpts" style="top: 35%">
        <ion-slide>
          <ion-row>
            <ion-col size="12">
              <ion-img src="../assets/wtpacro.png"></ion-img>
              <ion-img class="glove" src="../assets/glove.png"></ion-img>
            </ion-col>
          </ion-row>
        </ion-slide>
        <ion-slide>
          <ion-row class="ion-text-center ion-justify-content-center">
            <ion-col
              size="6"
              size-lg="6"
              size-md="6"
              size-sm="6"
              size-xl="6"
              class="ion-padding-top ion-text-center"
            >
              <ion-button color="secondary" shape="round" fill="outline" @click="SigninPage()"
                >Prijavite se</ion-button
              >            </ion-col>
              <ion-col size="12"> <p class="divider">ili</p></ion-col>
              <ion-col size="12">
              <ion-button color="secondary" shape="round" fill="outline" @click="SignupPage()"
                >Registrirajte se</ion-button
              ></ion-col>

          </ion-row>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonSlides, IonSlide, IonRow, IonCol, IonImg } from "@ionic/vue";
import { defineComponent } from "vue";
import { logoFacebook, globeOutline } from "ionicons/icons";
import router from "@/router";

export default defineComponent({
  data() {
    return {
      logoFacebook,
      globeOutline,
    };
  },
  components: { IonSlides, IonSlide, IonRow, IonCol, IonImg },
  setup() {
    // Optional parameters to pass to the swiper instance. See https://swiperjs.com/swiper-api for valid options.
    const slideOpts = {
      initialSlide: 0,
      speed: 1000,
    };
    return { slideOpts };
  },
  methods: {
    SigninPage() {
      router.push("/signin");
    },
    SignupPage() {
      router.push("/signup");
    },
  },
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap");
ion-content {
  --ion-font-family: "Plus Jakarta Sans", sans-serif;
}
.glove {
  width: 80px;
  animation-name: glovemove;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
.content {
  font-size: 1.9vh;
}
.ikona {
  width: 60px;
  height: 35px;
  padding-top: 20px;
}
.facebook {
  color: rgb(0, 149, 255);
}
.google {
  color: rgb(0, 255, 140);
}
@keyframes glovemove {
  0% {
    margin-left: 60px;
    opacity: 0%;
  }
  30% {
    margin-left: 240px;
    opacity: 0%;
  }
  90% {
    margin-left: 60px;
    opacity: 100%;
  }
  100% {
    margin-left: 60px;
    opacity: 0%;
  }
}
.divider {
  display: flex;
  flex-direction: row;
  font-size: 2vh;
  color: rgb(0, 255, 140);
}
.divider:before,
.divider:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
  margin: auto;
  color: rgb(0, 255, 140);
}
.divider:before {
  margin-right: 10px;
}
.divider:after {
  margin-left: 10px;
}
</style>