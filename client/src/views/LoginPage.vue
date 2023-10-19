<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  computed: {
    ...mapState(useMoviesStore, ['inputLogin'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['doLogin', 'googleLogin']),
    doGoogleLogin(response) {
      this.googleLogin(response)
    },
    loginHadler() {
      this.doLogin()
    }
  }
}
</script>

<template>
  <section id="login-section">
    <div
      class="container text-center d-grid justify-content-center align-items-center"
      id="container-login"
      style="height: 100vh"
    >
      <div
        class="row justify-content-center align-content-center"
        style="height: 50vh; width: 70%; margin: auto"
      >
        <div class="col-12 col-md-4 login-1">
          <div class="card d-flex" style="margin: auto; transform: translateY(18px)">
            <h4 class="title">Sing In!</h4>
            <form @submit.prevent="loginHadler">
              <div class="field">
                <input
                  v-model="inputLogin.email"
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
                  v-model="inputLogin.password"
                  autocomplete="off"
                  id="logpass"
                  placeholder="Password"
                  class="input-field"
                  name="logpass"
                  type="password"
                />
              </div>
              <button class="btn btn-singup" type="submit">Sing In</button>
            </form>
          </div>
        </div>
        <div class="col-12 col-md-4 login-2">
          <div>
            <img src="@/assets/image/AmazedChatbot.png" id="img-login" />
            <GoogleLogin :callback="doGoogleLogin" class="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
