# Varjuprofiilid.ee — Käivitusjuhend

*Koostatud: mai 2026 · Uuenda allkirjaga kui midagi muutub*

---

## Mis on valmis — pole vaja midagi teha

Kõik järgmine on **juba tehtud**:

- Veebilehe kood (kõik lehed, tooted, blogi, inspiratsioon)
- 98 toote lehed eesti ja vene keeles
- Kõik tekstid, pildid, lingid
- Otsingumootori seadistus (SEO)

---

## Mis on vaja SINU poolt teha

### 1. E-posti seadistus (vormide jaoks)

**Mida see annab:** Kui keegi täidab kontaktivormi, B2B vormi või esitab tellimuse, saad sa e-kirja.

**Kuidas teha:**

1. Mine aadressile **resend.com** → loo konto
2. Lisa domeenile varjuprofiilid.ee DNS-kirjed (Resend näitab täpselt milliseid)
3. Loo API võti: Resend → "API Keys" → "Create API Key"
4. Kopeeri võti, mis algab `re_` tähemärkidega
5. Ava fail: `next-app/.env.local`
6. Asenda `RESEND_API_KEY=` järele oma võti:
  ```
   RESEND_API_KEY=re_sinu_võti_siia
  ```

---

### 2. B2B konto sisselogimine (Clerk)

**Mida see annab:** Partnerid saavad oma kontole sisse logida aadressil varjuprofiilid.ee/konto

**Kuidas teha:**

1. Mine aadressile **dashboard.clerk.com** → loo konto
2. Loo uus rakendus: "Create Application" → nimi "Varjuprofiilid"
3. Lisa lubatud domeenid: `varjuprofiilid.ee` ja `localhost:3000`
4. Mine "API Keys" leheküljele
5. Kopeeri kaks võtit ja lisa `.env.local` faili:
  ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
  ```

---

### 3. Yandex (vene turg)

**Mida see annab:** Vene otsingumootor Yandex näitab su lehte vene kasutajatele.

**Kuidas teha (Webmaster):**

1. Mine **webmaster.yandex.com** → loo konto
2. Lisa sait: `varjuprofiilid.ee`
3. Vali kinnitamisviis → "Meta tag"
4. Kopeeri kood (number) ja lisa `.env.local`:
  ```
   NEXT_PUBLIC_YANDEX_VERIFICATION=123456789
  ```
5. Esita sitemap: `https://varjuprofiilid.ee/sitemap.xml`

**Kuidas teha (Metrica — külastajate statistika):**

1. Mine **metrika.yandex.com** → loo loendur
2. Sait: `varjuprofiilid.ee`
3. Kopeeri loenduri number (nt 98765432)
4. Lisa `.env.local`:
  ```
   NEXT_PUBLIC_YM_COUNTER=98765432
  ```

---

### 4. KA1, KA2, AST25, LPA126 hinnad

**Mida see annab:** Need 4 toodet on praegu vale hinnaga (1,24 €).

**Kuidas teha:**

1. Ava fail: `next-app/content/catalog.json`
2. Otsi SKU-d: KA1, KA2, AST25, LPA126
3. Muuda `"price"` välja väärtust õige hinnaga
4. Muuda ka `"colors"` sees olevad `"price"` väärtused

**Minule ütle palun:**

- Mis on KA1 hind (€/jm)?
- Mis on KA2 hind (€/jm)?
- Mis on AST25 hind (€/jm)?
- Mis on LPA126 hind (€/jm)?

---

### 5. Veebilehe avamine (deploy)

**c**

**viimistlussiinid.ee ümbersuunamine:**

- Kuna `vercel.json` fail on juba olemas, suunatakse vana domeen automaatselt uuele kui mõlemad on Verceli projekti lisatud

---

### 6. Google Search Console

**Mida see annab:** Näed millised lehed on Google'is indekseeritud.

**Kuidas teha:**

1. Mine **search.google.com/search-console** → "Add Property"
2. Lisa `varjuprofiilid.ee`
3. Kinnita domeeni omandiõigus (DNS TXT kirje)
4. Esita sitemap: `https://varjuprofiilid.ee/sitemap.xml`

---

## Dev server (arenduse ajal)

Veebilehe käivitamiseks oma arvutis:

```
cd "/Users/maverick/Documents/Viimistlussiinid/Veeb/Uue kodulehe arendus/next-app"
npm run dev
```

Seejärel ava brauseris: **[http://localhost:3000](http://localhost:3000)**

---

## SEO — mis on tehtud, mis puudub

### ✅ Tehtud

- Kõik lehed, URL-id, pealkirjad, kirjeldused
- 301 suunamised vanalt saidilt uuele
- `sitemap.xml` kõigi lehtedega
- Hub-lehed (`/led-varjuprofiilid/`, `/varjuprofiilid/`)
- `mis-on-varjuprofiil` suur infoleht
- Eesti ja vene keel

### ⚠️ Puuduvad pildid (15 toodet)

Need tooted on ilma pildita — palun lisa pildid kausta `next-app/public/assets/products/`:

- DKP1010, DKP1515, DKP2020 — nurga profiilid
- ASL302, ASL312, ASL300, ASL25, ASL40, ASK100 — liistukinnitid
- P1, F40, F60, F80, F100 — tarvikud
- MPA317 — põrandaliist

Faili formaat: `{SKU}_1.jpg` (nt `DKP1010_1.jpg`)

---

## Kiire kontrollnimekiri enne avalikustamist

- Resend API võti lisatud ja domeen kinnitatud
- Clerk võtmed lisatud
- KA1/KA2/AST25/LPA126 hinnad uuendatud
- Google Search Console sait lisatud
- Yandex Webmaster sait lisatud (valikuline)
- Vercel deploy tehtud
- Domeen varjuprofiilid.ee suunab Vercelile
- viimistlussiinid.ee lisatud samasse Verceli projekti

---

*Küsimuste korral küsi Claude Code'ilt — kõik kontekst on salvestatud.*