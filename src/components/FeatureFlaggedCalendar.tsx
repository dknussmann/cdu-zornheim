"use client";

import { useEffect, useState } from "react";
import { LDProvider, useFlags } from "launchdarkly-react-client-sdk";
import { EventCalendar } from "@/components/EventCalendar";
import type { Event } from "@/db/schema";

function CalendarGate({ events }: { events: Event[] }) {
  const flags = useFlags();
  const show = Boolean(flags["show-event-calendar"]);

  if (!show) {
    return (
      <div id="termine" className="scroll-mt-24 sr-only" aria-hidden="true">
        Kalender per Feature-Flag deaktiviert
      </div>
    );
  }

  return (
    <div id="termine" className="scroll-mt-24">
      <EventCalendar events={events} />
    </div>
  );
}

export function FeatureFlaggedCalendar({ events }: { events: Event[] }) {
  const clientSideId = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Mark component as mounted on the client
    const timer = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!clientSideId) {
    return (
      <div id="termine" className="scroll-mt-24">
        <EventCalendar events={events} />
      </div>
    );
  }

  if (!ready) {
    return (
      <div
        id="termine"
        className="scroll-mt-24 border border-[color:var(--cdu-blue)]/10 bg-white p-6 text-[color:var(--cdu-blue)]"
        aria-busy="true"
      >
        Kalender wird geladen…
      </div>
    );
  }

  return (
    <LDProvider
      clientSideID={clientSideId}
      context={{ kind: "user", key: "anonymous-visitor", anonymous: true }}
      options={{ bootstrap: "localStorage" }}
      timeout={5}
    >
      <CalendarGate events={events} />
    </LDProvider>
  );
}
