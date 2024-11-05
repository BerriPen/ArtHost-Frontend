<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="grey-10"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Web Name
        </q-toolbar-title>
        
        <div class="YL__toolbar-input-container row no-wrap">
          <q-input 
            dense 
            outlined 
            square 
            v-model="text" 
            placeholder="Search" 
            class="bg-white col">
            
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-10" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>

          <q-btn color="pink-13" icon="add" label="Submit" />
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
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const drawer = ref(false)
const miniState = ref(true)
const text = ref('')  // Define 'text' to use it with v-model in <q-input>

const linksList1 = [
  { title: 'Home', 
    icon: 'home', 
    link: '/' },
  { title: 'Events', 
    icon: 'palette', 
    link: '/events' },
]
const linksList2 = [
  { title: 'Competitions', icon: 'groups', link: 'https://github.com/quasarframework' },
]

function toggleLeftDrawer() {
  drawer.value = !drawer.value
}

defineOptions({
  name: 'MainLayout'
})
</script>

<style>
  .q-drawer .q-router-link--exact-active{
    color: palevioletred !important;
  }
</style>

