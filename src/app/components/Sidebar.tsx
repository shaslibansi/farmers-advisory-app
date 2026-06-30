import { Home, FileText, Headphones, Sprout, Settings } from "lucide-react";
import type { Screen } from "../types";

export default function Sidebar({
  screen, setScreen, t,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  t: Record<string, string>;
}) {
  const tabs = [
    { key: "dashboard" as Screen, icon: Home, label: t.home },
    { key: "subsidies" as Screen, icon: FileText, label: t.subsidiesLabel },
    { key: "support" as Screen, icon: Headphones, label: t.supportLabel },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white border-r border-border min-h-screen shadow-sm">
      <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] px-5 py-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">BukidGabay</h1>
            <p className="text-green-200 text-xs">{t.tagline}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              screen === key
                ? "bg-[#f0fdf4] text-[#0f6b3a] shadow-sm border-l-2 border-[#0f6b3a] rounded-l-none"
                : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-border space-y-2">
        <button
          onClick={() => setScreen("settings")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-all"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
          <Sprout className="w-3.5 h-3.5" />
          <span>Dept. of Agriculture PH</span>
        </div>
      </div>
    </aside>
  );
}
