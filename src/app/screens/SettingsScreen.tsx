import { MapPin, ArrowLeft, Languages } from "lucide-react";
import type { Language } from "../types";
import { LANGUAGES, LANG_NATIVE, T } from "../data/translations";
import { REGIONS, MUNICIPALITIES } from "../data/regions";

export default function SettingsScreen({
  language, setLanguage, region, setRegion, municipality, setMunicipality, onBack, onRestart,
}: {
  language: Language;
  setLanguage: (l: Language) => void;
  region: string;
  setRegion: (r: string) => void;
  municipality: string;
  setMunicipality: (m: string) => void;
  onBack: () => void;
  onRestart: () => void;
}) {
  const t = T[language];
  const municipalities = MUNICIPALITIES[region] ?? [];

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafbfa] pb-6">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-4 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white text-lg md:text-xl font-bold">Settings</h2>
      </div>

      <div className="px-4 py-4 md:px-8 md:py-6 space-y-6">
        <section className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-4 h-4 text-[#0f6b3a]" />
            <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest">
              {t.selectLang}
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all active:scale-[0.97] min-h-[44px] ${
                  language === lang
                    ? "bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] text-white border-transparent shadow-md"
                    : "bg-white text-[#111827] border-[#e5e7eb] hover:border-[#0f6b3a]/30 shadow-sm"
                }`}
              >
                {LANG_NATIVE[lang]}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#0f6b3a]" />
            <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest">
              {t.selectLoc}
            </p>
          </div>
          <div className="space-y-3 md:flex md:space-y-0 md:gap-3">
            <div className="relative flex-1">
              <select
                value={region}
                onChange={(e) => { setRegion(e.target.value); setMunicipality(""); }}
                className="w-full appearance-none bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 pr-10 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0f6b3a] shadow-sm"
              >
                <option value="">{t.selectRegion}</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>

            <div className="relative flex-1">
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                disabled={municipalities.length === 0}
                className="w-full appearance-none bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3 pr-10 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0f6b3a] shadow-sm disabled:opacity-50"
              >
                <option value="">{t.selectMunicipality}</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>
          </div>
        </section>

        <div className="border-t border-[#e5e7eb] pt-6">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm py-3 rounded-xl hover:shadow-md transition-all active:scale-[0.98]"
          >
            Restart Onboarding
          </button>
          <p className="text-xs text-[#6b7280] text-center mt-2">
            This will clear your saved settings and return to the welcome screen.
          </p>
        </div>
      </div>
    </div>
  );
}
