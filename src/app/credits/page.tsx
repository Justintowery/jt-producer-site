import type { Metadata } from "next";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
};

type AnyRow = Record<string, any>;

function firstString(...vals: any[]) {
  for (const v of vals) {
    if (typeof v === "string" && v.trim().length) return v.trim();
  }
  return "";
}

function pickClient(row: AnyRow) {
  // Try common keys people use for the "client/brand/title" column
  return firstString(
    row.client,
    row.brand,
    row.advertiser,
    row.account,
    row.project,
    row.projectName,
    row.title,
    row.name,
    row.work,
    row.campaign,
    row.spot,
    row.spotTitle
  );
}

function pickDirector(row: AnyRow) {
  return firstString(
    row.director,
    row.dir,
    row.directedBy,
    row.directorName,
    row.filmmaker
  );
}

function pickCompany(row: AnyRow) {
  return firstString(
    row.company,
    row.productionCompany,
    row.production,
    row.prodCompany,
    row.partner,
    row.productionPartner,
    row.agency
  );
}

function pickLocation(row: AnyRow) {
  return firstString(row.location, row.city, row.market, row.state, row.where);
}

export default function CreditsPage() {
  const raw = Array.isArray(credits) ? (credits as AnyRow[]) : [];

  const rows = raw
    .map((r) => {
      // If someone stored a row as a plain string, treat it as the client
      if (typeof r === "string") {
        return {
          client: r.trim(),
          director: "",
          company: "",
          location: "",
        };
      }

      const client = pickClient(r);
      const director = pickDirector(r);
      const company = pickCompany(r);
      const location = pickLocation(r);

      // If the data uses different keys, this normalizes it into the shape we render
      return { client, director, company, location };
    })
    // If a row is totally empty, skip it
    .filter((r) => r.client || r.director || r.company || r.location);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-28 sm:px-10 lg:px-12">
        {/* Page Label */}
        <p className="text-xs uppercase tracking-[0.45em] text-white/60">
          Credits
        </p>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/15" />

        {/* Table wrapper: prevents left-cutoff + allows horizontal scroll on small screens */}
        <div className="mt-10 overflow-x-auto">
          {/* Give the grid a minimum width so columns don't crush on small screens */}
          <div className="min-w-[980px]">
            {/* Column headers */}
            <div className="grid grid-cols-12 gap-8 pb-5 text-[11px] uppercase tracking-[0.38em] text-white/50">
              <div className="col-span-4 pl-3">Client</div>
              <div className="col-span-3">Director</div>
              <div className="col-span-3">Company</div>
              <div className="col-span-2 pr-3 text-right">Location</div>
            </div>

            <div className="h-px w-full bg-white/15" />

            {/* Rows */}
            <div>
              {rows.map((r, i) => (
                <div key={`${r.client || "credit"}-${i}`}>
                  <div className="grid grid-cols-12 gap-8 py-9">
                    <div className="col-span-4 pl-3 text-[22px] font-medium tracking-wide text-white">
                      {r.client || "—"}
                    </div>

                    <div className="col-span-3 self-center text-[15px] text-white/80">
                      {r.director || "—"}
                    </div>

                    <div className="col-span-3 self-center text-[15px] text-white/80">
                      {r.company || "—"}
                    </div>

                    <div className="col-span-2 self-center pr-3 text-right text-[15px] text-white/70">
                      {r.location || "—"}
                    </div>
                  </div>

                  {i !== rows.length - 1 && (
                    <div className="h-px w-full bg-white/10" />
                  )}
                </div>
              ))}

              {rows.length === 0 && (
                <div className="py-14 text-sm text-white/60">
                  No credits found. (Your data file may be exporting a different
                  shape — paste `src/data/credits.ts` here and I’ll align it.)
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}