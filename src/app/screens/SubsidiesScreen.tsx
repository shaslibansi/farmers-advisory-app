import { useState, useMemo } from "react";
import { Search, X, RefreshCw } from "lucide-react";
import { SUBSIDIES } from "../data/subsidies";
import { STATUS_STYLES, STATUS_DOT } from "../types";
import type { SubsidyTab } from "../types";

const MONTHS_FIL = [
  "Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo",
  "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre",
];

function formattedDate() {
  const d = new Date();
  const month = MONTHS_FIL[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export default function SubsidiesScreen({ t }: { t: Record<string, string> }) {
  const [tab, setTab] = useState<SubsidyTab>("active");
  const [query, setQuery] = useState("");

  const items = SUBSIDIES[tab];
  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.commodity.toLowerCase().includes(q) ||
        s.requirements.toLowerCase().includes(q)
    );
  }, [items, query]);

  const tabs: { key: SubsidyTab; label: string }[] = [
    { key: "active", label: t.active },
    { key: "upcoming", label: t.upcoming },
    { key: "completed", label: t.completed },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden pb-6">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4 shadow-sm">
        <h2 className="text-white text-lg md:text-xl font-bold mb-3">{t.subsidiesLabel} & Vouchers</h2>
        <div className="relative md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/95 backdrop-blur-sm rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-[#6b7280]" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border-b border-border flex md:px-8 shadow-sm" role="tablist">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-sm font-semibold transition-all min-h-[44px] relative ${
              tab === key
                ? "text-[#0f6b3a]"
                : "text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            {label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === key ? "bg-[#0f6b3a] text-white" : "bg-[#f3f4f6] text-[#6b7280]"}`}>
              {SUBSIDIES[key].length}
            </span>
            {tab === key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a]" />
            )}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" className="flex-1 overflow-y-auto px-4 py-3 md:px-8 md:py-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-[#6b7280] text-sm">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s) => (
              <div key={s.name} className="bg-white border border-[#e5e7eb] rounded-2xl p-4 space-y-2.5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] leading-snug">{s.name}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5">{s.commodity}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border ${STATUS_STYLES[s.statusType]}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[s.statusType]}`} />
                  {s.status}
                </div>

                <div className="space-y-1.5">
                  <div className="flex gap-2 text-xs">
                    <span className="text-[#6b7280] shrink-0 font-medium">{t.requirements}:</span>
                    <span className="text-[#111827]">{s.requirements}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-[#6b7280] shrink-0 font-medium">{t.deadline}:</span>
                    <span className="text-[#111827] font-semibold">{s.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 md:max-w-lg shadow-sm">
          <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">{t.dataAs} {formattedDate()}.</span> {t.disclaimer}.
          </p>
        </div>
      </div>
    </div>
  );
}
