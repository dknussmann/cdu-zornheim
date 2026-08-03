/**
 * Public facts about CDU Zornheim / Ortsgemeinde Zornheim.
 * Sources (as of Aug 2026):
 * - https://www.zornheim.de/rathaus-/-buergerservice/gemeindeorgane/
 * - https://www.vg-nieder-olm.de/politik-verwaltung/ortsgemeinden-stadt/zornheim/ortsgemeinderat/
 * - https://www.zornheim.de/leben-in-zornheim/daten-fakten/
 * - https://de.wikipedia.org/wiki/Zornheim
 */

export const gemeinde = {
  name: "Ortsgemeinde Zornheim",
  inhabitants: "ca. 3.940 (Stand 01.01.2022)",
  landkreis: "Mainz-Bingen",
  verbandsgemeinde: "Nieder-Olm",
  address: {
    street: "Kirschgartenstraße 2",
    zip: "55270",
    city: "Zornheim",
    phone: "06136 95294-0",
    emailDisplay: "gemeinde@zornheim.de",
  },
  sources: {
    gemeindeorgane:
      "https://www.zornheim.de/rathaus-/-buergerservice/gemeindeorgane/",
    ortsgemeinderat:
      "https://www.vg-nieder-olm.de/politik-verwaltung/ortsgemeinden-stadt/zornheim/ortsgemeinderat/",
    datenFakten: "https://www.zornheim.de/leben-in-zornheim/daten-fakten/",
  },
} as const;

export const ortsbuergermeister = {
  name: "Ralf Jürgen Winter",
  party: "CDU",
  electedOn: "9. Juni 2024",
  voteShare: "76,0 %",
  tookOfficeOn: "9. Juli 2024",
  predecessors: [
    { name: "Dennis Diehl", party: "CDU", note: "2019–2024" },
    { name: "Werner Dahmen", party: "CDU", note: "2003–2019" },
  ],
} as const;

export const beigeordnete = [
  {
    name: "Birgit Dany-Pietschmann",
    role: "1. Beigeordnete",
    portfolio: "Dorfentwicklung und Umwelt",
  },
  {
    name: "Frank Mattes",
    role: "Beigeordneter",
    portfolio: "Bauen",
    note: "auch Mitglied der CDU-Fraktion im Gemeinderat",
  },
  {
    name: "Jonas Steib",
    role: "Beigeordneter",
    portfolio: "Soziales",
  },
] as const;

/** CDU-Fraktion im Ortsgemeinderat (Wahlperiode ab 2024) – 10 von 20 Sitzen */
export const cduFraktion = [
  "Reinhold Kneib",
  "Elke Tautenhahn",
  "Hiltrud Hollich",
  "Albert Schmedding",
  "Thomas Breitenbach",
  "Fabian Pengel",
  "Klaus Jaeger",
  "Andrea Nordmann",
  "Frank Mattes",
  "Irene Weber",
] as const;

export const ratsverteilung = {
  total: 20,
  cdu: 10,
  spd: 5,
  fwg: 5,
  electionYear: 2024,
} as const;
