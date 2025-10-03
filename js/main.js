// Main Game Functions
function startGame() {
    // Clear any existing saved game data
    localStorage.removeItem('callbreakSave');
    
    const players = [];
    for (let i = 1; i <= 4; i++) {
        const name = document.getElementById(`player${i}`).value.trim() || `Player ${i}`;
        players.push({
            name: name,
            totalScore: 0,
            totalMoney: 0,
            roundScores: [],
            roundMoney: [],
            bids: [],
            tricks: [],
            bonusBids: [],
            successfulBids: 0
        });
    }

    gameState.players = players;
    gameState.totalRounds = parseInt(document.getElementById('totalRounds').value);
    gameState.baseStake = parseInt(document.getElementById('baseStake').value);
    gameState.currentRound = 1;
    gameState.phase = 'bidding';
    gameState.roundHistory = [];
    gameState.potTotal = 0;
    gameState.startTime = Date.now();

    document.querySelector('.setup-screen').classList.remove('active');
    document.querySelector('.game-screen').classList.add('active');
    
    document.getElementById('totalRoundsDisplay').textContent = gameState.totalRounds;
    document.getElementById('currentRound').textContent = gameState.currentRound;

    renderBidInputs();
    updateScoreTable();
    initCharts();
}

function resetGame() {
    // CRITICAL: Clear localStorage FIRST
    localStorage.removeItem('callbreakSave');
    
    // Destroy charts completely
    if (scoreChart) {
        scoreChart.destroy();
        scoreChart = null;
    }
    if (moneyChart) {
        moneyChart.destroy();
        moneyChart = null;
    }
    
    // Completely reset game state to initial values
    gameState = {
        players: [],
        currentRound: 1,
        totalRounds: 5,
        phase: 'bidding',
        roundHistory: [],
        baseStake: 10,
        potTotal: 0,
        startTime: Date.now()
    };

    // Clear resume prompt HTML
    const resumePrompt = document.getElementById('resumePrompt');
    if (resumePrompt) {
        resumePrompt.innerHTML = '';
    }

    // Clear all table bodies
    const scoreTableBody = document.getElementById('scoreTableBody');
    if (scoreTableBody) {
        scoreTableBody.innerHTML = '';
    }
    
    const finalScoreTableBody = document.getElementById('finalScoreTableBody');
    if (finalScoreTableBody) {
        finalScoreTableBody.innerHTML = '';
    }
    
    const roundHistory = document.getElementById('roundHistory');
    if (roundHistory) {
        roundHistory.innerHTML = '';
    }

    // Reset all screens
    document.querySelector('.setup-screen').classList.add('active');
    document.querySelector('.game-screen').classList.remove('active');
    document.querySelector('.victory-screen').classList.remove('active');
    document.querySelector('.info-page').classList.remove('active');
    
    showToast('Game reset! Starting fresh.', 'success');
}

// Initialize on DOM ready (avoids unload policy issues)
window.addEventListener('DOMContentLoaded', function() {
    loadSavedGame();
});

// Auto-save on page visibility change (replaces unload)
window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && gameState.players.length > 0) {
        saveGame(false);
    }
});