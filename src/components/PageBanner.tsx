import Image from "next/image";

type PageBannerProps = {
  title: string;
  lead?: string;
  id?: string;
};

/** Full-width subpage banner with Bogen motif + Rhöndorf plate */
export function PageBanner({ title, lead, id }: PageBannerProps) {
  return (
    <div id={id} className="relative overflow-hidden bg-[color:var(--cdu-blue)] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] opacity-35 sm:block" aria-hidden="true">
        <Image
          src="/images/brand/cdu-bogen.png"
          alt=""
          fill
          className="object-contain object-right-bottom p-4"
          sizes="40vw"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--cdu-ink) 0 33%, var(--cdu-red) 33% 66%, var(--cdu-gold) 66% 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="section-kicker !text-[color:var(--cdu-teal)]">CDU Zornheim</p>
        <h1 className="font-headline mt-3 text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-3 max-w-xl font-display text-lg text-white/85">{lead}</p>
        ) : null}
      </div>
    </div>
  );
}
