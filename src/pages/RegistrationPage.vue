<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <h4 class="text-h4 text-black q-my-md text-center">Sign Up</h4>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-sm">
              <q-input filled
                v-model="username"
                label="Username *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']">
              </q-input>

              <q-input filled
                v-model="email"
                label="Email *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']">
              </q-input>

              <q-input filled
                v-model="password" 
                label="Password *"
                :type="isPwd ? 'password' : 'text'">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <q-input filled
                v-model="confirmPassword" 
                label="Confirm Password *"
                type="password"
                lazy-rules
                :rules="[val => val === password || 'Passwords do not match']">
              </q-input>
              
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn unelevated color="pink-13" size="lg" class="full-width" label="Sign Up" />
          </q-card-actions>

          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Already registered? 
              <a href="/login" class="text-primary text-black">Login here</a>
            </p>
          </q-card-section>
          
        </q-card>
      </div>
    </div>
  </q-page>
</template>
  
<script>
import { ref } from 'vue'


export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const isPwd = ref(true);

    const onSubmit = () => {
      if (password.value === confirmPassword.value) {
        console.log("Form submitted successfully!");
      } else {
        console.log("Passwords do not match.");
      }
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      isPwd,
      onSubmit
    }
  }
};
</script>
