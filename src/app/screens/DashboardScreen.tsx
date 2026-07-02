import { useState, useEffect, useMemo } from "react";
import { MapPin, ChevronRight, Sprout, Phone, RefreshCw } from "lucide-react";
import { fetchWeatherFull } from "../data/weather";
import type { WeatherResult, HourlyPoint } from "../data/weather";
import { SUBSIDIES } from "../data/subsidies";
import type { Screen } from "../types";

const DAYS_EN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* ── tiny SVG line-chart ───────────────────────────────────────── */
function TempChart({ points, color = "#f59e0b" }: { points: number[]; color?: string }) {
  if (points.length < 2) return null;
  const W = 600, H = 80, PAD = 8;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => PAD + (i / (points.length - 1)) * (W - PAD * 2));
  const ys = points.map((v) => PAD + ((max - v) / range) * (H - PAD * 2));

  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const fill = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ")
    + ` L${xs[xs.length - 1]},${H} L${PAD},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#chartFill)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* value labels every ~3 points */}
      {points.map((v, i) => {
        if (i % 3 !== 0) return null;
        return (
          <text key={i} x={xs[i]} y={ys[i] - 5} textAnchor="middle"
            fontSize="11" fill="rgba(255,255,255,0.75)" fontWeight="600">{v}</text>
        );
      })}
    </svg>
  );
}

type ChartTab = "temperature" | "precipitation" | "wind";

export default function DashboardScreen({
  t, municipality, region, setScreen,
}: {
  t: Record<string, string>;
  municipality: string;
  region: string;
  setScreen: (s: Screen) => void;
}) {
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);
  const [chartTab, setChartTab] = useState<ChartTab>("temperature");
  const [unit, setUnit] = useState<"C" | "F">("C");

  const activeCount = SUBSIDIES.active.length;
  const upcomingCount = SUBSIDIES.upcoming.length;
  const hasLocation = municipality || region;

  function loadWeather() {
    if (!hasLocation) return;
    setWeatherLoading(true);
    setWeatherError(false);
    fetchWeatherFull(municipality || region)
      .then((r) => { setWeatherResult(r); setWeatherLoading(false); })
      .catch(() => { setWeatherError(true); setWeatherLoading(false); });
  }

  useEffect(() => {
    let cancelled = false;
    if (!hasLocation) return;
    setWeatherLoading(true);
    setWeatherError(false);
    fetchWeatherFull(municipality || region)
      .then((r) => { if (!cancelled) { setWeatherResult(r); setWeatherLoading(false); } })
      .catch(() => { if (!cancelled) { setWeatherError(true); setWeatherLoading(false); } });
    return () => { cancelled = true; };
  }, [municipality, region, hasLocation]);

  const toF = (c: number) => Math.round(c * 9 / 5 + 32);
  const displayTemp = (c: number) => unit === "C" ? c : toF(c);

  // hourly chart series (8 AM → 10 PM, 8 points at 2h intervals)
  const chartPoints = useMemo(() => {
    const h = weatherResult?.hourly ?? [];
    if (!h.length) return [] as number[];
    // pick every 2h from 8:00 to 22:00
    const slots = [8, 10, 12, 14, 16, 18, 20, 22];
    return slots.map(hr => {
      const pt = h.find(p => parseInt(p.time) === hr) ?? h[hr] ?? h[0];
      if (chartTab === "temperature") return pt ? (unit === "C" ? pt.temp : toF(pt.temp)) : 0;
      if (chartTab === "precipitation") return pt?.precip ?? 0;
      return pt?.wind ?? 0;
    });
  }, [weatherResult, chartTab, unit]);

  const chartColor = chartTab === "temperature" ? "#f59e0b" : chartTab === "precipitation" ? "#60a5fa" : "#34d399";

  // time labels for chart x-axis
  const timeLabels = ["8 AM","10 AM","12 PM","2 PM","4 PM","6 PM","8 PM","10 PM"];

  const cur = weatherResult?.current;
  const days = weatherResult?.days ?? [];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f3f4f6] pb-6">
      <div className="px-3 py-4 md:px-6 md:py-6 space-y-4">

        {/* ── No location prompt ── */}
        {!hasLocation && (
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm text-center">
            <MapPin className="w-8 h-8 text-[#0f6b3a] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#111827] mb-1">{t.setupPrompt}</p>
            <p className="text-xs text-[#6b7280] mb-3">{t.setupDesc}</p>
            <button
              onClick={() => setScreen("settings")}
              className="inline-flex items-center gap-1.5 bg-[#0f6b3a] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-md transition-all"
            >
              Settings
            </button>
          </div>
        )}

        {/* ── Metric cards ── */}
        {hasLocation && (
          <div className="grid grid-cols-3 gap-2.5">
            <button onClick={() => setScreen("subsidies")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <Sprout className="w-4 h-4 text-[#0f6b3a] mb-1" />
              <p className="text-base font-bold text-[#111827]">{activeCount}</p>
              <p className="text-[10px] text-[#6b7280] font-medium">{t.activeSubsidies}</p>
            </button>
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-3 shadow-sm">
              <span className="text-base">🔔</span>
              <p className="text-base font-bold text-[#111827]">1</p>
              <p className="text-[10px] text-[#6b7280] font-medium">Alerto</p>
            </div>
            <button onClick={() => setScreen("subsidies")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <span className="text-base">📅</span>
              <p className="text-base font-bold text-[#111827]">{upcomingCount}</p>
              <p className="text-[10px] text-[#6b7280] font-medium">{t.upcoming}</p>
            </button>
          </div>
        )}

        {/* ── Weather widget ── */}
        {hasLocation && (
          <div className="bg-[#1a1a2e] rounded-3xl overflow-hidden shadow-xl">

            {/* Loading skeleton */}
            {weatherLoading && (
              <div className="p-5 animate-pulse space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10" />
                    <div className="space-y-2 pt-1">
                      <div className="w-20 h-6 bg-white/10 rounded" />
                      <div className="w-32 h-3 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="w-20 h-5 bg-white/10 rounded ml-auto" />
                    <div className="w-16 h-3 bg-white/10 rounded ml-auto" />
                  </div>
                </div>
                <div className="w-full h-20 bg-white/10 rounded-xl" />
                <div className="flex gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex-1 h-16 bg-white/10 rounded-xl" />
                  ))}
                </div>
              </div>
            )}

            {/* Error state */}
            {weatherError && (
              <div className="p-6 text-center">
                <p className="text-sm text-red-400 mb-3">Failed to load weather data</p>
                <button onClick={loadWeather}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0f6b3a] px-4 py-2 rounded-xl">
                  <RefreshCw className="w-3.5 h-3.5" /> Retry
                </button>
              </div>
            )}

            {/* Main weather content */}
            {!weatherLoading && !weatherError && cur && (
              <>
                {/* ── Top row: current conditions ── */}
                <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-4">
                  {/* Left: icon + temp + stats */}
                  <div className="flex items-start gap-4">
                    <span className="text-5xl leading-none select-none">{cur.icon}</span>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-bold text-white leading-none">
                          {displayTemp(cur.temp)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-white/60 font-semibold">
                          <button onClick={() => setUnit("C")}
                            className={unit === "C" ? "text-white" : "hover:text-white/80"}>°C</button>
                          <span>|</span>
                          <button onClick={() => setUnit("F")}
                            className={unit === "F" ? "text-white" : "hover:text-white/80"}>°F</button>
                        </div>
                      </div>
                      <div className="mt-1.5 space-y-0.5 text-xs text-white/60">
                        <p>Precipitation: <span className="text-white/85">{cur.precip}%</span></p>
                        <p>Humidity: <span className="text-white/85">{cur.humidity}%</span></p>
                        <p>Wind: <span className="text-white/85">{cur.wind} km/h</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Right: label */}
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">Weather</p>
                    <p className="text-sm text-white/60">{cur.dayLabel}</p>
                    <p className="text-sm text-white/60">{cur.desc}</p>
                  </div>
                </div>

                {/* ── Chart tabs ── */}
                <div className="px-5 flex gap-5 border-b border-white/10 text-sm font-semibold">
                  {(["temperature","precipitation","wind"] as ChartTab[]).map((tab) => (
                    <button key={tab} onClick={() => setChartTab(tab)}
                      className={`pb-2 capitalize transition-colors border-b-2 -mb-px ${
                        chartTab === tab
                          ? "text-white border-[#f59e0b]"
                          : "text-white/40 border-transparent hover:text-white/70"
                      }`}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* ── SVG chart ── */}
                <div className="px-2 pt-3">
                  <TempChart points={chartPoints} color={chartColor} />
                  {/* X-axis time labels */}
                  <div className="flex justify-between px-2 pb-1">
                    {timeLabels.map((lbl) => (
                      <span key={lbl} className="text-[10px] text-white/40">{lbl}</span>
                    ))}
                  </div>
                </div>

                {/* ── 7-day strip ── */}
                <div className="flex border-t border-white/10 mt-1">
                  {days.slice(0, 7).map((d, i) => {
                    const dateObj = new Date(d.day);
                    const dayName = isNaN(dateObj.getTime())
                      ? d.day
                      : dateObj.toLocaleDateString("en-US", { weekday: "short" });
                    const isToday = i === 0;
                    return (
                      <div key={d.day}
                        className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
                          isToday ? "bg-white/10" : "hover:bg-white/5"
                        }`}>
                        <span className={`text-[11px] font-bold ${isToday ? "text-white" : "text-white/55"}`}>
                          {dayName}
                        </span>
                        <span className="text-xl leading-none select-none my-1">{d.icon}</span>
                        <span className="text-[11px] font-semibold text-white">{displayTemp(d.maxTemp ?? 0)}°</span>
                        <span className="text-[10px] text-white/45">{displayTemp(d.minTemp ?? 0)}°</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Planting calendar card ── */}
        {hasLocation && (
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#0f6b3a] mb-1">{t.calendarTitle}</h3>
            <p className="text-sm text-[#111827] leading-relaxed mb-3">{t.calendarBody}</p>
            <div className="space-y-2">
              {["🌾 Pagasa 7", " NSIC Rc 222", " Tubigan 18"].map((v) => (
                <div key={v} className="flex items-center gap-2 text-xs bg-[#0f6b3a] text-white font-semibold px-3 py-2 rounded-xl">
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
          </div>
        )}

        {/* ── Quick actions (mobile) ── */}
        {hasLocation && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setScreen("subsidies")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
              <Sprout className="w-5 h-5 text-[#0f6b3a] shrink-0" />
              <span className="text-sm font-semibold text-[#111827]">{t.quickSubsidies}</span>
            </button>
            <button onClick={() => setScreen("support")}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
              <Phone className="w-5 h-5 text-[#0f6b3a] shrink-0" />
              <span className="text-sm font-semibold text-[#111827]">{t.quickSupport}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
