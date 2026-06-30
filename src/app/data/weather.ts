import type { WeatherDay } from "../types";

const FALLBACK: WeatherDay[] = [
  { day: "Ngayon", icon: "⛈️", temp: "29°C", desc: "Maulan", warn: true },
  { day: "Bukas", icon: "🌤️", temp: "32°C", desc: "Partly Cloudy", warn: false },
  { day: "Makalawa", icon: "☀️", temp: "34°C", desc: "Mainit", warn: false },
];

const DAY_LABELS = ["Ngayon", "Bukas", "Makalawa"];

function codeToEmoji(code: number): string {
  if (code === 1000) return "☀️";
  if (code === 1003) return "🌤️";
  if (code >= 1006 && code <= 1009) return "☁️";
  if (code >= 1030 && code <= 1071) return "🌫️";
  if (code === 1135 || code === 1147) return "🌫️";
  if (code >= 1150 && code <= 1201) return "🌧️";
  if (code >= 1240 && code <= 1246) return "🌧️";
  if (code === 1273 || code === 1276) return "⛈️";
  return "🌤️";
}

function codeToWarn(code: number): boolean {
  return code === 1273 || code === 1276 || code >= 1192;
}

export async function fetchWeather(city: string): Promise<WeatherDay[]> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

  if (!apiKey) {
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3&lang=fil`,
      { signal: AbortSignal.timeout(8000) },
    );

    if (!res.ok) throw new Error(`API error ${res.status}`);

    const json = await res.json();

    if (!json.forecast?.forecastday?.length) {
      throw new Error("No forecast data");
    }

    return json.forecast.forecastday.map((day: { date: string; day: { avgtemp_c: number; condition: { code: number; text: string } } }, i: number) => ({
      day: DAY_LABELS[i] ?? day.date,
      icon: codeToEmoji(day.day.condition.code),
      temp: `${Math.round(day.day.avgtemp_c)}°C`,
      desc: day.day.condition.text,
      warn: codeToWarn(day.day.condition.code),
    }));
  } catch {
    return FALLBACK;
  }
}
