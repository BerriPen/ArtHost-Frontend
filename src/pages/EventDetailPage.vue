<template>
    <q-page>
      <div v-if="event" class="q-pa-md q-mx-xl">
        <q-card class="challenge-item">
          <q-img
            :src="
              `http://127.0.0.1:8000${event.event_banner}` ||
              `https://cdn.quasar.dev/img/parallax2.jpg`
            "
          >
            <div class="challenge-overlay">
              <div class="content">
                <div class="challenge-status" style="font-size: 16px">
                  {{ event.status || "Ongoing" }}
                </div>
                <p class="challenge-title" style="font-size: 44px">
                  {{ event.name || "Event Name" }}
                </p>
                <p class="text-subtitle1">{{ event.theme || "Event Theme" }}</p>
                <div class="challenge-info" style="font-size: 14px">
                  <div class="row host-and-judges">
                    <div class="col challenge-count-challengers">
                      {{ event.challenger_count || 0 }} Challengers
                    </div>
                    <div class="col items-end host-users">
                      <p>Hosts: {{ event.host || "N/A" }}</p>
                    </div>
                    <div class="col judge-users">
                      <p>Judges: {{ event.judges || "N/A" }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </q-card>
  
        <!-- Tabs for Additional Information -->
        <q-card>
          <q-tabs v-model="tab" class="text-pink-13">
            <q-tab label="Result" name="result" />
            <q-tab label="Guidelines" name="guidelines" />
            <q-tab label="Submissions" name="submissions" />
          </q-tabs>
  
          <q-separator />
  
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="result">
              <p>{{ event.result || "No results available yet." }}</p>
            </q-tab-panel>
  
            <q-tab-panel name="guidelines">
              <p>{{ event.guidelines || "No guidelines provided." }}</p>
            </q-tab-panel>
  
            <q-tab-panel name="submissions">
              <p>{{ event.submissions || "No submissions yet." }}</p>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div v-else class="q-pa-md text-center">
        <p>Loading event details...</p>
      </div>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted, watch } from "vue";
  import axios from "axios";
  
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true,
      },
    },
    setup(props) {
      const event = ref(null);
      const tab = ref("result");
  
      const eventId = ref(Number(props.id));
  
      const fetchEventDetails = async () => {
        const url = `http://127.0.0.1:8000/api/main/eventdetails/${eventId.value}`;
        try {
          const response = await axios.get(url);
          event.value = response.data;
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };
  
      onMounted(() => {
        console.log("Event ID:", this.id);
        fetchEventDetails();
      });
  
      watch(
        () => props.id,
        (newId) => {
          const newEventId = Number(newId);
          if (newEventId !== eventId.value) {
            eventId.value = newEventId;
            fetchEventDetails();
          }
        }
      );
  
      return { event, tab };
    },
  };
  </script>
  
  <style scoped>
  .challenge-item {
    height: 350px;
    border-radius: 0;
    position: relative;
    overflow: hidden;
    width: 100%;
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
  