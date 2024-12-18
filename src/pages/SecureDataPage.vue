<template>
    <q-page>
      <q-btn @click="fetchSecureData" label="Fetch Secure Data" />
      <p>{{ message }}</p>
    </q-page>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        message: '',
      };
    },
    methods: {
      async fetchSecureData() {
        try {
          const response = await api.get('/secure-data/');
          this.message = response.data.message;
        } catch (error) {
          this.message = 'Failed to fetch secure data.';
          console.error(error);
        }
      },
    },
  };
  </script>
  