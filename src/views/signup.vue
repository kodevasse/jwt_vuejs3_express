<template>
  <div class="bg-gray-200 h-screen flex justify-center items-center">
    <form @submit.prevent="signup" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-medium mb-4">Signup</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="fname">
          First Name
        </label>
        <input
          v-model="form.fname"
          class="border p-2 rounded-lg w-full"
          type="text"
          id="fname"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="lname">
          Last Name
        </label>
        <input
          v-model="form.lname"
          class="border p-2 rounded-lg w-full"
          type="text"
          id="lname"
        />
      </div>
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
      <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
        Signup
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Signup",
  setup() {
    const form = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };

    async function signup() {
      try {
        await axios.post("/api/signup", form);
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }

    return {
      form,
      signup,
    };
  },
};
</script>
