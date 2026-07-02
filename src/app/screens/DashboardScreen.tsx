import { useState, useEffect } from "react";
import { MapPin, Bell, AlertTriangle, X, ChevronRight, Sprout, Calendar, Phone, RefreshCw } from "lucide-react";
import { fetchWeather } from "../data/weather";
import { SUBSIDIES } from "../data/subsidies";
import type { Screen, WeatherDay } from "../types";

const MONTHS_FIL = [
  "Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo",
  "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre",
];

const DAYS_FIL = ["Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado"];

function formattedDate() {
  const d = new Date();
  const dayName = DAYS_FIL[d.getDay()];
  const month = MONTHS_FIL[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${dayName}, ${month} ${day}, ${year}`;
}

function getGreeting(t: Record<string, string>) {
  const hour = new Date().getHours();
  if (hour < 12) return t.morning;
  if (hour < 18) return t.afternoon;
  return t.evening;
}

export default function DashboardScreen({
  t, municipality, region, setScreen,
}: {
  t: Record<string, string>;
  municipality: string;
  region: string;
  setScreen: (s: Screen) => void;
}) {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  const activeCount = SUBSIDIES.active.length;
  const upcomingCount = SUBSIDIES.upcoming.length;
  const hasLocation = municipality || region;
  const greeting = getGreeting(t);

  useEffect(() => {
    if (!hasLocation) return;
    let cancelled = false;
    setWeatherLoading(true);
    setWeatherError(false);

    fetchWeather(municipality || region)
      .then((data) => {
        if (!cancelled) {
          setWeather(data);
          setWeatherLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWeatherError(true);
          setWeatherLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [municipality, region, hasLocation]);

  function retryWeather() {
    setWeatherError(false);
    setWeatherLoading(true);
    fetchWeather(municipality || region)
      .then(setWeather)
      .catch(() => setWeatherError(true))
      .finally(() => setWeatherLoading(false));
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafbfa] pb-20 md:pb-0">

      <div className="px-4 py-4 md:px-8 md:py-6 space-y-4 md:space-y-6">
        {!hasLocation && (
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm text-center">
            <MapPin className="w-8 h-8 text-[#0f6b3a] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#111827] mb-1">{t.setupPrompt}</p>
            <p className="text-xs text-[#6b7280] mb-3">{t.setupDesc}</p>
            <button
              onClick={() => setScreen("settings")}
              className="inline-flex items-center gap-1.5 bg-[#0f6b3a] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all active:scale-[0.98]"
            >
              <SettingsIcon />
              Settings
            </button>
          </div>
        )}

        {!alertDismissed && hasLocation && (
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl p-4 md:p-5 flex gap-3 shadow-md">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-red-200 mb-1">{t.alertTitle}</p>
              <p className="text-sm md:text-base leading-snug">{t.alertMsg}</p>
            </div>
            <button onClick={() => setAlertDismissed(true)} className="shrink-0 p-1 rounded-lg hover:bg-red-500/50 transition-colors">
              <X className="w-4 h-4 text-red-200" />
            </button>
          </div>
        )}

        {alertDismissed && hasLocation && (
          <button
            onClick={() => setAlertDismissed(false)}
            className="w-full flex items-center gap-2 bg-[#0f6b3a] border border-[#1a8a4a] rounded-2xl px-4 py-3 text-xs text-white hover:bg-[#1a8a4a] transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {t.noAlerts}
          </button>
        )}

        {hasLocation && (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setScreen("subsidies")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left"
            >
              <Sprout className="w-5 h-5 text-[#0f6b3a]" />
              <p className="text-lg md:text-2xl font-bold text-[#111827]">{activeCount}</p>
              <p className="text-[10px] md:text-xs text-[#6b7280] font-medium mt-0.5">{t.activeSubsidies}</p>
            </button>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm">
              <Bell className="w-5 h-5 text-amber-600" />
              <p className="text-lg md:text-2xl font-bold text-[#111827]">{!alertDismissed ? 1 : 0}</p>
              <p className="text-[10px] md:text-xs text-[#6b7280] font-medium mt-0.5">Alerto</p>
            </div>

            <button
              onClick={() => setScreen("subsidies")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left"
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-lg md:text-2xl font-bold text-[#111827]">{upcomingCount}</p>
              <p className="text-[10px] md:text-xs text-[#6b7280] font-medium mt-0.5">{t.upcoming}</p>
            </button>
          </div>
        )}

        {hasLocation && (
          <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
            <section>
              <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-3">{t.weatherTitle}</h3>

              {weatherLoading && (
                <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] rounded-2xl p-4 shadow-md animate-pulse">
                  <div className="flex gap-3 overflow-hidden">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[70px] flex-1">
                        <div className="h-3 w-8 bg-white/20 rounded mb-2" />
                        <div className={`w-full flex flex-col items-center justify-between rounded-xl py-3 px-2 ${
                          i === 0 ? "bg-white/15 border border-white/20" : ""
                        }`}>
                          <div className="h-3 w-6 bg-white/20 rounded mb-2.5" />
                          <div className="w-8 h-8 rounded-full bg-white/20 mb-3" />
                          <div className="h-3 w-10 bg-white/20 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {weatherError && (
                <div className="bg-white border border-red-200 rounded-2xl p-4 text-center shadow-sm">
                  <p className="text-xs text-red-600 mb-2">Failed to load weather data</p>
                  <button
                    onClick={retryWeather}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#0f6b3a] px-3 py-1.5 rounded-xl hover:bg-[#1a8a4a] transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Retry
                  </button>
                </div>
              )}

              {!weatherLoading && !weatherError && weather.length === 0 && municipality && (
                <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] rounded-2xl p-4 text-center shadow-sm">
                  <p className="text-xs text-green-200">No weather data available</p>
                </div>
              )}

              {!weatherLoading && !weatherError && weather.length > 0 && (
                <div className="bg-gradient-to-br from-[#0f6b3a] to-[#1a8a4a] rounded-2xl p-4 shadow-md">
                  <div className="flex overflow-x-auto md:overflow-x-visible gap-1.5 md:gap-1 pb-1 no-scrollbar">
                    {weather.map((w, i) => {
                      const dateObj = new Date(w.day);
                      const weekday = isNaN(dateObj.getTime())
                        ? w.day
                        : dateObj.toLocaleDateString("en-US", { weekday: "short" });

                      const currentHour = new Date().getHours();
                      const startHour = Math.round(currentHour / 3) * 3;
                      const hourVal = (startHour + i * 3) % 24;
                      const ampm = hourVal >= 12 ? "PM" : "AM";
                      const displayHour = hourVal % 12 === 0 ? 12 : hourVal % 12;
                      const timeLabel = `${displayHour} ${ampm}`;

                      const isActive = i === 0;
                      const max = w.maxTemp ?? 0;
                      const min = w.minTemp ?? 0;

                      return (
                        <div key={w.day} className="flex flex-col items-center min-w-0 flex-1">
                          <div
                            className={`w-full flex flex-col items-center justify-between rounded-xl py-2.5 px-1 transition-all ${
                              isActive
                                ? "bg-white/15 border border-white/25 shadow-inner"
                                : "bg-transparent border border-transparent hover:bg-white/5"
                            }`}
                          >
                            <span
                              className={`text-[11px] md:text-xs font-semibold mb-1.5 ${
                                isActive ? "text-white" : "text-green-100"
                              }`}
                            >
                              {weekday}
                            </span>
                            <span className="text-xl md:text-2xl mb-2 filter drop-shadow-sm select-none">
                              {w.icon}
                            </span>
                            <div className="text-[10px] md:text-[11px] font-semibold flex gap-1 justify-center w-full truncate">
                              <span className={isActive ? "text-white font-bold" : "text-green-100"}>
                                {max}°
                              </span>
                              <span className={isActive ? "text-green-200" : "text-green-300/60"}>
                                {min}°
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-[#e5e7eb] rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl md:text-2xl">📅</span>
                <h3 className="text-sm md:text-base font-bold text-[#0f6b3a]">{t.calendarTitle}</h3>
              </div>
              <p className="text-sm md:text-base text-[#111827] leading-relaxed">{t.calendarBody}</p>
              <div className="mt-4 space-y-2">
                {["🌾 Pagasa 7", "🌾 NSIC Rc 222", "🌾 Tubigan 18"].map((v) => (
                  <div key={v} className="flex items-center gap-2 text-xs bg-[#0f6b3a] text-white font-semibold px-3 py-2 rounded-xl border border-[#1a8a4a]">
                    <Sprout className="w-3.5 h-3.5 shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setScreen("subsidies")}
                className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#0f6b3a] py-2.5 rounded-xl border border-[#1a8a4a] hover:bg-[#1a8a4a] transition-colors"
              >
                {t.quickSubsidies}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </section>
          </div>
        )}



        {hasLocation && (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setScreen("subsidies")}
              className="flex flex-col items-center gap-1.5 bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Sprout className="w-5 h-5 text-[#0f6b3a]" />
              <span className="text-[10px] md:text-xs font-semibold text-[#111827]">{t.quickSubsidies}</span>
            </button>
            <button
              onClick={() => setScreen("support")}
              className="flex flex-col items-center gap-1.5 bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] md:text-xs font-semibold text-[#111827]">{t.quickSupport}</span>
            </button>
            <button
              onClick={() => setScreen("subsidies")}
              className="flex flex-col items-center gap-1.5 bg-white border border-[#e5e7eb] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5 text-amber-600" />
              <span className="text-[10px] md:text-xs font-semibold text-[#111827]">{t.quickCalendar}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
