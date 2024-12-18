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
                :rules="[val => (val && val.length > 0) || 'Username is required']"
              />
              <q-input
                filled
                v-model="password"
                label="Password *"
                :type="isPwd ? 'password' : 'text'"
                :rules="[val => (val && val.length > 0) || 'Password is required']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-btn
                unelevated
                color="pink-13"
                size="lg"
                class="full-width"
                label="Login"
                type="submit"
              />
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pb-sm">
            <p class="text-grey-6">
              Not registered?
              <router-link to="/register" class="text-primary text-black">
                Create an Account
              </router-link>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from "../services/api";
// import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      isPwd: true,
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post("/token/", {
          username: this.username,
          password: this.password,
        });

        // Save tokens to localStorage
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        // Notify user and redirect
        this.$q.notify({ type: "positive", message: "Login successful!" });
        this.$router.push("/");
      } catch (error) {
        // Handle errors
        const message =
          error.response?.status === 401
            ? "Invalid username or password"
            : "Login failed. Please try again.";
        this.$q.notify({ type: "negative", message });
      }
    },
    onSubmit() {
      this.loginUser();
    },
  },
};
</script>



<!-- <template>
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
  import { api } from "src/boot/axios";
  import api from '../services/api';


  export default {
    data(){
      return{
        username: '',
        password: '',
      };
    },
    methods: {
      async function fetchSecureData() {
  try {
    const response = await api.get('/secure-data/');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching secure data:', error);
  }
},
      async loginUser(){
        try {
          const response = await api.post('/token/', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          console.log("token: ", response.data.token);
          this.$q.notify({ type: 'positive', message: 'Login successful!' });
          this.$router.push('/'); 
        } catch (error) {
        this.$q.notify({ type: 'negative', message: 'Login failed!' });
      }
      },
      async onSubmit(){
        loginUser();
      },
    },
  };
  
  // export default {
  //   setup() {
  //     const username = ref("");
  //     const password = ref("");
  //     const isPwd = ref(true);
  //     const router = useRouter();
  
  //     // const loginUser = async () => {
  //     //   try {
  //     //     const url = "http://127.0.0.1:8000/api/main/login";
  //     //     const response = await axios.post(url, {
  //     //       username: username.value,
  //     //       password: password.value,
  //     //     });
  //     //     console.log("token: ", response.data.token);
  
  //     //     localStorage.setItem("userToken", response.data.token);
  //     //     console.log("User logged in successfully", response.data);
  //     //     router.push("/");
  //     //   } catch (error) {
  //     //     console.log("Error logging in:", error);
  //     //   }
  //     // };

  //     // ADI NA LOGIN
  
  //     // const loginUser = async () => {
  //     //   try {
  //     //     const url = "http://127.0.0.1:8000/api/main/login";
  //     //     const response = await axios.post(url, {
  //     //       username: username.value,
  //     //       password: password.value,
  //     //     });
  
  //     //     console.log("token: ", response.data.access_token);
  
  //     //     localStorage.setItem("userToken", response.data.access_token);
  //     //     console.log("Logged User:", username);
  //     //     router.push("/");
  //     //   } catch (error) {
  //     //     console.log("Error logging in:", error);
  //     //   }
  //     // };

  //   // const loginUser = async () => {
  //   //     try {
  //   //         const url = "http://127.0.0.1:8000/api/main/login";
  //   //         const payload = {
  //   //         username: username.value, 
  //   //         password: password.value, 
  //   //         };

  //   //         console.log("Login Payload: ", payload); 
  //   //         const response = await axios.post(url, payload);

  //   //         const { access_token, user } = response.data;
  //   //         localStorage.setItem("userToken", access_token);
  //   //         console.log("Logged in as:", user.username);
  //   //         router.push("/");
  //   //     } catch (error) {
  //   //         console.error("Login error:", error.response?.data || error.message);
  //   //     }
  //   // };

  
  //     const onSubmit = () => {
  //       loginUser();
  //     };
  
  //     return {
  //       username: '',
  //       password: '',
  //       isPwd,
  //       onSubmit,
  //     };
  //   },
  // };
  // </script>
   -->