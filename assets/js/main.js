// MILESTONE 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

let app = new Vue({
    el:'#app',
    data:{
        filmsByInput: [],
        userInput:"",
        vote: null,
        flag:""

    },
    // funzione che mostra i film cercati dall'utente cambiando dinamicamente la stringa della query
    methods:{
        showFilmsByInput(userInput) {
            axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=ecab8acb7eb8a4ea7947676af9821638&query=" + userInput)
            .then(response => {
                this.filmsByInput = response.data.results;
                console.log(this.filmsByInput);

                this.averageStars();
                this.showFlag();
            });
        },
        
        // MILESTONE 2:
        // Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
        // Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)

        //funzione che trasforma il voto (n.decimale 1-10) in stelle (n.intero 1-5)
        averageStars(){
            this.filmsByInput.forEach(elem =>{
                this.vote = elem.vote_average;
                let stars = Math.ceil(this.vote * 0.5);
                return elem.stars = stars;
            })
        },
        
        showFlag(){
            this.filmsByInput.forEach( elem => {
                this.flag = elem.original_language;
                let flagImg = 'https://www.countryflags.io/' + this.flag + '/flat/64.png';
                return elem.flag = flagImg;
                
            })

        }
    }
});








// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).









// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
// crubs
