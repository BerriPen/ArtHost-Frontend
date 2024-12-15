<template>
  <q-layout view="hHh Lpr lff">
    <!-- Header -->
    <q-header bordered class="bg-white text-black">
      <q-toolbar class="q-py-sm q-px-md">
        <!-- Drawer Toggle -->
        <q-btn
          flat
          dense
          round
          color="grey-10"
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title>Brush and Battle</q-toolbar-title>

        <!-- Search Bar -->
        <div class="row no-wrap q-px-sm">
          <q-input
            dense
            outlined
            square
            v-model="searchQuery"
            placeholder="Search"
            class="bg-white col"
            style="width: 300px"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- User Buttons -->
        <div class="q-gutter-sm row items-center no-wrap">
          <template v-if="isLoggedIn">
            <q-btn round dense flat color="grey-10" icon="notifications">
              <q-badge color="red" text-color="white" floating>2</q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn>

            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-menu auto-close>
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      Signed in as <strong>{{ username }}</strong>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable to="/userprofile">Your profile</q-item>
                  <q-item clickable>Settings</q-item>
                  <q-item clickable @click="logout">Sign out</q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <q-btn color="pink-13" icon="add" label="Submit">
              <q-menu auto-close>
                <q-list dense style="min-width: 100px">
                  <q-item clickable @click="openPostDialog">Post</q-item>
                  <q-item clickable to="/createevent">Create Event</q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>

          <template v-else>
            <q-btn outline color="pink-13" label="Login" to="/login" />
            <q-btn color="pink-13" label="Sign Up" to="/register" />
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="drawerOpen"
      show-if-above
      persistent
      mini-to-overlay
      :mini="miniState"
      :class="drawerClasses"
      bordered
      :width="200"
      :breakpoint="500"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
    >
      <q-list class="text-weight-bold">
        <EssentialLink v-for="link in links1" :key="link.title" v-bind="link" />
      </q-list>
      <q-separator />
      <q-list class="text-weight-bold">
        <EssentialLink v-for="link in links2" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

    <!-- Post Dialog -->
    <q-dialog v-model="postDialogOpen">
      <q-card class="q-pa-sm" style="width: 100%; max-width: 720px">
        <q-card-section>
          <div class="text-h5">Create Post</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
            @submit.prevent="submitPost"
            class="q-pt-sm q-gutter-md text-weight-bold"
          >
            <q-input
              v-model="postCaption"
              outlined
              type="textarea"
              lazy-rules
              :rules="[(val) => !!val || 'Caption is required']"
              placeholder="Write a caption..."
            />
            <q-file
              v-model="selectedFile"
              outlined
              accept="image/*"
              label="Upload a file"
              @change="previewFile"
            />
            <div v-if="filePreview" class="q-mt-md">
              <img :src="filePreview" alt="Preview" class="q-img__image" />
            </div>
            <div class="q-mt-md" align="right">
              <q-btn label="Post" color="pink-13" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const drawerOpen = ref(false);
const miniState = ref(true);
const postDialogOpen = ref(false);
const selectedFile = ref(null);
const filePreview = ref(null);
const postCaption = ref("");
const searchQuery = ref("");
const isLoggedIn = ref(false);
const username = ref("User");

const toggleDrawer = () => (drawerOpen.value = !drawerOpen.value);
const openPostDialog = () => (postDialogOpen.value = true);
const closePostDialog = () => (postDialogOpen.value = false);

const previewFile = () => {
  const file = selectedFile.value;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => (filePreview.value = e.target.result);
    reader.readAsDataURL(file);
  }
};

const submitPost = async () => {
  if (!selectedFile.value || !postCaption.value.trim()) {
    console.error("Incomplete post data.");
    return;
  }

  const formData = new FormData();
  formData.append("caption", postCaption.value);
  formData.append("post", selectedFile.value);

  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("No token found");
    return;
  }
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/main/postUpload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Post uploaded:", response.data);
    closePostDialog();
    selectedFile.value = null;
    filePreview.value = null;
  } catch (error) {
    console.error("Error uploading post:", error);
  }
};

onMounted(async () => {
  // isLoggedIn.value = !!localStorage.getItem("userToken");
  let token = localStorage.getItem("userToken");
  console.log("token: ", token);
  if (token) {
    isLoggedIn.value = true;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/main/userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      username.value = response.data.username;
    } catch (error) {
      console.error("Error fetching user details:", error);
      // isLoggedIn.value = false;
    }
  }
});

const search = async () => {
  if (!searchQuery.value.trim()) {
    return;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/main/search`, {
      params: { query: searchQuery.value },
    });
  } catch (error) {
    console.error("Error searching:", error);
  }
};

const links1 = [
  { title: "Home", icon: "home", link: "/" },
  { title: "Events", icon: "palette", link: "/events" },
];
const links2 = [
  { title: "Competitions", icon: "groups", link: "/competitions" },
];

const logout = () => {
  localStorage.removeItem("userToken");
  isLoggedIn.value = false;
  console.log("Logged out.");
  // $router.push("/login");
  router.push("/login");
};

const drawerClasses = `bg-${miniState.value ? "grey-1" : "grey-9"}`;
</script>

<style>
.q-drawer .q-router-link--exact-active {
  color: #ed2662 !important;
}
</style>
