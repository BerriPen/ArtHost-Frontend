<template>
  <q-page>
    <div class="q-pa-xl q-ma-lg q-gutter-lg row">
      <q-card
        class="challenge-item"
        v-for="(event, index) in eventList"
        :key="index"
      >
        <q-img
          src="../assets/banners/1.jpg"
          fit="cover"
          class="full-width full-height"
        ></q-img>
        <div class="challenge-overlay">
          <div class="content">
            <div class="challenge-status" style="font-size: 16px">
              Challenge status
            </div>
            <a class="challenge-title" style="font-size: 44px">
              {{ event.name }}
            </a>
            <p class="challenge theme" style="font-size: 24px">
              {{ event.theme }}
            </p>
            <div class="challenge-info" style="font-size: 14px">
              <div class="row host-and-judges">
                <div class="col challenge-count-challengers">
                  Challengers count
                </div>
                <div class="col items-end host-users">
                  <p>Hosts: {{ event.host }}</p>
                </div>
                <div class="col judge-users">
                  <p>Judges: {{ event.judges }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  name: "EventCard",
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
.challenge-item {
  height: 200px;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 350px;
}

.challenge-banner {
  height: 350px;
  width: auto;
  border-radius: 0;
  overflow: hidden;
}

.challenge-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 16px;
  z-index: 2;
  background: linear-gradient(
    to top,
    rgba(3, 3, 3, 0.7),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
