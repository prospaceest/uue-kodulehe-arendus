import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';
import { marketFromHost } from '@/lib/markets';

export async function POST(req: NextRequest) {
  try {
    // Turg tuleb päringu hostist: Soome tellimus peab jõudma
    // info@prospace.fi peale, mitte Eesti postkasti.
    const market = marketFromHost(req.headers.get('x-forwarded-host') ?? req.headers.get('host'));
    const body = await req.json();
    const { company, name, email, phone, role, locale } = body;
    // Edasimüüja-ankeet (Soome turg) saadab lisavälju. kind eristab kirja
    // pealkirjas, et päringud ei seguneks arhitektide omadega.
    const isReseller = body.kind === 'reseller';

    if (!company || !email) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const text = `
${isReseller ? 'EDASIMÜÜJA PÄRING' : 'Uus B2B päring'} — ${market.storefront}
${'─'.repeat(40)}

Ettevõte: ${company}
Kontakt: ${name}
E-mail: ${email}
Telefon: ${phone || '—'}
Roll: ${role}
${isReseller ? `Piirkond: ${body.region || '—'}
Tegevusala: ${body.field || '—'}
Praegune tootevalik: ${body.range || '—'}
Eeldatav maht: ${body.volume || '—'}
Salong/väljapanek: ${body.showroom || '—'}` : ''}
Koduleht: ${body.website || '—'}
Sõnum: ${body.message || body.description || '—'}
Keel: ${locale}
`.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_DOMAIN ?? market.mailFrom.b2b,
          to: [market.inbox],
          reply_to: email,
          subject: `B2B päring: ${company}`,
          text,
        }),
      });
    } else {
      console.log('\n[B2B]\n' + text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
