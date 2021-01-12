let app = new Vue({
    el:'#app',
    data:{
        filmsByInput: [],
        userInput:"",

    },
    // funzione che mostra i film cercati dall'utente cambiando dinamicamente la stringa della query
    methods:{
        showFilmsByInput(userInput) {
            axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=ecab8acb7eb8a4ea7947676af9821638&query=" + userInput)
            .then(response => {
                this.filmsByInput = response.data.results;
                console.log(this.filmsByInput);
            });
        }
    }
});