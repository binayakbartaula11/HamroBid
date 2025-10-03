// Scoring and Game Logic Functions
function submitBids() {
    const bids = [];
    const bonuses = [];
    let valid = true;

    for (let i = 0; i < 4; i++) {
        const bid = parseInt(document.getElementById(`bid${i}`).value);
        const bonus = parseInt(document.getElementById(`bonus${i}`).value) || 0;
        
        if (isNaN(bid) || bid < 1 || bid > 13) {
            showToast(`❌ Invalid bid for ${gameState.players[i].name}! Must be 1-13.`, 'error');
            valid = false;
            return;
        }
        bids.push(bid);
        bonuses.push(bonus);
    }

    if (valid) {
        bids.forEach((bid, index) => {
            gameState.players[index].bids.push(bid);
            gameState.players[index].bonusBids.push(bonuses[index]);
        });

        gameState.phase = 'tricks';
        document.getElementById('biddingPhase').style.display = 'none';
        document.getElementById('trickPhase').style.display = 'block';
        document.getElementById('phaseIndicator').textContent = 'Playing Phase';

        renderTrickInputs();
        showToast('✅ Bids submitted!', 'success');
    }
}

function submitTricks() {
    const tricks = [];
    let valid = true;

    for (let i = 0; i < 4; i++) {
        const trick = parseInt(document.getElementById(`trick${i}`).value);
        if (isNaN(trick) || trick < 0 || trick > 13) {
            showToast(`❌ Invalid tricks for ${gameState.players[i].name}!`, 'error');
            valid = false;
            return;
        }
        tricks.push(trick);
    }

    const totalTricks = tricks.reduce((a, b) => a + b, 0);
    if (totalTricks !== 13) {
        showToast(`❌ Total tricks must equal 13! Current: ${totalTricks}`, 'error');
        return;
    }

    if (valid) {
        calculateRoundScores(tricks);
        nextRound();
    }
}

function calculateRoundScores(tricks) {
    const roundData = [];
    let successfulPlayers = [];

    gameState.players.forEach((player, index) => {
        const bid = player.bids[player.bids.length - 1];
        const bonus = player.bonusBids[player.bonusBids.length - 1];
        const tricksWon = tricks[index];
        let roundScore;
        let moneyEarned;

        if (tricksWon >= bid) {
            // Successful bid
            const extraTricks = tricksWon - bid;
            roundScore = bid + (extraTricks * 0.1);
            moneyEarned = gameState.baseStake * tricksWon + bonus;
            player.successfulBids++;
            successfulPlayers.push(index);
        } else {
            // Failed bid
            roundScore = -bid;
            moneyEarned = -(gameState.baseStake * bid);
            
            // Bonus goes to pot
            if (bonus > 0) {
                gameState.potTotal += bonus;
            }
        }

        player.tricks.push(tricksWon);
        player.roundScores.push(roundScore);
        player.roundMoney.push(moneyEarned);
        player.totalScore += roundScore;
        player.totalMoney += moneyEarned;

        roundData.push({
            player: player.name,
            bid: bid,
            bonus: bonus,
            tricks: tricksWon,
            score: roundScore,
            money: moneyEarned,
            totalScore: player.totalScore,
            totalMoney: player.totalMoney,
            timestamp: Date.now()
        });
    });

    gameState.roundHistory.push(roundData);
    
    // Only distribute pot at the end of the game or when specifically triggered
    // For now, let pot accumulate across rounds
    if (gameState.potTotal > 0) {
        showToast(`💰 Current pot: NPR ${gameState.potTotal} (from failed bonus bids)`, 'info');
    }
    
    updateScoreTable();
    updateCharts();
    renderRoundHistory();
    saveGame();
}

function nextRound() {
    gameState.currentRound++;
    
    if (gameState.currentRound > gameState.totalRounds) {
        endGame();
        return;
    }

    gameState.phase = 'bidding';

    document.getElementById('currentRound').textContent = gameState.currentRound;
    document.getElementById('biddingPhase').style.display = 'block';
    document.getElementById('trickPhase').style.display = 'none';
    document.getElementById('phaseIndicator').textContent = 'Bidding Phase';

    renderBidInputs();
    saveGame();
    showToast(`🎮 Round ${gameState.currentRound} started!`, 'info');
}

function endGame() {
    // Distribute final pot to the winner
    if (gameState.potTotal > 0) {
        const sortedByScore = [...gameState.players].sort((a, b) => b.totalScore - a.totalScore);
        const winner = sortedByScore[0];
        const winnerIndex = gameState.players.findIndex(p => p.name === winner.name);
        
        gameState.players[winnerIndex].totalMoney += gameState.potTotal;
        showToast(`🏆 Final pot of NPR ${gameState.potTotal} goes to winner ${winner.name}!`, 'success');
        gameState.potTotal = 0;
    }
    
    // Clear saved game when ending
    localStorage.removeItem('callbreakSave');
    document.querySelector('.game-screen').classList.remove('active');
    document.querySelector('.victory-screen').classList.add('active');

    const sortedByScore = [...gameState.players].sort((a, b) => b.totalScore - a.totalScore);
    const sortedByMoney = [...gameState.players].sort((a, b) => b.totalMoney - a.totalMoney);
    const winner = sortedByScore[0];
    const moneyKing = sortedByMoney[0];

    document.getElementById('winnerText').textContent = `🏆 ${winner.name} Wins! 🏆`;

    // Stats
    const highestRoundScore = Math.max(...gameState.players.flatMap(p => p.roundScores));
    const mostAccurate = [...gameState.players].sort((a, b) => b.successfulBids - a.successfulBids)[0];
    const totalTricks = gameState.players.reduce((sum, p) => sum + p.tricks.reduce((a, b) => a + b, 0), 0);

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <h3>🎯 Most Accurate</h3>
            <div class="value">${mostAccurate.name}</div>
            <p>${mostAccurate.successfulBids} successful bids</p>
        </div>
        <div class="stat-card">
            <h3>🔥 Highest Round Score</h3>
            <div class="value">+${highestRoundScore.toFixed(1)}</div>
        </div>
        <div class="stat-card">
            <h3>💰 Money Champion</h3>
            <div class="value">${moneyKing.name}</div>
            <p>NPR ${moneyKing.totalMoney.toFixed(0)}</p>
        </div>
        <div class="stat-card">
            <h3>🃏 Total Tricks</h3>
            <div class="value">${totalTricks}</div>
        </div>
    `;

    // Final standings
    const finalTbody = document.getElementById('finalScoreTableBody');
    finalTbody.innerHTML = '';

    sortedByScore.forEach((player, index) => {
        const accuracy = ((player.successfulBids / gameState.currentRound) * 100).toFixed(1);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${player.name}</strong></td>
            <td class="${player.totalScore >= 0 ? 'score-positive' : 'score-negative'}">${player.totalScore.toFixed(1)}</td>
            <td class="${player.totalMoney >= 0 ? 'score-positive' : 'score-negative'}">NPR ${player.totalMoney.toFixed(0)}</td>
            <td>${accuracy}%</td>
        `;
        finalTbody.appendChild(row);
    });

    showToast('Game completed! Starting fresh for next game.', 'success');
}