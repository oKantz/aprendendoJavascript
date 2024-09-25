        // Criando as variveis que são atribuidas com uma função que pega o id referente a um elemento da playlist presente nele
        const songName = document.getElementById("song-name");
        const bandName = document.getElementById("band-name");
        const song = document.getElementById("audio");
        const cover = document.getElementById("cover");
        const play = document.getElementById("play");
        const next = document.getElementById("next");
        const previous = document.getElementById("previous");
        const likeButton = document.getElementById('like');
        const currentProgress = document.getElementById("current-progress");
        const progressContainer = document.getElementById("progress-container");
        const shuffleButton = document.getElementById("shuffle");
        const repeatButton = document.getElementById('repeat');
        const songTime = document.getElementById('song-time');
        const totalTime = document.getElementById('total-time');
         
         
        // músicas escolhidas
        const chase = {
            songName: 'Chase',
            artist: 'Batta',
            file: 'chase_batta',
            liked: false,
        };
         
        const oreko = {
            songName: 'Oreko',
            artist: 'sun is poison',
            file: 'oreko',
            liked: false,
        };
         
         
        // fecha músicas escolhidas
         
        let isPlaying = false;
        let isShuffled = false; // informa se a playlist está embaralhada
        let repeatOn = false; // impede q a musica ja comece tocando
         
        try {
            originalplaylist = JSON.parse(localStorage.getItem('playlist')) ?? [chase, oreko];
        } catch (error) {
            console.error("Erro ao carregar playlist do localStorage:", error);
            originalplaylist = [chase, oreko]; // Fallback para a lista padrão
        }
         
        //const originalplaylist = JSON.parse(localStorage.getItem('playlist')) ?? [Enemy, Sharks]; // vetor que armazena as musicas // ?? representa o operador de coalecência nula
        //const originalplaylist = [Enemy, Sharks];
        let sortedPlaylist = [...originalplaylist]; // copia do original que vai ser usado para a ordem aleatoria
        let index = 0;
         
        // Responsavel por determinar se o coração de like foi clicado
        function likeButtonRender() {
            if (sortedPlaylist[index].liked === true) {
              likeButton.querySelector('.bi').classList.remove('bi-heart');
              likeButton.querySelector('.bi').classList.add('bi-heart-fill');
              likeButton.classList.add('button-active');
            } else {
              likeButton.querySelector('.bi').classList.add('bi-heart');
              likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
              likeButton.classList.remove('button-active');
            }
        }
         
        function initializeSong() {
            cover.src = `IMAGEM/${sortedPlaylist[index].file}.png`;
            songName.innerText = sortedPlaylist[index].songName;
            bandName.innerText = sortedPlaylist[index].artist;
            song.src = `songs/${sortedPlaylist[index].file}.mp3`;
            likeButtonRender();
        }
         
        function playSong() {
            play.querySelector(".bi").classList.remove("bi-play-circle-fill");
            play.querySelector(".bi").classList.add("bi-pause-circle-fill");
            song.play();
            isPlaying = true;
        }
         
        function pauseSong() {
            play.querySelector(".bi").classList.add("bi-play-circle-fill");
            play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
            song.pause();
            isPlaying = false;
        }
         
        function playPauseDecider() {
            if (isPlaying === true) {
              pauseSong();
            } else {
              playSong();
            }
        }
         
        function previousSong() {
            if(index === 0){
                index = sortedPlaylist.length - 1;
            }
            else {
                index -=1;
            }
            initializeSong();
            playSong();
        }
         
        function nextSong() {
            if(index === sortedPlaylist.length - 1){
                index = 0;
            }
            else {
                index +=1;
            }
           
            initializeSong();
            playSong();
        }
         
        function updateProgress() {
            const barWidth = (song.currentTime/song.duration)*100;
            currentProgress.style.setProperty('--progress', `${barWidth}%`);
            songTime.innerText = toHHMMSS(song.currentTime);
        }
         
        function jumpTo(event){
            const width = progressContainer.clientWidth;
            const clickPosition = event.offsetX;
            const jumpToTime = (clickPosition/width)* song.duration;
            song.currentTime = jumpToTime;
        }
         
        function shuffleArray(preShuffleArray) {
            const size = sortedPlaylist.length;
            let currentIndex =  size - 1;
            while(currentIndex > 0) {
                let randomIndex = Math.floor(Math.random()* size); 
                let aux = preShuffleArray[currentIndex];
                preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
                preShuffleArray[randomIndex] = aux;
                currentIndex -= 1;
            }
        }
         
        function shuffleButtonClicked() {
            if(isShuffled === false){
                isShuffled = true;
                shuffleArray(sortedPlaylist);
                shuffleButton.classList.add('button-active');
            }
            else {
                isShuffled = false;
                sortedPlaylist = [...originalplaylist];
                shuffleButton.classList.remove('button-active');
            }
        }
         
        function repeatButtonClicked() {
            if (repeatOn === false) {
              repeatOn = true;
              repeatButton.classList.add('button-active');
            } else {
              repeatOn = false;
              repeatButton.classList.remove('button-active');
            }
        }
         
        function nextOrRepeat() {
            if (repeatOn === false) {
                nextSong();
            }
            else {
                playSong();
            }
        }
         
        function toHHMMSS(originalNumber) {
            let hours = Math.floor(originalNumber/3600);
            let min = Math.floor((originalNumber - hours * 3600) / 60);
            let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
         
            return `${hours.toString().padStart(2, '0')}:${min.toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, "0")}`;
        }
         

        function updateTotalTime() {
            toHHMMSS(song.duration);
            totalTime.innerText = toHHMMSS(song.duration);
        }
         
        function likeButtonClicked() {
            if (sortedPlaylist[index].liked === false) {
                sortedPlaylist[index].liked = true;
            }
            else {
                sortedPlaylist[index].liked = false;
            }
            likeButtonRender();
            localStorage.setItem('playlist', JSON.stringify(originalplaylist)); 
        }
         
        initializeSong();
         
        play.addEventListener('click', playPauseDecider); 
        next.addEventListener('click', nextSong); 
        previous.addEventListener('click', previousSong); 
        song.addEventListener('timeupdate', updateProgress); 
        song.addEventListener('loadedmetadata', updateTotalTime); 
        song.addEventListener("ended", nextOrRepeat); 
        progressContainer.addEventListener("click", jumpTo); // evento para a ação de pular em trechos da musica
        shuffleButton.addEventListener("click", shuffleButtonClicked); 
        repeatButton.addEventListener("click", repeatButtonClicked); 
        likeButton.addEventListener('click', likeButtonClicked);