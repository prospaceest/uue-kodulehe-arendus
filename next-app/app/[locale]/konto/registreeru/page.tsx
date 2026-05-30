'use client';

import { SignUp } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function RegistreeruPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)', minHeight: '60vh' }}>
      <div style={{ padding: '80px 56px', borderRight: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'B2B · Регистрация' : 'B2B · Registreerimine'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', margin: '0 0 40px', lineHeight: 0.95 }}>
          {ru ? 'Создать аккаунт.' : 'Loo konto.'}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 32, maxWidth: 380 }}>
          {ru
            ? 'После регистрации наш менеджер свяжется с вами в течение 24 часов для подтверждения партнёрского статуса и скидки.'
            : 'Pärast registreerumist võtab meie haldur teiega 24 tunni jooksul ühendust, et kinnitada partneristaatus ja soodustusprotsent.'}
        </p>
        <SignUp
          appearance={{
            elements: {
              rootBox: { width: '100%', maxWidth: 420 },
              card: { boxShadow: 'none', border: '1.5px solid var(--ink)', borderRadius: 0, background: 'var(--paper)' },
              formButtonPrimary: {
                background: 'var(--ink)', borderRadius: 0,
                fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 13,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              },
            },
          }}
          forceRedirectUrl={`${pfx}/konto`}
          signInForceRedirectUrl={`${pfx}/konto`}
        />
      </div>
      <div style={{ padding: '80px 56px', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Уже есть аккаунт?' : 'Konto on juba olemas?'}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px', lineHeight: 0.95 }}>
          {ru ? 'Войдите.' : 'Logi sisse.'}
        </h2>
        <Link href={`${pfx}/konto/login`} className="vp-btn vp-btn--lg">{ru ? 'Войти →' : 'Sisselogimine →'}</Link>
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 12 }}>{ru ? 'Нужна консультация?' : 'Küsimusi?'}</div>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 16 }}>
            {ru ? 'Позвоните или напишите — поможем настроить партнёрский аккаунт.' : 'Helista või kirjuta — aitame partnerkonto seadistada.'}
          </p>
          <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost">{ru ? 'Контакт' : 'Kontakt'}</Link>
        </div>
      </div>
    </div>
  );
}
