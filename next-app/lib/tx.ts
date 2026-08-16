// Lehesiseste tekstide tõlkekiht (serveripool).
//
// Kood oli kirjutatud kahe keele peale: `ru ? 'русский' : 'eesti'` — 879 kohta
// 53 failis. Neljanda keele lisamine ternariga ei ole võimalik, aga kõiki neid
// kohti ümber kirjutada nimega võtmetele oleks nädalate töö ja iga käsitsi
// muudatus on risk livis olevale eestikeelsele lehele.
//
// Lahendus: sama tekst jääb koodi, ainult ternar asendub funktsioonikutsega.
//   ru ? 'русский' : 'eesti'   ->   tx(locale, 'русский', 'eesti')
//
// Eesti ja vene keele puhul tagastab tx täpselt sama stringi, mis enne — seega
// livis oleva lehe väljund ei muutu ühegi baiti võrra. Soome ja rootsi keele
// puhul otsitakse tõlge sõnastikust, mille võtmeks on eestikeelse teksti räsi.
//
// Sõnastik elab messages/{fi,sv}.json failis "auto" all — samas failis, kus
// ülejäänud UI-tekstid, nii et emakeelne ülevaataja leiab kõik ühest kohast.
//
// NB: see moodul impordib sõnastiku otse ja on mõeldud SERVERIKOMPONENTIDELE —
// sõnastik ei jõua brauserisse. Kliendikomponendid kasutavad useTx() hooki,
// mis loeb sama sõnastiku next-intl'i sõnumitest (need on keelepõhised, seega
// eestikeelne külastaja ei lae soome tekste).

import fiMessages from '@/messages/fi.json';
import svMessages from '@/messages/sv.json';
import { txKey } from './txKey';

const DICTS: Record<string, Record<string, string>> = {
  fi: (fiMessages as { auto?: Record<string, string> }).auto ?? {},
  sv: (svMessages as { auto?: Record<string, string> }).auto ?? {},
};

/**
 * @param locale praegune keel
 * @param ru venekeelne tekst (endise ternari tõene haru)
 * @param et eestikeelne tekst (endise ternari väär haru) — ühtlasi tõlke võti
 */
export function tx(locale: string, ru: string, et: string): string {
  if (locale === 'ru') return ru;
  if (locale === 'et') return et;
  return DICTS[locale]?.[txKey(et)] ?? et;
}

/** Sama massiividele: `ru ? [...] : [...]`. Iga element eraldi läbi sõnastiku. */
export function txList(locale: string, ru: string[], et: string[]): string[] {
  if (locale === 'ru') return ru;
  if (locale === 'et') return et;
  return et.map((s) => DICTS[locale]?.[txKey(s)] ?? s);
}

/** Kas antud keeles on tekst tõlgitud? Kasutab launch-kontroll. */
export function txHas(locale: string, et: string): boolean {
  if (locale === 'et' || locale === 'ru') return true;
  return Boolean(DICTS[locale]?.[txKey(et)]);
}
