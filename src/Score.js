export default class Score {
  constructor() {
    this.points = 0;
    this.mistakes = 0;
    this.combo = 0;
  }

  addMatchBonus() {
    this.combo++;
    this.points += 50 * this.combo;
  }

  addMistakePenalty() {
    this.mistakes++;
    this.points -= 20;
    this.combo = 0;
    if (this.points < 0) this.points = 0;
  }

  addTimeBonus(timeLeft) {
    this.points += timeLeft * 5;
  }

  addPerfectBonus() {
    this.points += 250;
  }

  applyGlobalMalus() {
    this.points = Math.floor(this.points / 2);
  }

  reset() {
    this.points = 0;
    this.mistakes = 0;
    this.combo = 0;
  }
}