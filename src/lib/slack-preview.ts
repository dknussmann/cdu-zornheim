import { createHmac, timingSafeEqual } from "crypto";

export type VercelDeploymentMeta = Record<string, string | undefined>;

export type VercelDeploymentSucceededPayload = {
  type: string;
  payload: {
    target?: string | null;
    deployment: {
      id: string;
      url: string;
      name: string;
      meta?: VercelDeploymentMeta;
    };
    links?: {
      deployment?: string;
      project?: string;
    };
    project?: {
      id?: string;
      name?: string;
    };
  };
};

export function verifyVercelSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader) return false;
  const expected = createHmac("sha1", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signatureHeader, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Prefer preview deployments; older payloads may use null target for previews. */
export function isPreviewDeployment(target: string | null | undefined): boolean {
  return target === "preview" || target === "staging" || target == null;
}

export function buildFeatureSummary(meta: VercelDeploymentMeta = {}): string {
  const commit =
    meta.githubCommitMessage?.trim() ||
    meta.gitlabCommitMessage?.trim() ||
    meta.commitMessage?.trim();
  if (commit) {
    const firstLine = commit.split("\n").find((l) => l.trim())?.trim() ?? commit;
    return firstLine.length > 220 ? `${firstLine.slice(0, 217)}…` : firstLine;
  }

  const branch = meta.githubCommitRef || meta.gitlabCommitRef || meta.branch;
  if (branch) {
    return `Preview for branch \`${branch}\``;
  }

  return "A new preview deployment is ready.";
}

export function buildPreviewSlackMessage(event: VercelDeploymentSucceededPayload) {
  const { deployment, links, project } = event.payload;
  const meta = deployment.meta ?? {};
  const summary = buildFeatureSummary(meta);
  const previewUrl = `https://${deployment.url}`;
  const branch = meta.githubCommitRef || meta.gitlabCommitRef || meta.branch;
  const author = meta.githubCommitAuthorName || meta.gitlabCommitAuthorName;
  const projectName = project?.name || deployment.name || "project";
  const inspectUrl = links?.deployment;
  const prNumber = meta.githubPrId;
  const repo = meta.githubOrg && meta.githubRepo
    ? `${meta.githubOrg}/${meta.githubRepo}`
    : undefined;
  const prUrl =
    prNumber && repo
      ? `https://github.com/${repo}/pull/${prNumber}`
      : undefined;

  const lines = [
    `*Preview ready* — ${projectName}`,
    summary,
    branch ? `Branch: \`${branch}\`` : null,
    author ? `Author: ${author}` : null,
    `Preview: <${previewUrl}|${deployment.url}>`,
    prUrl ? `PR: <${prUrl}|#${prNumber}>` : null,
    inspectUrl ? `Inspect: <${inspectUrl}|Vercel dashboard>` : null,
  ].filter(Boolean);

  return {
    text: `Preview ready: ${summary} — ${previewUrl}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Vercel Preview ready",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: lines.join("\n"),
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Open Preview", emoji: true },
            url: previewUrl,
            style: "primary",
          },
          ...(prUrl
            ? [
                {
                  type: "button",
                  text: { type: "plain_text", text: "Open PR", emoji: true },
                  url: prUrl,
                },
              ]
            : []),
        ],
      },
    ],
  };
}

export async function postPreviewToSlack(message: {
  text: string;
  blocks: unknown[];
}): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channel =
    process.env.SLACK_PREVIEW_CHANNEL_ID || "C0BM6R2K10E";

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `webhook ${res.status}: ${body}` };
    }
    return { ok: true };
  }

  if (botToken) {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${botToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        channel,
        text: message.text,
        blocks: message.blocks,
      }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      return { ok: false, error: data.error || "chat.postMessage failed" };
    }
    return { ok: true };
  }

  return {
    ok: false,
    error:
      "Missing SLACK_WEBHOOK_URL or SLACK_BOT_TOKEN – add one in Vercel env vars",
  };
}
