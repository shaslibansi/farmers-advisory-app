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
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border flex safe-area-pb z-50 md:hidden">
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
