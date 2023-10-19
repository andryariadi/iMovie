<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  computed: {
    ...mapState(useMoviesStore, ['role', 'pagination'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['payment', 'fetchDataMovies']),
    toSearch() {
      this.fetchDataMovies()
    },
    goToRegister() {
      this.$router.push('/register')
    },
    doLogout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    goToHome() {
      this.$router.push('/')
    },
    goToBookmark() {
      this.$router.push('/wishlist')
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToSubscribe() {
      this.payment()
    }
  }
}
</script>

<template>
  <header id="navbar-section" class="sticky-top">
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(241, 211, 179)">
      <div class="container">
        <a class="navbar-brand" href="" style="font-family: monospace; font-size: 1.6rem">
          <img
            src="../assets/image/imovie-high-resolution-logo-color-on-transparent-background.png"
            alt="iMovies"
            width="140"
            height="55"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="search">
          <div class="input-group rounded">
            <input
              v-model="pagination.query"
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span @click.prevent="toSearch" class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
        <div class="collapse navbar-collapse me-5" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a @click.prevent="goToHome" class="nav-link" aria-current="page" href="">Home</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="goToBookmark" class="nav-link" href="">MyMovies</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="goToRegister" class="nav-link" href="">SingUp</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="goToLogin" class="nav-link" href="">SingIn</a>
            </li>
            <li class="nav-item">
              <button
                @click.prevent="doLogout"
                type="button"
                class="btn btn-outline-warning"
                id="btn-logout"
              >
                Sing Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style></style>
