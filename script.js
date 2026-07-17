// Neural Network Background
const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

const nodes = Array.from({ length: 50 }, () => new Node());

function animate() {
    ctx.fillStyle = 'rgba(18, 0, 28, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node) => node.update());

    nodes.forEach((nodeA, index) => {
        nodes.slice(index + 1).forEach((nodeB) => {
            const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const lightThemeEnabled = body.classList.toggle('light-theme');
    themeToggle.innerHTML = lightThemeEnabled
        ? '<span aria-hidden="true">☾</span>'
        : '<span aria-hidden="true">☀</span>';
    themeToggle.setAttribute('aria-pressed', String(lightThemeEnabled));
    themeToggle.setAttribute(
        'aria-label',
        lightThemeEnabled ? 'Switch to dark theme' : 'Switch to light theme',
    );
});

// Scroll to Top
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('visible', window.pageYOffset > 300);
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Replace an unavailable video with its verified still image.
document.querySelectorAll('.video-container video').forEach((video) => {
    const showFallback = () => {
        const fallback = video.parentElement.querySelector('.video-fallback');
        if (!fallback) return;
        video.hidden = true;
        fallback.hidden = false;
    };

    video.addEventListener('error', showFallback);
    video.querySelectorAll('source').forEach((source) => {
        source.addEventListener('error', showFallback);
    });
});
