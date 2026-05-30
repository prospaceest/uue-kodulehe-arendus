import { getLocale } from 'next-intl/server';
import { site } from '@/lib/site';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Гарантия и претензии' : 'Garantii ja pretensioonid',
    description: ru ? 'Условия гарантии на теневые профили — 5 лет против производственных дефектов. Как подать претензию в PROSPACE OÜ.' : 'Varjuprofiilide garantiitingimused — 5 aastat tootmisdefektide vastu. Kuidas esitada pretensiooni PROSPACE OÜ-le.',
  };
}

export default async function WarrantyPage() {
  const locale = await getLocale();
  const ru = locale === 'ru';

  return (
    <div>
      <section style={{ padding: '72px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? 'Сервис · Гарантия' : 'Klienditeenindus · Garantii'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {ru ? 'Гарантия' : 'Garantii'}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>
            {ru ? 'на профиль и его покрытие.' : 'profiilile ja selle värvile.'}
          </span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 720, marginTop: 22 }}>
          {ru
            ? 'Продаём только алюминиевые профили и покрываем гарантией только то, за что несём ответственность — сам профиль и его покрытие. LED-ленты, блоки питания и другую электронику не продаём и не гарантируем.'
            : 'Müüme ainult alumiiniumprofiile ja katame garantiiga vaid seda, mille eest meie vastutame — profiili ennast ja selle värvi. LED-ribasid, toiteplokke ega muid elektroonika komponente me ei müü ega garanteeri.'}
        </p>
      </section>

      <section style={{ padding: '56px', borderBottom: 'var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Что покрывает' : 'Mis kehtib'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{ru ? 'Гарантия\nпокрывает.' : 'Garantii\nkatab.'}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
            <li>{ru ? 'Заводские дефекты' : 'Tootmisdefektid'}</li>
            <li>{ru ? 'Коррозия и окисление в нормальных условиях' : 'Korrosioon ja oksüdeerumine normaaltingimustes'}</li>
            <li>{ru ? 'Выцветание краски в помещениях' : 'Värvi tuhmumine sisetingimustes'}</li>
          </ul>
        </div>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Что не покрывает' : 'Mis ei kehti'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{ru ? 'Гарантия\nне покрывает.' : 'Garantii\nei kata.'}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
            <li>{ru ? 'Неправильный монтаж' : 'Vale paigaldus'}</li>
            <li>{ru ? 'Механические повреждения после монтажа' : 'Mehaanilised vigastused peale paigaldust'}</li>
            <li>{ru ? 'Повреждения от химикатов и растворителей' : 'Kemikaalide, lahustite kahjustused'}</li>
            <li>{ru ? 'Естественный износ' : 'Loomulik kulumine'}</li>
          </ul>
        </div>
      </section>

      <section style={{ padding: '56px', background: 'var(--paper-2)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Подача претензии' : 'Pretensiooni esitamine'}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{ru ? '3 шага.' : '3 sammu.'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { n: '01', t: ru ? 'Фото + описание' : 'Foto + kirjeldus', d: ru ? `Отправьте на ${site.email} — товар, дата покупки, описание проблемы, фото.` : `Saada ${site.email} — toode, ostu kuupäev, probleemi kirjeldus, fotod.` },
            { n: '02', t: ru ? 'Отвечаем в течение 48 ч' : 'Vastame 48 h jooksul', d: ru ? 'Оцениваем гарантийный случай. Если да — выдаём заказ на замену.' : 'Hindame: kas garantiijuhtum. Kui jah — anname asenduskorralduse.' },
            { n: '03', t: ru ? 'Заменяем или ремонтируем' : 'Asendame või parandame', d: ru ? 'Отправляем новый товар бесплатно.' : 'Saadame uue toote tasuta.' },
          ].map((s) => (
            <div key={s.n} style={{ padding: '24px', border: 'var(--border)', background: 'var(--paper)' }}>
              <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>{s.n}</div>
              <div className="vp-display" style={{ fontSize: 28, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
