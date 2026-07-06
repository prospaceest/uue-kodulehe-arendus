// Single source of truth for company info.
// All UI components read from here — never hardcode.

export const site = {
  brand: 'PROSPACE',
  storefront: 'Varjuprofiilid.ee',
  legal: 'PROSPACE OÜ',
  url: 'https://varjuprofiilid.ee',

  email: 'info@prospace.ee',
  emailUrl: 'mailto:info@prospace.ee',
  phone: '+372 56 989 780',
  phoneUrl: 'tel:+37256989780',
  hours: 'E–R 10:00–17:00',
  hoursLong: 'E–R 10:00–17:00 · L–P kokkuleppel',

  addressLine1: 'Vana-Kalamaja 8–110',
  addressLine2: '10412 Tallinn',
  addressFull: 'Vana-Kalamaja 8–110, 10412 Tallinn',
  city: 'Tallinn',
  country: 'Estonia',

  instagram: 'https://www.instagram.com/varjuprofiilid.ee/',
  facebook: 'https://www.facebook.com/profile.php?id=61586852627963',

  regNr: '16821459',
  kmkr: 'EE102661499',

  mapsQuery: 'Vana-Kalamaja+8,+Tallinn,+Estonia',
  // Vana-Kalamaja 8 hoone tsentroid (Nominatim): 59.4422, 24.7387
  osmEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=24.7337%2C59.4402%2C24.7437%2C59.4442&layer=mapnik&marker=59.4422%2C24.7387',

  sisters: [
    { name: 'PROSPACE', url: 'https://prospace.ee', role: 'Umbrella bränd · tulekul' },
    { name: 'Peitlenguksed.ee', url: 'https://peitlenguksed.ee', role: 'Peitleng-uksed' },
  ],

  freeShippingThreshold: 200,
  shippingPrice: 25,
  returnDays: 14,
  warrantyYears: 5,
  vatPercent: 24,
} as const;
