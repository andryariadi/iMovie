<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  computed: {
    ...mapState(useMoviesStore, ['moviesDetail'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchMovieById'])
  },
  created() {
    this.fetchMovieById(this.$route.params.id)
  }
}
</script>

<template>
  <section id="detail-section">
    <div class="container" id="container-detail">
      <div class="row" id="row-detail">
        <div class="col-5 col-md-8" id="detail-img">
          <img :src="moviesDetail.imgUrl" width="500" />
        </div>
        <div class="col-5 ol-md-8" c id="detail-text">
          <div>
            <div class="col">
              <p class="fw-bold fs-4">{{ moviesDetail.title }}</p>
            </div>
            <div class="col">
              <p class="fs-5">{{ moviesDetail.description }}</p>
            </div>
            <div class="col">
              <p class="fw-bold fs-4">Rp {{ moviesDetail.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
