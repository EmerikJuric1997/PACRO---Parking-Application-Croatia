<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <workers-page />
      </ion-content>
    </ion-page>
  </template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { IonPage, IonContent } from '@ionic/vue';
    import WorkersPage from '@/components/WorkersPage.vue';
    
    export default  defineComponent({
      name: 'Tab3Page',
      components: { IonContent, IonPage, WorkersPage }
    });
    </script>