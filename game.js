const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 32;
const mapWidth = 20;
const mapHeight = 15;

// Simple map: 0 = grass, 1 = wall
const map = Array(mapHeight).fill().map((_, y) =>
    Array(mapWidth).fill().map((_, x) => (x === 0 || x === mapWidth-1 || y === 0 || y === mapHeight-1) ? 1 : 0)
);

const player = {
    x: 2,
    y: 2,
    color: '#3498db',
    hp: 10,
    maxHp: 10
};

function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            ctx.fillStyle = map[y][x] === 1 ? '#7f6a2a' : '#4caf50';
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x * tileSize + tileSize/2,
        player.y * tileSize + tileSize/2,
        tileSize/2.2, 0, Math.PI * 2
    );
    ctx.fill();
}

function drawUI() {
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 20);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    drawUI();
}

function movePlayer(dx, dy) {
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (map[ny][nx] === 0) {
        player.x = nx;
        player.y = ny;
    }
    render();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') movePlayer(0, -1);
    else if (e.key === 'ArrowDown') movePlayer(0, 1);
    else if (e.key === 'ArrowLeft') movePlayer(-1, 0);
    else if (e.key === 'ArrowRight') movePlayer(1, 0);
});

render();
