import { NextRequest, NextResponse } from 'next/server';
import { site } from '@/lib/site';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, locale } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const text = `
Uus kontaktisõnum — varjuprofiilid.ee
${'─'.repeat(40)}

Nimi: ${name}
E-mail: ${email}
Teema: ${subject || '—'}
Keel: ${locale}

${message}
`.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_DOMAIN ?? 'kontakt@varjuprofiilid.ee',
          to: [site.email],
          reply_to: email,
          subject: `Kontaktisõnum: ${subject || name}`,
          text,
        }),
      });
    } else {
      console.log('\n[CONTACT]\n' + text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
