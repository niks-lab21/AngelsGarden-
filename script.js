// ─────────────────────────────────────────
//  CANVAS — Doodle Layer
// ─────────────────────────────────────────
const canvas = document.getElementById('doodle-canvas');
const ctx    = canvas.getContext('2d');
let drawing   = false;
let brushSize = 5;
let brushType = 'ink-bleed';
let brushColor = '#ffffff';

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove',  draw);
canvas.addEventListener('touchend',   stopDrawing);

function startDrawing(e) { drawing = true; draw(e); }
function stopDrawing()   { drawing = false; ctx.beginPath(); }

function draw(e) {
    if (!drawing) return;
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
// Artist Platter Functions
function updateBrushSize(val) {
    brushSize = val;
}

function setBrush(type) {
    brushType = type;
    // Visual feedback: Brushes ke beech switch karne par alert ya subtle change de sakte ho
}

function updateColor(color) {
    brushColor = color;
}

// Doodle clear karne ke liye optional function (if you want to add a button)
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// ─────────────────────────────────────────
//  AUDIO
// ─────────────────────────────────────────
const rainSound = new Audio('assets/audio/ambient/rain_loop.mp3');
rainSound.loop = true;

const purrSound = new Audio('assets/audio/cat_purr.mp3');

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
//  SPLASH — Intro Video + Sanctuary Entry
// ─────────────────────────────────────────
const introVideo   = document.getElementById('intro-video');
const splashNote   = document.getElementById('splash-note');
const splashOverlay = document.getElementById('splash-overlay');

introVideo.addEventListener('timeupdate', function () {
    if (this.currentTime >= 13) splashNote.classList.add('visible');
    if (this.currentTime >= 17) {
        this.pause();
        this.currentTime = 17; // Lotus par freeze
    }
});

splashNote.onclick = () => {
    splashOverlay.style.opacity = '0';
    setTimeout(() => {
        splashOverlay.style.display = 'none';
        rainSound.play(); // Room mein enter hote hi baarish shuru
    }, 1000);
};

// ─────────────────────────────────────────
//  HIDDEN NOTE — Envelope Modal
// ─────────────────────────────────────────
function openHiddenNote() {
    // Envelope modal logic — extend here
    console.log('Hidden note opened');

    // Check if new message exists in config
if(config.new_message) {
    document.getElementById('envelope-img').classList.add('glow-active');
}
function openHiddenNote() {
    const noteOverlay = document.createElement('div');
    noteOverlay.id = 'hidden-note-overlay';
    noteOverlay.innerHTML = `
        <div class="note-content">
            </p>You found it! ❤️<br><br>

Just a small gesture for you, my darling.<br>
I hope you like it...<br>
Welcome to this tiny world of yours.<br><br>

And no worries, I’m not gonna start with those same old lines here.<br>
We both know that.<br>
I’m sorry for not keeping up with my words sometimes, my baby... ❤️<br><br>

Nothing is expected from you here.<br>
You are enough.<br>
You don’t have to do anything.<br><br>

Just be.<br>
It’s your world.<br>
Just stay and relax.<br><br>

I love you, my Sweetheart. 😚❤️🎀</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(noteOverlay);
}
