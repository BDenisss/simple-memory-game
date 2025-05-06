export default class Renderer {
  constructor() {
    this.board = document.getElementById('board');
    this.scoreEl = document.getElementById('score');
    this.levelEl = document.getElementById('level');
    this.timerEl = document.getElementById('timer');
    this.restartBtn = document.getElementById('restart');
    this.endScreen = null;
  }

  renderBoard(cards, cols) {
    this.board.innerHTML = '';
    this.board.style.setProperty('--cols', cols);
    cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('aria-pressed', card.isFlipped);
      cardEl.dataset.id = card.id;
      cardEl.innerHTML = `
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">${card.value}</div>
      `;
      if (card.isFlipped) cardEl.classList.add('flip');
      if (card.isMatched) cardEl.classList.add('matched');
      this.board.appendChild(cardEl);
    });
  }

  updateScore(points) {
    this.scoreEl.textContent = points.toString().padStart(4, '0');
  }

  updateLevel(level) {
    this.levelEl.textContent = `Niveau ${level}`;
  }

  updateTimer(timeLeft) {
    this.timerEl.textContent = `${timeLeft} s`;
  }

  animateFlip(card) {
    const cardEl = this.board.querySelector(`[data-id='${card.id}']`);
    if (cardEl) cardEl.classList.add('flip');
  }

  animateMatch(cards) {
    cards.forEach(card => {
      const cardEl = this.board.querySelector(`[data-id='${card.id}']`);
      if (cardEl) cardEl.classList.add('matched');
    });
  }

  animateError(cards) {
    cards.forEach(card => {
      const cardEl = this.board.querySelector(`[data-id='${card.id}']`);
      if (cardEl) {
        cardEl.classList.add('error');
        setTimeout(() => cardEl.classList.remove('error'), 400);
      }
    });
  }

  unflipCards(cards) {
    cards.forEach(card => {
      const cardEl = this.board.querySelector(`[data-id='${card.id}']`);
      if (cardEl) {
        cardEl.classList.remove('flip');
      }
    });
  }

  showEndScreen(won, score) {
    if (this.endScreen) this.endScreen.remove();
    this.endScreen = document.createElement('div');
    this.endScreen.className = 'end-screen';
    this.endScreen.innerHTML = `
      <div style="text-align:center;">
        <h2>${won ? 'Bravo !' : 'Perdu...'}</h2>
        <p>Score : <strong>${score}</strong></p>
        <button id="next-level">Niveau suivant</button>
      </div>
    `;
    document.body.appendChild(this.endScreen);
    document.getElementById('next-level').focus();
  }
}