<template>
    <q-page-container>
      <q-page class="q-pa-lg">
        <div class="profile-area flex flex-center" v-if="userProfile">
          <div class="text-center">
            <q-avatar size="120px" class="q-mb-lg">
              <img
                :src="
                  userProfile.avatar
                    ? `http://127.0.0.1:8000${userProfile.avatar}`
                    : 'https://cdn.quasar.dev/img/boy-avatar.png'
                "
                alt="Avatar"
              />
            </q-avatar>
  
\            <p class="text-h5 q-mb-xs">{{ userProfile.user }}</p>
            <p class="text-caption text-grey q-mb-lg">
              {{ userProfile.bio || 'No Bio' }}
            </p>
  
            <div class="row justify-center q-mb-lg">
              <div class="col-auto text-center q-mx-md">
                <p class="text-body1">{{ userProfile.followersCount }}</p>
                <p class="text-caption">Followers</p>
              </div>
              <div class="col-auto text-center q-mx-md">
                <p class="text-body1">{{ userProfile.followingCount }}</p>
                <p class="text-caption">Following</p>
              </div>
            </div>
  
            <q-btn outline color="pink-13" label="Follow" class="q-mb-lg"></q-btn>
          </div>
        </div>
  
        <q-separator />
  
        <div class="post-area q-mt-sm">
          <div class="text-center" color="grey-1">
            <h4 class="text-h6">Posts</h4>
            <p class="text-caption text-grey">
              {{ userProfile.posts.length > 0 ? 'User posts' : 'No posts to show yet.' }}
            </p>
          </div>
  
          <div v-if="userProfile.posts.length > 0" class="q-mt-md">
            <div v-for="post in userProfile.posts" :key="post.id" class="q-mb-md">
              <q-card>
                <q-card-section>
                  <img :src="post.image" class="q-mb-md" />
                  <p class="text-body1">{{ post.caption }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserProfilePage",
    data() {
      return {
        userProfile: null,
      };
    },
    mounted() {
      this.fetchProfile();
    },
    methods: {
        async fetchProfile() {
            console.log("Fetching logged-on user information");
            const url = "http://127.0.0.1:8000/api/main/userProfile";
            const token = localStorage.getItem("userToken"); 
            
            try {
                const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                console.log(response.data);
                this.userProfile = response.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
  };
</script>
  