# 🎴 HamroBid - Callbreak Score Calculator

> **शुभ दशैं! | Happy Dashain!** 🎉

A beautiful, responsive Callbreak score calculator designed specifically for Dashain celebrations. Track scores, manage money bids, and enjoy seamless gameplay with your family and friends during Nepal's most cherished festival.

![Callbreak Banner](https://img.shields.io/badge/Game-Callbreak-red?style=for-the-badge&logo=spades) ![Dashain](https://img.shields.io/badge/Festival-Dashain-gold?style=for-the-badge) ![Nepal](https://img.shields.io/badge/Made%20in-Nepal-blue?style=for-the-badge)

## ✨ Features

🎯 **Smart Score Tracking**
- Real-time score calculation with bid accuracy tracking
- Cumulative score progression with visual charts
- Round-by-round history with expandable details

💰 **Money Bidding System**
- Customizable stake amounts per trick
- Bonus bidding for high-risk, high-reward gameplay
- Automatic pot distribution to successful players

📊 **Visual Analytics**
- Interactive Chart.js score progression graphs
- Money flow visualization across rounds
- Player performance statistics and accuracy metrics

🎮 **Enhanced Gameplay**
- Auto-save functionality with localStorage
- Resume interrupted games seamlessly
- Export game results to CSV format

📱 **Responsive Design**
- Mobile-first approach for all device sizes
- Touch-friendly interface for tablets and phones
- Elegant Dashain-themed UI with Nepali cultural elements

⚙️ **Customizable Settings**
- Adjustable number of rounds (5, 7, or 10)
- Variable base stake amounts
- Quick preset player names (Family Set, Default)

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hamrobid-callbreak.git
   cd hamrobid-callbreak
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or double-click the file
   ```

3. **Start playing!** 🎉

## 🎯 How to Use

### 1. Game Setup
- Enter player names (or use quick presets)
- Set number of rounds (5, 7, or 10)
- Configure base stake amount in NPR
- Click "Start Game"

### 2. Bidding Phase
- Each player enters their bid (1-13 tricks)
- Optional: Add bonus bids for extra stakes
- System warns if total bids exceed 13

### 3. Playing Phase
- Enter actual tricks won by each player
- System validates total tricks equal 13
- Automatic score calculation and money distribution

### 4. Game Progression
- View real-time scoreboard with leader indicators
- Check score progression charts
- Review detailed round history
- Export results when game ends

### 5. Game Management
- **Auto-save**: Game saves automatically
- **Resume**: Continue interrupted games
- **Reset**: Start fresh anytime
- **Export**: Download CSV results

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js for data visualization
- **Storage**: localStorage for game persistence
- **Fonts**: Google Fonts (Mukta)
- **Icons**: Unicode emojis for cross-platform compatibility

**No frameworks, no build process - just pure web technologies!**

## 📁 Project Structure

```
callbreak/
├── index.html              # Main entry point
├── hamrobid-icon.png       # App icon
├── assets/                 # Static assets
│   ├── favicon.svg         # Browser favicon
│   └── hamrobid-icon.png   # App icon
├── css/
│   └── styles.css          # All styling
└── js/
    ├── main.js             # Main game initialization
    ├── gameState.js        # Game state management
    ├── ui.js               # UI functions & DOM manipulation
    ├── scoring.js          # Game logic & scoring calculations
    ├── storage.js          # localStorage & CSV export
    ├── charts.js           # Chart.js functionality
    └── fab.js              # Floating Action Button functionality
```

## 🎮 Game Rules

### Scoring System
- **Successful bid**: +bid points + 0.1 per extra trick
- **Failed bid**: -bid points
- **Example**: Bid 5, win 7 = +5.2 points
- **Example**: Bid 5, win 3 = -5 points

### Money System
- Base stake × tricks won + bonus (if successful)
- Failed bids lose base stake × bid amount
- Bonus from failed bids goes to pot
- Pot distributed among successful players

### Special Terms
- **Double Call (डबल कल)**: Bidding 8+ tricks
- **Baaji (बाजी)**: The stake/bet amount
- **Jharana (झरना)**: Consecutive round losses

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Areas for Contribution
- 🌐 Localization (more languages)
- 🎨 UI/UX improvements
- 📱 Mobile app version
- 🔧 Performance optimizations
- 📚 Documentation improvements

## 📸 Screenshots

*Coming soon - Add screenshots of the game interface*

## 🎊 Cultural Context

Callbreak is more than just a card game in Nepal - it's a Dashain tradition that brings families together. During the festival:

- 🏠 Families gather after receiving tika and jamara
- 🍱 Games are fueled by sel roti, sweets, and festive meals
- 💰 Small stakes add excitement and friendly competition
- 👨‍👩‍👧‍👦 Multiple generations play together, teaching strategy
- 🌙 Marathon sessions often last late into the night

HamroBid digitizes this beautiful tradition while preserving its cultural essence.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Callbreak players of Nepal for inspiration
- The Dashain festival for bringing families together
- Chart.js for beautiful data visualization
- Google Fonts for typography
- The open-source community for continuous inspiration

## 📞 Contact & Support

**Developer**: [Your Name]
- 🌐 Website: [your-website.com]
- 💼 LinkedIn: [linkedin.com/in/yourprofile]
- 📧 Email: [your.email@example.com]
- 🐙 GitHub: [@yourusername]

---

<div align="center">

**Made with ❤️ for the Nepali community**

*Star ⭐ this repo if you enjoyed playing HamroBid!*

[![GitHub stars](https://img.shields.io/github/stars/yourusername/hamrobid-callbreak?style=social)](https://github.com/yourusername/hamrobid-callbreak/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/hamrobid-callbreak?style=social)](https://github.com/yourusername/hamrobid-callbreak/network)

</div>