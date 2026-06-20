/* Shared Animated background canvas loop for AZRAR */
(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, t = 0;
  const isMobileDevice = window.innerWidth <= 768;
  const _rmq = isMobileDevice || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  let _rt;
  window.addEventListener('resize', function() {
    clearTimeout(_rt);
    _rt = setTimeout(resize, 150);
  });

  const orbs = [
    { x:0.12, y:0.06, c:[55,48,163],  r:0.52 },
    { x:0.82, y:0.10, c:[79,70,229],  r:0.48 },
    { x:0.48, y:0.30, c:[30,27,107],  r:0.58 },
    { x:0.08, y:0.52, c:[99,102,241], r:0.44 },
    { x:0.88, y:0.48, c:[67,56,202],  r:0.46 },
    { x:0.38, y:0.72, c:[49,46,129],  r:0.50 },
    { x:0.72, y:0.85, c:[79,70,229],  r:0.42 },
  ];
  const angles = orbs.map(() => Math.random() * Math.PI * 2);
  const speeds = orbs.map(() => 0.00025 + Math.random() * 0.00035);
  const radii  = orbs.map(() => 0.05 + Math.random() * 0.09);

  function draw() {
    if (isMobileDevice) return;
    t += 0.004;
    ctx.clearRect(0, 0, W, H);

    orbs.forEach((orb, i) => {
      angles[i] += speeds[i];
      const cx = (orb.x + Math.cos(angles[i]) * radii[i]) * W;
      const cy = (orb.y + Math.sin(angles[i] * 0.65) * radii[i] * 0.55) * H;
      const r  = orb.r * Math.min(W, H * 0.38);
      const pulse = 1 + 0.07 * Math.sin(t * 1.2 + i * 1.05);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * pulse);
      const [rr,gg,bb] = orb.c;
      const a = 0.16 + 0.055 * Math.sin(t * 0.85 + i * 0.65);
      g.addColorStop(0, `rgba(${rr},${gg},${bb},${a})`);
      g.addColorStop(0.5, `rgba(${rr},${gg},${bb},${a*0.38})`);
      g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
      ctx.fillStyle = g;
      
      // OPTIMIZATION: Render only the bounding box of the orb rather than the entire canvas
      const size = r * pulse;
      ctx.fillRect(cx - size, cy - size, size * 2, size * 2);
    });

    // OPTIMIZATION: Render bottom fade gradient only where it's visible, not the entire screen
    const fade = ctx.createLinearGradient(0, H * 0.85, 0, H);
    fade.addColorStop(0, 'rgba(8,7,26,0)');
    fade.addColorStop(1, 'rgba(8,7,26,0.5)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, H * 0.85, W, H * 0.15);
  }

  let _last = 0, _paused = false;
  function loop(ts) {
    if (_paused) return;
    if (ts - _last >= 33) { _last = ts; draw(); }  // ~30fps cap
    requestAnimationFrame(loop);
  }

  // Draw initial frame statically
  draw();

  // Start continuous loop only after window has fully loaded to avoid blocking page load
  window.addEventListener('load', () => {
    if (!_rmq) {
      requestAnimationFrame(loop);
    }
  });

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      _paused = true;
    } else if (!_rmq) {
      _paused = false;
      _last = 0;
      requestAnimationFrame(loop);
    }
  });
})();
