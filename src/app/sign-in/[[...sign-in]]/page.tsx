import { SignIn } from "@clerk/nextjs";
import { MagicLoginForm } from "@/components/MagicLoginForm";

export default function SignInPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--cdu-teal-10)] px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="mx-auto h-1.5 w-20 bg-[linear-gradient(90deg,var(--cdu-ink)_0_33%,var(--cdu-red)_33%_66%,var(--cdu-gold)_66%_100%)]" aria-hidden="true" />
        <h1 className="text-center font-headline text-2xl text-[color:var(--cdu-blue)]">
          Anmeldung für Administratorinnen und Administratoren
        </h1>
        <p className="text-center font-display text-sm text-[color:var(--cdu-blue)]/80">
          Melden Sie sich per E-Mail-Link an, um Beiträge zu veröffentlichen.
        </p>
        {hasClerk ? <SignIn /> : <MagicLoginForm />}
      </div>
    </main>
  );
}
