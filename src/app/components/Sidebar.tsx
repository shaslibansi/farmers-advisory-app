import { useState } from "react";
import { Home, FileText, Headphones, Settings, MapPin, Sprout, MessageCircle, Menu, X, Bell } from "lucide-react";
import type { Screen } from "../types";

// ── Shared nav items ──────────────────────────────────────────
function NavItems({
  screen,
  setScreen,
  t,
  onNavigate,
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

  const go = (key: Screen) => {
    setScreen(key);
    onNavigate?.();
  };

  return (
    <>
      <div className="px-4 pt-4 pb-1">
        <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest px-3">Main</p>
      </div>
      <nav className="px-3 pb-2 space-y-0.5">
        {mainNav.map(({ key, icon: Icon, label }) => {
          const isActive = screen === key;
          return (
            <button
              key={key}
              onClick={() => go(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-xl ${
                isActive
                  ? "bg-[#0f6b3a]/10 text-[#0f6b3a]"
                  : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0f6b3a]" : ""}`} />
              <span className="flex-1 text-left">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 pt-2 pb-1 border-t border-border">
        <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest px-3 pt-2">Account</p>
      </div>
      <div className="px-3 pb-3 space-y-0.5">
        <button
          onClick={() => go("settings")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-xl ${
            screen === "settings"
              ? "bg-[#0f6b3a]/10 text-[#0f6b3a]"
              : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
          }`}
        >
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
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm shrink-0">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-bold leading-tight tracking-tight">FieldLink</h1>
          <p className="text-green-200 text-[11px]">{t.tagline}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Sidebar({
  screen, setScreen, t, municipality, region,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
  municipality: string;
  region: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const locationPill = (municipality || region) && (
    <div className="px-4 py-3 border-t border-border space-y-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0f6b3a] rounded-xl border border-[#1a8a4a]">
        <MapPin className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
        <span className="text-xs font-medium text-white truncate">{municipality || region}</span>
      </div>
      <div className="flex items-center gap-2 px-3 text-[10px] text-[#9ca3af]">
        <Sprout className="w-3 h-3" />
        <span>FieldLink</span>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile top AppBar ─────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] px-3 py-3 shadow-md">
        {/* Left — hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Centre — branding (absolute so it's truly centred regardless of button widths) */}
        <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none">
          <span className="text-white font-extrabold text-xl tracking-tight">FieldLink</span>
        </div>

        {/* Right — notification bell */}
        <div className="ml-auto relative">
          <button
            aria-label="Notifications"
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {/* red dot badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-[#0f6b3a]" />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer backdrop ───────────────────────── */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* dim overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
          />

          {/* drawer panel */}
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] bg-white min-h-screen shadow-2xl overflow-y-auto animate-slide-in-left">
            <SidebarBrand t={t} onClose={() => setDrawerOpen(false)} />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <NavItems
                screen={screen}
                setScreen={setScreen}
                t={t}
                onNavigate={() => setDrawerOpen(false)}
              />
              {locationPill}
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop persistent sidebar ───────────────────── */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white border-r border-border min-h-screen shadow-sm">
        <SidebarBrand t={t} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <NavItems screen={screen} setScreen={setScreen} t={t} />
          {locationPill}
        </div>
      </aside>
    </>
  );
}
