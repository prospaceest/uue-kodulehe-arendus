'use client';

import { useState } from 'react';
import { useTx } from '@/lib/useTx';
import { useLocale } from 'next-intl';
import { site } from '@/lib/site';
import { marketForLocale } from '@/lib/markets';

type Section = 'terms' | 'privacy' | 'cookies' | 'impressum';

export default function LegalPage() {
  const locale = useLocale();
  const market = marketForLocale(locale);
  const ru = locale === 'ru';
  const tx = useTx();
  const [section, setSection] = useState<Section>('terms');

  const tabs: [Section, string][] = [
    ['terms',     tx('Условия продажи', 'Müügitingimused')],
    ['privacy',   tx('Политика конфиденциальности', 'Privaatsuspoliitika')],
    ['cookies',   tx('Файлы cookie', 'Küpsised')],
    ['impressum', tx('Реквизиты', 'Impressum')],
  ];

  return (
    <div>
      <section style={{ padding: '56px 56px 24px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {tx('Юридическая информация · Обновлено 01.05.2026', 'Juriidiline info · Värskendatud 01.05.2026')}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0 }}>
          {tx('Условия.', 'Tingimused.')}
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
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tx('Условия продажи', 'Müügitingimused')}</h2>
            <p>{tx('Настоящие условия применяются к заказам в интернет-магазине {shop}. Продавец — {legal} (рег.№ {reg}, ИНН {vat}), адрес {addr}.', 'Käesolevad tingimused kehtivad veebipoes {shop} tehtavate tellimuste suhtes. Müüjaks on {legal} (reg.nr {reg}, KMKR {vat}), aadress {addr}.')
              .replace('{shop}', market.storefront.toLowerCase())
              .replace('{legal}', site.legal)
              .replace('{reg}', site.regNr)
              .replace('{vat}', site.kmkr)
              .replace('{addr}', site.addressFull)}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('1. Размещение заказа', '1. Tellimuse esitamine')}</h3>
            <p>{tx('Заказ считается оформленным после подтверждения по электронной почте. Продавец оставляет за собой право отказать в заказе в течение 24 ч, если товара нет на складе.', 'Tellimus loetakse esitatuks pärast kinnitust meili teel. Müüja jätab endale õiguse tellimusest keelduda 24 h jooksul, kui kaup pole laos.')}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('2. Цены и оплата', '2. Hinnad ja maksmine')}</h3>
            <p>{tx('Все цены включают НДС 24%. Оплата SEPA-переводом по счёту. Товар остаётся собственностью продавца до полной оплаты.', 'Kõik hinnad sisaldavad käibemaksu 24%. Tasumine SEPA ülekandega arve alusel. Kaup jääb müüja omandisse kuni täieliku tasumiseni.')}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('3. Доставка', '3. Tarne')}</h3>
            <p>{tx('Доставка Venipak 2–4 рабочих дня (со склада). RAL под заказ — 4–5 недель. Доставка 25 € + НДС, при заказе свыше 200 € — бесплатно.', 'Tarne Venipakiga 2–4 tööpäeva (laokaup). RAL eritoonid 4–5 nädalat. Tarnekulu 25 € + KM, üle 200 € tellimuste puhul tasuta.')}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('4. Возврат', '4. Tagastamine')}</h3>
            <p>{tx('Право возврата в течение 14 дней на основании VÕS § 56. Не распространяется на товары, изготовленные под заказ.', '14-päevane tagastusõigus VÕS § 56 alusel. Ei kehti eritellimusel valmistatud toodetele.')}</p>
          </>}

          {section === 'privacy' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tx('Политика конфиденциальности', 'Privaatsuspoliitika')}</h2>
            <p>{tx('{legal} собирает и обрабатывает персональные данные в соответствии с GDPR. Контролёр данных — {legal}.', '{legal} kogub ja töötleb isikuandmeid kooskõlas isikuandmete kaitse üldmäärusega (GDPR). Andmete vastutav töötleja: {legal}.').replaceAll('{legal}', site.legal)}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('Что собираем', 'Mida kogume')}</h3>
            <p>{tx('Имя, e-mail, телефон, адрес — необходимы для выполнения заказа. Платёжные данные не храним — перевод проходит напрямую между банками.', 'Nimi, e-post, telefon, aadress — vajalik tellimuse täitmiseks. Maksete andmeid me ei talleta — ülekanne toimub otse pankade vahel.')}</p>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tx('Хранение', 'Säilitamine')}</h3>
            <p>{tx('Данные заказов храним 7 лет (требование бухгалтерии). Данные рассылки — до отписки.', 'Tellimuste andmeid säilitame 7 aastat (raamatupidamise nõue). Newsletter-andmed kuni tellimuse lõpetamiseni.')}</p>
          </>}

          {section === 'cookies' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tx('Файлы cookie', 'Küpsised')}</h2>
            <p>{tx('Используем cookie для работы сайта (сессионные cookie) и анонимной статистики использования.', 'Kasutame küpsiseid, et veebileht toimiks (sessiooniküpsised) ja et mõista, kuidas inimesed lehte kasutavad (anonüümne statistika).')}</p>
            <p>{tx('Для маркетинговых cookie запрашиваем согласие при первом визите.', 'Turundusküpsiste kasutamiseks küsime sinu nõusolekut esimesel külastusel.')}</p>
          </>}

          {section === 'impressum' && <>
            <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tx('Реквизиты', 'Impressum')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '10px 18px', fontSize: 14, color: 'var(--ink)' }}>
              <span className="vp-eyebrow">{tx('Компания', 'Ettevõte')}</span><span>{site.legal}</span>
              <span className="vp-eyebrow">{tx('Рег.№', 'Reg.nr')}</span><span>{site.regNr}</span>
              <span className="vp-eyebrow">{tx('ИНН', 'KMKR')}</span><span>{site.kmkr}</span>
              <span className="vp-eyebrow">{tx('Адрес', 'Aadress')}</span><span>{site.addressFull}</span>
              <span className="vp-eyebrow">{tx('E-mail', 'E-post')}</span><span><a href={`mailto:${market.email}`} style={{ color: 'inherit' }}>{market.email}</a></span>
              <span className="vp-eyebrow">{tx('Телефон', 'Telefon')}</span><span><a href={site.phoneUrl} style={{ color: 'inherit' }}>{site.phone}</a></span>
            </div>
          </>}
        </article>
      </section>
    </div>
  );
}
