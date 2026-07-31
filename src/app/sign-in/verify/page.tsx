import { redirect } from "next/navigation";
import { consumeMagicToken } from "@/lib/session";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  if (!params.token) {
    redirect("/sign-in");
  }
  const result = await consumeMagicToken(params.token);
  if (!result.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="rounded-lg bg-white p-4 text-[color:var(--cdu-red)]" role="alert">
          {result.message}
        </p>
      </main>
    );
  }
  redirect("/");
}
