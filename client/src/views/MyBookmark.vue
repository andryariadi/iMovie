<script>
import { mapActions, mapState } from 'pinia'
import CardWishlist from '../components/CardWishlist.vue'
import { useMoviesStore } from '../stores/movies'

export default {
  components: {
    CardWishlist
  },
  computed: {
    ...mapState(useMoviesStore, ['wishlists'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchWishlist'])
  },
  created() {
    this.fetchWishlist()
    console.log(this.wishlists)
  }
}
</script>

<template>
  <section id="card-section">
    <div class="container d-grid justify-content-center" id="container-card" style="height: 100vh">
      <!-- <div class="mt-5 row justify-content-start" id="row-movies">
        <div class="col" id="text-movie">
          <h1 class="movie-text">MOVIES</h1>
        </div>
      </div> -->
      <div
        class="row justify-content-center align-content-center"
        id="row-card"
        style="width: 70%; margin: auto"
      >
        <CardWishlist v-for="el in wishlists" :key="el.id" :dataWislist="el" />
      </div>
    </div>
  </section>
</template>

<style></style>
