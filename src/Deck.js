import Card from "./Card.js";

export default class Deck {
  constructor(cards = []) {
    this.cards = cards;
    this.size = cards.length;
  }

  static generate(level) {
    const numPairs = level.numPairs;
    const values = Array.from({ length: numPairs }, (_, i) => i + 1);
    const cards = [];
    let id = 0;
    values.forEach(value => {
      cards.push(new Card(id++, value));
      cards.push(new Card(id++, value));
    });
    const deck = new Deck(cards);
    deck.shuffle();
    return deck;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  reset() {
    this.cards.forEach(card => {
      card.isFlipped = false;
      card.isMatched = false;
    });
    this.shuffle();
  }

  allMatched() {
    return this.cards.every(card => card.isMatched);
  }
}