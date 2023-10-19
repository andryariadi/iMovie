<script>
import Card from '../components/Card.vue'
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useMoviesStore, ['movies'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchDataMovies'])
  },
  created() {
    this.fetchDataMovies()
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
        style="height: 50vh; width: 70%; margin: auto"
      >
        <Card v-for="el in movies" :key="el.id" :dataMovies="el" />
      </div>
    </div>
  </section>
</template>

<style></style>
