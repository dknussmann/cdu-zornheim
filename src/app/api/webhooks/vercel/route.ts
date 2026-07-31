import {
  buildPreviewSlackMessage,
  isPreviewDeployment,
  postPreviewToSlack,
  verifyVercelSignature,
  type VercelDeploymentSucceededPayload,
} from "@/lib/slack-preview";

export const runtime = "nodejs";

/**
 * Vercel account/project webhook endpoint.
 * Configure in Vercel → Team Settings → Webhooks:
 *   URL: https://cdu-zornheim.vercel.app/api/webhooks/vercel
 *   Events: Deployment Succeeded
 *   Projects: cdu-zornheim
 *
 * Env:
 *   VERCEL_WEBHOOK_SECRET – secret shown when creating the webhook
 *   SLACK_WEBHOOK_URL – Incoming Webhook for #channel (preferred)
 *   or SLACK_BOT_TOKEN + SLACK_PREVIEW_CHANNEL_ID (default C0BM6R2K10E)
 */
export async function POST(request: Request) {
  const secret = process.env.VERCEL_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json(
      { error: "VERCEL_WEBHOOK_SECRET is not configured" },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-vercel-signature");
  if (!verifyVercelSignature(rawBody, signature, secret)) {
    return Response.json(
      { code: "invalid_signature", error: "signature didn't match" },
      { status: 403 },
    );
  }

  let event: VercelDeploymentSucceededPayload;
  try {
    event = JSON.parse(rawBody) as VercelDeploymentSucceededPayload;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  if (event.type !== "deployment.succeeded") {
    return Response.json({ ok: true, skipped: "unhandled_event", type: event.type });
  }

  const target = event.payload?.target;
  // Only notify for previews (skip production promotions)
  if (target === "production") {
    return Response.json({ ok: true, skipped: "production" });
  }
  if (!isPreviewDeployment(target)) {
    return Response.json({ ok: true, skipped: "not_preview", target });
  }

  if (!event.payload?.deployment?.url) {
    return Response.json({ error: "missing deployment url" }, { status: 400 });
  }

  const message = buildPreviewSlackMessage(event);
  const result = await postPreviewToSlack(message);

  if (!result.ok) {
    console.error("[vercel-webhook] Slack post failed:", result.error);
    return Response.json(
      { ok: false, error: result.error },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    preview: `https://${event.payload.deployment.url}`,
  });
}
