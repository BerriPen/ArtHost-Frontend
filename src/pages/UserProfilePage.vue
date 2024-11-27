<template>
  <q-page-container>
    <q-page class="q-pa-lg">
      <div class="profile-area flex flex-center">
        <div class="text-center">
          <!-- Avatar -->
          <q-avatar size="120px" class="q-mb-lg">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <!-- Username and Bio -->
          <p class="text-h5 q-mb-xs">User Name</p>
          <p class="text-caption text-grey q-mb-lg">
            This is a short bio about the user.
          </p>

          <!-- Followers and Following -->
          <div class="row justify-center q-mb-lg">
            <div class="col-auto text-center q-mx-md">
              <p class="text-body1">123</p>
              <p class="text-caption">Followers</p>
            </div>
            <div class="col-auto text-center q-mx-md">
              <p class="text-body1">456</p>
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
