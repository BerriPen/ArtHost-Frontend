<template>
    <q-page>
      <div class="bg-white q-mb-sm">
        <div class="q-pa-md">
          <p class="text-h5 text-center">Browse Events</p>
        </div>
      </div>
      <div class="q-px-xl" v-for="(event, index) in eventList" :key="index">
        <EventCard
          :event="event"
          @click="$router.push({ path: 'eventDetails/' + index })"
        />
      </div>
    </q-page>
  </template>
  
  <script>
  import axios from "axios";
  import EventCard from "src/components/EventCard.vue";
  
  export default {
    name: "EventPage",
    data() {
      return {
        eventList: null,
      };
    },
    mounted() {
      this.fetchEvents();
    },
    components: {
      EventCard,
    },
    methods: {
      async fetchEvents() {
        console.log("fetching event details");
        const url = "http://127.0.0.1:8000/api/main/eventList";
  
        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            this.eventList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  