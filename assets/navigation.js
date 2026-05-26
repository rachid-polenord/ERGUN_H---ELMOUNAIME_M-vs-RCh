// navigation.js
// Autonome — fonctionne sur n'importe quelle page HTML.
// Détecte les .nav-item et navigue avec ←/→ et la roulette souris.
// Ne nécessite aucune modification du HTML hôte.

(function () {

  function getItems() {
    return Array.from(document.querySelectorAll('.nav-item'));
  }

  function getActiveIndex(items) {
    return items.findIndex(btn => btn.classList.contains('active'));
  }

  function move(delta) {
    const items = getItems();
    if (!items.length) return;

    let idx = getActiveIndex(items);
    if (idx === -1) idx = 0;

    const next = (idx + delta + items.length) % items.length;
    items[next].click();
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); move(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1);  }
  }, { passive: false });

  window.addEventListener('wheel', function (e) {
    e.preventDefault();
    move(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

})();
