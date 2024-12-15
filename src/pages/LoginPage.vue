<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <h4 class="text-h4 text-black q-my-md text-center">Log In</h4>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-sm">
              <q-input
                filled
                v-model="username"
                label="Username *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
              </q-input>

              <q-input
                filled
                v-model="password"
                label="Password *"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="pink-13"
              size="lg"
              class="full-width"
              label="Login"
              @click="onSubmit"
            />
          </q-card-actions>

          <q-card-section class="text-center q-pb-sm">
            <p class="text-grey-6">
              Not registered?
              <router-link to="/register" class="text-primary text-black"
                >Create an Account</router-link
              >
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const isPwd = ref(true);
    const router = useRouter();

    // const loginUser = async () => {
    //   try {
    //     const url = "http://127.0.0.1:8000/api/main/login";
    //     const response = await axios.post(url, {
    //       username: username.value,
    //       password: password.value,
    //     });
    //     console.log("token: ", response.data.token);

    //     localStorage.setItem("userToken", response.data.token);
    //     console.log("User logged in successfully", response.data);
    //     router.push("/");
    //   } catch (error) {
    //     console.log("Error logging in:", error);
    //   }
    // };

    const loginUser = async () => {
      try {
        const url = "http://127.0.0.1:8000/api/main/login";
        const response = await axios.post(url, {
          username: username.value,
          password: password.value,
        });

        console.log("token: ", response.data.access_token);

        localStorage.setItem("userToken", response.data.access_token);
        console.log("User logged in successfully", response.data);
        router.push("/");
      } catch (error) {
        console.log("Error logging in:", error);
      }
    };

    const onSubmit = () => {
      loginUser();
    };

    return {
      username,
      password,
      isPwd,
      onSubmit,
    };
  },
};
</script>
