const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');

const beloreiventar = {
    songName : 'Reiventar',
    artist : 'Belo',
    file: 'belo1'
};
const tiaguinhonossasala = {
    songName : 'Nossa Sala - Hayden e Lígia',
    artist : 'Tiaguinho',
    file: 'tiaguinho_nossasala'
};

const mamamiaMalu = {
  songName : 'Dancing Queen',
  artist : 'Abba',
  file: 'mamamia_malu'
};

const anunciacao_Lis = {
  songName : 'Anunciação',
  artist : 'Mariana Nolasco',
  file: 'anunciacao_Lis'
};


let isPlaying = false;
const playlist = [beloreiventar, tiaguinhonossasala, mamamiaMalu, anunciacao_Lis];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong(){
    cover.src = `images/${playlist[index].file}.webp`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);

