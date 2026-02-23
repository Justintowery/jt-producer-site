import type { Metadata } from "next";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
};

type CreditRow = {
  client: string;
  director: string;
  company: string;
  location: string;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function pickFirstString(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim().length) return v.trim();
  }
  return "";
}

/**
 * Normalizes whatever "@/data/credits" exports into a clean CreditRow[].
 * Handles:
 * - array of objects with client/director/company/location
 * - array of strings
 * - objects with alternate keys (productionCompany, production, partner, etc.)
 */
function normalizeCredits(input: unknown): CreditRow[] {
  if (!Array.isArray(input)) return [];

  return input.map((item) => {
    // Case 1: string row
    if (typeof item === "string") {
      const s = item.trim();
      return {
        client: s,
        director: "",
        company: "",
        location: "",
      };
    }

    // Case 2: object row
    if (item && typeof item === "object") {
      const obj = item as Record<string, unknown>;

      const client = pickFirstString(obj, ["client", "Client", "brand", "Brand"]);
      const director = pickFirstString(obj, [
        "director",
        "Director",
        "dir",
        "Dir",
      ]);

      // Company / Production partner can be named many ways
      const company = pickFirstString(obj, [
        "company",
        "Company",
        "productionCompany",
        "production_company",
        "production",
        "Production",
        "prodCompany",
        "partner",
        "productionPartner",
      ]);

      const location = pickFirstString(obj, [
        "location",
        "Location",
        "city",
        "City",
      ]);

      return {
        client,
        director,
        company,
        location,
      };
    }

    // Fallback
    return {
      client: "",
      director: "",
      company: "",
      location: "",
    };
  });
}

export default function CreditsPage() {
  const rows: CreditRow[] = normalizeCredits(credits);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="w-full px-8 sm:px-12 pb-24 pt-32">
        {/* Page Label */}
        <p className="text-xs uppercase tracking-[0.45em] text-white/60">
          Credits
        </p>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/15" />

        {/* Table */}
        <div className="mt-10">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-6 pb-5 text-[11px] uppercase tracking-[0.38em] text-white/50">
            <div className="col-span-4 pl-1">Client</div>
            <div className="col-span-3">Director</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2 text-right pr-1">Location</div>
          </div>

          <div className="h-px w-full bg-white/15" />

          {/* Rows */}
          <div>
            {rows.map((r, i) => {
              const keyBase =
                (r.client && r.client.trim()) || `credit-row-${i}`;

              return (
                <div key={`${keyBase}-${i}`}>
                  <div className="grid grid-cols-12 gap-6 py-9">
                    <div className="col-span-4 pl-1 text-[18px] sm:text-xl font-medium tracking-wide text-white">
                      {asString(r.client).trim() || "—"}
                    </div>

                    <div className="col-span-3 self-center text-base text-white/80">
                      {asString(r.director).trim() || "—"}
                    </div>

                    <div className="col-span-3 self-center text-base text-white/80">
                      {asString(r.company).trim() || "—"}
                    </div>

                    <div className="col-span-2 self-center text-right pr-1 text-base text-white/70">
                      {asString(r.location).trim() || "—"}
                    </div>
                  </div>

                  {i !== rows.length - 1 && (
                    <div className="h-px w-full bg-white/10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}