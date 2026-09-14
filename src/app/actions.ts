'use server';

import { redirect } from 'next/navigation';

const ROLES = new Set(['ninong', 'ninang']);
const ANSWERS = new Set(['yes', 'thinking', 'no']);

function field(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? '')
    .trim()
    .slice(0, max);
}

export async function submitRsvp(form: FormData) {
  if (field(form, 'company', 80)) redirect('/?sent=1');

  const name = field(form, 'name', 80);
  const role = field(form, 'role', 20);
  const answer = field(form, 'answer', 20);
  const contact = field(form, 'contact', 80);
  const note = field(form, 'note', 500);

  if (!name) redirect('/?error=Please+tell+us+your+name.');
  if (!ROLES.has(role)) redirect('/?error=Please+choose+ninong+or+ninang.');
  if (!ANSWERS.has(answer)) redirect('/?error=Please+choose+an+answer.');

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) redirect('/?error=RSVP+is+not+connected+to+the+sheet+yet.');

  const body = new URLSearchParams({ name, role, answer, contact, note });
  const res = await fetch(url, { method: 'POST', body, redirect: 'follow' });
  if (!res.ok) redirect('/?error=Could+not+save.+Please+try+again.');

  redirect('/?sent=1');
}
