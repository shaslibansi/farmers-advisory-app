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
    <div className="min-h-screen md:min-h-0 bg-white flex flex-col" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero */}
      <div className="bg-primary px-6 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl md:text-5xl">🌾</span>
          <div>
            <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight">BukidGabay</h1>
            <p className="text-green-200 text-sm md:text-base">{t.tagline}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 md:px-10 md:py-8 space-y-7 md:space-y-8">
        {/* Language Select */}
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t.selectLang}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all active:scale-95 ${
                  language === lang
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-foreground border-border hover:border-primary/40"
                }`}
              >
                {LANG_NATIVE[lang]}
              </button>
            ))}
          </div>
        </section>

        {/* Location */}
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t.selectLoc}
          </p>
          <div className="space-y-3 md:flex md:space-y-0 md:gap-3">
            <div className="relative">
              <select
                value={region}
                onChange={(e) => { setRegion(e.target.value); setMunicipality(""); }}
                className="w-full appearance-none bg-muted border border-border rounded-xl px-4 py-3 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{t.selectRegion}</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                disabled={municipalities.length === 0}
                className="w-full appearance-none bg-muted border border-border rounded-xl px-4 py-3 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="">{t.selectMunicipality}</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Proceed */}
        <button
          onClick={onProceed}
          disabled={!canProceed}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-green-200"
        >
          {t.proceed}
        </button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          BukidGabay · Dept. of Agriculture Philippines
        </p>
      </div>
    </div>
  );
}
