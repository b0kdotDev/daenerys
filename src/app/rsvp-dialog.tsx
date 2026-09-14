'use client';

import { useEffect, useRef } from 'react';
import { submitRsvp } from './actions';

const field =
  'mt-1.5 w-full border-0 border-b border-[#f4c4d4] bg-transparent py-2 text-base text-[#5c3a48] outline-none focus:border-[#e07a9a]';

export function RsvpDialog({ sent, error }: { sent: boolean; error?: string }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (error || sent) ref.current?.showModal();
  }, [error, sent]);

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
        <form method="dialog" className="flex justify-end">
          <button
            type="submit"
            className="text-xs tracking-wide text-[#e07a9a] uppercase"
            aria-label="Close"
          >
            Close
          </button>
        </form>

        <p className="text-center text-[0.7rem] font-medium tracking-[0.28em] text-[#e07a9a] uppercase">
          With love, we ask
        </p>
        <h2 className="font-serif mt-3 text-center text-3xl text-[#8a3d5c]">
          Brielle Daenerys
        </h2>
        <p className="mt-4 text-center text-[0.95rem] leading-7 text-[#b56b86]">
          Would you stand as her ninong or ninang?
        </p>

        {sent ? (
          <p className="mt-8 text-center text-sm leading-6 text-[#8a3d5c]">
            Salamat. Your answer is with us.
          </p>
        ) : (
          <form action={submitRsvp} className="mt-8 space-y-5 text-left">
            {error ? (
              <p className="text-center text-sm text-[#a33]" role="alert">
                {error}
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
              className="mt-4 w-full bg-[#e07a9a] py-3 text-sm tracking-[0.18em] text-white uppercase hover:bg-[#d4688c]"
            >
              Send my answer
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
