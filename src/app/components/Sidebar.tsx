import { useState } from "react";
import { Home, FileText, Headphones, Settings, Sprout, MessageCircle, Menu, X, Bell } from "lucide-react";
import type { Screen } from "../types";

// ── Demo notifications ────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    title: "ALERTO SA PESTE: HALL ARMYWORM",
    municipality: "Munisipalidad ng Muñoz",
    status: "Aktibong Pag-atake",
    image1: new URL("../../image/monkey.jpeg", import.meta.url).href,
    image2: new URL("../../image/plant.jpeg", import.meta.url).href,
    label1: "🐛 PESTE",
    label2: "🌿 PINSALA",
    identify: "Paano Makikilala",
    identifyDesc:
      'Hanapin ang kulay abong uod na may "Y" na marka sa ulo, at mga dahong may tila-bintanang butas.',
    actions: [
      { bold: "Mag-inspeksyon:", text: "Suriin ang ilalim ng mga dahon tuwing umaga." },
      { bold: "Likas-Kayang Puksa:", text: "Manual na tirisin ang mga itlog at uod. Gumamit ng neem oil spray." },
      { bold: "Iulat:", text: "Huwag mag-spray ng labis na kemikal para hindi lumala ang atake." },
    ],
  },
  {
    id: 2,
    title: "ALERTO SA SAKIT: RICE BLAST",
    municipality: "Munisipalidad ng Cabanatuan",
    status: "Babala – Mataas na Panganib",
    image1: new URL("../../image/plant.jpeg", import.meta.url).href,
    image2: new URL("../../image/godzilla.jpeg", import.meta.url).href,
    label1: "🌿 SAKIT",
    label2: "🌾 APEKTADONG PANANIM",
    identify: "Paano Makikilala",
    identifyDesc:
      "Maghanap ng mga tiyan-hugis na batik sa dahon na may puting gitna at kayumanggi sa gilid.",
    actions: [
      { bold: "Alisin:", text: "Tanggalin ang mga apektadong dahon at itapon nang maayos." },
      { bold: "Gamutin:", text: "Mag-apply ng tricyclazole fungicide ayon sa tamang dosis." },
      { bold: "Iulat:", text: "Makipag-ugnayan sa inyong lokal na MAO para sa karagdagang tulong." },
    ],
  },
  {
    id: 3,
    title: "BAGYO: TYPHOON SIGNAL #2",
    municipality: "Buong Rehiyon I at II",
    status: "Preparasyon – 24 Oras",
    image1: new URL("../../image/godzilla.jpeg", import.meta.url).href,
    image2: new URL("../../image/monkey.jpeg", import.meta.url).href,
    label1: "🌀 BAGYO",
    label2: "💨 PINSALA",
    identify: "Paano Maghanda",
    identifyDesc:
      "Inaasahang malakas na hangin at ulan. Posibleng pagbaha sa mababang lugar at mga bukid.",
    actions: [
      { bold: "Anihin:", text: "Anihin na ang mga palay na malapit nang mahinog bago dumating ang bagyo." },
      { bold: "Protektahan:", text: "Takpan ang mga binhi at fertilizer ng plastik o lona." },
      { bold: "Manatiling Ligtas:", text: "Sundan ang babala ng PAGASA at lokal na pamahalaan." },
    ],
  },
];

// ── Notification modal ────────────────────────────────────────
function NotificationModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<typeof NOTIFICATIONS[0] | null>(null);

  if (selected) {
    return (
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
        <div className="relative z-10 w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Red alert header */}
          <div className="bg-red-600 px-4 pt-5 pb-4">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-2 pr-8">
              <span className="mt-1 w-3 h-3 rounded-full bg-white animate-pulse shrink-0" />
              <h2 className="text-white font-extrabold text-base leading-snug uppercase">{selected.title}</h2>
            </div>
            <p className="text-red-200 text-xs mt-1.5">
              {selected.municipality} | Status: {selected.status}
            </p>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50">
            {[{ src: selected.image1, lbl: selected.label1 }, { src: selected.image2, lbl: selected.label2 }].map(({ src, lbl }) => (
              <div key={lbl} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img src={src} alt={lbl} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs font-bold py-1 text-center">
                  {lbl}
                </div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="px-4 pb-6 space-y-4 pt-2">
            <div>
              <h3 className="text-base font-bold text-[#111827] mb-1">{selected.identify}</h3>
              <p className="text-sm text-[#4b5563] leading-relaxed">{selected.identifyDesc}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827] mb-2">🔧 Mabilis na Aksiyon</h3>
              <ol className="space-y-2">
                {selected.actions.map((a, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#374151]">
                    <span className="font-bold text-[#0f6b3a] shrink-0">{i + 1}.</span>
                    <span><span className="font-bold">{a.bold}</span> {a.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Notification list
  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] px-5 pt-12 pb-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Mga Abiso</h2>
            <p className="text-green-200 text-xs">{NOTIFICATIONS.length} bagong alerto</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/80 hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {NOTIFICATIONS.map((n) => (
            <button key={n.id} onClick={() => setSelected(n)}
              className="w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors flex gap-3 items-start">
              <span className="mt-1 w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111827] leading-snug line-clamp-2">{n.title}</p>
                <p className="text-xs text-[#6b7280] mt-0.5">{n.municipality}</p>
                <span className="inline-block mt-1.5 text-[10px] font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                  {n.status}
                </span>
              </div>
              <img src={n.image1} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared nav items ──────────────────────────────────────────
function NavItems({
  screen, setScreen, t, onNavigate,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
  onNavigate?: () => void;
}) {
  const mainNav = [
    { key: "dashboard" as Screen, icon: Home,          label: t.home },
    { key: "subsidies" as Screen, icon: FileText,      label: t.subsidiesLabel },
    { key: "support"   as Screen, icon: Headphones,    label: t.supportLabel },
    { key: "chatbot"   as Screen, icon: MessageCircle, label: t.chatbot },
  ];

  const go = (key: Screen) => { setScreen(key); onNavigate?.(); };

  return (
    <>
      <div className="px-4 pt-4 pb-1">
        <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest px-3">Main</p>
      </div>
      <nav className="px-3 pb-2 space-y-0.5">
        {mainNav.map(({ key, icon: Icon, label }) => {
          const isActive = screen === key;
          return (
            <button key={key} onClick={() => go(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-xl ${
                isActive ? "bg-[#0f6b3a]/10 text-[#0f6b3a]" : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`}>
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0f6b3a]" : ""}`} />
              <span className="flex-1 text-left">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pt-2 pb-3 mt-auto">
        <button onClick={() => go("settings")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-xl ${
            screen === "settings" ? "bg-[#0f6b3a]/10 text-[#0f6b3a]" : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
          }`}>
          <Settings className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">Settings</span>
        </button>
      </div>
    </>
  );
}

// ── Sidebar header branding ───────────────────────────────────
function SidebarBrand({ t, onClose }: { t: Record<string, string>; onClose?: () => void }) {
  return (
    <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-5 py-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm shrink-0">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-bold leading-tight tracking-tight">FieldLink</h1>
          <p className="text-green-200 text-[11px]">{t.tagline}</p>
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close menu"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Sidebar({
  screen, setScreen, t,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top AppBar ─────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] px-3 py-3 shadow-md">
        {/* Hamburger */}
        <button onClick={() => setDrawerOpen(true)} aria-label="Open menu"
          className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        {/* Centre branding */}
        <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none">
          <span className="text-white font-extrabold text-xl tracking-tight">FieldLink</span>
        </div>

        {/* Notification bell */}
        <div className="ml-auto relative">
          <button aria-label="Notifications" onClick={() => setNotifOpen(true)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-[#0f6b3a]" />
          </button>
        </div>
      </header>

      {/* ── Notification panel ──────────────────────────────── */}
      {notifOpen && <NotificationModal onClose={() => setNotifOpen(false)} />}

      {/* ── Mobile drawer backdrop ───────────────────────── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] bg-white min-h-screen shadow-2xl overflow-y-auto animate-slide-in-left">
            <SidebarBrand t={t} onClose={() => setDrawerOpen(false)} />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <NavItems screen={screen} setScreen={setScreen} t={t} onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop persistent sidebar ───────────────────── */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white border-r border-border min-h-screen shadow-sm">
        <SidebarBrand t={t} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <NavItems screen={screen} setScreen={setScreen} t={t} />
        </div>
      </aside>
    </>
  );
}
