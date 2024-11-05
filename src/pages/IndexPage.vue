<template>
  <q-page class="flex flex-center">
    <div>
      ==HOME PAGE==
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "IndexPage",
  mounted(){
    console.log("Testing");
    this.fetchEvents();
  },
  methods: {
    async fetchEvents(){
      console.log("fetching event details");
      const url = "http://127.0.0.1:8000/api/main/eventList";

      axios
        .get(url)
        .then((response) =>{
          console.log(response.data);
        })
        .catch((error) =>{
          console.log(error);
        });
    },
  },
};

</script>
