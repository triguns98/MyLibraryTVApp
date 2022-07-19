
$(document).ready(() => {
    const video = document.querySelector('video');
    const audio = document.querySelector('audio');
    const timeGoing = document.querySelector('#time-going');
    const duration = document.querySelector('#duration');

    let isPlaying = false;
    let controlsHidden = false;

    video.onloadedmetadata = () => {
        duration.innerHTML = getFormatedTime(video.duration);
    }

    video.onpause = () => audio.pause();
    video.onplay = () => {
        audio.play();
    } 
    video.onseeked = () => audio.currentTime = video.currentTime;
    video.ontimeupdate = () => setTime();

    function hideControls() {
        $('.controls').removeClass('visible');
        $('.controls').addClass('hidden');
        $('.navigation').removeClass('visible');
        $('.navigation').addClass('hidden');

        controlsHidden = true;
    }

    function showControls() {
        $('.controls').removeClass('hidden');
        $('.controls').addClass('visible');
        $('.navigation').removeClass('hidden');
        $('.navigation').addClass('visible');

        controlsHidden = false;
    }

    function setTime() {
        const format = getFormatedTime(video.currentTime);
        timeGoing.innerHTML = format;
        updateProgressBar();
    }

    function getFormatedTime(time) {
        let currentTime = Math.trunc(time);
        let seconds = currentTime % 60;
        let minutes = Math.trunc(currentTime / 60);
        if (minutes > 59)
            minutes = minutes % 60;
        let hours = Math.trunc(currentTime / 60 / 60);
        
        let pre10SecondsFormat = `0${seconds}`;
        let pre10MinutesFormat = `0${minutes}`;
        let pre10HoursFormat = `0${hours}`
        
        let format = `${minutes < 10 ? pre10MinutesFormat : `${minutes}`}: ${seconds < 10 ? pre10SecondsFormat : `${seconds}`}`;

        if (hours > 0){
            format = `${pre10HoursFormat}: ${format}`;
        }

        return format;
    }

    function updateProgressBar() {
        if (video.currentTime != video.duration) {
            let seconds = Math.trunc(video.currentTime);
            let progressPerSecond = 100 / (video.duration);
            let process =  seconds * progressPerSecond;
            
            $('#loaded').attr('style', `width:${process.toFixed(2)}%`)
        }
    }

    $(".play-button-container").on('click', (() => {
        playPauseVideo();
    }));

    window.addEventListener('keydown', (e) => {
        if (window.event){
            showControls();
            if (e.key === 'Enter')
                playPauseVideo();

            if (e.key === 'ArrowRight' && getSelectedElement().id === 'progress-bar'){
                video.currentTime = video.currentTime + 10;
            }

            if (e.key === 'ArrowLeft' && getSelectedElement().id === 'progress-bar'){
                video.currentTime = video.currentTime - 10;
            }
        }
    });

    function playPauseVideo() {
        if (!isPlaying){
            isPlaying = true;
            video.play();
            $('.play-button').attr('src', '../../Assets/Images/pause.png');
        } else {
            isPlaying = false;
            video.pause();
            $('.play-button').attr('src', '../../Assets/Images/play.png');
        }
    }

    const interval = setInterval(function() {
        if (!controlsHidden)
            hideControls();
      }, 4000);
});

