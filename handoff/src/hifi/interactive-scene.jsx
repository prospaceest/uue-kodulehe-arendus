// Interactive Scene — 3 stseeni (vannituba, magamistuba, köök) + draggable hotspots + lightbox modal
// Hotspot-positsioonid salvestuvad localStorage-i, nii et tweaks-režiim võimaldab neid lohistada.

const SCENE_DEFAULTS = {
  elutuba: {
    id: 'elutuba',
    name: 'Elutuba',
    img: 'assets/projects/showroom-elutuba.jpg',
    aspect: 1600 / 900,
    eyebrow: 'Korter · Tallinn',
    hotspots: [
    { x: 30, y: 14, sku: 'AST22', label: 'Lae perimeetri LED valgus', price: '19,37' },
    { x: 75, y: 56, sku: 'ASP106', label: 'Põranda LED varjuprofiil', price: '14,86' },
    { x: 20, y: 78, sku: 'ASP106', label: 'Põranda LED varjuprofiil', price: '14,86' }]

  },
  kook: {
    id: 'kook',
    name: 'Köök',
    img: 'assets/projects/showroom-kook.jpg',
    aspect: 1600 / 900,
    eyebrow: 'Korter · Tallinn',
    hotspots: [
    { x: 55, y: 12, sku: 'AST30', label: 'Lae LED-perimeeter', price: '26,13' },
    { x: 42, y: 45, sku: 'AST14_12', label: 'Köögikapi niši taustavalgus', price: '15,88' },
    { x: 11, y: 28, sku: 'AST22', label: 'Lae peitevalgus', price: '19,37' }]

  },
  vannituba: {
    id: 'vannituba',
    name: 'Vannituba',
    img: 'assets/projects/showroom-vannituba.jpg',
    aspect: 1600 / 900,
    eyebrow: 'Korter · Tallinn',
    hotspots: [
    { x: 50, y: 14, sku: 'AST50', label: 'Lae peitevalgus', price: '15,88' },
    { x: 53, y: 52, sku: 'AST30', label: 'Lae peitevalgus', price: '26,13' },
    { x: 4, y: 30, sku: 'AST14_12', label: 'Niši riiuli LED', price: '15,88' }]

  }
};

const SCENE_ORDER = ['elutuba', 'kook', 'vannituba'];

function loadHotspots() {
  try {
    const raw = localStorage.getItem('vp_hotspots_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = JSON.parse(JSON.stringify(SCENE_DEFAULTS));
      for (const id of SCENE_ORDER) {
        if (parsed[id] && Array.isArray(parsed[id])) {
          merged[id].hotspots = merged[id].hotspots.map((h, i) => parsed[id][i] ? { ...h, x: parsed[id][i].x, y: parsed[id][i].y } : h);
        }
      }
      return merged;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(SCENE_DEFAULTS));
}

function saveHotspots(scenes) {
  try {
    const out = {};
    for (const id of SCENE_ORDER) out[id] = scenes[id].hotspots.map((h) => ({ x: h.x, y: h.y }));
    localStorage.setItem('vp_hotspots_v2', JSON.stringify(out));
  } catch (e) {}
}

function HotspotImage({ scene, editable, onMove, onSelect, selectedIdx, lightOn = true }) {
  const ref = React.useRef(null);
  const [drag, setDrag] = React.useState(null);

  const onPointerDown = (i, e) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    setDrag(i);
    e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (drag === null || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = Math.max(2, Math.min(98, (e.clientX - r.left) / r.width * 100));
    const y = Math.max(2, Math.min(98, (e.clientY - r.top) / r.height * 100));
    onMove(drag, x, y);
  };
  const onPointerUp = () => setDrag(null);

  const aspect = scene.aspect || 2 / 3;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Blurred backdrop — fills the whole cell, even if image is portrait */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src={scene.img} alt=""
        style={{
          position: 'absolute', inset: '-8%', width: '116%', height: '116%',
          objectFit: 'cover', filter: 'blur(48px) brightness(0.55) saturate(0.85)',
          transform: 'scale(1.05)', transition: 'filter 0.5s ease'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45))' }} />
      </div>

      {/* Portrait frame — the actual photo, centered, with hotspots inside */}
      <div ref={ref} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
      style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
        height: '100%', aspectRatio: aspect, overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        cursor: editable ? 'crosshair' : 'default'
      }}>
        <img src={scene.img} alt={scene.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: lightOn ? 'none' : 'brightness(0.35) contrast(1.1)', transition: 'filter 0.5s ease' }} />
        {!lightOn &&
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,200,140,0.35) 0%, rgba(0,0,0,0) 45%)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
        }
        {scene.hotspots.map((p, i) =>
        <div key={i}
        onPointerDown={(e) => onPointerDown(i, e)}
        onClick={(e) => {if (!editable) {e.stopPropagation();onSelect && onSelect(i);}}}
        style={{
          position: 'absolute',
          top: `${p.y}%`,
          left: `${p.x}%`,
          transform: 'translate(-50%, -50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
          boxShadow: selectedIdx === i ? '0 0 0 4px rgba(255,255,255,0.95), 0 0 0 6px var(--accent)' : '0 0 0 2px rgba(255,255,255,0.85)',
          cursor: editable ? 'grab' : 'pointer', zIndex: 2,
          userSelect: 'none', touchAction: 'none',
          outline: editable ? '2px dashed rgba(255,255,255,0.7)' : 'none',
          outlineOffset: 4,
          transition: drag === i ? 'none' : 'box-shadow 0.15s'
        }}>
            {String(i + 1).padStart(2, '0')}
          </div>
        )}
        {editable &&
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '6px 10px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ✎ Lohista täppe — salvestub automaatselt
          </div>
        }
      </div>
    </div>);

}

function SceneLightbox({ scenes, sceneId, setSceneId, onClose, editable, onMove, setPage }) {
  useLocale(); // SceneLightbox locale
  const scene = scenes[sceneId];
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [lightOn, setLightOn] = React.useState(true);
  React.useEffect(() => {setSelectedIdx(0);}, [sceneId]);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSceneId(SCENE_ORDER[(SCENE_ORDER.indexOf(sceneId) + 1) % SCENE_ORDER.length]);
      if (e.key === 'ArrowLeft') setSceneId(SCENE_ORDER[(SCENE_ORDER.indexOf(sceneId) - 1 + SCENE_ORDER.length) % SCENE_ORDER.length]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sceneId, onClose, setSceneId]);

  const sel = scene.hotspots[selectedIdx];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'grid', gridTemplateColumns: '1fr 380px', color: '#fff' }}>
      {/* LEFT: image + scene tabs */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          {SCENE_ORDER.map((id) =>
          <button key={id} onClick={() => setSceneId(id)}
          style={{
            flex: 1, padding: '18px 24px', background: sceneId === id ? 'rgba(255,255,255,0.08)' : 'transparent',
            border: 'none', borderRight: '1px solid rgba(255,255,255,0.15)',
            color: sceneId === id ? '#fff' : 'rgba(255,255,255,0.55)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer', textAlign: 'left'
          }}>
              <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}>{scenes[id].eyebrow}</div>
              <div>{scenes[id].name}</div>
            </button>
          )}
        </div>
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <HotspotImage scene={scene} editable={editable} onMove={(i, x, y) => onMove(sceneId, i, x, y)} onSelect={setSelectedIdx} selectedIdx={selectedIdx} lightOn={lightOn} />
        </div>
        {/* Bottom controls */}
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <button onClick={() => setLightOn(true)}
          style={{ flex: 1, padding: '14px 20px', background: lightOn ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
            ☀ Päevavalgus
          </button>
          <button onClick={() => setLightOn(false)}
          style={{ flex: 1, padding: '14px 20px', background: !lightOn ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
            ☾ LED sees
          </button>
        </div>
      </div>
      {/* RIGHT: panel */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>{tr('Stseen','Сцена')} {SCENE_ORDER.indexOf(sceneId) + 1} / {SCENE_ORDER.length}</span>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 12px', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tr('Sulge ✕','Закрыть ✕')}</button>
        </div>
        <div style={{ padding: '32px 28px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{tr('Valitud · Täpp','Выбрано · Точка')} {String(selectedIdx + 1).padStart(2, '0')}</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 56, lineHeight: 0.95, marginBottom: 6 }}>{sel.sku}</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 18 }}>{sel.label}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>{sel.price} €/m</div>
          <button onClick={() => {setPage && setPage('product');onClose();}}
          className="vp-btn" style={{ width: '100%', background: '#fff', color: '#000', borderColor: '#fff' }}>
            {tr('Vaata toodet →','Смотреть товар →')}
          </button>
        </div>
        <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>{tr('Kõik selles ruumis','Всё в этой комнате')}</div>
          {scene.hotspots.map((h, i) =>
          <button key={i} onClick={() => setSelectedIdx(i)}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'transparent', border: 'none', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgba(255,255,255,0.1)',
            color: 'inherit', cursor: 'pointer', textAlign: 'left'
          }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: selectedIdx === i ? 'var(--accent)' : 'transparent', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{h.sku}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.label}</div>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>→</div>
            </button>
          )}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <button onClick={() => {setPage && setPage('cart');onClose();}}
          className="vp-btn" style={{ width: '100%', background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }}>
            {tr('Telli sama lahendus →','Заказать такое же →')}
          </button>
        </div>
      </div>
    </div>);

}

function InteractiveScene({ tweaks, setPage }) {
  useLocale(); // InteractiveScene locale
  const [scenes, setScenes] = React.useState(loadHotspots);
  const [sceneId, setSceneId] = React.useState('elutuba');
  const [open, setOpen] = React.useState(false);
  const editable = !!(tweaks && tweaks.editHotspots);
  const scene = scenes[sceneId];

  const move = (sId, idx, x, y) => {
    setScenes((prev) => {
      const next = { ...prev, [sId]: { ...prev[sId], hotspots: prev[sId].hotspots.map((h, i) => i === idx ? { ...h, x, y } : h) } };
      saveHotspots(next);
      return next;
    });
  };

  return (
    <>
      <section style={{ padding: '80px 56px', background: 'var(--ink)', color: 'var(--paper)', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ height: 760, position: 'relative', overflow: 'hidden' }}>
            <HotspotImage scene={scene} editable={editable} onMove={(i, x, y) => move(sceneId, i, x, y)} />
          </div>
          <div>
            <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{tr('01 / Vaata kasutuses','01 / Смотрите в действии')}</div>
            <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.95 }}>{tr('Üks ruum.','Одна комната.')}<br />{tr('Mitu profiili.','Несколько профилей.')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, marginTop: 24, maxWidth: 420 }}>
              {tr('Ava virtuaalne showroom ning kliki numbritele, et näha millist profiili kuskil kasutada.','Откройте виртуальный шоурум и нажимайте на номера, чтобы увидеть, какой профиль где использовать.')}
            </p>

            {/* Scene picker */}
            <div style={{ display: 'flex', gap: 0, marginTop: 28, border: '1px solid rgba(255,255,255,0.25)' }}>
              {SCENE_ORDER.map((id, i) =>
              <button key={id} onClick={() => setSceneId(id)}
              style={{
                flex: 1, padding: '14px 12px', background: sceneId === id ? 'var(--paper)' : 'transparent',
                color: sceneId === id ? 'var(--ink)' : 'rgba(255,255,255,0.85)',
                border: 'none', borderRight: i < SCENE_ORDER.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
                cursor: 'pointer'
              }}>
                  {tr(scenes[id].name, ({Elutuba:'Гостиная',Köök:'Кухня',Vannituba:'Ванная',Magamistuba:'Спальня',Esik:'Прихожая'})[scenes[id].name] || scenes[id].name)}
                </button>
              )}
            </div>

            <button onClick={() => setOpen(true)} className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)', marginTop: 18 }}>
              {tr('Ava interaktiivne showroom','Открыть виртуальный шоурум')}
            </button>
          </div>
        </div>
      </section>
      {open &&
      <SceneLightbox scenes={scenes} sceneId={sceneId} setSceneId={setSceneId} onClose={() => setOpen(false)} editable={editable} onMove={move} setPage={setPage} />
      }
    </>);

}

Object.assign(window, { InteractiveScene });