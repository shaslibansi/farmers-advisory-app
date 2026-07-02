import type { WeatherDay } from "../types";
import { MUNICIPALITIES, MUNICIPALITY_COORDS } from "./regions";

function resolveCoords(location: string): { lat: number; lng: number } | null {
  const direct = MUNICIPALITY_COORDS[location];
  if (direct) return direct;

  for (const region of Object.keys(MUNICIPALITIES)) {
    if (region === location && MUNICIPALITIES[region].length) {
      const first = MUNICIPALITIES[region][0];
      return MUNICIPALITY_COORDS[first] ?? null;
    }
  }
  return null;
}

function wmoToEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

function wmoToDesc(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code === 77) return "Snow grains";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code >= 96) return "Thunderstorm w/ hail";
  return "Light rain";
}

function wmoToWarn(code: number): boolean {
  return code >= 95 || code === 82 || code === 86;
}

export interface HourlyPoint {
  time: string;   // "HH:MM"
  temp: number;
  precip: number; // precipitation probability %
  wind: number;   // windspeed km/h
}

export interface WeatherResult {
  days: WeatherDay[];
  hourly: HourlyPoint[];
  current: {
    temp: number;
    precip: number;
    humidity: number;
    wind: number;
    desc: string;
    icon: string;
    dayLabel: string;
  };
}

export async function fetchWeather(city: string): Promise<WeatherDay[]> {
  const result = await fetchWeatherFull(city);
  return result?.days ?? [];
}

export async function fetchWeatherFull(city: string): Promise<WeatherResult | null> {
  const coords = resolveCoords(city);
  if (!coords) return null;

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&hourly=temperature_2m,precipitation_probability,windspeed_10m,relativehumidity_2m` +
    `&timezone=Asia/Manila&forecast_days=7`,
    { signal: AbortSignal.timeout(8000) },
  );

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();
  if (!json.daily?.time?.length) throw new Error("No forecast data");

  // ── daily days ──
  const days: WeatherDay[] = json.daily.time.map((date: string, i: number) => {
    const code = json.daily.weathercode[i];
    const max = Math.round(json.daily.temperature_2m_max[i]);
    const min = Math.round(json.daily.temperature_2m_min[i]);
    return {
      day: date,
      icon: wmoToEmoji(code),
      temp: `${max}° ${min}°`,
      maxTemp: max,
      minTemp: min,
      desc: wmoToDesc(code),
      warn: wmoToWarn(code),
    };
  });

  // ── hourly (today's 24 hours) ──
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const hourly: HourlyPoint[] = [];

  if (json.hourly?.time) {
    json.hourly.time.forEach((t: string, i: number) => {
      if (t.startsWith(todayStr)) {
        const hhmm = t.slice(11, 16);
        hourly.push({
          time: hhmm,
          temp: Math.round(json.hourly.temperature_2m[i]),
          precip: json.hourly.precipitation_probability[i] ?? 0,
          wind: Math.round(json.hourly.windspeed_10m[i] ?? 0),
        });
      }
    });
  }

  // ── current conditions (closest hour) ──
  const currentHour = now.getHours();
  const closest = hourly[currentHour] ?? hourly[0] ?? { temp: days[0]?.maxTemp ?? 0, precip: 0, wind: 0 };
  const humidity = json.hourly?.relativehumidity_2m?.[currentHour] ?? 0;
  const todayCode = json.daily.weathercode[0];

  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayLabel = dayNames[now.getDay()];

  return {
    days,
    hourly,
    current: {
      temp: closest.temp,
      precip: closest.precip,
      humidity,
      wind: closest.wind,
      desc: wmoToDesc(todayCode),
      icon: wmoToEmoji(todayCode),
      dayLabel,
    },
  };
}
