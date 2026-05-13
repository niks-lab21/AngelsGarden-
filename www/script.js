// ─────────────────────────────────────────
//  HTML ELEMENTS SETUP
// ─────────────────────────────────────────
const canvas        = document.getElementById('doodle-canvas');
const ctx           = canvas.getContext('2d');
const introVideo    = document.getElementById('intro-video');
const splashNote    = document.getElementById('splash-note');
const splashOverlay = document.getElementById('splash-overlay');

// ─────────────────────────────────────────
//  CANVAS — Doodle Layer
// ─────────────────────────────────────────
let drawing    = false;
let brushSize  = 5;
let brushType  = 'ink-bleed';
let brushColor = '#ffffff';

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove',  draw, { passive: false });
canvas.addEventListener('touchend',   stopDrawing);

function startDrawing(e) { 
    e.preventDefault();
    drawing = true; 
    draw(e); 
}
function stopDrawing() { 
    drawing = false; 
    ctx.beginPath(); 
}

function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    ctx.lineWidth   = brushSize;
    ctx.lineCap     = 'round';
    ctx.strokeStyle = brushColor;

    if (brushType === 'soft-glow') {
        ctx.shadowBlur  = brushSize * 1.5;
        ctx.shadowColor = brushColor;
    } else if (brushType === 'ink-bleed') {
        ctx.shadowBlur  = 2;
        ctx.globalAlpha = 0.8;
    } else {
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
    }

    ctx.lineTo(touch.clientX, touch.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX, touch.clientY);
}

function updateBrushSize(val) { brushSize = val; }
function setBrush(type) { brushType = type; }
function updateColor(color) { brushColor = color; }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// ─────────────────────────────────────────
//  AUDIO SETUP
// ─────────────────────────────────────────
const rainSound   = new Audio('assets/audio/ambient/rain_loop.mp3');
rainSound.loop    = true;
const purrSound   = new Audio('assets/audio/cat_purr.mp3');
const splashAudio = new Audio('assets/audio/splash_audio.mp3');

function playHapticPurr() {
    purrSound.play();
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function toggleAudio() {
    if (rainSound.paused) {
        rainSound.play();
    } else {
        rainSound.pause();
    }
}

// ─────────────────────────────────────────
//  SPLASH — Tap to Start
// ─────────────────────────────────────────
let videoStarted = false;

splashOverlay.addEventListener('click', function startAll() {
    if (!videoStarted) {
        videoStarted = true;
        introVideo.play().catch(e => {
            console.log('Video play failed:', e);
            splashNote.classList.add('visible');
        });
    }
    try {
        splashAudio.play();
    } catch(e) {
        console.log('Splash audio failed:', e);
    }
    splashOverlay.removeEventListener('click', startAll);
}, { once: true });

introVideo.addEventListener('timeupdate', function () {
    if (this.currentTime >= 13) splashNote.classList.add('visible');
    if (this.currentTime >= 17) {
        this.pause();
        this.currentTime = 17;
    }
});

// Fallback: show note after 3 seconds
setTimeout(() => {
    if (!splashNote.classList.contains('visible')) {
        splashNote.classList.add('visible');
    }
}, 3000);

splashNote.onclick = () => {
    splashOverlay.style.opacity = '0';
    setTimeout(() => {
        splashOverlay.style.display = 'none';
        try {
            rainSound.play();
        } catch(e) {
            console.log('Audio play failed:', e);
        }
    }, 1000);
};

// ─────────────────────────────────────────
//  HIDDEN NOTE — Envelope Modal & Typewriter
// ─────────────────────────────────────────
function openHiddenNote() {
    const fullText = `You found it! ❤️\n\nJust a small gesture for you, My Sweetheart. I hope you like it... Welcome to this tiny world of yours.\n\nAnd no worries, I'm not gonna start with those same old lines here. We both know that. I'm sorry for not keeping up with my words sometimes, My Baby... ❤️\n\nNothing is expected from you here. You are enough. You don't have to do anything.\n\nJust be.\n\nIt's your world. Just stay, relax, and breathe.\n\nI love you, My Sweetheart. 😚❤️🎀`;

    const noteOverlay = document.createElement('div');
    noteOverlay.id = 'hidden-note-overlay';
    noteOverlay.innerHTML = `
        <div class="note-content">
            <div id="typewriter-text" style="white-space: pre-wrap; line-height: 1.6;"></div>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; background: transparent; border: 1px solid #1a110b; padding: 5px 15px; border-radius: 5px; font-family: inherit; cursor: pointer;">Close</button>
        </div>
    `;
    document.body.appendChild(noteOverlay);

    let i = 0;
    const speed = 40;
    function typeWriter() {
        if (i < fullText.length) {
            document.getElementById("typewriter-text").innerHTML += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
    
    const envelope = document.getElementById('envelope-img');
    if(envelope) envelope.classList.remove('glow-active');
}

// Envelope glow on start
document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope-img');
    if(envelope) envelope.classList.add('glow-active');
});
