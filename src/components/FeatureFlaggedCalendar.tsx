"use client";

import { useEffect, useState } from "react";
import { LDProvider, useFlags } from "launchdarkly-react-client-sdk";
import { EventCalendar } from "@/components/EventCalendar";
import type { Event } from "@/db/schema";

function CalendarGate({ events }: { events: Event[] }) {
  const flags = useFlags();
  const show = Boolean(flags["show-event-calendar"]);

  if (!show) return null;

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
    setReady(true);
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
        className="scroll-mt-24 rounded-xl border border-[color:var(--cdu-blue)]/10 bg-white p-6 text-[color:var(--cdu-blue)]"
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
      timeout={5}
    >
      <CalendarGate events={events} />
    </LDProvider>
  );
}
