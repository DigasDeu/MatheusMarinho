const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
const pPause = document.querySelector('#play-pause'); // element where play and pause image appears

let songIndex = 0;
const songs = ['Pagode na Praia - Tô Vivendo.mp3', 'Pagode na Praia - Brincadeira Tem Hora _ Uma Prova de Amor _ Verdade.mp3','Grupo Revelação - Tá Escrito (Ao Vivo no Morro).mp3','O Grilo - Foi Por Querer (Visualizer) _TUDOACONTECEAGORA.mp3']; // object storing paths for audio objects
const thumbnails = ['matheus.png' , 'matheus.png', 'matheus.png', 'matheus.png']; // object storing paths for album covers and backgrounds
const songArtists = ['Nam', 'Feliz Aniversario','oi?', 'tudo bem?']; // object storing track artists
const songTitles = [";-;", "ETU EOMA - (Lisseres Referencias) ", 'Dotado? (e um meme ta)', 'cade o hamburge desse lanche?']; // object storing track titles

let playing = false; // começa pausado

function playPause() {
    if (!playing) {
        pPause.src = "pause.png";
        thumbnail.style.transform = "scale(1.15)";
        song.play();
        playing = true;
    } else {
        pPause.src = "play.png";
        thumbnail.style.transform = "scale(1)";
        song.pause();
        playing = false;
    }
}

// Troca o ícone ao clicar no botão play/pause
pPause.addEventListener('click', playPause);

// Troca para a próxima música ao terminar a atual
song.addEventListener('ended', function(){
    nextSong();
});

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    updateSong();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    updateSong();
}

function updateSong() {
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];
    playing = false;
    playPause();
}

// Atualiza a barra de progresso e os tempos
function updateProgressValue() {
    progressBar.max = song.duration || 0;
    progressBar.value = song.currentTime || 0;
    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime));
    if (isNaN(song.duration)) {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(song.duration));
    }
}

// Formata o tempo em MM:SS
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}

// Atualiza a barra de progresso a cada 500ms
setInterval(updateProgressValue, 500);

// Permite arrastar a barra de progresso
progressBar.addEventListener('input', function() {
    song.currentTime = progressBar.value;
});

// Se quiser botões para avançar/retroceder, adicione listeners:
const nextBtn = document.querySelector('#next');
if (nextBtn) nextBtn.addEventListener('click', nextSong);

const prevBtn = document.querySelector('#prev');
if (prevBtn) prevBtn.addEventListener('click', previousSong);

// Inicializa o player com a primeira música
updateSong();