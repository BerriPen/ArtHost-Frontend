<template>
  <p>==Login Page==</p>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 700px">
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
    
        <q-input
          filled
          v-model="username"
          label="Username *"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']">
        </q-input>

        <q-input
          filled
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']">
        </q-input>
        
        <q-input
          filled
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

        <div>
          <q-btn label="Submit" type="submit" color="pink-13"/>
        </div>

      </q-form>
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
      isPwd,
      onSubmit
    }
  }
};
</script>
