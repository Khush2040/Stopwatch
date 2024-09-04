let timer;
let isRunning = false;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    display.textContent = '00:00:00';
    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    updateLaps();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        laps.push(elapsedTime);
        updateLaps();
    }
});

function updateTime() {
    elapsedTime++;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(li);
    });
}
