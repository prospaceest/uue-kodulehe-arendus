import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';

// Set RESEND_API_KEY in .env.local to enable email sending.
// Until then, orders are logged to the console.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { form, buyerType, delivery, items, subtotal, total, locale } = body;
    const ru = locale === 'ru';

    // Frontend sends `shippingCost`; keep `shipping` as a fallback.
    const shipping = Number(body.shippingCost ?? body.shipping ?? 0);
    const sub = Number(subtotal ?? 0);
    const tot = Number(total ?? sub + shipping);

    const isCompany = buyerType === 'ettevote';
    const buyerName = isCompany
      ? `${form.company || '—'}${form.contact ? ` (${form.contact})` : ''}`
      : `${form.firstName || ''} ${form.lastName || ''}`.trim() || '—';

    const itemLines = (items || []).map((i: { sku: string; color: string; ralCode?: string; qty: number; pieceLengthM: number; pricePerM: number }) =>
      `  ${i.sku} · ${i.color}${i.ralCode ? ` RAL ${i.ralCode}` : ''} · ${i.qty} tk × ${i.pieceLengthM} m = ${(i.qty * i.pieceLengthM).toFixed(1)} m · ${(i.pricePerM * i.qty * i.pieceLengthM).toFixed(2)} €`
    ).join('\n');

    const orderNr = body.orderNr || '';

    const subject = ru
      ? `Новый заказ ${orderNr} varjuprofiilid.ee — ${buyerName}`
      : `Uus tellimus ${orderNr} varjuprofiilid.ee — ${buyerName}`;

    const companyBlock = isCompany
      ? `${ru ? 'Рег.№' : 'Reg.nr'}: ${form.regNr || '—'}${form.kmkr ? `\n  ${ru ? 'ИНН/KMKR' : 'KMKR'}: ${form.kmkr}` : ''}\n  `
      : '';

    const deliveryBlock = delivery === 'salong'
      ? `${ru ? 'Самовывоз из салона' : 'Tulen ise salongist'} — Vana-Kalamaja 8–110, Tallinn`
      : `Venipak — ${ru ? 'доставка' : 'tarne'}:\n  ${form.address || '—'}\n  ${form.city || ''} ${form.zip || ''}`;

    const text = `
${ru ? 'НОВЫЙ ЗАКАЗ' : 'UUS TELLIMUS'}${orderNr ? ` ${orderNr}` : ''} — varjuprofiilid.ee
${'─'.repeat(50)}

${ru ? 'Покупатель' : 'Ostja'} (${isCompany ? (ru ? 'компания' : 'ettevõte') : (ru ? 'частное лицо' : 'eraisik')}):
  ${buyerName}
  ${companyBlock}${form.email}
  ${form.phone || '—'}

${ru ? 'Доставка' : 'Tarneviis'}:
  ${deliveryBlock}

${ru ? 'Товары' : 'Tooted'}:
${itemLines}

${ru ? 'Промежуточный итог' : 'Vahesumma'}: ${sub.toFixed(2)} €
${ru ? 'Доставка' : 'Tarne'}: ${shipping === 0 ? (ru ? 'Бесплатно' : 'Tasuta') : `${shipping.toFixed(2)} €`}
${ru ? 'Итого' : 'Kokku'}: ${tot.toFixed(2)} €

${form.notes ? `${ru ? 'Комментарий' : 'Märkused'}:\n  ${form.notes}` : ''}
`.trim();

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_DOMAIN ?? 'tellimused@varjuprofiilid.ee',
          to: [site.email],
          reply_to: form.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error('Resend error:', await res.text());
        return NextResponse.json({ error: 'email_failed' }, { status: 500 });
      }
    } else {
      // Dev mode — log to console
      console.log('\n[ORDER]\n' + text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
