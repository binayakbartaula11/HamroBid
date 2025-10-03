// Local Storage Functions
function saveGame(showMessage = true) {
    const saveData = {
        gameState: gameState,
        timestamp: Date.now()
    };
    localStorage.setItem('callbreakSave', JSON.stringify(saveData));
    if (showMessage) showToast('✅ Game saved successfully!', 'success');
}

function loadSavedGame() {
    const saved = localStorage.getItem('callbreakSave');
    if (saved) {
        const data = JSON.parse(saved);
        const minutesAgo = Math.floor((Date.now() - data.timestamp) / 60000);
        
        const prompt = document.getElementById('resumePrompt');
        prompt.innerHTML = `
            <div class="resume-prompt">
                <h3>💾 Saved Game Found!</h3>
                <p>Continue your game from ${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago?</p>
                <p>Round ${data.gameState.currentRound} of ${data.gameState.totalRounds}</p>
                <div class="action-buttons" style="margin-top: 15px;">
                    <button class="btn" onclick="resumeGame()">Resume Game</button>
                    <button class="btn btn-secondary" onclick="clearSavedGame()">Start Fresh</button>
                </div>
            </div>
        `;
    }
}

function resumeGame() {
    const saved = localStorage.getItem('callbreakSave');
    if (saved) {
        const data = JSON.parse(saved);
        gameState = data.gameState;
        
        document.querySelector('.setup-screen').classList.remove('active');
        document.querySelector('.game-screen').classList.add('active');
        
        document.getElementById('totalRoundsDisplay').textContent = gameState.totalRounds;
        document.getElementById('currentRound').textContent = gameState.currentRound;
        document.getElementById('potDisplay').textContent = `Pot: NPR ${gameState.potTotal}`;
        document.getElementById('phaseIndicator').textContent = 
            gameState.phase === 'bidding' ? 'Bidding Phase' : 'Playing Phase';
        
        if (gameState.phase === 'bidding') {
            renderBidInputs();
            document.getElementById('biddingPhase').style.display = 'block';
            document.getElementById('trickPhase').style.display = 'none';
        } else {
            renderTrickInputs();
            document.getElementById('biddingPhase').style.display = 'none';
            document.getElementById('trickPhase').style.display = 'block';
        }
        
        updateScoreTable();
        updateCharts();
        renderRoundHistory();
        showToast('🎮 Game resumed!', 'success');
    }
}

function clearSavedGame() {
    localStorage.removeItem('callbreakSave');
    document.getElementById('resumePrompt').innerHTML = '';
    showToast('🗑️ Saved game cleared', 'info');
}

// Export to CSV
function exportGame() {
    let csv = 'Round,Player,Bid,Tricks,Score,Money,Total Score,Total Money\n';
    
    gameState.roundHistory.forEach((round, index) => {
        round.forEach(entry => {
            csv += `${index + 1},${entry.player},${entry.bid},${entry.tricks},${entry.score},${entry.money},${entry.totalScore},${entry.totalMoney}\n`;
        });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `callbreak-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    showToast('📤 Game exported!', 'success');
}