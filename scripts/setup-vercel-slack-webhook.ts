#!/usr/bin/env npx tsx
/**
 * Registers a Vercel account webhook that posts Deployment Succeeded
 * events to this app's /api/webhooks/vercel handler.
 *
 * Requires:
 *   VERCEL_TOKEN          – https://vercel.com/account/tokens
 *   VERCEL_TEAM_ID        – optional team id (team_…)
 *   VERCEL_PROJECT_ID     – optional; omit to listen to all projects
 *   WEBHOOK_URL           – defaults to https://cdu-zornheim.vercel.app/api/webhooks/vercel
 *
 * Prints the webhook secret once — store it as VERCEL_WEBHOOK_SECRET in Vercel.
 */

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error("Set VERCEL_TOKEN first (https://vercel.com/account/tokens).");
  process.exit(1);
}

const teamId = process.env.VERCEL_TEAM_ID;
const projectId = process.env.VERCEL_PROJECT_ID;
const webhookUrl =
  process.env.WEBHOOK_URL ||
  "https://cdu-zornheim.vercel.app/api/webhooks/vercel";

type CreateWebhookResponse = {
  id?: string;
  secret?: string;
  url?: string;
  error?: { message?: string; code?: string };
};

async function main() {
  const qs = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  const body: Record<string, unknown> = {
    url: webhookUrl,
    events: ["deployment.succeeded"],
  };
  if (projectId) {
    body.projectIds = [projectId];
  }

  const res = await fetch(`https://api.vercel.com/v1/webhooks${qs}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as CreateWebhookResponse;
  if (!res.ok) {
    console.error("Failed to create webhook:", res.status, data);
    process.exit(1);
  }

  console.log("Webhook created.");
  console.log("  id:    ", data.id);
  console.log("  url:   ", data.url || webhookUrl);
  console.log("  secret:", data.secret);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Store secret as VERCEL_WEBHOOK_SECRET in Vercel project env (Production + Preview).");
  console.log("  2. Add SLACK_WEBHOOK_URL (Incoming Webhook for channel C0BM6R2K10E).");
  console.log("  3. Redeploy production so /api/webhooks/vercel is live with those secrets.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
