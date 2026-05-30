import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';

// Set RESEND_API_KEY in .env.local to enable email sending.
// Until then, orders are logged to the console.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { form, items, subtotal, shipping, total, locale } = body;
    const ru = locale === 'ru';

    const itemLines = items.map((i: { sku: string; color: string; ralCode?: string; qty: number; pieceLengthM: number; pricePerM: number }) =>
      `  ${i.sku} · ${i.color}${i.ralCode ? ` RAL ${i.ralCode}` : ''} · ${i.qty} tk × ${i.pieceLengthM} m = ${(i.qty * i.pieceLengthM).toFixed(1)} m · ${(i.pricePerM * i.qty * i.pieceLengthM).toFixed(2)} €`
    ).join('\n');

    const subject = ru
      ? `Новый заказ varjuprofiilid.ee — ${form.name}`
      : `Uus tellimus varjuprofiilid.ee — ${form.name}`;

    const text = `
${ru ? 'НОВЫЙ ЗАКАЗ' : 'UUS TELLIMUS'} — varjuprofiilid.ee
${'─'.repeat(50)}

${ru ? 'Kontakt' : 'Kontakt'}:
  ${form.name}
  ${form.email}
  ${form.phone || '—'}

${ru ? 'Адрес доставки' : 'Tarneaadress'}:
  ${form.address}
  ${form.city} ${form.zip}

${ru ? 'Товары' : 'Tooted'}:
${itemLines}

${ru ? 'Промежуточный итог' : 'Vahesumma'}: ${subtotal.toFixed(2)} €
${ru ? 'Доставка' : 'Tarne'}: ${shipping === 0 ? (ru ? 'Бесплатно' : 'Tasuta') : `${shipping.toFixed(2)} €`}
${ru ? 'Итого' : 'Kokku'}: ${total.toFixed(2)} €

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
