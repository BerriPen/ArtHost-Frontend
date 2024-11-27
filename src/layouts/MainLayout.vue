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
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Brush and Battle</q-toolbar-title>

        <!-- Search Bar -->
        <div class="row no-wrap q-px-sm">
          <q-input
            dense
            outlined
            square
            v-model="text"
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
            <!-- Notifications -->
            <q-btn round dense flat color="grey-10" icon="notifications">
              <q-badge color="red" text-color="white" floating>2</q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn>

            <!-- Profile Menu -->
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-menu auto-close>
                <q-list dense>
                  <q-item class="GL__menu-link-signed-in">
                    <q-item-section>
                      Signed in as <strong>{{ USERNAME }}</strong>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link" to="/userprofile">
                    Your profile
                  </q-item>
                  <q-item clickable class="GL__menu-link">Settings</q-item>
                  <q-item clickable class="GL__menu-link" @click="logout">
                    Sign out
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <!-- Submit Button -->
            <q-btn color="pink-13" icon="add" label="Submit">
              <q-menu auto-close>
                <q-list dense style="min-width: 100px">
                  <q-item clickable class="GL__menu-link" @click="openDialog">
                    Post
                  </q-item>
                  <q-item clickable class="GL__menu-link" to="/createevent">
                    Create Event
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>

          <!-- Login/Signup -->
          <template v-else>
            <q-btn outline color="pink-13" label="Login" to="/login" />
            <q-btn color="pink-13" label="Sign Up" to="/register" />
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      persistent
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
    >
      <q-list class="text-weight-bold">
        <EssentialLink
          v-for="link in linksList1"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-separator />
      <q-list class="text-weight-bold">
        <EssentialLink
          v-for="link in linksList2"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Post Dialog -->
    <q-dialog v-model="isDialogOpen">
      <div class="q-pa-sm" style="width: 100%; max-width: 720px">
        <q-card class="q-pa-sm">
          <q-card-section>
            <div class="text-h5">Create Post</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-form class="q-pt-sm q-gutter-md text-weight-bold">
              <div>
                <p>Caption</p>
                <q-input v-model="text" outlined type="textarea" />
              </div>

              <div>
                <p>File Upload</p>
                <q-file
                  v-model="selectedFile"
                  outlined
                  style="width: 100%"
                  accept="image/*"
                  label="Select a file"
                  @input="previewFile"
                />

                <!-- Preview Section -->
                <div v-if="filePreview" class="q-mt-md">
                  <p>Preview:</p>
                  <img
                    :src="filePreview"
                    alt="File Preview"
                    style="
                      max-width: 100%;
                      max-height: 300px;
                      border: 1px solid #ccc;
                    "
                  />
                </div>
              </div>
              <q-separator />

              <div align="right">
                <q-btn
                  label="Post"
                  type="submit"
                  elevated
                  color="pink-13"
                  class="q-ma-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const drawer = ref(false);
const isDialogOpen = ref(false);

const selectedFile = ref(null); // File input
const filePreview = ref(null); // File preview URL

const text = ref("");
const isLoggedIn = ref(false);
const postCaption = ref("");

const previewFile = () => {
  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.value = e.target.result; // Update preview URL
    };
    reader.readAsDataURL(selectedFile.value); // Read file as Data URL
  }
};

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const submitPost = () => {
  console.log("Post submitted with caption:", postCaption.value);
  closeDialog();
};

const linksList1 = [
  { title: "Home", icon: "home", link: "/" },
  { title: "Events", icon: "palette", link: "/events" },
];

const linksList2 = [
  {
    title: "Competitions",
    icon: "groups",
    link: "https://github.com/quasarframework",
  },
];

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("userToken") !== null;
});

const logout = () => {
  localStorage.removeItem("userToken");
  isLoggedIn.value = false;
  console.log("User logged out successfully.");
};

function toggleLeftDrawer() {
  drawer.value = !drawer.value;
}

defineOptions({
  name: "MainLayout",
});
</script>
