import { useState, useMemo } from "react";
import { Phone, Home, Bell, Search, MapPin, X, AlertTriangle, FileText, Headphones, ChevronRight, RefreshCw } from "lucide-react";

type Language = "Tagalog" | "Ilocano" | "Hiligaynon" | "Cebuano" | "Bikol" | "Waray";
type Screen = "dashboard" | "subsidies" | "support";
type SubsidyTab = "active" | "upcoming" | "completed";

const LANGUAGES: Language[] = ["Tagalog", "Ilocano", "Hiligaynon", "Cebuano", "Bikol", "Waray"];

const LANG_NATIVE: Record<Language, string> = {
  Tagalog: "Tagalog",
  Ilocano: "Ilokano",
  Hiligaynon: "Hiligaynon",
  Cebuano: "Bisaya",
  Bikol: "Bikolano",
  Waray: "Winaray",
};

const T: Record<Language, Record<string, string>> = {
  Tagalog: {
    proceed: "Pumasok / Magpatuloy",
    selectLang: "Piliin ang Wika",
    selectLoc: "Piliin ang Inyong Lokasyon",
    selectRegion: "Pumili ng Rehiyon",
    selectMunicipality: "Pumili ng Munisipyo",
    welcome: "Maligayang Pagdating",
    tagline: "Gabay ng Magsasaka",
    home: "Tahanan",
    subsidiesLabel: "Tulong",
    supportLabel: "Suporta",
    advisories: "Mga Paalala",
    weatherTitle: "Lagay ng Panahon",
    alertTitle: "PULANG ALERTO",
    alertMsg: "Naitalang paglusob ng Armyworm sa kalapit na bayan. Suriin ang inyong pananim.",
    dismiss: "Isara",
    calendarTitle: "Rekomendasyon ngayong Buwan",
    calendarBody: "Pinakamainam na magtanim ng Pagasa Rice Varieties. Ihanda ang lupa at binhi bago mag-ulan.",
    searchPlaceholder: "RSBSA numero o uri ng pananim...",
    active: "Aktibo",
    upcoming: "Paparating",
    completed: "Tapos Na",
    disclaimer: "I-verify sa inyong lokal na technician",
    dataAs: "Data hanggang",
    tapCall: "I-tap para Tumawag",
    maoHeader: "Lokal na Tanggapan",
    maoSubhead: "Direktang makipag-ugnayan sa inyong MAO",
    requirements: "Kinakailangan",
    deadline: "Deadline",
    status: "Katayuan",
    noResults: "Walang nahanap. Subukan ang ibang salita.",
  },
  Ilocano: {
    proceed: "Rumwar / Ituloy",
    selectLang: "Pilien ti Pagsasao",
    selectLoc: "Pilien ti Lokasyon",
    selectRegion: "Pilien ti Rehiyon",
    selectMunicipality: "Pilien ti Munisipyo",
    welcome: "Naimbag nga Isasangbay",
    tagline: "Panagbukel iti Nainget a Panagmula",
    home: "Balay",
    subsidiesLabel: "Suporta",
    supportLabel: "Tulong",
    advisories: "Mga Advisory",
    weatherTitle: "Kaestado ti Tiempo",
    alertTitle: "NALABAGA NGA ALERTO",
    alertMsg: "Nairehistro ti Armyworm iti asideg nga ili. Susimaen ti panagtanem.",
    dismiss: "Isardeng",
    calendarTitle: "Rekomendasyon iti Daytoy nga Bulan",
    calendarBody: "Umno ti panagmula iti Pagasa Rice Varieties. Ihanda ti daga ken bin-i sakbay ti ulan.",
    searchPlaceholder: "RSBSA numero wenno kita ti talon...",
    active: "Aktibo",
    upcoming: "Umay",
    completed: "Nalpas",
    disclaimer: "I-verify iti lokal a technician",
    dataAs: "Data agingga idi",
    tapCall: "I-tap tapno Tumawag",
    maoHeader: "Lokal nga Opisina",
    maoSubhead: "Direkta nga makipag-ugnayan iti MAO",
    requirements: "Kasapulan",
    deadline: "Palugit",
    status: "Kaadda",
    noResults: "Awan ti nakita. Suboken ti sabali.",
  },
  Hiligaynon: {
    proceed: "Sige / Magpadayon",
    selectLang: "Pilia ang Lenggwahe",
    selectLoc: "Pilia ang Lugar",
    selectRegion: "Pilia ang Rehiyon",
    selectMunicipality: "Pilia ang Munisipyo",
    welcome: "Malampuson nga Pag-abot",
    tagline: "Gabay sa Pagtanum",
    home: "Balay",
    subsidiesLabel: "Bulig",
    supportLabel: "Suporta",
    advisories: "Mga Paalala",
    weatherTitle: "Kahimtangan sang Panahon",
    alertTitle: "PULA NGA ALERTO",
    alertMsg: "Narepaso ang Armyworm sa silingan nga bayan. Tan-awa ang imo pananim.",
    dismiss: "Isira",
    calendarTitle: "Rekomendasyon Subong nga Bulan",
    calendarBody: "Pinakamaayo ang magtanum sang Pagasa Rice Varieties. Ihanda ang duta kag binhi antes mag-ulan.",
    searchPlaceholder: "RSBSA numero ukon klase sang pananim...",
    active: "Aktibo",
    upcoming: "Maabot",
    completed: "Natapos",
    disclaimer: "I-verify sa lokal nga technician",
    dataAs: "Datos hasta",
    tapCall: "I-tap para Tawgon",
    maoHeader: "Lokal nga Opisina",
    maoSubhead: "Direkta nga makipag-ugnayan sa MAO",
    requirements: "Kinahanglan",
    deadline: "Deadline",
    status: "Kahimtangan",
    noResults: "Wala nakita. Subukan ang iban.",
  },
  Cebuano: {
    proceed: "Sige / Padayon",
    selectLang: "Pilia ang Pinulongan",
    selectLoc: "Pilia ang Lokasyon",
    selectRegion: "Pilia ang Rehiyon",
    selectMunicipality: "Pilia ang Munisipyo",
    welcome: "Maayong Pagdating",
    tagline: "Gabay sa Pagtanum",
    home: "Balay",
    subsidiesLabel: "Tabang",
    supportLabel: "Suporta",
    advisories: "Mga Pahibalo",
    weatherTitle: "Kahimtang sa Panahon",
    alertTitle: "PULA NGA ALERTO",
    alertMsg: "Nagrehistro ang Armyworm sa silingang lungsod. Tan-awa ang imong tanom.",
    dismiss: "Isira",
    calendarTitle: "Rekomendasyon Niining Bulana",
    calendarBody: "Pinakamaayo ang magtanom ug Pagasa Rice Varieties. Andam ang yuta ug binhi sa dili pa mag-ulan.",
    searchPlaceholder: "RSBSA numero o klase sa tanom...",
    active: "Aktibo",
    upcoming: "Umaabot",
    completed: "Natapos",
    disclaimer: "I-verify sa lokal nga technician",
    dataAs: "Data hangtud",
    tapCall: "I-tap aron Tawagan",
    maoHeader: "Lokal nga Opisina",
    maoSubhead: "Direktang makipag-ugnayan sa MAO",
    requirements: "Kinahanglan",
    deadline: "Deadline",
    status: "Kahimtang",
    noResults: "Walay nakita. Sulayi ang lain.",
  },
  Bikol: {
    proceed: "Sige / Magpadagos",
    selectLang: "Pilia an Lenggwahe",
    selectLoc: "Pilia an Lokasyon",
    selectRegion: "Pilia an Rehiyon",
    selectMunicipality: "Pilia an Munisipyo",
    welcome: "Marhay na Pag-abot",
    tagline: "Gabay sa Pagtanom",
    home: "Harong",
    subsidiesLabel: "Tabang",
    supportLabel: "Suporta",
    advisories: "Mga Paalala",
    weatherTitle: "Kamugtakan kan Panahon",
    alertTitle: "PULANG ALERTO",
    alertMsg: "Naitala an Armyworm sa katabing bayan. Suruhon an saindong tanom.",
    dismiss: "Isara",
    calendarTitle: "Rekomendasyon Ngonyang Bulan",
    calendarBody: "Pinakamainam na magtanom nin Pagasa Rice Varieties. Ihanda an daga asin binhi bago mag-uran.",
    searchPlaceholder: "RSBSA numero o klase nin tanom...",
    active: "Aktibo",
    upcoming: "Madatong",
    completed: "Natapos",
    disclaimer: "I-verify sa lokal na technician",
    dataAs: "Data sagkod",
    tapCall: "I-tap para Tawagan",
    maoHeader: "Lokal na Opisina",
    maoSubhead: "Direktang makipag-ugnayan sa MAO",
    requirements: "Kinakailangan",
    deadline: "Deadline",
    status: "Kamugtakan",
    noResults: "Dai nakua. Subukan an iba.",
  },
  Waray: {
    proceed: "Sige / Padayon",
    selectLang: "Pilia an Lenggwahe",
    selectLoc: "Pilia an Lokasyon",
    selectRegion: "Pilia an Rehiyon",
    selectMunicipality: "Pilia an Munisipyo",
    welcome: "Maupay nga Pag-abot",
    tagline: "Gabay ha Pagtanum",
    home: "Balay",
    subsidiesLabel: "Bulig",
    supportLabel: "Suporta",
    advisories: "Mga Pahimangno",
    weatherTitle: "Kahimtangan han Panahon",
    alertTitle: "PULA NGA ALERTO",
    alertMsg: "Naitala an Armyworm ha silingganon nga bayan. Tan-awa an imo tanom.",
    dismiss: "Isira",
    calendarTitle: "Rekomendasyon Yana nga Bulan",
    calendarBody: "Pinakamaupay an magtanom hin Pagasa Rice Varieties. Andam an duta ngan binhi bago mag-uran.",
    searchPlaceholder: "RSBSA numero o klase han tanom...",
    active: "Aktibo",
    upcoming: "Umaabot",
    completed: "Natapos",
    disclaimer: "I-verify ha lokal nga technician",
    dataAs: "Data hasta",
    tapCall: "I-tap para Tawgon",
    maoHeader: "Lokal nga Opisina",
    maoSubhead: "Direkta nga makipag-ugnayan ha MAO",
    requirements: "Kinahanglan",
    deadline: "Deadline",
    status: "Kahimtangan",
    noResults: "Waray nakita. Subukan an iba.",
  },
};

const REGIONS = [
  "Region I – Ilocos",
  "Region II – Cagayan Valley",
  "Region III – Central Luzon",
  "Region IV-A – CALABARZON",
  "Region IV-B – MIMAROPA",
  "Region V – Bicol",
  "Region VI – Western Visayas",
  "Region VII – Central Visayas",
  "Region VIII – Eastern Visayas",
  "Region IX – Zamboanga Peninsula",
  "Region X – Northern Mindanao",
  "Region XI – Davao",
  "Region XII – SOCCSKSARGEN",
  "Region XIII – Caraga",
  "NCR – Metro Manila",
  "CAR – Cordillera",
  "BARMM – Bangsamoro",
];

const MUNICIPALITIES: Record<string, string[]> = {
  "Region VI – Western Visayas": ["Iloilo City", "Barotac Nuevo", "Dumangas", "Pototan", "San Miguel", "Cabatuan", "Sta. Barbara", "Passi City"],
  "Region VII – Central Visayas": ["Cebu City", "Danao City", "Consolacion", "Liloan", "Mandaue City", "Lapu-Lapu City", "Talisay City"],
  "Region I – Ilocos": ["Laoag City", "Vigan City", "Batac City", "San Nicolas", "Paoay", "Currimao", "Dingras"],
  "Region III – Central Luzon": ["San Fernando City", "Angeles City", "Tarlac City", "Cabanatuan City", "Gapan City", "Muñoz City"],
  "Region V – Bicol": ["Legazpi City", "Naga City", "Sorsogon City", "Tabaco City", "Ligao City", "Daraga"],
  "Region VIII – Eastern Visayas": ["Tacloban City", "Ormoc City", "Borongan City", "Maasin City", "Catbalogan City"],
  "Region XI – Davao": ["Davao City", "Tagum City", "Panabo City", "Digos City", "Mati City", "Samal City"],
  "Region IV-A – CALABARZON": ["Antipolo City", "Calamba City", "Santa Rosa City", "Batangas City", "Lucena City"],
  "Region II – Cagayan Valley": ["Tuguegarao City", "Cauayan City", "Santiago City", "Ilagan City"],
  "Region X – Northern Mindanao": ["Cagayan de Oro City", "Iligan City", "Ozamiz City", "Gingoog City"],
};

const MAO_CONTACTS: Record<string, { office: string; contact: string; phone: string; fb?: string; address: string }[]> = {
  "Region VI – Western Visayas": [
    { office: "Iloilo City MAO", contact: "Engr. Maria C. Santos", phone: "+63 33 336 0013", fb: "fb.com/IloiloCityMAO", address: "Gen. Luna St., Iloilo City, 5000" },
    { office: "Barotac Nuevo MAO", contact: "Agri. Tech. Juan B. Reyes", phone: "+63 33 323 4567", address: "Municipal Hall, Barotac Nuevo, Iloilo" },
    { office: "Dumangas MAO", contact: "Agri. Tech. Rosa M. Diaz", phone: "+63 33 320 1234", address: "Poblacion, Dumangas, Iloilo" },
  ],
  "Region VII – Central Visayas": [
    { office: "Cebu City MAO", contact: "Engr. Pedro L. Villanueva", phone: "+63 32 255 6789", fb: "fb.com/CebuCityMAO", address: "City Hall Complex, Osmeña Blvd., Cebu City" },
    { office: "Danao City MAO", contact: "Agri. Tech. Lita A. Cruz", phone: "+63 32 200 3456", address: "Danao City Hall, Cebu" },
  ],
  "Region I – Ilocos": [
    { office: "Laoag City MAO", contact: "Engr. Ben A. Marcos", phone: "+63 77 771 3456", address: "City Hall, Laoag City, 2900" },
    { office: "Vigan City MAO", contact: "Agri. Tech. Gloria T. Abad", phone: "+63 77 722 1234", address: "Heritage City of Vigan, Ilocos Sur" },
  ],
  "Region V – Bicol": [
    { office: "Legazpi City MAO", contact: "Engr. Carlos R. Luna", phone: "+63 52 480 7890", address: "City Hall, Legazpi City, 4500" },
    { office: "Naga City MAO", contact: "Agri. Tech. Ana P. Torres", phone: "+63 54 472 3456", address: "City Hall, Naga City, 4400" },
  ],
};

const DEFAULT_MAO = [
  { office: "DA National Hotline", contact: "Information Desk", phone: "1800-10-2345", fb: "fb.com/DA.Philippines", address: "Elliptical Road, Diliman, Quezon City" },
  { office: "DA Regional Operations Center", contact: "Operations Officer", phone: "+63 2 8920 4030", address: "DA Building, Diliman, QC 1100" },
];

const SUBSIDIES = {
  active: [
    {
      icon: "🌾",
      name: "Rice Competitiveness Enhancement Fund (RCEF)",
      status: "Namamahagi ng Voucher sa Brgy. Hall",
      statusType: "green" as const,
      requirements: "RSBSA ID, Valid Gov't ID, Farm Map",
      commodity: "Palay",
      deadline: "Hulyo 31, 2026",
    },
    {
      icon: "💊",
      name: "Fertilizer Subsidy Program (FSP)",
      status: "Available — 50kg bawat magsasaka",
      statusType: "green" as const,
      requirements: "RSBSA ID, Barangay Certificate",
      commodity: "Lahat ng pananim",
      deadline: "Patuloy",
    },
    {
      icon: "🌽",
      name: "Hybrid Corn Seed Distribution",
      status: "Ina-update ang data — Makipag-ugnayan sa MAO",
      statusType: "yellow" as const,
      requirements: "RSBSA ID, Planting Declaration Form",
      commodity: "Mais",
      deadline: "Agosto 15, 2026",
    },
  ],
  upcoming: [
    {
      icon: "🥬",
      name: "High-Value Crops Dev. Program (HVCDP)",
      status: "Naghihintay ng Budget Release mula Rehiyon",
      statusType: "yellow" as const,
      requirements: "RSBSA ID, Crop Production Plan",
      commodity: "Gulay / HVC",
      deadline: "TBD",
    },
    {
      icon: "🐟",
      name: "Fisheries Livelihood Program",
      status: "Bubukas ang Rehistrasyon: Agosto 1, 2026",
      statusType: "blue" as const,
      requirements: "FishR ID, Valid ID, BFAR Registration",
      commodity: "Pangingisda",
      deadline: "Setyembre 30, 2026",
    },
  ],
  completed: [
    {
      icon: "🌱",
      name: "Inbred Rice Seed Distribution Q1 2026",
      status: "Natapos — Marso 2026",
      statusType: "gray" as const,
      requirements: "N/A",
      commodity: "Palay",
      deadline: "Marso 31, 2026",
    },
    {
      icon: "💰",
      name: "SURE Aid & Recovery Program",
      status: "Natapos — Disyembre 2025",
      statusType: "gray" as const,
      requirements: "N/A",
      commodity: "Lahat ng pananim",
      deadline: "Disyembre 31, 2025",
    },
  ],
};

const WEATHER = [
  { day: "Ngayon", icon: "⛈️", temp: "29°C", desc: "Maulan", warn: true },
  { day: "Bukas", icon: "🌤️", temp: "32°C", desc: "Partly Cloudy", warn: false },
  { day: "Makalawa", icon: "☀️", temp: "34°C", desc: "Mainit", warn: false },
];

const STATUS_STYLES = {
  green: "bg-green-100 text-green-800 border-green-200",
  yellow: "bg-amber-100 text-amber-800 border-amber-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  red: "bg-red-100 text-red-800 border-red-200",
  gray: "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_DOT = {
  green: "bg-green-500",
  yellow: "bg-amber-400",
  blue: "bg-blue-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
};

// ─── Onboarding ───────────────────────────────────────────────────────────────

function OnboardingScreen({
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
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero */}
      <div className="bg-primary px-6 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🌾</span>
          <div>
            <h1 className="text-white text-2xl font-bold leading-tight">BukidGabay</h1>
            <p className="text-green-200 text-sm">{t.tagline}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7">
        {/* Language Select */}
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t.selectLang}
          </p>
          <div className="grid grid-cols-3 gap-2">
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
          <div className="space-y-3">
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

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardScreen({
  t, municipality, region, language,
}: {
  t: Record<string, string>;
  municipality: string;
  region: string;
  language: Language;
}) {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 pt-5 pb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-green-300" />
            <span className="text-green-200 text-xs font-medium">{municipality || region}</span>
          </div>
          <h2 className="text-white text-lg font-bold">{t.advisories}</h2>
        </div>
        <button className="mt-1 relative p-2 bg-white/10 rounded-xl">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Red Alert Banner */}
        {!alertDismissed && (
          <div className="bg-red-600 text-white rounded-2xl p-4 flex gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-red-200 mb-1">{t.alertTitle}</p>
              <p className="text-sm leading-snug">{t.alertMsg}</p>
            </div>
            <button onClick={() => setAlertDismissed(true)} className="shrink-0 p-1 rounded-lg hover:bg-red-500 transition-colors">
              <X className="w-4 h-4 text-red-200" />
            </button>
          </div>
        )}

        {/* Weather Widget */}
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">{t.weatherTitle}</h3>
          <div className="grid grid-cols-3 gap-2">
            {WEATHER.map((w) => (
              <div
                key={w.day}
                className={`rounded-2xl p-3 text-center border ${w.warn ? "bg-amber-50 border-amber-200" : "bg-card border-border"}`}
              >
                <p className="text-2xl mb-1">{w.icon}</p>
                <p className="text-base font-bold text-foreground">{w.temp}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{w.desc}</p>
                <p className="text-xs font-semibold text-foreground mt-1">{w.day}</p>
                {w.warn && (
                  <span className="inline-block mt-1.5 text-[10px] font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full">⚠️ Alerto</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Planting Calendar */}
        <section className="bg-secondary border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📅</span>
            <h3 className="text-sm font-bold text-primary">{t.calendarTitle}</h3>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{t.calendarBody}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["🌾 Pagasa 7", "🌾 NSIC Rc 222", "🌾 Tubigan 18"].map((v) => (
              <span key={v} className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full">{v}</span>
            ))}
          </div>
        </section>

        {/* DA Advisory Feed */}
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">DA Bulletins</h3>
          <div className="space-y-2">
            {[
              { icon: "🐛", color: "yellow", title: "Pest Watch: Brown Planthopper", date: "Hunyo 25, 2026" },
              { icon: "💧", color: "blue", title: "Irigasyon: Magdrain bago mag-typhoon", date: "Hunyo 23, 2026" },
              { icon: "✅", color: "green", title: "RCEF Vouchers: Panahon na ng pag-claim", date: "Hunyo 20, 2026" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Subsidies ────────────────────────────────────────────────────────────────

function SubsidiesScreen({ t }: { t: Record<string, string> }) {
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
    <div className="flex-1 flex flex-col overflow-hidden pb-20">
      {/* Header */}
      <div className="bg-primary px-4 pt-5 pb-3">
        <h2 className="text-white text-lg font-bold mb-3">{t.subsidiesLabel} & Vouchers</h2>
        <div className="relative">
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
      <div className="bg-white border-b border-border flex">
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

// ─── Support ──────────────────────────────────────────────────────────────────

function SupportScreen({ t, region }: { t: Record<string, string>; region: string }) {
  const contacts = MAO_CONTACTS[region] ?? DEFAULT_MAO;

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-primary px-4 pt-5 pb-4">
        <h2 className="text-white text-lg font-bold">{t.maoHeader}</h2>
        <p className="text-green-200 text-sm mt-0.5">{t.maoSubhead}</p>
      </div>

      <div className="px-4 py-4 space-y-3">
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

        {/* Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🚨</span>
            <p className="text-sm font-bold text-red-800">Emergency / Kalamidad</p>
          </div>
          <div className="space-y-2">
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

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({
  screen, setScreen, t,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
}) {
  const tabs = [
    { key: "dashboard" as Screen, icon: <Home className="w-5 h-5" />, label: t.home },
    { key: "subsidies" as Screen, icon: <FileText className="w-5 h-5" />, label: t.subsidiesLabel },
    { key: "support" as Screen, icon: <Headphones className="w-5 h-5" />, label: t.supportLabel },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border flex safe-area-pb z-50 max-w-sm mx-auto">
      {tabs.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => setScreen(key)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
            screen === key ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {icon}
          <span className="text-[10px] font-semibold">{label}</span>
          {screen === key && <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />}
        </button>
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [language, setLanguage] = useState<Language>("Tagalog");
  const [region, setRegion] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [screen, setScreen] = useState<Screen>("dashboard");

  const t = T[language];

  if (!onboarded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
        <div className="w-full max-w-sm min-h-screen bg-white shadow-2xl relative overflow-hidden">
          <OnboardingScreen
            language={language}
            setLanguage={setLanguage}
            region={region}
            setRegion={setRegion}
            municipality={municipality}
            setMunicipality={setMunicipality}
            onProceed={() => setOnboarded(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <div className="w-full max-w-sm min-h-screen bg-white shadow-2xl relative flex flex-col overflow-hidden">
        {screen === "dashboard" && (
          <DashboardScreen t={t} municipality={municipality} region={region} language={language} />
        )}
        {screen === "subsidies" && <SubsidiesScreen t={t} />}
        {screen === "support" && <SupportScreen t={t} region={region} />}
        <BottomNav screen={screen} setScreen={setScreen} t={t} />
      </div>
    </div>
  );
}
