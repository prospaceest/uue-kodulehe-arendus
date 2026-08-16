'use client';

import { useTranslations } from 'next-intl';
import { useTx } from '@/lib/useTx';

const SEP = <span className="vp-marquee-sep" aria-hidden>◆</span>;

export default function Marquee() {
  const t = useTranslations('marquee');
  // Need kaks rida ei olnud kunagi tõlgitud — tx jätab eesti ja vene
  // väljundi muutumatuks ja annab soome/rootsi versiooni.
  const tx = useTx();

  const items = [
    tx('ALUMIINIUM VARJUPROFIILID', 'ALUMIINIUM VARJUPROFIILID'),
    t('delivery'),
    t('return'),
    t('ral'),
    tx('TEHNILINE TUGI ARHITEKTIDELE', 'TEHNILINE TUGI ARHITEKTIDELE'),
  ];

  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <div className="vp-marquee" aria-hidden>
      <span className="vp-marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            {item}
            {SEP}
          </span>
        ))}
      </span>
    </div>
  );
}
