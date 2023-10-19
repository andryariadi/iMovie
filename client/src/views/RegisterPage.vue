<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  computed: {
    ...mapWritableState(useMoviesStore, ['inputRegister'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['doRegister'])
  }
}
</script>

<template>
  <section id="register-section">
    <div
      class="container text-center d-grid justify-content-center align-items-center"
      id="container-register"
      style="height: 100vh"
    >
      <div
        class="row justify-content-center align-content-center"
        style="height: 50vh; width: 70%; margin: auto"
      >
        <div class="col-12 col-md-4 register-2">
          <img src="@/assets/image/ArtificialIntelligence.png" id="img-register" />
        </div>
        <div class="col-12 col-md-4 register-1">
          <div class="card d-flex" style="margin: auto; transform: translateY(18px)">
            <h4 class="title">Sing Up!</h4>
            <form @submit.prevent="doRegister">
              <div class="field">
                <input
                  v-model="inputRegister.email"
                  autocomplete="off"
                  id="logemail"
                  placeholder="Email"
                  class="input-field"
                  name="logemail"
                  type="email"
                />
              </div>
              <div class="field">
                <input
                  v-model="inputRegister.password"
                  autocomplete="off"
                  id="logpass"
                  placeholder="Password"
                  class="input-field"
                  name="logpass"
                  type="password"
                />
              </div>
              <button class="btn btn-singup" type="submit">Sing Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
