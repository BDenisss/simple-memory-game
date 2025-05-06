export default class StorageService {
  constructor(key = 'memory-game-progress') {
    this.key = key;
  }

  save(progress) {
    try {
      localStorage.setItem(this.key, JSON.stringify(progress));
    } catch (e) {
      // Gestion d'erreur simple
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
}