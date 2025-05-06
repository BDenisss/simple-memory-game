import Level from "./Level.js";
import Deck from "./Deck.js";
import Score from "./Score.js";

export default class GameEngine {
  constructor(renderer, storage) {
    this.renderer = renderer;
    this.storage = storage;
    this.level = null;
    this.deck = null;
    this.score = null;
    this.state = "idle";
    this.firstCard = null;
    this.timer = null;
    this.timeLeft = 0;
  }

  start(levelNumber = 1) {
    this.level = new Level(levelNumber);
    this.deck = Deck.generate(this.level);
    this.score = new Score();
    this.state = "idle";
    this.firstCard = null;
    this.timeLeft = this.level.timeLimit;
    this.renderer.renderBoard(this.deck.cards, this.level.cols);
    this.renderer.updateScore(this.score.points);
    this.renderer.updateLevel(this.level.number);
    this.renderer.updateTimer(this.timeLeft);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.renderer.updateTimer(this.timeLeft);
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.score.applyGlobalMalus();
        this.state = "lost";
        this.renderer.showEndScreen(false, this.score.points);
      }
    }, 1000);
  }

  handleFlip(card) {
    if (this.state === "animating" || card.isFlipped || card.isMatched) return;
    this.renderer.animateFlip(card);
    card.flip();
    if (this.state === "idle") {
      this.firstCard = card;
      this.state = "oneFlipped";
    } else {
      this.state = "animating";
      this.checkMatch(card);
    }
  }

  checkMatch(secondCard) {
    const match = this.firstCard.value === secondCard.value;
    setTimeout(() => {
      if (match) {
        this.firstCard.markMatched();
        secondCard.markMatched();
        this.score.addMatchBonus();
        this.renderer.animateMatch([this.firstCard, secondCard]);
        if (this.deck.allMatched()) {
          clearInterval(this.timer);
          this.score.addTimeBonus(this.timeLeft);
          if (this.score.mistakes === 0) this.score.addPerfectBonus();
          this.score.points = Math.floor(this.score.points * this.level.bonusRatio);
          this.state = "won";
          this.renderer.showEndScreen(true, this.score.points);
        }
      } else {
        this.firstCard.unflip();
        secondCard.unflip();
        this.score.addMistakePenalty();
        this.renderer.unflipCards([this.firstCard, secondCard]);
        this.renderer.animateError([this.firstCard, secondCard]);
      }
      this.renderer.updateScore(this.score.points);
      this.state = "idle";
      this.firstCard = null;
    }, 800);
  }

  updateLevel() {
    // À compléter plus tard
  }

  restart() {
    this.start(this.level.number);
  }
}