<template>
  <q-page>
    <div>
        <EventCard/>
        HOME PAGE
    </div>
    


<!-- EXTRA CARRD  
    <div class="challenge-item q-pa-xl">
      <div class="challenge-banner">
        <q-card>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
          <div class="challenge-overlay">
            <div class="content">
              <div class="challenge-status">
                Challenge status
              </div>
              <a class="challenge-title">
                Challenge title
              </a>
              <p class="challenge theme">
                Challenge theme
              </p>
              <div class="challenge-info">
                <div class="challenge-count">
                  <div challenge-count-challengers>
                    Challengers count
                  </div>
                </div>
                <div class="row host-and-judges">
                  <div class="col host-users">
                    host
                  </div>
                  <div class="col host-users">
                    judges
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card>  
      </div>      
    </div>


    <div class="q-pa-xl q-ma-xl row">
      <q-card class="challenge-item" v-for="(event, index) in eventList" :key="index">
        <q-img src="../assets/banners/1.jpg" fit="cover" class="full-width full-height">
        </q-img>
        <div class="challenge-overlay">
          <div class="content">
              <div class="challenge-status" style="font-size: 16px;">
                Challenge status
              </div>
              <a class="challenge-title" style="font-size: 44px;">
                {{ event.name}}
              </a>
              <p class="challenge theme" style="font-size: 24px;">
                {{ event.theme }}
              </p>
              <div class="challenge-info" style="font-size: 14px;">
                <div class="row host-and-judges">
                  <div class="col challenge-count-challengers">
                    Challengers count
                  </div>
                  <div class="col items-end host-users">
                    <p>
                      Host {{ event.host }}
                    </p>
                  </div>
                  <div class="col judge-users">
                    {{ event.judges }}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </q-card>

      <div class="text-black" v-for="(event, index) in eventList" :key="index">
        {{ event }}
      </div>
    </div>
  -->

  </q-page>
</template>

<script>
import axios from "axios";
import EventCard from "src/components/EventCard.vue";
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
