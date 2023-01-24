<template>
  <div class="bg-gray-200 h-screen flex justify-center items-center">
    <form @submit.prevent="login" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-medium mb-4">Login</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          v-model="form.email"
          class="border p-2 rounded-lg w-full"
          type="email"
          id="email"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">
          Password
        </label>
        <input
          v-model="form.password"
          class="border p-2 rounded-lg w-full"
          type="password"
          id="password"
        />
      </div>
      <div class="flex justify-between">
        <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
        <router-link class="text-blue-500 hover:underline" to="/signup">
          Sign up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "@/store";

export default {
  name: "Login",
  setup() {
    const form = {
      email: "",
      password: "",
    };

    async function login() {
      try {
        const { data } = await axios.post("/api/login", form);
        store.actions.login(data);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }

    return {
      form,
      login,
    };
  },
};
</script>
