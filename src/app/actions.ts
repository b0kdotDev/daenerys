'use server';

const ROLES = new Set(['ninong', 'ninang']);
const ANSWERS = new Set(['yes', 'thinking', 'no']);

export type RsvpState = { sent?: boolean; error?: string; name?: string; answer?: string };

function field(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? '')
    .trim()
    .slice(0, max);
}

export async function submitRsvp(_prev: RsvpState, form: FormData): Promise<RsvpState> {
  if (field(form, 'company', 80)) return { sent: true, answer: 'no' };

  const name = field(form, 'name', 80);
  const role = field(form, 'role', 20);
  const answer = field(form, 'answer', 20);
  const contact = field(form, 'contact', 80);
  const note = field(form, 'note', 500);

  if (!name) return { error: 'Please tell us your name.' };
  if (!ROLES.has(role)) return { error: 'Please choose ninong or ninang.' };
  if (!ANSWERS.has(answer)) return { error: 'Please choose an answer.' };

  const url = process.env.GOOGLE_SCRIPT_URL?.trim();
  if (!url) return { error: 'RSVP is not connected to the sheet yet.' };

  // ponytail: Apps Script answers POST with 302; following it becomes GET and looks like failure.
  const res = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams({ name, role, answer, contact, note }),
    redirect: 'manual',
  });
  if (res.status === 401 || res.status === 403) {
    return {
      error:
        'Google is blocking the sheet. Redeploy the Apps Script web app with Who has access: Anyone (not “only me”).',
    };
  }
  if (
    !res.ok &&
    res.status !== 302 &&
    res.status !== 303 &&
    res.type !== 'opaqueredirect'
  ) {
    return { error: 'Could not save. Please try again.' };
  }

  return { sent: true, name, answer };
}
