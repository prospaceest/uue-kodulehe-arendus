// ============================================================
// SITE CONFIG — single source of truth
// ============================================================
// Mis tahes ettevõtte-andmete muutus (e-mail, telefon, aadress,
// registrikood) tehakse AINULT siin. Kõik komponendid loevad
// väärtused window.__site kaudu.
//
// Brändi-arhitektuur:
//   PROSPACE OÜ on emaettevõte. Tema all on mitu domeeni:
//   - varjuprofiilid.ee   (alumiinium varjuprofiilid)
//   - peitlenguksed.ee    (peitleng-uksed)
//   - prospace.ee         (umbrella brand site, tulekul)
// ============================================================

window.__site = {
  // Brändid
  brand: 'PROSPACE',                         // umbrella bränd (logo, copyright)
  storefront: 'Varjuprofiilid.ee',           // selle veebi nimi (title, hero)
  legal: 'PROSPACE OÜ',                      // juriidiline ettevõte

  // Kontakt
  email: 'info@prospace.ee',
  emailUrl: 'mailto:info@prospace.ee',
  phone: '+372 56 989 780',
  phoneUrl: 'tel:+37256989780',
  hours: 'E–R 10:00–17:00',
  hoursLong: 'E–R 10:00–17:00 · L–P kokkuleppel',

  // Aadress
  addressLine1: 'Vana-Kalamaja 8–110',
  addressLine2: '10412 Tallinn',
  addressFull: 'Vana-Kalamaja 8–110, 10412 Tallinn',
  city: 'Tallinn',
  country: 'Estonia',

  // Sotsiaalmeedia
  instagram: 'https://www.instagram.com/varjuprofiilid.ee/',
  facebook: 'https://www.facebook.com/profile.php?id=61586852627963',

  // Juriidiline
  regNr: '16821459',
  kmkr: 'EE102661499',

  // Maps
  mapsQuery: 'Vana-Kalamaja+8,+Tallinn,+Estonia',
  osmEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=24.7395%2C59.4418%2C24.7495%2C59.4458&layer=mapnik&marker=59.4438%2C24.7445',

  // Sister-sites (umbrella struktuur)
  sisters: [
    { name: 'PROSPACE',         url: 'https://prospace.ee',        role: 'Umbrella bränd · tulekul' },
    { name: 'Peitlengduksed.ee',url: 'https://peitlenguksed.ee',   role: 'Peitleng-uksed' },
  ],

  // Ärilised
  freeShippingThreshold: 200, // €
  shippingPrice: 25,          // €
  returnDays: 14,
  warrantyYears: 5,
  vatPercent: 24,
};
