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

const DAY_LABELS = ["Ngayon", "Bukas", "Makalawa"];

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
  if (code === 0) return "Maaliwalas";
  if (code === 1) return "Medyo Maaliwalas";
  if (code === 2) return "Bahagyang Maulap";
  if (code === 3) return "Maulap";
  if (code >= 45 && code <= 48) return "Mahamog";
  if (code >= 51 && code <= 55) return "Ambón";
  if (code === 56 || code === 57) return "Malamig na Ambón";
  if (code >= 61 && code <= 65) return "Ulan";
  if (code === 66 || code === 67) return "Malamig na Ulan";
  if (code >= 71 && code <= 75) return "Niyebe";
  if (code === 77) return "Buhol-buhol na Niyebe";
  if (code >= 80 && code <= 82) return "Mga Pagbuhos ng Ulan";
  if (code === 85 || code === 86) return "Mga Pagbuhos ng Niyebe";
  if (code === 95) return "Bagyo na may Kulog at Kidlat";
  if (code >= 96) return "Bagyo na may Yelo";
  return "Maaliwalas";
}

function wmoToWarn(code: number): boolean {
  return code >= 95 || code === 82 || code === 86;
}

export async function fetchWeather(city: string): Promise<WeatherDay[]> {
  const coords = resolveCoords(city);

  if (!coords) {
    return [];
  }

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Manila&forecast_days=3`,
    { signal: AbortSignal.timeout(8000) },
  );

  if (!res.ok) throw new Error(`API error ${res.status}`);

  const json = await res.json();

  if (!json.daily?.time?.length) {
    throw new Error("No forecast data");
  }

  return json.daily.time.map((date: string, i: number) => {
    const code = json.daily.weathercode[i];
    return {
      day: DAY_LABELS[i] ?? date,
      icon: wmoToEmoji(code),
      temp: `${Math.round(json.daily.temperature_2m_max[i])}°C`,
      desc: wmoToDesc(code),
      warn: wmoToWarn(code),
    };
  });
}
