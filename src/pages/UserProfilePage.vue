<template>
  <q-page-container>
    <q-page class="q-pa-lg">
      <div class="profile-area flex flex-center">
        <div class="text-center" v-if="userProfile" :key="userProfile.username">
          <!-- Avatar -->
          <q-avatar size="120px" class="q-mb-lg">
            <img :src="userProfile.profile.profile_img || 'https://cdn.quasar.dev/img/boy-avatar.png'" />
          </q-avatar>

          <!-- Username and Bio -->
          <p class="text-h5 q-mb-xs">{{ userProfile.username }}</p>
          <p class="text-caption text-grey q-mb-lg">
            {{ userProfile.profile.bio || "This is a short bio about the user." }}
          </p>

          <!-- Followers and Following -->
          <div class="row justify-center q-mb-lg">
            <div class="col-auto text-center q-mx-md">
              <p class="text-body1">{{ userProfile.profile.followers }}</p>
              <p class="text-caption">Followers</p>
            </div>
            <div class="col-auto text-center q-mx-md">
              <p class="text-body1">{{ userProfile.profile.following }}</p>
              <p class="text-caption">Following</p>
            </div>
          </div>

          <!-- Follow Button -->
          <q-btn outline color="pink-13" label="Follow" class="q-mb-lg"></q-btn>
        </div>
      </div>

      <!-- Posts Section -->
      <q-separator />

      <div class="post-area q-mt-sm">
        <div class="text-center" color="grey-1">
          <h4 class="text-h6">Posts</h4>
          <p class="text-caption text-grey">No posts to show yet.</p>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>


<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: null,
    };
  },
  mounted() {
    // Fetch the user profile when the component is mounted
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      console.log("fetching user profile details");
      // Assuming that the username is dynamically passed
      const username = "john_doe";  // You can replace this with dynamic data (e.g., from route params)

      const url = `http://127.0.0.1:8000/api/main/userProfile/${username}/`;  // Dynamically pass the username

      try {
        const response = await axios.get(url);
        console.log(response.data);
        this.userProfile = response.data; // Correct the assignment here
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
  },
};
</script>

