import { SignIn } from "@clerk/nextjs";
import { MagicLoginForm } from "@/components/MagicLoginForm";

export default function SignInPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--cdu-surface)] px-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-center font-display text-2xl text-[color:var(--cdu-blue)]">
          Anmeldung für Administratorinnen und Administratoren
        </h1>
        <p className="text-center text-sm text-[color:var(--cdu-blue)]/80">
          Melden Sie sich an, um Beiträge zu veröffentlichen.
        </p>
        {hasClerk ? <SignIn /> : <MagicLoginForm />}
      </div>
    </main>
  );
}
