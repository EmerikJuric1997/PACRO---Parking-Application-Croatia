<template>
    <div>
      <WorkersComponent />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import WorkersComponent from '@/components/WorkersComponent.vue'
  
  export default {
    name: 'EarningsView',
    components: {
        WorkersComponent
    }
  }
  </script>