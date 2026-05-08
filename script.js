const canvas = document.getElementById('doodle-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushSize = 5;
let brushType = 'ink-bleed'; // Default
let brushColor = '#ffffff';

// Canvas size fix for Mobile
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing Logic
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    const touch = e.touches[0];
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    // Brush Styles Logic
    if (brushType === 'soft-glow') {
        ctx.shadowBlur = brushSize * 1.5;
        ctx.shadowColor = brushColor;
    } else if (brushType === 'ink-bleed') {
        ctx.shadowBlur = 2; // Subtle organic feel
        ctx.globalAlpha = 0.8;
    } else {
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    ctx.lineTo(touch.clientX, touch.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX, touch.clientY);
}
