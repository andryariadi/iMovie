import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://www.aflab.online',
    inputRegister: {
      email: '',
      password: ''
    },
    inputLogin: {
      email: '',
      password: ''
    },
    movies: [],
    moviesDetail: {},
    buymovies: {},
    wishlists: [],
    mymovies: [],
    role: '',
    pagination: {
      page: 1,
      query: '',
      filter: { populer: '', toprated: '' }
    },
    inputWishlist: {}
  }),
  getters: {},
  actions: {
    async doRegister() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/register`,
          data: this.inputRegister
        })
        console.log(data)
        // Jika Anda memiliki akses ke router, gunakan kode berikut
        this.router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },
    async doLogin() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/login`,
          data: this.inputLogin
        })
        console.log(data)
        localStorage.setItem('access_token', data.access_token)
        localStorage.role = data.role
        // Jika Anda memiliki akses ke router, gunakan kode berikut
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async googleLogin(response) {
      try {
        console.log(response)
        let { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/google-login`,
          headers: {
            credential: response.credential
          }
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async fetchDataMovies() {
      console.log('<<<<<<<moviessssss')
      try {
        let { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}/movies`,
          params: this.pagination
        })
        this.movies = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchMovieById(id) {
      try {
        let { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}/movies/${id}`
        })
        this.moviesDetail = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async wishlist() {
      try {
        let { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/wishlist`,
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            title: this.inputWishlist.title,
            description: this.inputWishlist.description,
            imgUrl: this.inputWishlist.imgUrl,
            price: this.inputWishlist.price
          }
        })
        this.router.push('wishlist')
        this.buymovies = data
        console.log(data)
      } catch (err) {
        console.log(err.response.data.message)
      }
    },
    async fetchWishlist() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}/wishlist`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.wishlists = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchMyMovies() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: `${this.baseUrl}/mymovies`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.mymovies = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async putStatus(id) {
      try {
        await axios({
          method: 'PUT',
          url: `${this.baseUrl}/wishlist/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async buyMovies() {
      try {
        let { data } = await axios({
          method: 'POST',
          url: `${this.baseUrl}/payment`,
          headers: {
            access_token: localStorage.access_token
          },
          data: { amount: 50000 }
        })

        const paymentToken = data.token

        const cb = this.wishlist()
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay(paymentToken, {
          onSuccess: function (result) {
            cb()
            // $toast.success('payment success!')
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert('wating your payment!')
            console.log(result)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert('payment failed!')
            console.log(result)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment')
          }
        })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
