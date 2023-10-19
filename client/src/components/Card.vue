<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  props: ['dataMovies'],
  computed: {
    ...mapState(useMoviesStore, ['moviesDetail']),
    ...mapWritableState(useMoviesStore, ['inputWishlist'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['buyMovies']),
    buyMoviesHandler() {
      this.inputWishlist = this.dataMovies
      if (localStorage.access_token) {
        this.buyMovies()
      } else {
        this.$router.push('/login')
      }
    },
    goToDetail() {
      this.$router.push(`/movies/${this.dataMovies.id}`)
    }
  }
}
</script>

<template>
  <div class="col-12 col-md-4 card-1 gx-5 gy-3">
    <div class="card" id="card-movie" style="width: 18rem">
      <img :src="dataMovies.imgUrl" class="card-img-top" id="img-card" />
      <div class="card-body">
        <h5 class="card-title">{{ dataMovies.title }}</h5>
        <p class="card-text">Rp {{ dataMovies.price }}</p>
        <div class="d-flex justify-content-around">
          <a @click.prevent="goToDetail" href="#" class="btn btn-primary">Detail</a>
          <a @click.prevent="buyMoviesHandler" href="#" class="btn btn-primary">Buy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
