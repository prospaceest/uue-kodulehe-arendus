'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { site } from '@/lib/site';

type Section = 'terms' | 'privacy' | 'cookies' | 'impressum';

export default function LegalPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const [section, setSection] = useState<Section>('terms');

  const tabs: [Section, string][] = [
    ['terms',     ru ? 'Условия продажи'                   : 'Müügitingimused'],
    ['privacy',   ru ? 'Политика конфиденциальности'       : 'Privaatsuspoliitika'],
    ['cookies',   ru ? 'Файлы cookie'                      : 'Küpsised'],
    ['impressum', ru ? 'Реквизиты'                         : 'Impressum'],
  ];

  return (
    <div>
      <section style={{ padding: '56px 56px 24px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? 'Юридическая информация · Обновлено 01.05.2026' : 'Juriidiline info · Värskendatud 01.05.2026'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0 }}>
          {ru ? 'Условия.' : 'Tingimused.'}
        </h1>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        <aside style={{ borderRight: 'var(--border)', padding: '32px 0', position: 'sticky', top: 60, alignSelf: 'start' }}>
          {tabs.map(([k, l]) => (
            <button key={k} onClick={() => setSection(k)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 32px', cursor: 'pointer', background: section === k ? 'var(--paper-2)' : 'transparent', borderLeft: section === k ? '3px solid var(--ink)' : '3px solid transparent', border: 'none', fontWeight: section === k ? 600 : 400, fontSize: 14, color: 'var(--ink)', fontFamily: 'Inter, sans-serif' }}>
              {l}
            </button>
          ))}
        </aside>

        <article style={{ padding: '48px 56px', maxWidth: 820, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>
          {section === 'terms' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{ru ? 'Условия продажи' : 'Müügitingimused'}</h2>
            <p>{ru ? `Настоящие условия применяются к заказам в интернет-магазине varjuprofiilid.ee. Продавец — ${site.legal} (рег.№ ${site.regNr}, ИНН ${site.kmkr}), адрес ${site.addressFull}.` : `Käesolevad tingimused kehtivad veebipoes varjuprofiilid.ee tehtavate tellimuste suhtes. Müüjaks on ${site.legal} (reg.nr ${site.regNr}, KMKR ${site.kmkr}), aadress ${site.addressFull}.`}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? '1. Размещение заказа' : '1. Tellimuse esitamine'}</h3>
            <p>{ru ? 'Заказ считается оформленным после подтверждения по электронной почте. Продавец оставляет за собой право отказать в заказе в течение 24 ч, если товара нет на складе.' : 'Tellimus loetakse esitatuks pärast kinnitust meili teel. Müüja jätab endale õiguse tellimusest keelduda 24 h jooksul, kui kaup pole laos.'}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? '2. Цены и оплата' : '2. Hinnad ja maksmine'}</h3>
            <p>{ru ? 'Все цены включают НДС 24%. Оплата SEPA-переводом по счёту. Товар остаётся собственностью продавца до полной оплаты.' : 'Kõik hinnad sisaldavad käibemaksu 24%. Tasumine SEPA ülekandega arve alusel. Kaup jääb müüja omandisse kuni täieliku tasumiseni.'}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? '3. Доставка' : '3. Tarne'}</h3>
            <p>{ru ? 'Доставка Venipak 2–4 рабочих дня (со склада). RAL под заказ — 4–5 недель. Доставка 25 € + НДС, при заказе свыше 200 € — бесплатно.' : 'Tarne Venipakiga 2–4 tööpäeva (laokaup). RAL eritoonid 4–5 nädalat. Tarnekulu 25 € + KM, üle 200 € tellimuste puhul tasuta.'}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? '4. Возврат' : '4. Tagastamine'}</h3>
            <p>{ru ? 'Право возврата в течение 14 дней на основании VÕS § 56. Не распространяется на товары, изготовленные под заказ.' : '14-päevane tagastusõigus VÕS § 56 alusel. Ei kehti eritellimusel valmistatud toodetele.'}</p>
          </>}

          {section === 'privacy' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{ru ? 'Политика конфиденциальности' : 'Privaatsuspoliitika'}</h2>
            <p>{ru ? `${site.legal} собирает и обрабатывает персональные данные в соответствии с GDPR. Контролёр данных — ${site.legal}.` : `PROSPACE OÜ kogub ja töötleb isikuandmeid kooskõlas isikuandmete kaitse üldmäärusega (GDPR). Andmete vastutav töötleja: ${site.legal}.`}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? 'Что собираем' : 'Mida kogume'}</h3>
            <p>{ru ? 'Имя, e-mail, телефон, адрес — необходимы для выполнения заказа. Платёжные данные не храним — перевод проходит напрямую между банками.' : 'Nimi, e-post, telefon, aadress — vajalik tellimuse täitmiseks. Maksete andmeid me ei talleta — ülekanne toimub otse pankade vahel.'}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{ru ? 'Хранение' : 'Säilitamine'}</h3>
            <p>{ru ? 'Данные заказов храним 7 лет (требование бухгалтерии). Данные рассылки — до отписки.' : 'Tellimuste andmeid säilitame 7 aastat (raamatupidamise nõue). Newsletter-andmed kuni tellimuse lõpetamiseni.'}</p>
          </>}

          {section === 'cookies' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{ru ? 'Файлы cookie' : 'Küpsised'}</h2>
            <p>{ru ? 'Используем cookie для работы сайта (сессионные cookie) и анонимной статистики использования.' : 'Kasutame küpsiseid, et veebileht toimiks (sessiooniküpsised) ja et mõista, kuidas inimesed lehte kasutavad (anonüümne statistika).'}</p>
            <p>{ru ? 'Для маркетинговых cookie запрашиваем согласие при первом визите.' : 'Turundusküpsiste kasutamiseks küsime sinu nõusolekut esimesel külastusel.'}</p>
          </>}

          {section === 'impressum' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{ru ? 'Реквизиты' : 'Impressum'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '10px 18px', fontSize: 14, color: 'var(--ink)' }}>
              <span className="vp-eyebrow">{ru ? 'Компания' : 'Ettevõte'}</span><span>{site.legal}</span>
              <span className="vp-eyebrow">{ru ? 'Рег.№' : 'Reg.nr'}</span><span>{site.regNr}</span>
              <span className="vp-eyebrow">{ru ? 'ИНН' : 'KMKR'}</span><span>{site.kmkr}</span>
              <span className="vp-eyebrow">{ru ? 'Адрес' : 'Aadress'}</span><span>{site.addressFull}</span>
              <span className="vp-eyebrow">{ru ? 'E-mail' : 'E-post'}</span><span><a href={site.emailUrl} style={{ color: 'inherit' }}>{site.email}</a></span>
              <span className="vp-eyebrow">{ru ? 'Телефон' : 'Telefon'}</span><span><a href={site.phoneUrl} style={{ color: 'inherit' }}>{site.phone}</a></span>
            </div>
          </>}
        </article>
      </section>
    </div>
  );
}
