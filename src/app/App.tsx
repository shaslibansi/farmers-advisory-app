import { useState } from "react";
import type { Language, Screen } from "./types";
import { T } from "./data/translations";
import OnboardingScreen from "./screens/OnboardingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SubsidiesScreen from "./screens/SubsidiesScreen";
import SupportScreen from "./screens/SupportScreen";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";

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
        <div className="w-full max-w-lg mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden md:my-8 md:rounded-2xl md:min-h-[90vh]">
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
    <div className="min-h-screen bg-gray-100 flex" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Desktop sidebar */}
      <Sidebar screen={screen} setScreen={setScreen} t={t} />

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full md:max-w-[calc(100vw-16rem)]">
        {screen === "dashboard" && (
          <DashboardScreen t={t} municipality={municipality} region={region} />
        )}
        {screen === "subsidies" && <SubsidiesScreen t={t} />}
        {screen === "support" && <SupportScreen t={t} region={region} />}
      </main>

      {/* Mobile bottom nav */}
      <BottomNav screen={screen} setScreen={setScreen} t={t} />
    </div>
  );
}
