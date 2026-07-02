import { MapPin } from "lucide-react";
import type { Language } from "../types";
import { LANGUAGES, LANG_NATIVE, T } from "../data/translations";
import { REGIONS, MUNICIPALITIES } from "../data/regions";

export default function OnboardingScreen({
  language, setLanguage, region, setRegion, municipality, setMunicipality, onProceed,
}: {
  language: Language;
  setLanguage: (l: Language) => void;
  region: string;
  setRegion: (r: string) => void;
  municipality: string;
  setMunicipality: (m: string) => void;
  onProceed: () => void;
}) {
  const t = T[language];
  const canProceed = region !== "" && municipality !== "";
  const municipalities = MUNICIPALITIES[region] ?? [];

  return (
    <div className="min-h-screen md:min-h-0 bg-white flex flex-col">
      <div className="bg-gradient-to-br from-[#0f6b3a] via-[#0f6b3a] to-[#1a8a4a] px-6 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="text-center mb-2 relative z-10">
          <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight">FieldLink</h1>
          <p className="text-green-200 text-sm md:text-base mt-1">{t.tagline}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-8 space-y-7 md:space-y-8">
        <section>
          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">
            {t.selectLang}
          </p>
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

        <section>
          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">
            {t.selectLoc}
          </p>
          <div className="space-y-3 md:flex md:space-y-0 md:gap-3">
            <div className="relative flex-1">
              <label htmlFor="onboarding-region" className="sr-only">{t.selectRegion}</label>
              <select
                id="onboarding-region"
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
              <label htmlFor="onboarding-municipality" className="sr-only">{t.selectMunicipality}</label>
              <select
                id="onboarding-municipality"
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

        <button
          onClick={onProceed}
          disabled={!canProceed}
          className="w-full bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {t.proceed}
        </button>

        <p className="text-center text-xs text-[#6b7280] pb-4">
          FieldLink
        </p>
      </div>
    </div>
  );
}
