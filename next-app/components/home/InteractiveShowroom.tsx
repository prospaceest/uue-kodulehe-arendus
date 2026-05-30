'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { products } from '@/lib/catalog';

type Hotspot = { x: number; y: number; sku: string; label: string; labelRu: string; price: string };
type Scene = { id: string; nameEt: string; nameRu: string; img: string; eyebrow: string; hotspots: Hotspot[] };

const SCENES: Scene[] = [
  {
    id: 'elutuba',
    nameEt: 'Elutuba', nameRu: 'Гостиная',
    img: '/assets/projects/showroom-elutuba.jpg',
    eyebrow: 'Korter · Tallinn',
    hotspots: [
      { x: 30, y: 14, sku: 'AST22',    label: 'Lae perimeetri LED valgus',  labelRu: 'LED-подсветка по периметру потолка', price: '19,37' },
      { x: 75, y: 56, sku: 'ASP106',   label: 'Põranda LED varjuprofiil',   labelRu: 'Напольный LED-профиль',              price: '14,86' },
      { x: 20, y: 78, sku: 'ASP106',   label: 'Põranda LED varjuprofiil',   labelRu: 'Напольный LED-профиль',              price: '14,86' },
    ],
  },
  {
    id: 'kook',
    nameEt: 'Köök', nameRu: 'Кухня',
    img: '/assets/projects/showroom-kook.jpg',
    eyebrow: 'Korter · Tallinn',
    hotspots: [
      { x: 55, y: 12, sku: 'AST30',    label: 'Lae LED-perimeeter',         labelRu: 'LED-периметр потолка',               price: '26,13' },
      { x: 42, y: 45, sku: 'AST1412',  label: 'Köögikapi niši taustavalgus', labelRu: 'Подсветка ниши кухонного шкафа',   price: '15,88' },
      { x: 11, y: 28, sku: 'AST22',    label: 'Lae peitevalgus',            labelRu: 'Скрытая подсветка потолка',          price: '19,37' },
    ],
  },
  {
    id: 'vannituba',
    nameEt: 'Vannituba', nameRu: 'Ванная',
    img: '/assets/projects/showroom-vannituba.jpg',
    eyebrow: 'Korter · Tallinn',
    hotspots: [
      { x: 50, y: 14, sku: 'AST50',    label: 'Lae peitevalgus',            labelRu: 'Скрытая подсветка потолка',          price: '15,88' },
      { x: 53, y: 52, sku: 'AST30',    label: 'Lae peitevalgus',            labelRu: 'Скрытая подсветка потолка',          price: '26,13' },
      { x: 4,  y: 30, sku: 'AST1412',  label: 'Niši riiuli LED',            labelRu: 'LED-подсветка ниши',                 price: '15,88' },
    ],
  },
];

function SceneImage({ scene, selectedIdx, onSelect, lightOn }: { scene: Scene; selectedIdx: number; onSelect: (i: number) => void; lightOn: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Blurred backdrop */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scene.img} alt="" style={{ position: 'absolute', inset: '-8%', width: '116%', height: '116%', objectFit: 'cover', filter: 'blur(48px) brightness(0.55) saturate(0.85)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45))' }} />
      </div>

      {/* Centered portrait frame */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', aspectRatio: '16/9', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.55)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scene.img} alt={scene.nameEt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', filter: lightOn ? 'none' : 'brightness(0.35) contrast(1.1)', transition: 'filter 0.5s ease' }} />
        {!lightOn && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,200,140,0.35) 0%, transparent 45%)', mixBlendMode: 'screen', pointerEvents: 'none' }} />}

        {scene.hotspots.map((h, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              position: 'absolute',
              top: `${h.y}%`, left: `${h.x}%`,
              transform: 'translate(-50%, -50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--accent)', color: '#fff', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
              boxShadow: selectedIdx === i ? '0 0 0 4px rgba(255,255,255,0.95), 0 0 0 6px var(--accent)' : '0 0 0 2px rgba(255,255,255,0.85)',
              cursor: 'pointer', zIndex: 2, transition: 'box-shadow 0.15s',
            }}
            aria-label={h.label}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}

function Lightbox({ sceneIdx, setSceneIdx, onClose, ru }: { sceneIdx: number; setSceneIdx: (i: number) => void; onClose: () => void; ru: boolean }) {
  const [selectedHotspot, setSelectedHotspot] = useState(0);
  const [lightOn, setLightOn] = useState(true);
  const scene = SCENES[sceneIdx];
  const sel = scene.hotspots[selectedHotspot];

  useEffect(() => { setSelectedHotspot(0); }, [sceneIdx]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setSceneIdx((sceneIdx + 1) % SCENES.length);
    if (e.key === 'ArrowLeft') setSceneIdx((sceneIdx - 1 + SCENES.length) % SCENES.length);
  }, [sceneIdx, onClose, setSceneIdx]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  // Find product URL
  const product = products.find((p) => p.sku === sel.sku || p.sku === sel.sku.replace('AST1412', 'AST14_12'));
  const productHref = product ? (ru ? `/ru${product.urlPathRu}` : product.urlPath) : (ru ? '/ru/tooted' : '/tooted');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'grid', gridTemplateColumns: '1fr 380px', color: '#fff' }} role="dialog" aria-modal>
      {/* Left: image + tabs */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
        {/* Scene tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
          {SCENES.map((s, i) => (
            <button key={s.id} onClick={() => setSceneIdx(i)} style={{ flex: 1, padding: '18px 16px', background: sceneIdx === i ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,0.15)', color: sceneIdx === i ? '#fff' : 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}>{s.eyebrow}</div>
              <div>{ru ? s.nameRu : s.nameEt}</div>
            </button>
          ))}
        </div>

        {/* Scene image */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <SceneImage scene={scene} selectedIdx={selectedHotspot} onSelect={setSelectedHotspot} lightOn={lightOn} />
        </div>

        {/* Light toggle */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
          <button onClick={() => setLightOn(true)} style={{ flex: 1, padding: '14px', background: lightOn ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
            ☀ {ru ? 'Дневной свет' : 'Päevavalgus'}
          </button>
          <button onClick={() => setLightOn(false)} style={{ flex: 1, padding: '14px', background: !lightOn ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
            ☾ LED {ru ? 'включён' : 'sees'}
          </button>
        </div>
      </div>

      {/* Right: product panel */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>
            {ru ? 'Сцена' : 'Stseen'} {sceneIdx + 1} / {SCENES.length}
          </span>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 12px', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {ru ? 'Закрыть ✕' : 'Sulge ✕'}
          </button>
        </div>

        {/* Selected hotspot product info */}
        <div style={{ padding: '32px 28px', borderBottom: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
            {ru ? 'Выбрано · Точка' : 'Valitud · Täpp'} {String(selectedHotspot + 1).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 56, lineHeight: 0.95, marginBottom: 6 }}>{sel.sku}</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 18 }}>{ru ? sel.labelRu : sel.label}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>{sel.price} €/m</div>
          <Link href={productHref} onClick={onClose} className="vp-btn" style={{ display: 'flex', justifyContent: 'center', background: '#fff', color: '#000', borderColor: '#fff' }}>
            {ru ? 'Смотреть товар →' : 'Vaata toodet →'}
          </Link>
        </div>

        {/* All hotspots in this scene */}
        <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>
            {ru ? 'Всё в этой комнате' : 'Kõik selles ruumis'}
          </div>
          {scene.hotspots.map((h, i) => (
            <button key={i} onClick={() => setSelectedHotspot(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: selectedHotspot === i ? 'var(--accent)' : 'transparent', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{h.sku}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ru ? h.labelRu : h.label}</div>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>→</div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
          <Link href={ru ? '/ru/tooted' : '/tooted'} onClick={onClose} className="vp-btn" style={{ display: 'flex', justifyContent: 'center', background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }}>
            {ru ? 'Заказать такое же →' : 'Telli sama lahendus →'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveShowroom() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const [sceneIdx, setSceneIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scene = SCENES[sceneIdx];

  return (
    <>
      <section style={{ padding: '80px 56px', background: 'var(--ink)', color: 'var(--paper)', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'center' }}>
          {/* Scene preview */}
          <div style={{ height: 520, position: 'relative', overflow: 'hidden', borderRadius: 0 }}>
            <SceneImage scene={scene} selectedIdx={-1} onSelect={() => setLightboxOpen(true)} lightOn />
          </div>

          {/* Text + controls */}
          <div>
            <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
              {ru ? '01 / Смотрите в действии' : '01 / Vaata kasutuses'}
            </div>
            <h2 className="vp-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>
              {ru ? 'Одна комната.' : 'Üks ruum.'}<br />
              {ru ? 'Несколько профилей.' : 'Mitu profiili.'}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, marginTop: 24, maxWidth: 420 }}>
              {ru
                ? 'Откройте виртуальный шоурум и нажимайте на номера, чтобы увидеть, какой профиль где использовать.'
                : 'Ava virtuaalne showroom ning kliki numbritele, et näha millist profiili kuskil kasutada.'}
            </p>

            {/* Scene picker */}
            <div style={{ display: 'flex', marginTop: 28, border: '1px solid rgba(255,255,255,0.25)' }}>
              {SCENES.map((s, i) => (
                <button key={s.id} onClick={() => setSceneIdx(i)} style={{ flex: 1, padding: '14px 12px', background: sceneIdx === i ? 'var(--paper)' : 'transparent', color: sceneIdx === i ? 'var(--ink)' : 'rgba(255,255,255,0.85)', border: 'none', borderRight: i < SCENES.length - 1 ? '1px solid rgba(255,255,255,0.25)' : 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                  {ru ? s.nameRu : s.nameEt}
                </button>
              ))}
            </div>

            <button onClick={() => setLightboxOpen(true)} className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)', marginTop: 18 }}>
              {ru ? 'Открыть виртуальный шоурум' : 'Ava interaktiivne showroom'}
            </button>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          sceneIdx={sceneIdx}
          setSceneIdx={setSceneIdx}
          onClose={() => setLightboxOpen(false)}
          ru={ru}
        />
      )}
    </>
  );
}
