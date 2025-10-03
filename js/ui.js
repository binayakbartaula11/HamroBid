// UI Functions and Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    // Clear existing toasts
    container.innerHTML = '';
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function setPresetNames(names) {
    names.forEach((name, index) => {
        document.getElementById(`player${index + 1}`).value = name;
    });
}

function checkBidTotal() {
    let total = 0;
    for (let i = 0; i < 4; i++) {
        const bid = parseInt(document.getElementById(`bid${i}`).value) || 0;
        total += bid;
    }
    
    const warningDiv = document.getElementById('bidWarning');
    if (total > 13) {
        warningDiv.innerHTML = '<div class="warning">⚠️ Warning: The total bid exceeds 13.</div>';
    } else {
        warningDiv.innerHTML = '';
    }
}

function renderBidInputs() {
    const container = document.getElementById('bidInputs');
    container.innerHTML = '';

    const defaultBids = [3, 3, 3, 4];

    gameState.players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <h3>${player.name}</h3>
            <div class="input-group">
                <label>Bid (1-13)</label>
                <input type="number" id="bid${index}" min="1" max="13" value="${defaultBids[index]}" oninput="checkBidTotal()">
            </div>
            <div class="input-group" style="margin-top: 10px;">
                <label>💰 Bonus Bid (NPR) - Optional</label>
                <input type="number" id="bonus${index}" min="0" value="0" step="10">
            </div>
        `;
        container.appendChild(card);
    });
}

function renderTrickInputs() {
    const container = document.getElementById('trickInputs');
    container.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const bid = player.bids[player.bids.length - 1];
        const bonus = player.bonusBids[player.bonusBids.length - 1];
        const card = document.createElement('div');
        card.className = 'player-card';
        
        let warning = '';
        if (bid >= 8) {
            warning = '<div class="warning">⚠️ Double Call (8+)!</div>';
        }

        const potentialEarnings = gameState.baseStake * bid + bonus;
        
        card.innerHTML = `
            <h3>${player.name}</h3>
            <p style="color: #666; margin-bottom: 5px;">Bid: <strong>${bid}</strong></p>
            ${bonus > 0 ? `<p style="color: #FFA500; margin-bottom: 10px;">💰 Bonus: NPR ${bonus}</p>` : ''}
            ${warning}
            <div class="earnings-preview">
                💵 If successful: +NPR ${potentialEarnings}
            </div>
            <div class="input-group" style="margin-top: 10px;">
                <label>Tricks Won (0-13)</label>
                <input type="number" id="trick${index}" min="0" max="13" value="0">
            </div>
        `;
        container.appendChild(card);
    });
}

function updateScoreTable() {
    const tbody = document.getElementById('scoreTableBody');
    tbody.innerHTML = '';

    let maxScore = Math.max(...gameState.players.map(p => p.totalScore));

    gameState.players.forEach((player, index) => {
        const row = document.createElement('tr');
        const lastBid = player.bids[player.bids.length - 1] || '-';
        const lastTrick = player.tricks[player.tricks.length - 1] || '-';
        const lastScore = player.roundScores[player.roundScores.length - 1] || 0;
        const lastMoney = player.roundMoney[player.roundMoney.length - 1] || 0;
        
        const scoreClass = lastScore >= 0 ? 'score-positive' : 'score-negative';
        const moneyClass = lastMoney >= 0 ? 'score-positive' : 'score-negative';
        const leaderClass = player.totalScore === maxScore && maxScore > 0 ? 'leader' : '';

        row.className = leaderClass;
        row.innerHTML = `
            <td><strong>${player.name}</strong> ${leaderClass ? '👑' : ''}</td>
            <td>${lastBid}</td>
            <td>${lastTrick}</td>
            <td class="${scoreClass}">${lastScore > 0 ? '+' : ''}${lastScore.toFixed(1)}</td>
            <td class="cumulative-cell ${player.totalScore >= 0 ? 'score-positive' : 'score-negative'}">${player.totalScore.toFixed(1)}</td>
            <td class="${moneyClass}">NPR ${lastMoney > 0 ? '+' : ''}${lastMoney.toFixed(0)}</td>
            <td class="cumulative-cell ${player.totalMoney >= 0 ? 'score-positive' : 'score-negative'}">NPR ${player.totalMoney.toFixed(0)}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('potDisplay').textContent = `Pot: NPR ${gameState.potTotal}`;
}

function renderRoundHistory() {
    const container = document.getElementById('roundHistory');
    container.innerHTML = '';

    if (gameState.roundHistory.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">No rounds played yet</p>';
        return;
    }

    gameState.roundHistory.forEach((round, roundIndex) => {
        const timeAgo = getTimeAgo(round[0].timestamp);
        const isLatest = roundIndex === gameState.roundHistory.length - 1;
        
        const item = document.createElement('div');
        item.className = 'round-history-item';
        item.innerHTML = `
            <div class="history-header" onclick="toggleHistory(${roundIndex})">
                <h4>Round ${roundIndex + 1}</h4>
                <span class="history-timestamp">${timeAgo}</span>
            </div>
            <div class="history-content ${isLatest ? 'expanded' : ''}" id="history${roundIndex}">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Bid</th>
                            <th>Tricks</th>
                            <th>Score</th>
                            <th>Money</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${round.map(entry => `
                            <tr>
                                <td><strong>${entry.player}</strong></td>
                                <td>${entry.bid}${entry.bonus > 0 ? ` (+${entry.bonus})` : ''}</td>
                                <td>${entry.tricks}</td>
                                <td class="${entry.score >= 0 ? 'score-positive' : 'score-negative'}">${entry.score > 0 ? '+' : ''}${entry.score.toFixed(1)}</td>
                                <td class="${entry.money >= 0 ? 'score-positive' : 'score-negative'}">NPR ${entry.money > 0 ? '+' : ''}${entry.money.toFixed(0)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.appendChild(item);
    });
}

function toggleHistory(index) {
    const content = document.getElementById(`history${index}`);
    content.classList.toggle('expanded');
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
}

function showInfoPage() {
    document.querySelector('.setup-screen').classList.remove('active');
    document.querySelector('.game-screen').classList.remove('active');
    document.querySelector('.victory-screen').classList.remove('active');
    document.querySelector('.info-page').classList.add('active');
}

function hideInfoPage() {
    document.querySelector('.info-page').classList.remove('active');
    
    if (gameState.players.length > 0) {
        document.querySelector('.game-screen').classList.add('active');
    } else {
        document.querySelector('.setup-screen').classList.add('active');
    }
}