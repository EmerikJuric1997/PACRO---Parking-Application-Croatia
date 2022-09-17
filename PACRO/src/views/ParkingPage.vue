<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <all-parkings />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import AllParkings from '@/components/AllParkings.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonContent, IonPage, AllParkings }
});
</script>
<style scoped>
.logo{
  width: 90px;
}
ion-header{
  background-color: rgb(24, 50, 60);
}

</style>
