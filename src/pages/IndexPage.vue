<template>
  <q-page class="q-pa-lg">
    <div>
      <p>HOME PAGE</p>
    </div>

    <div class="q-pa-sm q-ma-sm" v-if="postDisplay && postDisplay.length">
      <q-card
        v-for="post in postDisplay"
        :key="post.id"
        class="card-post"
        flat
        bordered
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="
                  post.avatar || 'https://cdn.quasar.dev/img/boy-avatar.png'
                "
                alt="Avatar"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ post.user }}</q-item-label>
            <q-item-label caption>Follow</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-img
          :src="post.image || 'https://cdn.quasar.dev/img/parallax2.jpg'"
          alt="Post image"
        />

        <q-card-section>
          <div>{{ post.caption || "No Caption" }}</div>
          <div class="text-caption text-grey">
            {{ post.date || "Unknown Date" }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <p>No posts to display</p>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const postDisplay = ref([]);

const fetchPosts = async () => {
  console.log("Fetching post details");
  const url = "http://127.0.0.1:8000/api/main/postDisplay";

  try {
    const response = await axios.get(url);
    console.log(response.data);
    postDisplay.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

onMounted(fetchPosts);
</script>

<style>
.card-post {
  width: 460px;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card-post .q-img {
  flex-grow: 1;
  min-height: 200px;
  object-fit: cover;
}
</style>
