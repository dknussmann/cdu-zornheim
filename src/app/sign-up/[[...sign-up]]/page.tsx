import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--cdu-surface)] px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-center font-display text-2xl text-[color:var(--cdu-blue)]">
          Konto erstellen
        </h1>
        <SignUp />
      </div>
    </main>
  );
}
