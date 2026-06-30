import { Home, FileText, Headphones, Settings, MapPin, Sprout, MessageCircle } from "lucide-react";
import type { Screen } from "../types";

export default function Sidebar({
  screen, setScreen, t, municipality, region,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
  municipality: string;
  region: string;
}) {
  const mainNav = [
    { key: "dashboard" as Screen, icon: Home, label: t.home },
    { key: "subsidies" as Screen, icon: FileText, label: t.subsidiesLabel },
    { key: "support" as Screen, icon: Headphones, label: t.supportLabel },
    { key: "chatbot" as Screen, icon: MessageCircle, label: t.chatbot },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white border-r border-border min-h-screen shadow-sm">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-5 py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold leading-tight tracking-tight">BukidGabay</h1>
            <p className="text-green-200 text-[11px]">{t.tagline}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-4 pt-4 pb-1">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest px-3">Main</p>
        </div>
        <nav className="px-3 pb-2 space-y-0.5">
          {mainNav.map(({ key, icon: Icon, label }) => {
            const isActive = screen === key;
            return (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-r-xl ${
                  isActive
                    ? "border-l-4 border-[#0f6b3a] bg-gradient-to-r from-[#f0fdf4] to-white text-[#0f6b3a] shadow-sm"
                    : "border-l-4 border-transparent text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-[#0f6b3a]/10" : ""}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0f6b3a]" : ""}`} />
                </div>
                <span className="flex-1 text-left">{label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0f6b3a]" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-4 pt-2 pb-1 border-t border-border">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest px-3 pt-2">Account</p>
        </div>
        <div className="px-3 pb-3 space-y-0.5">
          <button
            onClick={() => setScreen("settings")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6b3a] focus-visible:ring-offset-1 rounded-r-xl ${
              screen === "settings"
                ? "border-l-4 border-[#0f6b3a] bg-gradient-to-r from-[#f0fdf4] to-white text-[#0f6b3a] shadow-sm"
                : "border-l-4 border-transparent text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${screen === "settings" ? "bg-[#0f6b3a]/10" : ""}`}>
              <Settings className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left">Settings</span>
            {screen === "settings" && <span className="w-1.5 h-1.5 rounded-full bg-[#0f6b3a]" />}
          </button>
        </div>

        <div className="px-4 py-3 border-t border-border space-y-2">
          {(municipality || region) && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0fdf4] rounded-xl border border-[#dcfce7]">
              <MapPin className="w-3.5 h-3.5 text-[#0f6b3a] shrink-0" />
              <span className="text-xs font-medium text-[#0f6b3a] truncate">{municipality || region}</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 text-[10px] text-[#9ca3af]">
            <Sprout className="w-3 h-3" />
            <span>Dept. of Agriculture PH</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
