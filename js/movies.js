new WOW().init();

const API_KEY = '1f71c2927f79cc961b4ec53d23ac115c';

var app = new Vue({
  el: '#movies',
  data: {
      listMovies: null,
      title: 'Movies',
      activeImg: null,
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`).then(response => {
        if (response.status !== null) {
          const { results } = response.data;
          this.listMovies = results;
        }
      });
    },
    mappingDate(date) {
      return moment(date).format("MMMM DD, YYYY");
    },
    mouseover(data) {
        if (data) {
            this.title = data.original_title;
            setTimeout(() => {
                this.activeImg = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
            }, 200);
        }
    },
    mouseLeave() {
        this.title = 'Movies';
        this.activeImg = null;
    },
  }
}).$mount("#movies");