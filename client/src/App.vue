<script>
import { mapWritableState } from 'pinia'
import Navbar from './components/Navbar.vue'
import { useMoviesStore } from './stores/movies'
// import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar
    // Footer
  },
  computed: {
    ...mapWritableState(useMoviesStore, ['role'])
  },
  created() {
    if (localStorage.access_token) {
      this.role = localStorage.role
    }
  }
}
</script>

<template>
  <Navbar />
  <!-- <Footer /> -->
  <router-view></router-view>
</template>

<style></style>
