'use client';

// Kliendikomponentide tõlkekiht — sama loogika mis lib/tx.ts, aga sõnastik
// tuleb next-intl'i sõnumitest, mitte otseimpordist.
//
// Miks nii: kliendikomponendi module-level import satub brauseripaketti ja
// eestikeelne külastaja laeks alla soome + rootsi sõnastiku (~30 kB gzip).
// next-intl'i sõnumid on keelepõhised — eesti lehele saadetakse ainult
// messages/et.json, kus "auto" plokki ei ole. Eesti lehe pakett ei kasva.

import { useLocale, useMessages } from 'next-intl';
import { txKey } from './txKey';

export type Tx = (ru: string, et: string) => string;

export function useTx(): Tx {
  const locale = useLocale();
  const messages = useMessages() as { auto?: Record<string, string> };

  return (ru: string, et: string) => {
    if (locale === 'ru') return ru;
    if (locale === 'et') return et;
    return messages?.auto?.[txKey(et)] ?? et;
  };
}

export function useTxList(): (ru: string[], et: string[]) => string[] {
  const locale = useLocale();
  const messages = useMessages() as { auto?: Record<string, string> };

  return (ru, et) => {
    if (locale === 'ru') return ru;
    if (locale === 'et') return et;
    return et.map((s) => messages?.auto?.[txKey(s)] ?? s);
  };
}

/** Paarimassiiv (nt KKK: [küsimus, vastus][]) — iga element eraldi sõnastikust. */
export function useTxPairs(): (ru: string[][], et: string[][]) => string[][] {
  const locale = useLocale();
  const messages = useMessages() as { auto?: Record<string, string> };

  return (ru, et) => {
    if (locale === 'ru') return ru;
    if (locale === 'et') return et;
    return et.map((row) => row.map((s) => messages?.auto?.[txKey(s)] ?? s));
  };
}
