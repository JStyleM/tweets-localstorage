// Vars
const listaTweets = document.querySelector('#lista-tweets');
window.onload = loadFromLocalStorage;

eventListenners();


// Event Listenners
function eventListenners() {
    // Agregar Tweet a las Lista
    document.querySelector('#formulario').addEventListener('submit', addTweet);
    listaTweets.addEventListener('click', removeTweet);
}

function createLiToShow(tweet) {

    // Creacion del Elemento Item
    const item = document.createElement('li');
    item.innerText = tweet; // Agrega tweet

    // Creacion del Elemento borrarTweet
    const borrarTweet = document.createElement('a');
    borrarTweet.classList = 'borrar-tweet';
    borrarTweet.innerText = 'X';

    // Agregar Boton Borrar al Item
    item.appendChild(borrarTweet);

    return item;
}


// Agregar Tweet al formulario
function addTweet(e) {
    e.preventDefault();

    // Leer Valor del TextArea
    const tweet = document.querySelector('#tweet').value;

    // Crear Elemento LI que contiene el tweet y boton borrar
    let item = createLiToShow(tweet);

    // Agregar item a la Lista
    listaTweets.appendChild(item);

    // Agregar al LocalStorage  
    addToLocalStorage(tweet);
}

// Borrar tweets 
function removeTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        let tweet = e.target.parentElement;
        removeTweetLocalStorage(tweet);
        tweet.remove();
        console.log('Tweet Eliminado!');
        
    }
}

// Eliminar del localStorage 
function removeTweetLocalStorage(tweet) {
    
    tweet = tweet.childNodes[0].data; // Text del Tweet traido del HTML
    tweetsLS = getFromLocalStorage(); // Todos los tweets del LS
    
    for (let i = 0; i < tweetsLS.length; i++) {
        // Si encuentra Tweet igual en LS Elimina con splice
        if (tweet === tweetsLS[i]) {
            tweetsLS.splice(i,1);
            localStorage.setItem('tweets', JSON.stringify(tweetsLS)); // Escribe en LS sin el tweet que eliminamos
            break;
        }
    }
}

// Obtener Tweets de LocalStorage y convertirlos a JSON
function getFromLocalStorage() {
    let tweets = localStorage.getItem('tweets');
    if (tweets === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweets); // Conversion a JSON para push
    }
    return tweets;
}


// Añade el tweet pasado por parametro y lo convierte a string para
// gusardarse en el localstorage
function addToLocalStorage(tweet) {
    let tweets = getFromLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets)); // Conversion a String
}

// Cargar Tweets desde Localstorage al cargar la pagina
function loadFromLocalStorage(e) {
    e.preventDefault()
    let tweets = getFromLocalStorage();
    
    tweets.forEach(tweet => {
        item = createLiToShow(tweet);
        listaTweets.appendChild(item);
    });
}
