"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";

export type CreatePostState = {
  ok: boolean;
  message: string;
};

export async function createPost(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return {
      ok: false,
      message: "Sie müssen als Administrator angemeldet sein.",
    };
  }

  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    return { ok: false, message: "Bitte einen Text eingeben." };
  }
  if (body.length > 2000) {
    return { ok: false, message: "Der Text ist zu lang (max. 2000 Zeichen)." };
  }

  const file = formData.get("image");
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (file && file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return { ok: false, message: "Nur Bilddateien sind erlaubt." };
    }
    if (file.size > 4.5 * 1024 * 1024) {
      return { ok: false, message: "Das Bild darf höchstens 4,5 MB groß sein." };
    }

    const blob = await put(`posts/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    imageUrl = blob.url;
    imageAlt =
      String(formData.get("imageAlt") ?? "").trim() ||
      `Beitragsbild: ${body.slice(0, 80)}`;
  }

  await db.insert(posts).values({
    body,
    imageUrl,
    imageAlt,
    authorEmail: admin.email,
  });

  revalidatePath("/");
  return { ok: true, message: "Beitrag wurde veröffentlicht." };
}
