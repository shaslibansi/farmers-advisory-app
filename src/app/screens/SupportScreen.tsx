import { Phone, MapPin, Building2, ShieldAlert } from "lucide-react";
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <div
              key={c.office}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-[#e5e7eb]"
            >
              <div className="h-1.5 bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a]" />

              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5 text-[#0f6b3a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] break-words">{c.office}</p>
                    {c.contact && (
                      <p className="text-xs text-[#6b7280] mt-0.5">{c.contact}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-[#6b7280] bg-[#f9fafb] rounded-xl px-3 py-2.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0f6b3a]" />
                  <span className="leading-relaxed">{c.address}</span>
                </div>

                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] text-white font-bold text-sm py-3 rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="truncate">{c.phone}</span>
                </a>

                {c.fb && (
                  <a
                    href={`https://${c.fb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white text-[#0f6b3a] font-semibold text-sm py-2.5 rounded-xl border-2 border-[#e5e7eb] hover:border-[#0f6b3a]/30 hover:bg-[#f0fdf4] transition-all active:scale-[0.98]"
                  >
                    <span className="text-base">📘</span>
                    <span>Facebook Page</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl shadow-sm overflow-hidden border border-red-200">
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-bold text-white">Emergency / Kalamidad</p>
          </div>
          <div className="bg-red-50 px-4 py-3 space-y-2">
            {[
              { label: "NDRRMC Hotline", phone: "911", icon: "🚨" },
              { label: "PhilRice Hotline", phone: "+63 44 456 0285", icon: "📞" },
              { label: "DA Disaster Hotline", phone: "+63 2 8920 4030", icon: "📞" },
            ].map((e) => (
              <a
                key={e.label}
                href={`tel:${e.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-red-100 hover:shadow-sm hover:border-red-200 transition-all active:scale-[0.98]"
              >
                <span className="text-lg shrink-0">{e.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-[#111827]">{e.label}</p>
                  <p className="text-xs font-bold text-red-600 mt-0.5">{e.phone}</p>
                </div>
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
