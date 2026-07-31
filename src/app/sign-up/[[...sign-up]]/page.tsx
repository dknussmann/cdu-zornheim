import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--cdu-surface)] px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-center font-display text-2xl text-[color:var(--cdu-blue)]">
          Konto erstellen
        </h1>
        {hasClerk ? (
          <SignUp />
        ) : (
          <p className="rounded-lg border border-[color:var(--cdu-blue)]/20 bg-white p-4 text-[color:var(--cdu-blue)]">
            Clerk ist noch nicht verbunden. Bitte die Integration in Vercel abschließen.
          </p>
        )}
      </div>
    </main>
  );
}
