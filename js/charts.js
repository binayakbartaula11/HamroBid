// Chart Functions
function initCharts() {
    if (!window.Chart) {
        console.warn('Chart.js not available, charts disabled');
        return;
    }
    
    const scoreCtx = document.getElementById('scoreChart').getContext('2d');
    const moneyCtx = document.getElementById('moneyChart').getContext('2d');

    const colors = ['#DC143C', '#1E90FF', '#228B22', '#FFA500'];

    scoreChart = new Chart(scoreCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: gameState.players.map((player, index) => ({
                label: player.name,
                data: [],
                borderColor: colors[index],
                backgroundColor: colors[index] + '33',
                tension: 0.3
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    moneyChart = new Chart(moneyCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: gameState.players.map((player, index) => ({
                label: player.name,
                data: [],
                backgroundColor: colors[index]
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function updateCharts() {
    if (!window.Chart) return;
    
    if (!scoreChart || !moneyChart) {
        initCharts();
    }

    const rounds = gameState.roundHistory.length;
    const labels = Array.from({length: rounds}, (_, i) => `R${i + 1}`);

    scoreChart.data.labels = labels;
    gameState.players.forEach((player, index) => {
        // Use cumulative totals for score progression
        const cumulativeScores = [];
        let runningTotal = 0;
        player.roundScores.forEach(score => {
            runningTotal += score;
            cumulativeScores.push(runningTotal);
        });
        scoreChart.data.datasets[index].data = cumulativeScores;
    });
    scoreChart.update();

    moneyChart.data.labels = labels;
    gameState.players.forEach((player, index) => {
        // Show cumulative money progression
        const cumulativeMoney = [];
        let runningTotal = 0;
        player.roundMoney.forEach(money => {
            runningTotal += money;
            cumulativeMoney.push(runningTotal);
        });
        moneyChart.data.datasets[index].data = cumulativeMoney;
    });
    moneyChart.update();
}