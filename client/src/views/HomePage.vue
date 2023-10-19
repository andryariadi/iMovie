<script>
import Card from '../components/Card.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useMoviesStore } from '../stores/movies'
import Pagenation from '../components/Pagenation.vue'

export default {
  components: {
    Card,
    Pagenation
  },
  computed: {
    ...mapState(useMoviesStore, ['movies']),
    ...mapWritableState(useMoviesStore, ['pagination'])
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
    <div class="row text-center">
      <div
        class="col-12"
        style="background-color: bisque; width: 40%; margin: auto; padding-top: 5px"
      >
        <form @change.prevent="fetchDataMovies">
          <label class="cl-checkbox">
            <input v-model="pagination.filter.populer" value="populer" type="checkbox" id="A" />
            <span for="A">Popular</span>
          </label>
          <label class="cl-checkbox">
            <input v-model="pagination.filter.toprated" value="toprated" type="checkbox" id="B" />
            <span for="B">Top Rate</span>
          </label>
        </form>
      </div>
    </div>
    <div class="container d-grid justify-content-center" id="container-card" style="height: 100vh">
      <!-- <div class="mt-5 row justify-content-start" id="row-movies">
        <div class="col" id="text-movie">
          <h1 class="movie-text">MOVIES</h1>
        </div>
      </div> -->
      <div class="row" id="row-card" style="width: 70%; margin: auto">
        <Card v-for="el in movies" :key="el.id" :dataMovies="el" />
      </div>
      <div
        class="row justify-content-center align-content-center mt-3"
        style="width: 70%; margin: auto"
      >
        <Pagenation />
      </div>
    </div>
  </section>
</template>

<style></style>
