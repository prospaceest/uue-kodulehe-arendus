import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';

export async function POST(req: NextRequest) {
  try {
    const { company, name, email, phone, role, locale } = await req.json();

    if (!company || !email) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const text = `
Uus B2B päring — varjuprofiilid.ee
${'─'.repeat(40)}

Ettevõte: ${company}
Kontakt: ${name}
E-mail: ${email}
Telefon: ${phone || '—'}
Roll: ${role}
Keel: ${locale}
`.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_DOMAIN ?? 'b2b@varjuprofiilid.ee',
          to: [site.email],
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
