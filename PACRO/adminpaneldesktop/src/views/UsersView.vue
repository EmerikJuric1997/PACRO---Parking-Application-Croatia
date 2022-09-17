<template>
    <div>
      <UsersComponent />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import UsersComponent from '@/components/UsersComponent.vue'
  
  export default {
    name: 'EarningsView',
    components: {
        UsersComponent
    }
  }
  </script>