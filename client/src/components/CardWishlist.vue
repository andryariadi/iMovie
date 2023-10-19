<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  props: ['dataWislist'],
  methods: {
    ...mapActions(useMoviesStore, ['payment']),
    paymentHandler() {
      this.payment(this.dataWislist.id)
    }
  }
}
</script>

<template>
  <div class="col-4 col-md-4 card-1 gx-5 gy-3">
    <div class="card" id="card-movie" style="width: 18rem">
      <img :src="dataWislist.imgUrl" class="card-img-top" id="img-card" />
      <div class="card-body">
        <h5 class="card-title">{{ dataWislist.title }}</h5>
        <div class="d-flex justify-content-around">
          <a @click.prevent="goToDetail" href="#" class="btn btn-primary">Detail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
