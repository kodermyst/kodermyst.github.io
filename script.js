// --- 1. Background Particle/Physics Simulation ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const particleCount = 45;

for (let i = 0; i < particleCount; i++) {
    particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 2 + 1
});
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw particles & connecting nodes
for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#58a6ff';
    ctx.fill();

for (let j = i + 1; j < particles.length; j++) {
    let p2 = particles[j];
    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
    if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(88, 166, 255, ${0.15 - dist / 130 * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }
}
}
requestAnimationFrame(animateCanvas);
}
animateCanvas();

// --- 2. Notebook Filtering Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');
const noteCards = document.querySelectorAll('.note-card');

filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    noteCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});
});

// --- 3. Terminal Emulator ---
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

const commands = {
'help': 'Available commands: [about, pillars, spices, notes, clear]',
'about': 'gadimyst.github.io is a personal space for science notes, ecology, computational experiments, and culinary chemistry.',
'pillars': 'Focus Areas: 1. Science & Ecology  2. Automation & Workflow Logic  3. Culinary Chemistry',
'spices': 'Top profile aromatics: Sichuan Peppercorns (numbing sensory vibration), Cumin (earthy/warm), Bay Leaves, Star Anise.',
'notes': 'Filter through the Notebook Entries above to explore writeups.',
'contactme': 'Reach out via email: keenancloete@live.com, or connect on WhatsApp: +27 82 065 0066.'
};

terminalInput.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
const inputVal = terminalInput.value.trim().toLowerCase();

// Add input line
const inputLine = document.createElement('div');
inputLine.className = 'terminal-line';
inputLine.innerHTML = `<span class="prompt">visitor@gadimyst:~$</span> ${inputVal}`;
terminalBody.appendChild(inputLine);

// Command processing
if (inputVal === 'clear') {
    terminalBody.innerHTML = '';
} else if (commands[inputVal]) {
    const outputLine = document.createElement('div');
    outputLine.className = 'cmd-output';
    outputLine.textContent = commands[inputVal];
    terminalBody.appendChild(outputLine);
} else if (inputVal !== '') {
    const outputLine = document.createElement('div');
    outputLine.className = 'cmd-output';
    outputLine.style.color = '#ff7b72';
    outputLine.textContent = `command not found: ${inputVal}. Type 'help' for options.`;
    terminalBody.appendChild(outputLine);
}

terminalInput.value = '';
terminalBody.scrollTop = terminalBody.scrollHeight;
}
});