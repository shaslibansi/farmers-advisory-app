import { Phone, MapPin } from "lucide-react";
import { MAO_CONTACTS, DEFAULT_MAO } from "../data/contacts";

export default function SupportScreen({ t, region }: { t: Record<string, string>; region: string }) {
  const contacts = MAO_CONTACTS[region] ?? DEFAULT_MAO;

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafbfa] pb-20 md:pb-0">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5 shadow-sm">
        <h2 className="text-white text-lg md:text-xl font-bold">{t.maoHeader}</h2>
        <p className="text-green-200 text-sm mt-0.5">{t.maoSubhead}</p>
      </div>

      <div className="px-4 py-4 md:px-8 md:py-6 space-y-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <div key={c.office} className="bg-white border border-[#e5e7eb] rounded-2xl p-4 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0">
                  <span className="text-lg">🏛️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#111827] leading-tight">{c.office}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5">{c.contact}</p>
                </div>
              </div>

              <div className="text-xs text-[#6b7280] flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {c.address}
              </div>

              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] text-white font-bold text-sm py-3 rounded-xl hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                {t.tapCall} — {c.phone}
              </a>

              {c.fb && (
                <a
                  href={`https://${c.fb}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#f0fdf4] text-[#0f6b3a] font-semibold text-sm py-2.5 rounded-xl border border-[#e5e7eb] hover:bg-[#dcfce7] transition-all active:scale-[0.98]"
                >
                  <span className="text-base">📘</span>
                  Facebook Page
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 shadow-sm">
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
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-red-100 hover:shadow-sm transition-all active:scale-[0.98]"
              >
                <span className="text-sm font-semibold text-[#111827]">{e.label}</span>
                <span className="text-sm font-bold text-red-600">{e.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
