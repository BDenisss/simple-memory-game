import Renderer from "./Renderer.js";
import GameEngine from "./GameEngine.js";
import StorageService from "./StorageService.js";

const renderer = new Renderer();
const storage = new StorageService();
const engine = new GameEngine(renderer, storage);

// Démarrage du jeu au chargement
window.addEventListener("DOMContentLoaded", () => {
  engine.start(1);

  renderer.board.addEventListener("click", e => {
    const cardEl = e.target.closest(".card");
    if (!cardEl) return;
    const id = Number(cardEl.dataset.id);
    const card = engine.deck.cards.find(c => c.id === id);
    if (card) engine.handleFlip(card);
  });

  renderer.restartBtn.addEventListener("click", () => {
    engine.restart();
    renderer.restartBtn.hidden = true;
    if (renderer.endScreen) renderer.endScreen.remove();
  });

  document.body.addEventListener("click", e => {
    if (e.target && e.target.id === "next-level") {
      engine.start(engine.level.number + 1);
      if (renderer.endScreen) renderer.endScreen.remove();
    }
  });
});