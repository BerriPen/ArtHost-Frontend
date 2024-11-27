<template>
  <q-page>
    <div>
        <EventCard/>
        HOME PAGE
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
    EventCard
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
