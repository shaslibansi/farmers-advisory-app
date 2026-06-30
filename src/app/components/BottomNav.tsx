import { Home, FileText, Headphones } from "lucide-react";
import type { Screen } from "../types";

export default function BottomNav({
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
    <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-border flex pb-[env(safe-area-inset-bottom)] z-50 md:hidden">
      {tabs.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => setScreen(key)}
          aria-label={label}
          aria-current={screen === key ? "page" : undefined}
          className={`flex-1 flex flex-col items-center gap-1 py-2 transition-all min-h-[56px] relative ${
            screen === key ? "text-[#0f6b3a]" : "text-[#6b7280]"
          }`}
        >
          {screen === key && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#0f6b3a] to-[#1a8a4a] rounded-b-full" />
          )}
          <div className={`p-1.5 rounded-xl transition-colors ${screen === key ? "bg-[#f0fdf4]" : ""}`}>
            {icon}
          </div>
          <span className="text-[10px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
}
