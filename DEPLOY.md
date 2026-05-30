# 🚀 Live'i lükkamine — samm-sammult

*Meetod: Vercel + GitHub (automaatne deploy iga git push'iga)*
*Koostatud: 30. mai 2026*

---

## ⚡ Lühikokkuvõte

1. Lükka puhastatud kood GitHubi (1. samm)
2. Vercelis: impordi GitHubi repo → **Root Directory = `next-app`** (2. samm)
3. Sisesta keskkonnamuutujad Verceli liideses (3. samm) — **päris-võtmed, mitte test!**
4. Lisa domeenid varjuprofiilid.ee + viimistlussiinid.ee (4. samm)
5. Seadista DNS (5. samm)
6. Kontroll-nimekiri (6. samm)

---

## 1. samm — Lükka kood GitHubi

Salajased võtmed ja `node_modules` on git'ist eemaldatud ning `.gitignore` lisatud.
Need muudatused tuleb GitHubi saata, et Vercel saaks puhta koodi.

Käivita terminalis (või palu Claude'il teha):

```bash
cd "/Users/maverick/Documents/Viimistlussiinid/Veeb/Uue kodulehe arendus"
git add -A
git commit -m "Lisa .gitignore, eemalda salajased võtmed ja build-failid"
git push origin main
```

> ✅ Pärast seda kontrolli GitHubis, et kaustas **EI ole** `.env.local` faili ega `node_modules` kausta.

---

## 2. samm — Impordi projekt Vercelisse

1. Mine **[vercel.com/new](https://vercel.com/new)** (oled juba sisse logitud)
2. Vali "Import Git Repository" → leia **`prospaceest/uue-kodulehe-arendus`** → **Import**
3. Konfiguratsioon (VÄGA OLULINE):
   - **Framework Preset:** Next.js (tuvastatakse automaatselt)
   - **Root Directory:** vajuta **Edit** → vali **`next-app`** ⚠️
     *(Kood on alamkaustas — kui jätta tühjaks, deploy ebaõnnestub!)*
   - **Build Command / Output:** jäta vaikeväärtused
4. **Ära veel vajuta Deploy** — sisesta enne keskkonnamuutujad (3. samm).

---

## 3. samm — Keskkonnamuutujad (Environment Variables)

Veel impordi-lehel ava sektsioon **"Environment Variables"** ja lisa järgmised.
Kopeeri **nimi** ja sisesta **väärtus**. Live'is kasuta **päris-võtmeid**, mitte test!

| Nimi | Väärtus | Märkus |
|------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://varjuprofiilid.ee` | ⚠️ Mitte localhost! |
| `RESEND_API_KEY` | `re_...` | Resend → API Keys (päris võti) |
| `RESEND_FROM_DOMAIN` | `kontakt@varjuprofiilid.ee` | Vajab Resendis kinnitatud domeeni* |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` | Clerk **Production** instance |
| `CLERK_SECRET_KEY` | `sk_live_...` | Clerk **Production** instance |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/konto/login` | |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/konto/registreeru` | |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/konto` | |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/konto` | |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/` | |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/` | |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | `a261a1fac2804fc3` | Või sinu uus Yandexi kood |
| `NEXT_PUBLIC_YM_COUNTER` | `109512339` | Või sinu Metrica loendur |

\* Kui Resendi domeen pole veel kinnitatud, võid esialgu jätta `RESEND_FROM_DOMAIN=onboarding@resend.dev` (vormid töötavad, kirjad tulevad Resendi test-aadressilt).

**Test → Live võtmete vahetus:**
- **Clerk:** dashboard.clerk.com → vaheta üleval "Development" → **"Production"** → API Keys annab `pk_live_` / `sk_live_`. Lisa Production instance'i lubatud domeen: `varjuprofiilid.ee`.
- **Resend:** loo päris API võti ja kinnita domeen varjuprofiilid.ee (SPF + DKIM DNS-kirjed).

Kui kõik muutujad on lisatud → vajuta **Deploy**. Esimene build võtab ~2–4 min.

---

## 4. samm — Domeenid

Verceli projektis → **Settings → Domains**:

1. Lisa **`varjuprofiilid.ee`** → see saab põhidomeeniks
2. Lisa **`www.varjuprofiilid.ee`** (suunatakse automaatselt põhidomeenile — reegel on `vercel.json`-is)
3. Lisa **`viimistlussiinid.ee`** ja **`www.viimistlussiinid.ee`**
   → need suunatakse 301-ga varjuprofiilid.ee-le (reeglid juba `vercel.json`-is)

---

## 5. samm — DNS seadistus

Domeeni registripidaja (nt Zone.ee / veebimajutus) juures lisa Verceli näidatud kirjed.
Tüüpiliselt:

**varjuprofiilid.ee:**
- `A` kirje `@` → **76.76.21.21** (Verceli IP — kontrolli Vercelist täpne!)
- `CNAME` kirje `www` → **cname.vercel-dns.com**

**viimistlussiinid.ee** (vana domeen, suunamiseks):
- Sama: `A @ → Verceli IP` ja `CNAME www → cname.vercel-dns.com`

> Vercel näitab iga domeeni juures **täpsed** vajalikud kirjed (Settings → Domains → klõpsa domeeni). Kasuta neid, mitte ülaltoodud näiteid pimesi.
> DNS levik võtab 5 min – 24 h. Vercel väljastab HTTPS-sertifikaadi automaatselt.

---

## 6. samm — Kontroll pärast live'i

- [ ] `https://varjuprofiilid.ee` avaneb, HTTPS roheline lukk
- [ ] `https://viimistlussiinid.ee` suunab → varjuprofiilid.ee (301)
- [ ] `https://www.varjuprofiilid.ee` suunab → varjuprofiilid.ee
- [ ] Vene keel töötab (`/ru/...`)
- [ ] **Kontaktivorm:** saada test → e-kiri tuleb kohale (Resend)
- [ ] **B2B login** (`/konto/login`) töötab (Clerk Production)
- [ ] `https://varjuprofiilid.ee/sitemap.xml` avaneb
- [ ] `https://varjuprofiilid.ee/robots.txt` avaneb
- [ ] Google Search Console: lisa domeen + esita sitemap *(vt JUHEND.md 6. punkt)*
- [ ] Yandex Webmaster: esita sitemap *(valikuline)*

---

## ♻️ Hilisemad uuendused

Kuna kasutame GitHubi integratsiooni: **iga `git push origin main`** käivitab Vercelis automaatselt uue deploy. Käsitsi midagi teha pole vaja.

```bash
git add -A && git commit -m "..." && git push
```

---

## ⚠️ Veel lahtised asjad enne lõplikku live'i (vt JUHEND.md)

- **Hinnad:** KA1, KA2, AST25, LPA126 on vale hinnaga (`content/catalog.json`)
- **Puuduvad pildid:** 15 toodet ilma pildita (vt JUHEND.md nimekiri)
- **Päris-võtmed:** Resend + Clerk Production võtmed (3. samm)
