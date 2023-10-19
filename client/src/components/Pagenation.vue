<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  computed: {
    ...mapState(useMoviesStore, ['pagination'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchDataMovies']),
    toPageNext() {
      this.pagination.page = this.pagination.page + 1
      this.fetchDataMovies()
    },
    toPagePrev() {
      if (this.pagination.page > 1) {
        this.pagination.page = this.pagination.page - 1
        this.fetchDataMovies()
      }
    }
  }
}
</script>

<template>
  <!-- Pagination -->
  <nav aria-label="Page navigation" style="" class="d-flex align-item-end">
    <ul class="pagination">
      <li class="page-item">
        <a @click.prevent="toPagePrev" class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li @click.prevent="toPagePrev" class="page-item"><a class="page-link">Previous</a></li>
      <li @click.prevent="toPageNext" class="page-item"><a class="page-link">Next</a></li>
      <li class="page-item">
        <a @click.prevent="toPageNext" class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  <!-- End Pagination -->
</template>
