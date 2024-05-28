<template>
  <NavigationBar :isLoggedIn="isLoggedIn" :user="user"></NavigationBar>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavigationBar from "@/views/Navbar.vue";
import Footer from './views/Footer.vue';

import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const isLoggedIn = ref(null);
  const user = ref(null);

router.afterEach(() => {

  const currentRoute = router.currentRoute.value;

  if (currentRoute.name === "home-link") {
    isLoggedIn.value = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn.value) {
      user.value = {
        name: sessionStorage.getItem("userName"),
        loginTime: sessionStorage.getItem("loginTime")
      };
    } else {
      user.value = null;
    }
  }
});

</script>


<style></style>
