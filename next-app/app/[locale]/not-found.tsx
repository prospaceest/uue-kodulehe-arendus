import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ minHeight: '72vh', display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: 'var(--border)' }}>
      <div style={{ padding: '72px 56px', borderRight: 'var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>Viga 404 · Lehte ei leitud</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(120px, 20vw, 320px)', margin: 0, lineHeight: 0.85 }}>404.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 480, marginTop: 24 }}>
          Seda lehte siin ei ole. Võib-olla viga aadressis, võib-olla meie poolt. Üks neist liikumistest viib su tagasi:
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
          <Link href="/" className="vp-btn vp-btn--lg">← Avalehele</Link>
          <Link href="/tooted" className="vp-btn vp-btn--ghost vp-btn--lg">Pood</Link>
          <Link href="/kontakt" className="vp-btn vp-btn--ghost vp-btn--lg">Kontakt</Link>
        </div>
      </div>
      <div className="vp-photo" style={{ position: 'relative' }}>
        <span className="label">404 · tühi tuba</span>
        <div style={{ position: 'absolute', bottom: 24, right: 24, fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>tühi tuba · tühi leht</div>
      </div>
    </section>
  );
}
