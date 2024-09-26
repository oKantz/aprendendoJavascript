const songs = [
    {
        title: "Oreko",
        author: "sun is poison",
        file: "songs/oreko.mp3",
        cover: "imagens/oreko.png" // Alterado para PNG
    },
    {
        title: "Chase",
        author: "Batta",
        file: "songs/chase_batta.mp3",
        cover: "imagens/chase_batta.png" // Alterado para PNG
    }
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title'); // Título
const songAuthor = document.getElementById('song-author'); // Autor
const likeButton = document.getElementById('like');
const likedMessage = document.getElementById('liked-message');

function loadSong(index) {
    audioSource.src = songs[index].file;
    cover.src = songs[index].cover; // Usando PNG
    songTitle.textContent = songs[index].title; // Atualizando o título da música
    songAuthor.textContent = songs[index].author; // Atualizando o autor
    audio.load();
}

document.getElementById('play').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

document.getElementById('next').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});

document.getElementById('prev').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});

likeButton.addEventListener('click', () => {
    likedMessage.style.display = 'block';
    setTimeout(() => {
        likedMessage.style.display = 'none';
    }, 2000);
});

// Carregar a primeira música ao iniciar
loadSong(currentSongIndex);
