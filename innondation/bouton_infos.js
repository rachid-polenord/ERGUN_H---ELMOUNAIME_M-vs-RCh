(function () {
  if (document.getElementById('__infos-btn')) return;

  // --- Styles ---
  const style = document.createElement('style');
  style.textContent = `
    #__infos-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: #1a1a1a;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 30px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    #__infos-btn:hover {
      background: #333;
    }
    @keyframes __infos-rebond {
      0%   { transform: translateY(0); }
      20%  { transform: translateY(-14px); }
      40%  { transform: translateY(0); }
      55%  { transform: translateY(-7px); }
      70%  { transform: translateY(0); }
      82%  { transform: translateY(-3px); }
      100% { transform: translateY(0); }
    }
    #__infos-btn.rebond {
      animation: __infos-rebond 0.7s ease;
    }
    @keyframes __infos-secousse {
      0%   { transform: translateX(0); }
      15%  { transform: translateX(-6px); }
      30%  { transform: translateX(6px); }
      45%  { transform: translateX(-5px); }
      60%  { transform: translateX(5px); }
      75%  { transform: translateX(-3px); }
      90%  { transform: translateX(3px); }
      100% { transform: translateX(0); }
    }
    #__infos-btn.secousse {
      animation: __infos-secousse 0.6s ease;
    }
    #__infos-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0,0,0,0.55);
      align-items: center;
      justify-content: center;
    }
    #__infos-overlay.open {
      display: flex;
    }
    #__infos-modal {
      background: #fff;
      border-radius: 10px;
      width: 92vw;
      height: 92vh;
      max-width: 1400px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    }
    #__infos-modal-header {
      display: flex;
      justify-content: flex-end;
      padding: 10px 14px;
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
    #__infos-close {
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #555;
      line-height: 1;
    }
    #__infos-close:hover {
      color: #000;
    }
    #__infos-iframe {
      flex: 1;
      border: none;
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  // --- Bouton ---
  const btn = document.createElement('button');
  btn.id = '__infos-btn';
  btn.title = 'Infos';
  btn.innerHTML = '<span id="__infos-icon" style="color:#22c55e;font-weight:900;font-size:38px;line-height:1;">!</span>';
  document.body.appendChild(btn);

  // --- Overlay + Modale ---
  const overlay = document.createElement('div');
  overlay.id = '__infos-overlay';
  overlay.innerHTML = `
    <div id="__infos-modal">
      <div id="__infos-modal-header">
        <button id="__infos-close" title="Fermer">✕</button>
      </div>
      <iframe id="__infos-iframe" src="infos.html"></iframe>
    </div>
  `;
  document.body.appendChild(overlay);

  // --- Animation rebond toutes les 5s ---
  setInterval(function () {
    btn.classList.remove('rebond');
    void btn.offsetWidth; // force reflow pour relancer l'animation
    document.getElementById('__infos-icon').style.color = '#ef4444';
    btn.classList.add('rebond');
  }, 5000);

  // --- Secousse au démarrage ---
  window.addEventListener('load', function () {
    document.getElementById('__infos-icon').style.color = '#ef4444';
    btn.classList.add('secousse');
  });

  btn.addEventListener('animationend', function () {
    btn.classList.remove('rebond');
    btn.classList.remove('secousse');
    document.getElementById('__infos-icon').style.color = '#22c55e';
  });

  // --- Interactions ---
  btn.addEventListener('click', function () {
    overlay.classList.add('open');
  });

  document.getElementById('__infos-close').addEventListener('click', function () {
    overlay.classList.remove('open');
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
})();
