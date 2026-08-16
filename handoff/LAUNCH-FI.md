# Soome lehe käivitamine — samm-sammult

varjoprofiilit.fi (soome + rootsi keel). Kood on valmis ja livis, aga Soome
pool on otsimootoritele kinni (`robots.txt` → `Disallow: /`), kuni need sammud
on tehtud.

Järjekord on oluline. Iga sammu lõpus on **kontroll** — kui see ei klapi, ära
mine edasi, vaid ütle mulle.

---

## SAMM 1 — Lisa domeen Vercelisse

1. Ava [vercel.com](https://vercel.com) ja logi sisse.
2. Klikka projektil **varjuprofiilid** (see, mis praegu varjuprofiilid.ee-d teenindab).
   **NB:** ära tee uut projekti. Domeen peab tulema olemasoleva alla, muidu ei tunne kood teda ära.
3. Ülemisest ribast **Settings**.
4. Vasakust menüüst **Domains**.
5. Sisestuskasti kirjuta `varjoprofiilit.fi` ja vajuta **Add**.
6. Kui Vercel küsib, kas lisada ka www või teha redirect — vali variant, kus
   **`www.varjoprofiilit.fi` suunab `varjoprofiilit.fi` peale** (mitte vastupidi).
   Kui ta seda ei küsi, lisa `www.varjoprofiilit.fi` eraldi (sama Add-kast) ja
   sea talle hiljem redirect apexile.
7. Nüüd näitab Vercel mõlema domeeni juures punast/kollast teadet **"Invalid
   Configuration"** ja selle all **täpsed DNS-väärtused**:
   - apex `varjoprofiilit.fi` jaoks → **A** kirje ja IP-aadress
   - `www` jaoks → **CNAME** kirje ja mingi `...vercel-dns.com` väärtus

   **Kirjuta need kaks väärtust üles.** Ära kasuta mälu järgi vanu IP-sid —
   Vercel on neid vahetanud.

**Kontroll:** Domains-lehel on kirjas `varjoprofiilit.fi` ja
`www.varjoprofiilit.fi`, mõlemad "Invalid Configuration" teatega. See on
praegu õige — DNS-i pole veel muudetud.

---

## SAMM 2 — Muuda DNS Elkdatas

1. Logi sisse Elkdata / Veebimajutus kliendialale.
2. Leia domeen **varjoprofiilit.fi** ja ava selle **DNS-haldus** (võib olla
   nimega "DNS kirjed", "DNS zone" või "Halda DNS-i").
3. **Leia olemasolev A-kirje**, mille nimi on `@` või tühi või
   `varjoprofiilit.fi` ja väärtus `85.194.202.143`.
   **Muuda selle väärtus** Verceli näidatud IP-ks. (Ära kustuta ja tee uut —
   lihtsalt muuda väärtust, nii jääb TTL paika.)
4. **Leia või lisa CNAME-kirje** nimega `www` ja pane väärtuseks Verceli
   näidatud `...vercel-dns.com` aadress.
   Kui `www` jaoks on praegu A-kirje, kustuta see ja tee CNAME asemele.
5. **MX-kirjeid ÄRA PUUTU.** Need on `mh4.elkdata.ee` ja `mh6.elkdata.ee`.
   Kui neid muudad, lakkab e-post töötamast.
6. Salvesta.

**Kontroll (10–60 min pärast):** mine Vercelis tagasi Settings → Domains.
Mõlema domeeni juures peab olema roheline linnuke ja tekst **"Valid
Configuration"**. TLS-sertifikaat tuleb automaatselt paari minutiga.

Kui tund aega hiljem on ikka punane, saada mulle ekraanipilt Verceli
Domains-lehest — vaatan, mis kirje valesti on.

---

## SAMM 3 — Ütle mulle, et DNS on tehtud

Kirjuta lihtsalt "DNS tehtud". Ma kontrollin siis:
- kas `varjoprofiilit.fi` avaneb ja näitab soomekeelset lehte
- kas aadressiribale jääb `varjoprofiilit.fi` (mitte ei hüppa .ee peale)
- kas canonical on õige
- kas `robots.txt` on endiselt kinni (peab olema — sisu pole veel üle vaadatud)
- kas varjuprofiilid.ee on puutumata

**Selles etapis on leht avalik, aga Google't sinna ei lasta.** See on
teadlik: nii saad ise vaadata ja soomlane saab kommenteerida, ilma et
pooleldi valmis leht indeksisse jõuaks.

---

## SAMM 4 — Resend (Soome tellimuskirjad)

Ilma selleta ei lähe Soome tellimuse teavitused välja.

1. Ava [resend.com](https://resend.com) → **Domains** → **Add Domain**.
2. Kirjuta `varjoprofiilit.fi`, vali piirkond (Euroopa) ja lisa.
3. Resend näitab nüüd nimekirja DNS-kirjetest — tavaliselt:
   - üks **TXT** kirje nimega `resend._domainkey` (DKIM)
   - üks **TXT** kirje SPF-iga (`v=spf1 include:...`)
   - üks **MX** kirje **alamdomeenil** (nt `send.varjoprofiilit.fi`)
4. Lisa kõik need Elkdata DNS-i, täpselt nagu Resend näitab.

   **See MX-kirje on ohutu** — ta on alamdomeenil `send.`, mitte juurdomeenil.
   Juurdomeeni MX (`mh4.elkdata.ee`) jääb puutumata ja e-post töötab edasi.
5. Tagasi Resendis vajuta **Verify**. Võib võtta 15–30 min.

**Kontroll:** Resendi Domains-lehel on `varjoprofiilit.fi` staatusega
**Verified**.

---

## SAMM 5 — Lase soomlasel tekst üle vaadata

See on ainus samm, mida masin ära ei tee. Tekst on korrektne ja
terminoloogia paigas, aga emakeelne kõrv kuuleb asju, mida masin ei kuule.

Ütle mulle ja ma teen **ekspordi tabelisse**: iga rida = eestikeelne tekst
kõrval soomekeelne, kolmas veerg parandusteks. Ülevaataja ei pea koodi ega
faile nägema — täidab tabeli ja saadab tagasi, mina laen parandused süsteemi.

Kui kiirustad, saab teha etapiviisi. Tähtsuse järjekord:
1. avaleht, pood, tootelehed (need müüvad)
2. jälleenmyyjille (edasimüüjate leidmine on su eesmärk)
3. toimitus, takuu, ukk, yhteystiedot (ostja kontrollib enne tellimist)
4. ülejäänu

---

## SAMM 6 — Maksuasi raamatupidajaga

Enne esimest Soome müüki peab olema selge:
- kas PROSPACE OÜ on **OSS-is registreeritud** (või ületab 10 000 € piiri)
- kes deklareerib Soome käibemaksu

Leht kuvab juba Soome 25,5% ja kassas on väli ALV-numbrile (EL-i sisene B2B
= 0%, pöördmaksustamine). See on äripoolne otsus, mitte tehniline.

---

## SAMM 7 — Mina lülitan indeksi sisse

Kui sammud 1–6 on tehtud, ütle. Ma teen siis:

1. `indexable: true` failis `next-app/lib/markets.ts`
2. `robots.txt` avaneb Soome domeenil ja hakkab näitama Soome sitemappe
3. Eesti ja Soome lehed saavad omavahel `hreflang` sildid
4. Jooksutan mõlemad kontrollid päris domeenide vastu:
   - Soome pool: tõlkimata teksti ei tohi olla
   - Eesti pool: ainus lubatud muutus on juurde tulnud hreflang-sildid

---

## SAMM 8 — Google Search Console

Alles pärast sammu 7 (enne pole mõtet — indeks on kinni).

1. Ava [search.google.com/search-console](https://search.google.com/search-console).
2. Vasakul ülal domeeni valija → **Add property**.
3. Vali vasakpoolne variant **Domain** (mitte "URL prefix").
4. Kirjuta `varjoprofiilit.fi` → **Continue**.
5. Google annab **TXT-kirje**. Lisa see Elkdata DNS-i (nimi `@`, tüüp TXT).
6. Oota paar minutit ja vajuta Google's **Verify**.
7. Kui kinnitatud: vasakust menüüst **Sitemaps** → lisa ükshaaval:
   - `sitemap-fi.xml`
   - `sitemap-sv.xml`
8. Sama võid teha [Bing Webmaster Toolsis](https://www.bing.com/webmasters) —
   Soomes on Bingil paar protsenti turust ja seadistus on sama.

Geosihtimist **ei pea** seadma. `.fi` domeen ütleb Google'ile ise, et sihtriik
on Soome.

**Kontroll:** GSC-s ei ole vigu ja paari päeva pärast hakkab "Pages"
raportis indekseeritud lehtede arv kasvama.

---

## Mis pärast

- Esimesed 2–4 nädalat: Google avastab lehed. Ära muretse, kui algul on
  indekseeritud vähe.
- 4–8 nädala pärast näitab GSC **päris otsingusõnu**. Siis on esimest korda
  andmeid, kas soomlane otsib `varjoprofiili` või `varjolista` — ja siis saab
  pealkirju ja tekste päris nõudluse järgi timmida.
- Kui midagi läheb katki: `handoff/ROLLBACK.md`, kiireim tee on Verceli
  Instant Rollback.

---

## Kiirviide: mida kus muuta

| Mida | Kus |
|---|---|
| Domeeni lisamine | Vercel → projekt varjuprofiilid → Settings → Domains |
| A / CNAME / TXT kirjed | Elkdata kliendiala → varjoprofiilit.fi → DNS |
| Tellimuskirjade saatja | Resend → Domains |
| Soome tekstid | `next-app/messages/fi.json` (plokk `auto`) |
| Soome tootekirjeldused | `next-app/content/catalog.json` (`descriptionFi`) |
| Soome pealkirjad ja meta | `next-app/lib/pageMeta.ts` |
| Käibemaks, tarne, e-post | `next-app/lib/markets.ts` |
| Indeksi lüliti | `next-app/lib/markets.ts` → `indexable` |
