<template>
    <div>
      <EarningsComponent />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import EarningsComponent from '@/components/EarningsComponent.vue'
  
  export default {
    name: 'EarningsView',
    components: {
      EarningsComponent
    }
  }
  </script>
  