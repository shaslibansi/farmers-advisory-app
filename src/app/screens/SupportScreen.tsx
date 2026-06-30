import { Phone, MapPin } from "lucide-react";
import { MAO_CONTACTS, DEFAULT_MAO } from "../data/contacts";

export default function SupportScreen({ t, region }: { t: Record<string, string>; region: string }) {
  const contacts = MAO_CONTACTS[region] ?? DEFAULT_MAO;

  return (
    <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-primary px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5">
        <h2 className="text-white text-lg md:text-xl font-bold">{t.maoHeader}</h2>
        <p className="text-green-200 text-sm mt-0.5">{t.maoSubhead}</p>
      </div>

      <div className="px-4 py-4 md:px-8 md:py-6 md:max-w-5xl">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <div key={c.office} className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-lg">🏛️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground leading-tight">{c.office}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.contact}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {c.address}
              </div>

              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold text-sm py-3 rounded-xl active:bg-green-700 transition-colors shadow-sm shadow-green-200"
              >
                <Phone className="w-4 h-4" />
                {t.tapCall} — {c.phone}
              </a>

              {c.fb && (
                <a
                  href={`https://${c.fb}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-secondary text-primary font-semibold text-sm py-2.5 rounded-xl border border-green-200 active:bg-green-100 transition-colors"
                >
                  <span className="text-base">📘</span>
                  Facebook Page
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-4 md:mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🚨</span>
            <p className="text-sm font-bold text-red-800">Emergency / Kalamidad</p>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {[
              { label: "NDRRMC Hotline", phone: "911" },
              { label: "PhilRice Hotline", phone: "+63 44 456 0285" },
              { label: "DA Disaster Hotline", phone: "+63 2 8920 4030" },
            ].map((e) => (
              <a
                key={e.label}
                href={`tel:${e.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-red-100 active:bg-red-50"
              >
                <span className="text-sm font-semibold text-foreground">{e.label}</span>
                <span className="text-sm font-bold text-red-600">{e.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
