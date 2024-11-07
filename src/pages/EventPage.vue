<template>
  <q-page class="padding">
    <div>
      HOME PAGE
    </div>
    <div class="q-pa-md row">
      <q-card style="width: 700px; height: 200px;" class="rectangle-card">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" fit="cover" class="full-width full-height">
          <!-- Overlay with fading effect -->
          <div class="absolute bottom-0 left-0 right-0 gradient-blur-overlay">
            <div>Status</div>
            <div>Competition Name</div>
            <div>Competition Subtitle</div>
            <div class="row">              <div class="col">Competitors</div>
              <div class="col justify-end">Host/Judges</div>
            </div>
          </div>
        </q-img>
      </q-card>

      <div class="text-black" v-for="(event, index) in eventList" :key="index">
        {{ event }}
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: "IndexPage",
  data() {
    return {
      eventList: null,
    };
  },
  mounted() {
    this.fetchEvents();
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

<style scoped>
.rectangle-card {
  height: 200px;
  border-radius: 0px;
  position: relative;
  overflow: hidden;
}
.gradient-blur-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 16px;
  background: linear-gradient(to top, rgba(3, 3, 3, 0.7), rgba(0, 0, 0, 0) 100%);
  backdrop-filter: blur(5px);
}
</style>
  