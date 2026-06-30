export type Language = "Tagalog" | "Ilocano" | "Hiligaynon" | "Cebuano" | "Bikol" | "Waray";
export type Screen = "dashboard" | "subsidies" | "support" | "settings" | "chatbot";
export type SubsidyTab = "active" | "upcoming" | "completed";
export type StatusType = "green" | "yellow" | "blue" | "red" | "gray";

export interface SubsidyItem {
  icon: string;
  name: string;
  status: string;
  statusType: StatusType;
  requirements: string;
  commodity: string;
  deadline: string;
}

export interface SubsidyCollection {
  active: SubsidyItem[];
  upcoming: SubsidyItem[];
  completed: SubsidyItem[];
}

export interface MAOContact {
  office: string;
  contact: string;
  phone: string;
  fb?: string;
  address: string;
}

export const STATUS_STYLES: Record<StatusType, string> = {
  green: "bg-green-100 text-green-800 border-green-200",
  yellow: "bg-amber-100 text-amber-800 border-amber-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  red: "bg-red-100 text-red-800 border-red-200",
  gray: "bg-gray-100 text-gray-600 border-gray-200",
};

export interface WeatherDay {
  day: string;
  icon: string;
  temp: string;
  desc: string;
  warn: boolean;
}

export const STATUS_DOT: Record<StatusType, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-400",
  blue: "bg-blue-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
};
