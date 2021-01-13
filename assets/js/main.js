// Istanza Vue
let app = new Vue({
    el:'#app',
    data:{
        filmsByInput: [],
        tvSeriesByInput: [],
        userInput:"",
        vote: null,
        flag:"",
        poster:""
    },

    
    methods:{
        //funzione che comprende le interazioni dell'utente nel caso in cui cerca o serieTv o films
        showInputResults(userInput){
            this.showFilmsByInput(userInput);
            this.showTvSeriesByInput(userInput);
        },


        // funzione che mostra i FILM cercati dall'utente cambiando dinamicamente la stringa della query    
        showFilmsByInput(userInput) {
            axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=ecab8acb7eb8a4ea7947676af9821638&query=" + userInput)
            .then(response => {
                this.filmsByInput = response.data.results;
                console.log(this.filmsByInput);

                //invoco le funzioni per:
                //mostrare il voto tramite stelle
                this.averageStars(this.filmsByInput);
                //mostrare la bandiera della lingua originale
                this.addFlag(this.filmsByInput);
                //mostrare il poster-copertina del film
                this.addPoster(this.filmsByInput);
            });
        },

        // funzione che mostra le SERIE-TV cercate dall'utente cambiando dinamicamente la stringa della query 
        showTvSeriesByInput(userInput){
            axios
            .get("https://api.themoviedb.org/3/search/tv?api_key=ecab8acb7eb8a4ea7947676af9821638&query=" + userInput)
            .then(response =>{
                this.tvSeriesByInput = response.data.results;
                console.log(this.tvSeriesByInput);

                //invoco le funzioni per:
                //mostrare il voto tramite stelle
                this.averageStars(this.tvSeriesByInput);
                //mostrare la bandiera della lingua originale
                this.addFlag(this.tvSeriesByInput);
                //mostrare il poster-copertina della serieTv
                this.addPoster(this.tvSeriesByInput);
            });
        },
        
       

        //funzione che trasforma il voto (n.decimale 1-10) in stelle (n.intero 1-5)
        averageStars(array){
            array.forEach(elem =>{
                this.vote = elem.vote_average;
                let stars = Math.ceil(this.vote * 0.5);
                return elem.stars = stars;
            });
        },
        
        //funzione che aggiunge dinamicamente l'immagine della bandiera ai films e serieTv
        addFlag(array){
            array.forEach( elem => {
                this.flag = elem.original_language;
                let flagImg = 'https://www.countryflags.io/' + this.flag + '/flat/64.png';
                return elem.flag = flagImg;
            });
        },

        //funzione che e aggiunge dinamicamente l'immagine di copertina ai films e serieTv
        addPoster(array){
            array.forEach( elem =>{
                this.poster = elem.poster_path;
                let posterImg = 'https://image.tmdb.org/t/p/w342' + this.poster;
                return elem.poster = posterImg;
            });
        }



    }
});








