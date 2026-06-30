import { useState, useMemo } from "react";
import { Search, X, RefreshCw } from "lucide-react";
import { SUBSIDIES } from "../data/subsidies";
import { STATUS_STYLES, STATUS_DOT } from "../types";
import type { SubsidyTab } from "../types";

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
    <div className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-primary px-4 pt-5 pb-3 md:px-8 md:pt-6 md:pb-4">
        <h2 className="text-white text-lg md:text-xl font-bold mb-3">{t.subsidiesLabel} & Vouchers</h2>
        <div className="relative md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border flex md:px-8">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {SUBSIDIES[key].length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-muted-foreground text-sm">{t.noResults}</p>
          </div>
        ) : (
          filtered.map((s) => (
            <div key={s.name} className="bg-card border border-border rounded-2xl p-4 space-y-2.5">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground leading-snug">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.commodity}</p>
                </div>
              </div>

              <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border ${STATUS_STYLES[s.statusType]}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[s.statusType]}`} />
                {s.status}
              </div>

              <div className="space-y-1.5">
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0 font-medium">{t.requirements}:</span>
                  <span className="text-foreground">{s.requirements}</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0 font-medium">{t.deadline}:</span>
                  <span className="text-foreground font-semibold">{s.deadline}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-1">
          <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">{t.dataAs} Hunyo 27, 2026.</span> {t.disclaimer}.
          </p>
        </div>
      </div>
    </div>
  );
}
