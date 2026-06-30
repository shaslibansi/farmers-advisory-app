import { useState } from "react";
import { MapPin, Bell, AlertTriangle, X, ChevronRight } from "lucide-react";
import { WEATHER } from "../data/weather";

export default function DashboardScreen({
  t, municipality, region,
}: {
  t: Record<string, string>;
  municipality: string;
  region: string;
}) {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafbfa] pb-20 md:pb-0">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5 flex items-start justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-green-300" />
            <span className="text-green-200 text-xs md:text-sm font-medium">{municipality || region}</span>
          </div>
          <h2 className="text-white text-lg md:text-xl font-bold">{t.advisories}</h2>
        </div>
        <button
          onClick={() => setAlertDismissed(false)}
          className="mt-1 relative p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="View alerts"
        >
          <Bell className="w-5 h-5 text-white" />
          {!alertDismissed && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-[#0f6b3a]" />
          )}
        </button>
      </div>

      <div className="px-4 py-4 md:px-8 md:py-6 space-y-4 md:space-y-6">
        {!alertDismissed && (
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl p-4 md:p-5 flex gap-3 shadow-md">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-red-200 mb-1">{t.alertTitle}</p>
              <p className="text-sm md:text-base leading-snug">{t.alertMsg}</p>
            </div>
            <button onClick={() => setAlertDismissed(true)} className="shrink-0 p-1 rounded-lg hover:bg-red-500/50 transition-colors">
              <X className="w-4 h-4 text-red-200" />
            </button>
          </div>
        )}

        <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
          <section>
            <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">{t.weatherTitle}</h3>
            <div className="grid grid-cols-3 gap-3">
              {WEATHER.map((w) => (
                <div
                  key={w.day}
                  className={`rounded-2xl p-3 md:p-4 text-center border shadow-sm hover:shadow-md transition-shadow ${
                    w.warn ? "bg-white border-amber-200" : "bg-white border-[#e5e7eb]"
                  }`}
                >
                  <p className="text-2xl md:text-3xl mb-1">{w.icon}</p>
                  <p className="text-base md:text-lg font-bold text-[#111827]">{w.temp}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5">{w.desc}</p>
                  <p className="text-xs font-semibold text-[#111827] mt-1">{w.day}</p>
                  {w.warn && (
                    <span className="inline-block mt-1.5 text-[10px] font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full shadow-sm">⚠️ Alerto</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-[#e5e7eb] rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl md:text-2xl">📅</span>
              <h3 className="text-sm md:text-base font-bold text-[#0f6b3a]">{t.calendarTitle}</h3>
            </div>
            <p className="text-sm md:text-base text-[#111827] leading-relaxed">{t.calendarBody}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["🌾 Pagasa 7", "🌾 NSIC Rc 222", "🌾 Tubigan 18"].map((v) => (
                <span key={v} className="text-xs bg-[#f0fdf4] text-[#0f6b3a] font-semibold px-2.5 py-1 rounded-full">{v}</span>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">DA Bulletins</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🐛", color: "yellow", title: "Pest Watch: Brown Planthopper", date: "Hunyo 25, 2026" },
              { icon: "💧", color: "blue", title: "Irigasyon: Magdrain bago mag-typhoon", date: "Hunyo 23, 2026" },
              { icon: "✅", color: "green", title: "RCEF Vouchers: Panahon na ng pag-claim", date: "Hunyo 20, 2026" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-white border border-[#e5e7eb] rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] leading-snug">{item.title}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5">{item.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6b7280] shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
