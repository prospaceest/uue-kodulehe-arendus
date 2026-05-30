'use client';

import { useUser, SignOutButton } from '@clerk/nextjs';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function KontoPage() {
  const { user, isLoaded } = useUser();
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  if (!isLoaded) {
    return (
      <div style={{ padding: '120px 56px', textAlign: 'center' }}>
        <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {ru ? 'Загрузка…' : 'Laadin…'}
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // middleware redirects to login
  }

  const initials = ((user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')).toUpperCase() || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || '?';

  return (
    <div>
      {/* Header */}
      <section style={{ padding: '56px 56px 32px', borderBottom: 'var(--border)', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'B2B · Мой аккаунт' : 'B2B · Minu konto'}</div>
          <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', margin: 0, lineHeight: 0.95 }}>
            {ru ? `Здравствуйте, ${user.firstName ?? ''}.` : `Tere, ${user.firstName ?? ''}.`}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <SignOutButton>
            <button className="vp-btn vp-btn--ghost">
              {ru ? 'Выйти' : 'Logi välja'}
            </button>
          </SignOutButton>
        </div>
      </section>

      {/* Account info + quick actions */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: 'var(--border)' }}>
        {/* Profile */}
        <div style={{ padding: '40px 40px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18 }}>{ru ? 'Профиль' : 'Profiil'}</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, background: 'var(--ink)', color: 'var(--paper)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: 24 }}>
              {initials}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{user.fullName}</div>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{user.primaryEmailAddress?.emailAddress}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            {ru
              ? 'Управляйте профилем, паролем и уведомлениями в настройках Clerk.'
              : 'Halda oma profiili, parooli ja teateid Clerk seadetes.'}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '40px 40px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18 }}>{ru ? 'Быстрые действия' : 'Kiirtoimingud'}</div>
          <div style={{ display: 'grid', gap: 10 }}>
            <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg" style={{ textAlign: 'center' }}>
              {ru ? 'Смотреть каталог →' : 'Vaata kataloogi →'}
            </Link>
            <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost" style={{ textAlign: 'center' }}>
              {ru ? 'Связаться с нами' : 'Võta meiega ühendust'}
            </Link>
            <Link href={`${pfx}/professionaalidele`} className="vp-btn vp-btn--ghost" style={{ textAlign: 'center' }}>
              {ru ? 'Программа партнёров' : 'Partneriprogramm'}
            </Link>
          </div>
        </div>

        {/* Partner status */}
        <div style={{ padding: '40px 40px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18 }}>{ru ? 'Партнёрский статус' : 'Partneri staatus'}</div>
          <div className="vp-display" style={{ fontSize: 48, color: 'var(--accent)', marginBottom: 8 }}>B2B</div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 20 }}>
            {ru
              ? 'Ваша персональная скидка и условия оговариваются индивидуально. Для уточнения условий напишите нам.'
              : 'Sinu personaalne soodustus ja tingimused lepitakse kokku individuaalselt. Tingimuste täpsustamiseks võta meiega ühendust.'}
          </p>
          <Link href={`${pfx}/kontakt`} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: 'var(--border)', paddingBottom: 2, color: 'var(--ink)', textDecoration: 'none' }}>
            {ru ? 'Уточнить условия →' : 'Küsi tingimusi →'}
          </Link>
        </div>
      </section>

      {/* Recent orders placeholder */}
      <section style={{ padding: '56px' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 20 }}>{ru ? 'Последние заказы' : 'Viimased tellimused'}</div>
        <div style={{ border: 'var(--border)', padding: '40px', background: 'var(--paper-2)', textAlign: 'center' }}>
          <div className="vp-display" style={{ fontSize: 40, marginBottom: 12 }}>
            {ru ? 'Заказов пока нет.' : 'Tellimusi veel pole.'}
          </div>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 24 }}>
            {ru
              ? 'История заказов появится здесь после первого оформленного заказа.'
              : 'Tellimuste ajalugu ilmub siia pärast esimest esitatud tellimust.'}
          </p>
          <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">
            {ru ? 'Начать покупки →' : 'Alusta ostlemist →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
