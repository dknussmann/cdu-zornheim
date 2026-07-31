"use server";

import { redirect } from "next/navigation";
import { createMagicLogin, clearSession } from "@/lib/session";

export type MagicLoginState = {
  ok: boolean;
  message: string;
  magicUrl?: string;
};

export async function requestMagicLogin(
  _prev: MagicLoginState,
  formData: FormData,
): Promise<MagicLoginState> {
  const email = String(formData.get("email") ?? "");
  const result = await createMagicLogin(email);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  return {
    ok: true,
    message:
      "Anmeldelink erstellt. Öffnen Sie den Link unten, um sich anzumelden (gültig 20 Minuten).",
    magicUrl: result.magicUrl,
  };
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
