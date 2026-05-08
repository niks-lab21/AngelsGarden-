// Intro Sequence Controller
const introVideo = document.getElementById('splash-video');
const mainApp = document.getElementById('main-sanctuary');

introVideo.onended = () => {
    // 1 second ki "Stillness" pause
    setTimeout(() => {
        introVideo.style.opacity = '0'; // Smooth fade out
        setTimeout(() => {
            introVideo.style.display = 'none';
            mainApp.classList.add('visible'); // Sanctuary load karo
            playAmbientRain(); // Background music shuru
        }, 1000); 
    }, 1000);
};
