// Tõlkevõti = eestikeelse teksti räsi.
//
// Miks räsi ja mitte tekst ise: võti kordub sõnastikus iga kirje juures ja
// täispikk lause võtmena kahekordistaks faili suuruse. Miks mitte nimega
// võtmed (nagu "faq.title"): 879 nime väljamõtlemine käsitsi on nädala töö ja
// iga nimi on koht, kus eksida.
//
// Räsi on FNV-1a 32-bit, kirjutatud käsitsi, sest see peab andma sama tulemuse
// nii Node'is (tõlkeskript) kui brauseris (useTx) — crypto-moodulit brauseris
// sünkroonselt kasutada ei saa.

export function txKey(et: string): string {
  // Normaliseerime tühikud: koodis on sama lause vahel mitmel real murtud.
  const s = et.replace(/\s+/g, ' ').trim();

  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    // FNV prime 16777619, hoiame 32-bitises vahemikus
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}
