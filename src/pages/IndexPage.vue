<template>
  <q-page>
    <div class="bg-white q-mb-sm">
      <div class="q-pa-md">
        <p class="text-h5 text-center">Home</p>
      </div>
    </div>

    <!-- Center posts using Quasar flex utilities -->
    <div
      class="q-pa-md flex flex-center items-center justify-center q-mx-md q-gutter-md"
      style="flex-wrap: wrap; min-height: calc(100vh - 100px)"
      v-if="postDisplay && postDisplay.length"
    >
      <PostDisplay
        v-for="(post, index) in postDisplay"
        :key="index"
        :post="post"
        @toggle-like="(postId) => toggleLike(postId, index)"
      />
    </div>
    <div class="text-center" v-else>
      <p>No posts to display</p>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostDisplay from "src/components/PostDisplay.vue";

const postDisplay = ref([]);

const fetchPosts = async () => {
  console.log("Fetching post details");

  const url = "http://127.0.0.1:8000/api/main/postDisplay";

  try {
    const response = await axios.get(url);
    postDisplay.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const toggleLike = async (postId, index) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("User not logged in");
      return;
    }

    const response = await axios.post(
      `http://127.0.0.1:8000/api/main/toggleLike/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const post = postDisplay.value[index];
      post.liked = response.data.liked;
      post.likes = response.data.likes;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};

onMounted(fetchPosts);
</script>
