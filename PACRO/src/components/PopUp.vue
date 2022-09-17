<template>
    <ion-modal class="st" id="example-modal" v-bind="modal" trigger="open-custom-dialog">
        <h4 style="font-size: 20px;color: white; text-transform: none;" class="ion-text-center ion-padding">Niste ipunili sva polja ili ste unijeli nevažeću email adresu ili lozinku</h4>
    </ion-modal>
</template>
<script lang="ts">
  import {
    IonModal,
  } from '@ionic/vue';
  import { personCircle } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
        return {
            modal: false,
        }
    },
    components: {
      IonModal,
    },
    methods: {
      close() {
        this.modal = false;
      },
    },
    setup() {
      return { personCircle };
    }
  });
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100&display=swap");

  ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --max-width: 250px;
    --min-height: 150px;
    --height: fit-content;
    --border-radius: 30px;
    --box-shadow: 0 10px 300px rgba(0, 0, 100);
    --background: linear-gradient(to bottom right, rgb(49, 68, 171), rgb(30, 158, 88));
  }
  
.st {
 font-family: "Plus Jakarta Sans", sans-serif;
}
</style>
