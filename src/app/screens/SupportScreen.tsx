import { useState } from "react";
import { Phone, MapPin, Building2, ShieldAlert, Search, ExternalLink, MessageSquare, AlertCircle } from "lucide-react";
import { MAO_CONTACTS, DEFAULT_MAO } from "../data/contacts";

export default function SupportScreen({ t, region }: { t: Record<string, string>; region: string }) {
  const [activeTab, setActiveTab] = useState<"mao" | "emergency">("mao");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = MAO_CONTACTS[region] ?? DEFAULT_MAO;

  // Localized helpers derived from language text
  const isIlokano = t.maoHeader.includes("nga");
  const isTagalog = t.maoHeader.includes("na");
  const emergencyLabel = isIlokano
    ? "Emerhensia ken Kalamidad"
    : isTagalog
    ? "Kalamidad at Emergency"
    : "Emergency & Disasters";
  const searchPlaceholder = isIlokano
    ? "Biruken ti opisina..."
    : isTagalog
    ? "Maghanap ng tanggapan..."
    : "Search office...";

  // Filtering local offices based on search query
  const filteredContacts = contacts.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.office.toLowerCase().includes(query) ||
      c.address.toLowerCase().includes(query) ||
      c.contact.toLowerCase().includes(query)
    );
  });

  // Comprehensive agricultural & national emergency list
  const emergencyHotlines = [
    {
      category: isIlokano ? "Pang-Agrikultura ken Panawen" : isTagalog ? "Pang-Agrikultura at Panahon" : "Agriculture & Weather",
      items: [
        {
          label: "PhilRice Farmers' Text Center",
          phone: "0917-111-7423",
          desc: isIlokano ? "Advisory iti bin-i ken pagay" : isTagalog ? "Payo sa binhi at palay" : "Rice seeds & farming advisories",
          icon: "🌾",
        },
        {
          label: "DA Disaster DRRM Operations",
          phone: "+63 2 8920 4030",
          desc: isIlokano ? "Tulong ken reporting ti perdi ti apit" : isTagalog ? "Tulong at ulat sa pinsala ng pananim" : "Crop damage reporting & assistance",
          icon: "🚜",
        },
        {
          label: "PAGASA Weather Updates",
          phone: "(02) 8284-0800",
          desc: isIlokano ? "Bannawag ti bagyo ken layus" : isTagalog ? "Babala sa bagyo at baha" : "Typhoon & flood warnings",
          icon: "🌦️",
        },
        {
          label: "NDRRMC Operations Center",
          phone: "(02) 8911-1406",
          desc: isIlokano ? "Nailian a pannakaisalakan ken disaster" : isTagalog ? "Pambansang pagsagip at kalamidad" : "National rescue coordination",
          icon: "🚨",
        },
      ],
    },
    {
      category: isIlokano ? "Medikal ken Seguridad" : isTagalog ? "Medikal at Seguridad" : "Medical & Public Safety",
      items: [
        {
          label: "National Emergency Hotline",
          phone: "911",
          desc: isIlokano ? "Pulis, Bumbero, ken Ambulansia" : isTagalog ? "Pulis, Bumbero, at Ambulansya" : "Police, Fire, & Ambulance",
          icon: "🚑",
        },
        {
          label: "Philippine Red Cross",
          phone: "143",
          desc: isIlokano ? "First-aid ken tulong medikal" : isTagalog ? "Unang lunas at tulong medikal" : "First-aid & emergency rescue",
          icon: "❤️",
        },
        {
          label: "Bureau of Fire Protection",
          phone: "(02) 8426-0219",
          desc: isIlokano ? "Uray ken rescue operations" : isTagalog ? "Sunog at operasyong pagsagip" : "Fire emergencies",
          icon: "🚒",
        },
        {
          label: "Philippine National Police",
          phone: "117",
          desc: isIlokano ? "Seguridad ken kappia" : isTagalog ? "Seguridad at kapayapaan" : "Local law enforcement",
          icon: "👮",
        },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafbfa] pb-20 md:pb-6">
      {/* ── Top Header & Tab Pills ─────────────────────────── */}
      <div className="bg-white border-b border-[#e5e7eb] px-4 py-6 md:px-8 md:py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-[#111827] text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <span className="text-[#0f6b3a]">📞</span> {t.maoHeader}
            </h2>
            <p className="text-[#6b7280] text-sm mt-1">{t.maoSubhead}</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 self-start md:self-auto border border-[#e5e7eb]/80">
            <button
              onClick={() => setActiveTab("mao")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "mao"
                  ? "bg-[#0f6b3a] text-white shadow-md"
                  : "text-[#6b7280] hover:text-[#111827] hover:bg-slate-200/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.maoHeader}</span>
            </button>
            <button
              onClick={() => setActiveTab("emergency")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === "emergency"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-[#6b7280] hover:text-red-600 hover:bg-slate-200/50"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{emergencyLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:px-8">
        {/* ── Tab 1: Local Municipal Agriculture Offices (MAO) ── */}
        {activeTab === "mao" && (
          <div className="space-y-6">
            {/* Search filter */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#e5e7eb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0f6b3a] focus:border-transparent transition-all shadow-sm hover:border-slate-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Contacts Grid */}
            {filteredContacts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {filteredContacts.map((c) => (
                  <div
                    key={c.office}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-[#e5e7eb]/80 transition-all duration-200 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-5 flex-1 flex flex-col gap-4">
                      {/* Top Branding Row */}
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#111827] truncate">{c.office}</h4>
                        <p className="text-xs text-[#6b7280] font-medium mt-0.5">{c.contact}</p>
                      </div>

                      {/* Address detail */}
                      <div className="flex items-start gap-2.5 text-xs text-[#4b5563] bg-[#f9fafb] rounded-2xl px-4 py-3 border border-slate-100/60 leading-relaxed mt-auto">
                        <MapPin className="w-4 h-4 shrink-0 text-[#0f6b3a] mt-0.5" />
                        <span>{c.address}</span>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="bg-slate-50 border-t border-[#e5e7eb]/70 p-4 flex gap-2">
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] text-white font-bold text-xs py-2.5 px-4 rounded-xl hover:shadow-md transition-all active:scale-[0.98] flex-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Office</span>
                      </a>
                      {c.fb && (
                        <a
                          href={`https://${c.fb}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-white text-[#1877f2] border border-[#e5e7eb] hover:bg-slate-100/50 font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] flex-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#e5e7eb] rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#111827]">{t.noResults}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 2: Categorized Emergency / Disaster Hotlines ── */}
        {activeTab === "emergency" && (
          <div className="space-y-8">
            {emergencyHotlines.map((sec) => (
              <div key={sec.category} className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                  {sec.category}
                </h3>
                <div className="grid gap-4 ">
                  {sec.items.map((e) => (
                    <a
                      key={e.label}
                      href={`tel:${e.phone.replace(/\s/g, "")}`}
                      className="group block bg-white rounded-3xl p-5 border border-[#e5e7eb]/80 hover:border-red-200 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#111827] group-hover:text-red-700 transition-colors">
                          {e.label}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1.5">
                          {e.desc}
                        </p>
                        <p className="text-sm font-extrabold text-red-600 mt-2.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{e.phone}</span>
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Disaster Advisory Tip Card */}
           
          </div>
        )}
      </div>
    </div>
  );
}
