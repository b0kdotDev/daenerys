import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { MilestoneCard } from './milestone-card';
import { RsvpDialog } from './rsvp-dialog';

const MONTHS = [
  { n: '01', title: 'One month', line: 'Tiny fists. A whole world, new.' },
  { n: '02', title: 'Two months', line: 'The first real smile — and we were gone.' },
  { n: '03', title: 'Three months', line: 'Head up. Eyes following every face she loves.' },
  { n: '04', title: 'Four months', line: 'Giggles that filled the house.' },
  { n: '05', title: 'Five months', line: 'Reaching, grabbing, discovering her hands.' },
  { n: '06', title: 'Six months', line: 'Halfway to one. Sitting in the middle of our lives.' },
  { n: '07', title: 'Seven months', line: 'First tastes. First teeth. First “this is mine.”' },
  { n: '08', title: 'Eight months', line: 'On the move — the floor was hers.' },
  { n: '09', title: 'Nine months', line: 'Pulling up. Holding on. Almost flying.' },
  { n: '10', title: 'Ten months', line: 'Cruising the furniture like she owned it.' },
  { n: '11', title: 'Eleven months', line: 'A few steps. A lot of courage.' },
  { n: '12', title: 'One year', line: 'October 9, 2026. Our Brielle Daenerys turns one.' },
] as const;

const EXTS = ['jpg', 'jpeg', 'webp', 'png'] as const;

function photoSrc(n: string) {
  const dir = join(process.cwd(), 'public', 'milestones');
  const ext = EXTS.find((e) => existsSync(join(dir, `${n}.${e}`)));
  return ext ? `/milestones/${n}.${ext}` : null;
}

function Teddy({ className }: { className?: string }) {
  return (
    <img
      src="/teddy.png"
      alt=""
      className={`object-contain mix-blend-multiply ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const q = await searchParams;
  const sent = q.sent === '1';
  const error = q.error;

  return (
    <main className="relative overflow-x-hidden">
      <header className="flex min-h-svh items-center justify-center overflow-hidden px-6 py-16">
        <div className="flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <div className="relative z-20 text-center sm:text-left">
            <p className="text-[0.7rem] font-medium tracking-[0.32em] text-[#e07a9a] uppercase">
              Her first year
            </p>
            <h1 className="font-serif mt-6 max-w-lg text-5xl leading-tight text-[#8a3d5c] sm:text-6xl">
              Brielle Daenerys
            </h1>
            <p className="font-serif mt-4 text-xl italic text-[#c45d82]">turns one</p>
            <p className="mt-6 text-sm tracking-wide text-[#b56b86]">October 9, 2026</p>
            <a
              href="#year"
              className="mt-16 inline-block text-[0.65rem] tracking-[0.28em] text-[#e07a9a] uppercase"
            >
              Scroll her story
            </a>
          </div>
          <Teddy className="deco float-slow w-40 shrink-0 sm:w-56" />
        </div>
      </header>

      <section id="year" className="relative pt-24">
        <ol className="relative z-10 mx-auto max-w-3xl px-6 pb-8">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 w-px bg-[#f4c4d4] sm:left-1/2"
        />
        {MONTHS.map((m, i) => {
          const src = photoSrc(m.n);
          const right = i % 2 === 1;
          return (
            <li
              key={m.n}
              className={`relative mb-16 sm:mb-24 sm:w-[calc(50%-1.5rem)] ${
                right ? 'sm:ml-[calc(50%+1.5rem)]' : 'sm:mr-[calc(50%+1.5rem)]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-6 left-[-1.35rem] h-2.5 w-2.5 rounded-full bg-[#e07a9a] sm:top-8 sm:h-3 sm:w-3 ${
                  right ? 'sm:left-[-1.9rem] sm:right-auto' : 'sm:right-[-1.9rem] sm:left-auto'
                }`}
              />
              <MilestoneCard from={right ? 'right' : 'left'}>
                {src ? (
                  <img
                    src={src}
                    alt={`Brielle Daenerys, ${m.title}`}
                    className="mb-4 aspect-4/5 w-full object-cover"
                  />
                ) : (
                  <div className="mb-4 flex aspect-4/5 items-end bg-[#fce0ea] p-4">
                    <span className="font-serif text-4xl text-[#e7a0b8]">{m.n}</span>
                  </div>
                )}
                <p className="text-[0.65rem] font-medium tracking-[0.22em] text-[#e07a9a] uppercase">
                  {m.title}
                </p>
                <p className="font-serif mt-2 text-xl leading-snug text-[#8a3d5c]">
                  {m.line}
                </p>
              </MilestoneCard>
            </li>
          );
        })}
        </ol>
      </section>

      <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative z-20">
        <p className="font-serif max-w-md text-3xl leading-snug text-[#8a3d5c]">
          Will you walk the next years with her?
        </p>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#b56b86]">
          We would be honored if you stood as her ninong or ninang.
        </p>
        <RsvpDialog sent={sent} error={error} />
        </div>
      </section>
    </main>
  );
}
