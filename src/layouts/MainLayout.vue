<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="text-black">
      <q-toolbar class="q-py-sm q-px-md" >
        <q-btn flat dense round
          color="grey-10"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Web Name
        </q-toolbar-title>
        
        <div class="row no-wrap q-px-sm">
          <q-input dense outlined square 
            v-model="text" 
            placeholder="Search" 
            class="bg-white col"
            style="width:300px">
            
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        
        <div class="q-gutter-sm row items-center no-wrap">
          <template v-if="isLoggedIn">

            <!-- Notification Button -->
            <q-btn round dense flat color="grey-10" icon="notifications">
              <q-badge color="red" text-color="white" floating>
                2
              </q-badge>
              <q-tooltip>Notifications</q-tooltip>
            </q-btn>

            <!-- Profile Button with Menu -->
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>

              <q-menu auto-close>
                <q-list dense>
                  <q-item class="GL__menu-link-signed-in">
                    <q-item-section>
                      <div>Signed in as <strong>{{ username }}</strong></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your profile</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link" @click="logout">
                    <q-item-section>Sign out</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <!-- Submit Button -->
            <q-btn color="pink-13" icon="add" label="Submit">
              <q-menu auto-close>
                <q-list dense style="min-width: 100px">
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Post</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Create Event</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>

          <!-- Login and Sign Up Buttons if Not Logged In -->
          <template v-else>
            <q-btn outline color="pink-13" label="Login" to="/login"></q-btn>
            <q-btn color="pink-13" label="Sign Up" to="register"></q-btn>
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      persistent
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
    >
      <q-list>
        <EssentialLink
          v-for="link in linksList1"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-separator />
      <q-list>
        <EssentialLink
          v-for="link in linksList2"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const drawer = ref(false)
const text = ref('')
const isLoggedIn = ref(false)

const linksList1 = [
  { title: 'Home', icon: 'home', link: '/' },
  { title: 'Events', icon: 'palette', link: '/events' },
]

const linksList2 = [
  { title: 'Competitions', icon: 'groups', link: 'https://github.com/quasarframework' },
]

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('userToken') !== null;
})

const logout = () => {
  localStorage.removeItem('userToken');
  isLoggedIn.value = false;
  console.log("User logged out successfully..");
}

function toggleLeftDrawer() {
  drawer.value = !drawer.value;
}

defineOptions({
  name: 'MainLayout'
})
</script>

<style>
.q-drawer .q-router-link--exact-active {
  color: palevioletred !important;
}
</style>
