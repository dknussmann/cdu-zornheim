export type ZornheimerBoteIssue = {
  /** Sort key YYYY-MM */
  id: string;
  title: string;
  href: string;
};

/**
 * Zornheimer Bote PDFs hosted on cdu-vg-nieder-olm.de.
 * Collected via Wayback CDX + live HEAD checks (site HTML is in maintenance;
 * direct PDF URLs remain public).
 */
export const zornheimerBoteIssues: ZornheimerBoteIssue[] = [
  {
    id: "2025-04",
    title: "April 2025",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2025/04/2025.04_ZoBo_web.pdf",
  },
  {
    id: "2024-08",
    title: "August 2024",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2024/09/ZoBo-08_24_web.pdf",
  },
  {
    id: "2024-03",
    title: "März 2024",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2024/03/ZoBo-03_24_druck_kleiner.pdf",
  },
  {
    id: "2023-12",
    title: "Dezember 2023",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/12/ZoBo_23_12.pdf",
  },
  {
    id: "2023-08",
    title: "August 2023",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/09/ZornheimerBote_August23.pdf",
  },
  {
    id: "2022-12",
    title: "Dezember 2022",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_Dez22.pdf",
  },
  {
    id: "2021-08",
    title: "August 2021",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_August21.pdf",
  },
  {
    id: "2020-12",
    title: "Dezember 2020",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_Dez20.pdf",
  },
  {
    id: "2020-04",
    title: "April 2020",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_April20.pdf",
  },
  {
    id: "2019-12",
    title: "Dezember 2019",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_Dez19.pdf",
  },
  {
    id: "2019-08",
    title: "August 2019",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_August19.pdf",
  },
  {
    id: "2019-05",
    title: "Sonderausgabe Kandidaten 2019",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_Kandidaten19.pdf",
  },
  {
    id: "2018-12",
    title: "Dezember 2018",
    href: "https://cdu-vg-nieder-olm.de/wp-content/uploads/2023/03/ZornheimerBote_Dez18.pdf",
  },
];

export const currentZornheimerBote = zornheimerBoteIssues[0];

export const zornheimerBoteHistory = zornheimerBoteIssues.slice(1);
