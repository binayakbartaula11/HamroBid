// Game State Management
let gameState = {
    players: [],
    currentRound: 1,
    totalRounds: 5,
    phase: 'bidding',
    roundHistory: [],
    baseStake: 10,
    potTotal: 0,
    startTime: Date.now()
};

let scoreChart = null;
let moneyChart = null;