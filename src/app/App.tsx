import { useState, useEffect } from "react";
import type { Language, Screen } from "./types";
import { T } from "./data/translations";
import OnboardingScreen from "./screens/OnboardingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SubsidiesScreen from "./screens/SubsidiesScreen";
import SupportScreen from "./screens/SupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChatbotScreen from "./components/chatbot/ChatbotScreen";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";

function loadSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem("bukidGabay");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed[key] ?? fallback;
    }
  } catch {}
  return fallback;
}

export default function App() {
  const [onboarded, setOnboarded] = useState(() => loadSaved("onboarded", false));
  const [language, setLanguage] = useState<Language>(() => loadSaved("language", "Tagalog"));
  const [region, setRegion] = useState(() => loadSaved("region", ""));
  const [municipality, setMunicipality] = useState(() => loadSaved("municipality", ""));
  const [screen, setScreen] = useState<Screen>("dashboard");

  const t = T[language];

  useEffect(() => {
    localStorage.setItem(
      "bukidGabay",
      JSON.stringify({ onboarded, language, region, municipality })
    );
  }, [onboarded, language, region, municipality]);

  function restartOnboarding() {
    setOnboarded(false);
    setScreen("dashboard");
  }

  if (!onboarded) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="w-full min-h-screen bg-white">
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
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar screen={screen} setScreen={setScreen} t={t} municipality={municipality} region={region} />

      <main className="flex-1 flex flex-col min-h-screen pt-14 md:pt-0">
        {screen === "dashboard" && (
          <DashboardScreen t={t} municipality={municipality} region={region} setScreen={setScreen} />
        )}
        {screen === "subsidies" && <SubsidiesScreen t={t} />}
        {screen === "support" && <SupportScreen t={t} region={region} />}
        {screen === "chatbot" && <ChatbotScreen t={t} />}
        {screen === "settings" && (
          <SettingsScreen
            language={language}
            setLanguage={setLanguage}
            region={region}
            setRegion={setRegion}
            municipality={municipality}
            setMunicipality={setMunicipality}
            onBack={() => setScreen("dashboard")}
            onRestart={restartOnboarding}
          />
        )}
      </main>

      <BottomNav screen={screen} setScreen={setScreen} t={t} />
    </div>
  );
}
