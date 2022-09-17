<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonContent, IonPage }
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
