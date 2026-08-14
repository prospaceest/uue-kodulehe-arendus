# ROLLBACK — kuidas kiiresti töötav leht tagasi saada

Kolm teed, kiireimast aeglasemani. Kui midagi on livis katki, **kasuta teed 1** —
see ei nõua koodi ega buildi ja mõjub sekunditega.

## Tee 1 — Verceli Instant Rollback (sekundid, kõige kiirem)

1. [vercel.com](https://vercel.com) → projekt **varjuprofiilid** → **Deployments**
2. Leia viimane roheline deploy, mis oli enne katkiminekut
3. Kolm punkti (⋯) → **Promote to Production** (või **Instant Rollback**)

Sait on kohe tagasi vanal koodil. Git jääb puutumata — st kood on endiselt uus,
aga live'is jookseb vana build. Paranda kood rahulikult ja pushi siis uuesti.

## Tee 2 — git tag'ile tagasi (minutid)

Turvasilt töötava eestikeelse lehe peal, tehtud enne Soome turu tööd:

```
stabiilne-ee-2026-08-14   ->  8280e5b
```

Vaata, mis seisus see oli:

```bash
git show stabiilne-ee-2026-08-14 --stat
```

**Variant A — tühista halvad commitid uue commitiga** (ohutu, ajalugu jääb alles):

```bash
cd "Uue kodulehe arendus"
git revert --no-commit stabiilne-ee-2026-08-14..HEAD
git commit -m "Revert: taasta stabiilne-ee-2026-08-14 seis"
git push
```

**Variant B — sunni main tagasi** (kasuta ainult siis, kui vahepealsed commitid
on kindlalt prügi):

```bash
git reset --hard stabiilne-ee-2026-08-14
git push --force-with-lease
```

Mõlemal juhul Vercel deployb automaatselt ~60 s jooksul.

## Tee 3 — üksik fail tagasi

Kui katki on üks fail ja tahad ainult selle vana versiooni:

```bash
git checkout stabiilne-ee-2026-08-14 -- next-app/components/product/ProductClient.tsx
git commit -am "Taasta ProductClient stabiilsest seisust"
git push
```

## Kontroll: kas eestikeelne leht on ikka terve?

Enne Soome tööd salvestati Eesti lehe seis (kõik ~238 URL-i: title, canonical,
hreflang, tekstisisu räsi). Võrdle igal ajal:

```bash
cd next-app
npx tsx scripts/market-snapshot.ts snapshot --base https://varjuprofiilid.ee --out .snapshots/nyyd.json
npx tsx scripts/market-snapshot.ts diff .snapshots/ee-baas.json .snapshots/nyyd.json
```

Tühi väljund = eestikeelne leht on täpselt endine. Iga rida väljundis on üks
leht, mis muutus — ja ütleb, mis väli täpselt muutus.

`.snapshots/ee-baas.json` on baasseis (Soome töö eelne). Seda faili ära kustuta.

## Turvasildid

| Silt | Commit | Mis seis |
|---|---|---|
| `stabiilne-ee-2026-08-14` | `8280e5b` | Töötav ET+RU leht enne prospace.fi tööd |

Uue turvasildi tegemine enne suurt tööd:

```bash
git tag -a stabiilne-ee-YYYY-MM-DD -m "Miks see seis hea on" HEAD
git push origin stabiilne-ee-YYYY-MM-DD
```
