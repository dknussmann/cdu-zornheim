/**
 * Creates LaunchDarkly project + flag via REST API.
 * Requires LD_API_TOKEN (Personal Access Token with writer role).
 * Usage: LD_API_TOKEN=... npx tsx scripts/setup-launchdarkly.ts
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const API = "https://app.launchdarkly.com/api/v2";
const token = process.env.LD_API_TOKEN;

if (!token) {
  console.error("LD_API_TOKEN fehlt. Erstellen Sie ein Token unter https://app.launchdarkly.com/settings/authorization");
  process.exit(1);
}

const headers = {
  Authorization: token,
  "Content-Type": "application/json",
  "LD-API-Version": "20240415",
};

async function main() {
  let project;
  const listRes = await fetch(`${API}/projects/cdu-zornheim`, { headers });
  if (listRes.ok) {
    project = await listRes.json();
    console.log("Projekt existiert bereits:", project.key);
  } else {
    const createRes = await fetch(`${API}/projects`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        key: "cdu-zornheim",
        name: "CDU Zornheim",
        tags: ["website", "cdu"],
      }),
    });
    if (!createRes.ok) {
      throw new Error(`Projekt anlegen fehlgeschlagen: ${await createRes.text()}`);
    }
    project = await createRes.json();
    console.log("Projekt angelegt:", project.key);
  }

  const prod = (project.environments || []).find(
    (e: { key: string }) => e.key === "production",
  );
  if (!prod) {
    throw new Error("Production-Environment nicht gefunden");
  }

  console.log("Production clientSideId:", prod._id);
  console.log("Production sdkKey:", prod.apiKey);

  const flagRes = await fetch(`${API}/flags/cdu-zornheim/show-event-calendar`, {
    headers,
  });
  if (!flagRes.ok) {
    const createFlag = await fetch(`${API}/flags/cdu-zornheim`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        key: "show-event-calendar",
        name: "Show Event Calendar",
        description: "Steuert die Sichtbarkeit des Monatskalenders",
        clientSideAvailability: {
          usingEnvironmentId: true,
          usingMobileKey: false,
        },
        temporary: false,
      }),
    });
    if (!createFlag.ok) {
      throw new Error(`Flag anlegen fehlgeschlagen: ${await createFlag.text()}`);
    }
    console.log("Flag show-event-calendar angelegt");
  } else {
    console.log("Flag existiert bereits");
  }

  const toggle = await fetch(
    `${API}/flags/cdu-zornheim/show-event-calendar/environments/production/settings`,
    {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json; domain-model=launchdarkly.semanticpatch",
      },
      body: JSON.stringify({
        environmentKey: "production",
        instructions: [{ kind: "turnFlagOn" }],
      }),
    },
  );

  // Fallback older toggle endpoint
  if (!toggle.ok) {
    const patch = await fetch(
      `${API}/flags/cdu-zornheim/show-event-calendar`,
      {
        method: "PATCH",
        headers: {
          Authorization: token!,
          "Content-Type":
            "application/json; domain-model=launchdarkly.semanticpatch",
        },
        body: JSON.stringify({
          environmentKey: "production",
          instructions: [{ kind: "turnFlagOn" }],
        }),
      },
    );
    if (!patch.ok) {
      console.warn("Flag konnte nicht eingeschaltet werden:", await patch.text());
    } else {
      console.log("Flag in production eingeschaltet");
    }
  } else {
    console.log("Flag in production eingeschaltet");
  }

  console.log("\nBitte in .env.local setzen:");
  console.log(`NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID=${prod._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
