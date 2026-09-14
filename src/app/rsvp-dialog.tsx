'use client';

import { useActionState, useRef } from 'react';
import { submitRsvp, type RsvpState } from './actions';

const field =
  'mt-1.5 w-full border-0 border-b border-[#f4c4d4] bg-transparent py-2 text-base text-[#5c3a48] outline-none focus:border-[#e07a9a]';

function savePng(name: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const teddy = new Image();
  teddy.onload = () => {
    ctx.fillStyle = '#fff8fb';
    ctx.fillRect(0, 0, 900, 1200);
    ctx.fillStyle = '#fce0ea';
    ctx.fillRect(40, 40, 820, 1120);
    ctx.fillStyle = '#fff8fb';
    ctx.fillRect(70, 70, 760, 1060);
    ctx.drawImage(teddy, 275, 120, 350, 420);
    ctx.fillStyle = '#e07a9a';
    ctx.font = '600 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('YOU ARE INVITED', 450, 600);
    ctx.fillStyle = '#8a3d5c';
    ctx.font = 'italic 44px Georgia, serif';
    ctx.fillText(name, 450, 670);
    ctx.font = '32px Georgia, serif';
    ctx.fillText('Brielle Daenerys turns one', 450, 760);
    ctx.fillStyle = '#b56b86';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText('October 9, 2026', 450, 810);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `invitation-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, 'image/png');
  };
  teddy.src = '/teddy.png';
}

export function RsvpDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(submitRsvp, {} as RsvpState);
  const yes = state.sent && state.answer === 'yes';
  const done = Boolean(state.sent);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="mt-8 bg-[#e07a9a] px-10 py-4 text-sm tracking-[0.18em] text-white uppercase hover:bg-[#d4688c]"
      >
        Be her ninong or ninang
      </button>

      <dialog
        ref={ref}
        className="rsvp-dialog m-auto w-[calc(100%-2rem)] max-w-md border border-[#f4c4d4] bg-[#fff8fb] p-8 text-[#5c3a48] shadow-[0_12px_40px_rgba(224,122,154,0.18)] sm:p-10"
      >
        <form method="dialog" className="flex justify-end no-print">
          <button
            type="submit"
            className="text-xs tracking-wide text-[#e07a9a] uppercase"
            aria-label="Close"
          >
            Close
          </button>
        </form>

        {yes ? (
          <div>
            <article className="invite-card border border-[#f4c4d4] bg-[#fff8fb] px-6 py-10 text-center">
              <img src="/teddy.png" alt="" className="mx-auto mb-6 h-36 w-auto object-contain mix-blend-multiply" />
              <p className="text-[0.7rem] font-medium tracking-[0.28em] text-[#e07a9a] uppercase">
                You are invited
              </p>
              <p className="font-serif mt-3 text-3xl text-[#8a3d5c]">{state.name}</p>
              <p className="font-serif mt-6 text-lg italic text-[#c45d82]">
                Brielle Daenerys turns one
              </p>
              <p className="mt-3 text-sm tracking-wide text-[#b56b86]">October 9, 2026</p>
            </article>
            <div className="no-print mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 border border-[#e07a9a] py-3 text-xs tracking-[0.16em] text-[#e07a9a] uppercase"
              >
                Save PDF
              </button>
              <button
                type="button"
                onClick={() => savePng(state.name ?? '')}
                className="flex-1 bg-[#e07a9a] py-3 text-xs tracking-[0.16em] text-white uppercase"
              >
                Save image
              </button>
            </div>
          </div>
        ) : done ? (
          <p className="py-8 text-center text-sm text-[#8a3d5c]">Thank you.</p>
        ) : (
          <>
            <p className="text-center text-[0.7rem] font-medium tracking-[0.28em] text-[#e07a9a] uppercase">
              With love, we ask
            </p>
            <h2 className="font-serif mt-3 text-center text-3xl text-[#8a3d5c]">
              Brielle Daenerys
            </h2>
            <p className="mt-4 text-center text-[0.95rem] leading-7 text-[#b56b86]">
              Would you stand as her ninong or ninang?
            </p>

            <form action={action} className="mt-8 space-y-5 text-left">
              {state.error ? (
                <p className="text-center text-sm text-[#a33]" role="alert">
                  {state.error}
                </p>
              ) : null}

              <label className="block text-xs tracking-wide text-[#e07a9a] uppercase">
                Your name
                <input required name="name" autoComplete="name" className={field} />
              </label>

              <fieldset className="space-y-2">
                <legend className="text-xs tracking-wide text-[#e07a9a] uppercase">
                  As
                </legend>
                <label className="mr-6 text-sm">
                  <input className="mr-2 accent-[#e07a9a]" type="radio" name="role" value="ninong" required />
                  Ninong
                </label>
                <label className="text-sm">
                  <input className="mr-2 accent-[#e07a9a]" type="radio" name="role" value="ninang" />
                  Ninang
                </label>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-xs tracking-wide text-[#e07a9a] uppercase">
                  Will you?
                </legend>
                <label className="block text-sm">
                  <input className="mr-2 accent-[#e07a9a]" type="radio" name="answer" value="yes" required />
                  Yes, I would be honored
                </label>
                <label className="block text-sm">
                  <input className="mr-2 accent-[#e07a9a]" type="radio" name="answer" value="thinking" />
                  I need a little time
                </label>
                <label className="block text-sm">
                  <input className="mr-2 accent-[#e07a9a]" type="radio" name="answer" value="no" />
                  With love, I cannot
                </label>
              </fieldset>

              <label className="block text-xs tracking-wide text-[#e07a9a] uppercase">
                Mobile or email
                <input name="contact" autoComplete="tel" className={field} />
              </label>

              <label className="block text-xs tracking-wide text-[#e07a9a] uppercase">
                A note, if you like
                <textarea name="note" rows={2} className={`${field} resize-none`} />
              </label>

              <div className="absolute left-[-9999px]" aria-hidden="true">
                <input name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="mt-4 w-full bg-[#e07a9a] py-3 text-sm tracking-[0.18em] text-white uppercase hover:bg-[#d4688c] disabled:opacity-60"
              >
                {pending ? 'Sending…' : 'Send my answer'}
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
