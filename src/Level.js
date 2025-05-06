export default class Level {
  constructor(number = 1) {
    this.number = number;
    this.gridSizes = [
      {cols: 4, rows: 2, numPairs: 4, timeLimit: 60, bonusRatio: 1.0},
      {cols: 4, rows: 3, numPairs: 6, timeLimit: 75, bonusRatio: 1.2},
      {cols: 5, rows: 4, numPairs: 10, timeLimit: 120, bonusRatio: 1.5},
      {cols: 6, rows: 5, numPairs: 15, timeLimit: 180, bonusRatio: 2.0}
    ];
    const params = this.gridSizes[number - 1] || this.gridSizes[this.gridSizes.length - 1];
    this.cols = params.cols;
    this.rows = params.rows;
    this.numPairs = params.numPairs;
    this.timeLimit = params.timeLimit;
    this.bonusRatio = params.bonusRatio;
  }

  next() {
    return new Level(this.number + 1);
  }

  isCompleted(currentScore) {
    // Peut être adapté selon la logique de progression
    return currentScore > 0;
  }
}