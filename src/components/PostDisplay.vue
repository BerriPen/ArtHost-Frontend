<template>
    <q-card class="card-post" flat bordered>
      <!-- User Info -->
      <q-item>
        <q-item-section avatar>
          <q-avatar size="36px">
            <img
              :src="
                post.avatar
                  ? `http://127.0.0.1:8000${post.avatar}`
                  : 'https://cdn.quasar.dev/img/boy-avatar.png'
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
  
      <!-- Post Image -->
      <q-img
        :src="
          post.photo
            ? `http://127.0.0.1:8000${post.photo}`
            : 'https://cdn.quasar.dev/img/parallax2.jpg'
        "
        alt="Post image"
      />
  
      <!-- Post Content -->
      <q-card-section>
        <div>{{ post.caption || "No Caption" }}</div>
        <div class="text-caption text-grey">
            {{ post.createdAt || "Unknown Date" }}
        </div>
  
        <div class="row items-center q-mt-sm">
          <q-btn
            flat
            round
            dense
            :color="post.liked ? 'red' : 'grey'"
            :icon="post.liked ? 'favorite' : 'favorite_border'"
            :label="
              Array.isArray(post.likes) ? post.likes.length : post.likes || 0
            "
            @click="onToggleLike(post.id)"
          />
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  defineProps({
    post: {
      type: Object,
      required: true,
    },
  });
  
  // Emit event to parent for like toggle
  const emit = defineEmits(["toggle-like"]);
  
  const onToggleLike = (postId) => {
    emit("toggle-like", postId);
  };
  </script>
  
  <style scoped>
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
  