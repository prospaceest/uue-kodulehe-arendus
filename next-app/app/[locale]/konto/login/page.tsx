'use client';

import { SignIn } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function LoginPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)', minHeight: '60vh' }}>
      {/* Left — Clerk SignIn */}
      <div style={{ padding: '80px 56px', borderRight: 'var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'B2B · Вход' : 'B2B · Sisselogimine'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', margin: '0 0 40px', lineHeight: 0.95 }}>
          {ru ? 'Вход в аккаунт.' : 'Logi sisse.'}
        </h1>
        <SignIn
          appearance={{
            elements: {
              rootBox: { width: '100%', maxWidth: 420 },
              card: {
                boxShadow: 'none',
                border: '1.5px solid var(--ink)',
                borderRadius: 0,
                background: 'var(--paper)',
              },
              headerTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 28 },
              formButtonPrimary: {
                background: 'var(--ink)',
                borderRadius: 0,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              },
              footerActionLink: { color: 'var(--accent)' },
            },
          }}
          forceRedirectUrl={`${pfx}/konto`}
          signUpForceRedirectUrl={`${pfx}/konto`}
        />
      </div>

      {/* Right — B2B info */}
      <div style={{ padding: '80px 56px', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Нет аккаунта?' : 'Pole kontot?'}</div>
        <h2 className="vp-display" style={{ fontSize: 56, margin: '0 0 24px', lineHeight: 0.95 }}>
          {ru ? 'Стань партнёром.' : 'Saa partneriks.'}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 400, marginBottom: 32 }}>
          {ru
            ? 'Партнёры получают персональную скидку 5–35%, приоритетную доставку и техническую поддержку по всем проектам.'
            : 'Partnerid saavad personaalse soodustuse 5–35%, prioriteetse tarne ning tehnilise toe kõigis projektides.'}
        </p>
        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {[
            { n: '−25%', t: ru ? 'Средняя скидка партнёра' : 'Keskmine partnerisoodustus' },
            { n: '24 h', t: ru ? 'Ответ на запрос' : 'Vastus pakkumisele' },
            { n: '1:1',  t: ru ? 'Техподдержка' : 'Tehniline tugi' },
          ].map((b) => (
            <div key={b.n} style={{ display: 'flex', gap: 20, alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <span className="vp-display" style={{ fontSize: 36, color: 'var(--accent)', flexShrink: 0, minWidth: 56 }}>{b.n}</span>
              <span style={{ fontSize: 14 }}>{b.t}</span>
            </div>
          ))}
        </div>
        <Link href={`${pfx}/professionaalidele`} className="vp-btn vp-btn--lg" style={{ display: 'inline-block' }}>
          {ru ? 'Зарегистрироваться →' : 'Taotle partnerstaatust →'}
        </Link>
      </div>
    </div>
  );
}
