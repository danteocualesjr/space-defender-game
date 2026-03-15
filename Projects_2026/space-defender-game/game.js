(function () {
  'use strict';

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const W = 800;
  const H = 600;
  ctx.imageSmoothingEnabled = false;

  // ── Audio ──────────────────────────────────────────────────────────
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function ensureAudio() {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playTone(freq, duration, type, vol, slide) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (slide) osc.frequency.exponentialRampToValueAtTime(slide, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(vol || 0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function sfxShoot() { playTone(880, 0.08, 'square', 0.10); }
  function sfxHit() { playTone(220, 0.15, 'sawtooth', 0.14, 60); }
  function sfxLifeLost() {
    playTone(300, 0.25, 'sawtooth', 0.15, 80);
    setTimeout(() => playTone(200, 0.3, 'square', 0.12, 50), 150);
  }
  function sfxGameOver() {
    playTone(400, 0.2, 'square', 0.15, 200);
    setTimeout(() => playTone(300, 0.2, 'square', 0.12, 150), 200);
    setTimeout(() => playTone(200, 0.4, 'sawtooth', 0.14, 60), 400);
  }
  function sfxShieldOn() { playTone(600, 0.12, 'sine', 0.10, 1200); }
  function sfxShieldOff() { playTone(800, 0.12, 'sine', 0.08, 400); }
  function sfxShieldAbsorb() { playTone(500, 0.1, 'triangle', 0.12, 200); }

  // ── Game state ─────────────────────────────────────────────────────
  const GAME_STATE = { MENU: 'menu', PLAYING: 'playing', GAME_OVER: 'gameOver' };
  let state = GAME_STATE.MENU;
  let score = 0;
  let hiScore = parseInt(localStorage.getItem('spaceDefenderHi')) || 0;
  let lives = 3;
  let wave = 0;
  let frameCount = 0;

  const COLORS = {
    bg: '#0a0a1a',
    player: '#00ff88',
    playerGlow: 'rgba(0,255,136,0.25)',
    enemy: '#ff4444',
    enemyGlow: 'rgba(255,68,68,0.3)',
    bullet: '#ffffff',
    bulletGlow: 'rgba(255,255,255,0.4)',
    star: '#ffffff',
    text: '#00ff88',
    textDim: '#00aa66',
    accent: '#ffcc00',
    shield: '#44ccff',
    shieldGlow: 'rgba(68,204,255,0.25)'
  };

  // ── Starfield ──────────────────────────────────────────────────────
  const STAR_LAYERS = [
    { count: 40, speed: 0.15, size: 1, alpha: 0.3 },
    { count: 30, speed: 0.4, size: 1.5, alpha: 0.5 },
    { count: 15, speed: 0.8, size: 2, alpha: 0.8 }
  ];
  const stars = [];
  STAR_LAYERS.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: layer.speed,
        size: layer.size,
        alpha: layer.alpha
      });
    }
  });

  // ── Particles ──────────────────────────────────────────────────────
  let particles = [];

  function spawnExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.02 + Math.random() * 0.03,
        size: 1 + Math.random() * 2.5,
        color
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function drawParticles() {
    particles.forEach((p) => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    });
    ctx.globalAlpha = 1;
  }

  // ── Screen shake ───────────────────────────────────────────────────
  let shakeAmount = 0;

  function triggerShake(intensity) {
    shakeAmount = Math.max(shakeAmount, intensity);
  }

  function applyShake() {
    if (shakeAmount > 0.5) {
      const dx = (Math.random() - 0.5) * shakeAmount * 2;
      const dy = (Math.random() - 0.5) * shakeAmount * 2;
      ctx.translate(dx, dy);
      shakeAmount *= 0.85;
    } else {
      shakeAmount = 0;
    }
  }

  // ── Player ─────────────────────────────────────────────────────────
  const player = { x: W / 2 - 15, y: H - 60, w: 30, h: 40, speed: 5 };
  let playerFlash = 0;

  // ── Shield ─────────────────────────────────────────────────────────
  const SHIELD_MAX = 100;
  const SHIELD_DRAIN = 0.6;
  const SHIELD_RECHARGE = 0.25;
  const SHIELD_ABSORB_COST = 25;
  let shieldEnergy = SHIELD_MAX;
  let shieldActive = false;
  let shieldFlash = 0;

  function drawPlayer() {
    const cx = player.x + player.w / 2;
    const cy = player.y + player.h / 2;

    ctx.shadowColor = COLORS.player;
    ctx.shadowBlur = 12;

    ctx.fillStyle = playerFlash > 0 ? '#ffffff' : COLORS.player;
    ctx.strokeStyle = COLORS.player;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx, player.y);
    ctx.lineTo(player.x, player.y + player.h);
    ctx.lineTo(cx - 4, player.y + player.h - 8);
    ctx.lineTo(cx + 4, player.y + player.h - 8);
    ctx.lineTo(player.x + player.w, player.y + player.h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Thruster flame
    const flicker = 4 + Math.sin(frameCount * 0.5) * 3;
    ctx.fillStyle = COLORS.accent;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx - 5, player.y + player.h - 6);
    ctx.lineTo(cx, player.y + player.h + flicker);
    ctx.lineTo(cx + 5, player.y + player.h - 6);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.shadowBlur = 0;

    if (playerFlash > 0) playerFlash--;

    if (shieldActive && shieldEnergy > 0) drawShield();
  }

  function drawShield() {
    const cx = player.x + player.w / 2;
    const cy = player.y + player.h / 2 + 2;
    const rx = player.w * 0.9;
    const ry = player.h * 0.72;

    const flicker = shieldFlash > 0 ? 1 : 0.35 + Math.sin(frameCount * 0.12) * 0.15;

    ctx.save();
    ctx.globalAlpha = flicker;
    ctx.strokeStyle = COLORS.shield;
    ctx.shadowColor = COLORS.shield;
    ctx.shadowBlur = 18;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = flicker * 0.12;
    ctx.fillStyle = COLORS.shield;
    ctx.fill();
    ctx.restore();

    if (shieldFlash > 0) shieldFlash--;
  }

  // ── Bullets ────────────────────────────────────────────────────────
  let bullets = [];

  function drawBullets() {
    bullets.forEach((b) => {
      ctx.shadowColor = COLORS.bullet;
      ctx.shadowBlur = 8;
      ctx.fillStyle = COLORS.bullet;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.shadowBlur = 0;
    });
  }

  // ── Enemies ────────────────────────────────────────────────────────
  let enemies = [];
  let enemyDirection = 1;
  let enemyMoveTimer = 0;
  let enemySpawnTimer = 0;

  function drawEnemy(e) {
    const cx = e.x + e.w / 2;
    const cy = e.y + e.h / 2;

    ctx.shadowColor = COLORS.enemy;
    ctx.shadowBlur = 8;
    ctx.fillStyle = COLORS.enemy;

    ctx.beginPath();
    ctx.moveTo(cx, e.y);
    ctx.lineTo(e.x + e.w, e.y + e.h * 0.6);
    ctx.lineTo(e.x + e.w - 4, e.y + e.h);
    ctx.lineTo(e.x + 4, e.y + e.h);
    ctx.lineTo(e.x, e.y + e.h * 0.6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ff8888';
    ctx.fillRect(cx - 3, cy - 1, 2, 2);
    ctx.fillRect(cx + 1, cy - 1, 2, 2);

    ctx.shadowBlur = 0;
  }

  function drawEnemies() {
    enemies.forEach(drawEnemy);
  }

  function spawnEnemyRow() {
    const cols = 8;
    const ew = 36;
    const eh = 24;
    const gap = 10;
    const totalW = cols * ew + (cols - 1) * gap;
    const startX = (W - totalW) / 2;

    for (let i = 0; i < cols; i++) {
      enemies.push({
        x: startX + i * (ew + gap),
        y: -eh - 10,
        w: ew,
        h: eh
      });
    }
    wave++;
  }

  // ── HUD ────────────────────────────────────────────────────────────
  let shootCooldown = 0;

  function drawUI() {
    ctx.font = '12px "Press Start 2P", "Courier New", monospace';

    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'left';
    ctx.fillText('SCORE ' + String(score).padStart(6, '0'), 12, 25);

    ctx.fillStyle = COLORS.textDim;
    ctx.fillText('HI ' + String(hiScore).padStart(6, '0'), 12, 45);

    ctx.textAlign = 'right';
    ctx.fillStyle = COLORS.accent;
    ctx.fillText('WAVE ' + wave, W - 12, 25);

    ctx.fillStyle = COLORS.enemy;
    for (let i = 0; i < lives; i++) {
      const lx = W - 20 - i * 22;
      ctx.beginPath();
      ctx.moveTo(lx, 38);
      ctx.lineTo(lx - 7, 50);
      ctx.lineTo(lx + 7, 50);
      ctx.closePath();
      ctx.fill();
    }

    // Shield bar
    const barW = 100;
    const barH = 8;
    const barX = (W - barW) / 2;
    const barY = 12;
    const fill = shieldEnergy / SHIELD_MAX;

    ctx.strokeStyle = shieldActive ? COLORS.shield : '#335566';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    if (fill > 0) {
      ctx.fillStyle = shieldActive ? COLORS.shield : '#335566';
      ctx.globalAlpha = shieldActive ? 0.9 : 0.5;
      ctx.fillRect(barX + 1, barY + 1, (barW - 2) * fill, barH - 2);
      ctx.globalAlpha = 1;
    }

    ctx.font = '8px "Press Start 2P", "Courier New", monospace';
    ctx.fillStyle = shieldActive ? COLORS.shield : '#557788';
    ctx.textAlign = 'center';
    ctx.fillText('SHIELD [E]', W / 2, barY + barH + 12);

    ctx.textAlign = 'left';
  }

  function drawMenu() {
    const pulse = 0.7 + Math.sin(frameCount * 0.05) * 0.3;

    ctx.shadowColor = COLORS.player;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.text;
    ctx.font = '28px "Press Start 2P", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SPACE', W / 2, H / 2 - 60);
    ctx.fillText('DEFENDER', W / 2, H / 2 - 20);
    ctx.shadowBlur = 0;

    ctx.globalAlpha = pulse;
    ctx.font = '12px "Press Start 2P", "Courier New", monospace';
    ctx.fillStyle = COLORS.accent;
    ctx.fillText('PRESS SPACE TO START', W / 2, H / 2 + 40);
    ctx.globalAlpha = 1;

    ctx.font = '10px "Press Start 2P", "Courier New", monospace';
    ctx.fillStyle = COLORS.textDim;
    ctx.fillText('WASD / ARROWS  =  MOVE', W / 2, H / 2 + 90);
    ctx.fillText('SPACE  =  FIRE', W / 2, H / 2 + 112);
    ctx.fillStyle = COLORS.shield;
    ctx.fillText('E / SHIFT  =  SHIELD', W / 2, H / 2 + 134);

    if (hiScore > 0) {
      ctx.fillStyle = COLORS.accent;
      ctx.fillText('HI SCORE  ' + String(hiScore).padStart(6, '0'), W / 2, H / 2 + 170);
    }

    ctx.textAlign = 'left';
  }

  function drawGameOver() {
    ctx.shadowColor = COLORS.enemy;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.enemy;
    ctx.font = '32px "Press Start 2P", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', W / 2, H / 2 - 50);
    ctx.shadowBlur = 0;

    ctx.font = '14px "Press Start 2P", "Courier New", monospace';
    ctx.fillStyle = COLORS.text;
    ctx.fillText('SCORE  ' + String(score).padStart(6, '0'), W / 2, H / 2 + 10);

    if (score >= hiScore) {
      ctx.fillStyle = COLORS.accent;
      ctx.fillText('NEW HIGH SCORE!', W / 2, H / 2 + 40);
    }

    const pulse = 0.6 + Math.sin(frameCount * 0.05) * 0.4;
    ctx.globalAlpha = pulse;
    ctx.font = '11px "Press Start 2P", "Courier New", monospace';
    ctx.fillStyle = COLORS.text;
    ctx.fillText('PRESS SPACE TO RESTART', W / 2, H / 2 + 80);
    ctx.globalAlpha = 1;

    ctx.textAlign = 'left';
  }

  // ── Collision ──────────────────────────────────────────────────────
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ── Input ──────────────────────────────────────────────────────────
  const keys = {};
  let spaceWasUp = true;
  let shieldKeyWasUp = true;

  document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space') e.preventDefault();
    ensureAudio();
  });
  document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    if (e.code === 'Space') spaceWasUp = true;
    if (e.code === 'KeyE' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') shieldKeyWasUp = true;
  });

  // ── Update ─────────────────────────────────────────────────────────
  function update() {
    frameCount++;

    if (state === GAME_STATE.MENU || state === GAME_STATE.GAME_OVER) {
      updateStarfield();
      updateParticles();
      if (keys['Space'] && spaceWasUp) {
        spaceWasUp = false;
        state = GAME_STATE.PLAYING;
        score = 0;
        lives = 3;
        wave = 0;
        bullets = [];
        enemies = [];
        particles = [];
        enemyMoveTimer = 0;
        enemySpawnTimer = 0;
        shakeAmount = 0;
        shieldEnergy = SHIELD_MAX;
        shieldActive = false;
        player.x = W / 2 - player.w / 2;
      }
      return;
    }

    updateStarfield();
    updateParticles();

    // Shield toggle
    const shieldKeyDown = keys['KeyE'] || keys['ShiftLeft'] || keys['ShiftRight'];
    if (shieldKeyDown && shieldKeyWasUp && shieldEnergy > 0) {
      shieldActive = !shieldActive;
      shieldKeyWasUp = false;
      if (shieldActive) sfxShieldOn(); else sfxShieldOff();
    }

    if (shieldActive) {
      shieldEnergy -= SHIELD_DRAIN;
      if (shieldEnergy <= 0) {
        shieldEnergy = 0;
        shieldActive = false;
        sfxShieldOff();
      }
    } else {
      shieldEnergy = Math.min(SHIELD_MAX, shieldEnergy + SHIELD_RECHARGE);
    }

    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    player.x = Math.max(0, Math.min(W - player.w, player.x));

    if (shootCooldown > 0) shootCooldown--;
    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && shootCooldown <= 0) {
      bullets.push({
        x: player.x + player.w / 2 - 2,
        y: player.y,
        w: 4,
        h: 12,
        speed: -10
      });
      shootCooldown = 12;
      sfxShoot();
    }

    bullets.forEach((b) => (b.y += b.speed));
    bullets = bullets.filter((b) => b.y + b.h > 0);

    enemySpawnTimer++;
    const spawnRate = Math.max(50, 90 - wave * 3);
    if (enemySpawnTimer >= spawnRate) {
      spawnEnemyRow();
      enemySpawnTimer = 0;
    }

    enemyMoveTimer++;
    const moveRate = Math.max(12, 25 - wave);
    if (enemyMoveTimer >= moveRate) {
      let hitEdge = false;
      enemies.forEach((e) => {
        e.x += 15 * enemyDirection;
        if (e.x <= 0 || e.x + e.w >= W) hitEdge = true;
      });
      if (hitEdge) {
        enemyDirection *= -1;
        enemies.forEach((e) => (e.y += 20));
      }
      enemyMoveTimer = 0;
    }

    const driftSpeed = 0.15 + wave * 0.02;
    enemies.forEach((e) => (e.y += driftSpeed));

    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (aabb(bullets[i], enemies[j])) {
          const ex = enemies[j].x + enemies[j].w / 2;
          const ey = enemies[j].y + enemies[j].h / 2;
          spawnExplosion(ex, ey, COLORS.enemy, 12);
          spawnExplosion(ex, ey, COLORS.accent, 6);
          triggerShake(4);
          sfxHit();
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 100;
          break;
        }
      }
    }

    enemies = enemies.filter((e) => {
      if (e.y + e.h >= H) {
        if (shieldActive && shieldEnergy > 0) {
          shieldEnergy = Math.max(0, shieldEnergy - SHIELD_ABSORB_COST);
          shieldFlash = 8;
          triggerShake(3);
          spawnExplosion(e.x + e.w / 2, H - 10, COLORS.shield, 8);
          sfxShieldAbsorb();
          if (shieldEnergy <= 0) { shieldActive = false; sfxShieldOff(); }
        } else {
          lives--;
          playerFlash = 10;
          triggerShake(8);
          spawnExplosion(e.x + e.w / 2, H - 10, COLORS.enemy, 8);
          if (lives > 0) sfxLifeLost();
        }
        return false;
      }
      return true;
    });

    if (lives <= 0) {
      state = GAME_STATE.GAME_OVER;
      if (score > hiScore) {
        hiScore = score;
        localStorage.setItem('spaceDefenderHi', hiScore);
      }
      sfxGameOver();
    }
  }

  // ── Starfield ──────────────────────────────────────────────────────
  function updateStarfield() {
    stars.forEach((s) => {
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    });
  }

  function drawStarfield() {
    stars.forEach((s) => {
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = COLORS.star;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
    });
    ctx.globalAlpha = 1;
  }

  // ── Draw ───────────────────────────────────────────────────────────
  function draw() {
    ctx.save();

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    applyShake();
    drawStarfield();

    if (state === GAME_STATE.MENU) {
      drawMenu();
      ctx.restore();
      return;
    }

    if (state === GAME_STATE.GAME_OVER) {
      drawGameOver();
      ctx.restore();
      return;
    }

    drawPlayer();
    drawBullets();
    drawEnemies();
    drawParticles();
    drawUI();

    ctx.restore();
  }

  // ── Loop ───────────────────────────────────────────────────────────
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
})();
