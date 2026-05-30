import { useTranslations } from 'next-intl';

const SEP = <span className="vp-marquee-sep" aria-hidden>◆</span>;

export default function Marquee() {
  const t = useTranslations('marquee');

  const items = [
    'ALUMIINIUM VARJUPROFIILID',
    t('delivery'),
    t('return'),
    t('ral'),
    'TEHNILINE TUGI ARHITEKTIDELE',
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
