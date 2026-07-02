export type Language = "Tagalog" | "Ilocano" | "Hiligaynon" | "Cebuano" | "Bikol" | "Waray" | "English";
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
  green: "bg-[#0f6b3a] text-white border-[#1a8a4a]",
  yellow: "bg-[#0f6b3a] text-white border-[#1a8a4a]",
  blue: "bg-[#0f6b3a] text-white border-[#1a8a4a]",
  red: "bg-[#0f6b3a] text-white border-[#1a8a4a]",
  gray: "bg-[#0f6b3a] text-white border-[#1a8a4a]",
};

export interface WeatherDay {
  day: string;
  icon: string;
  temp: string;
  desc: string;
  warn: boolean;
  maxTemp?: number;
  minTemp?: number;
}

export const STATUS_DOT: Record<StatusType, string> = {
  green: "bg-[#0f6b3a]",
  yellow: "bg-[#0f6b3a]",
  blue: "bg-[#0f6b3a]",
  red: "bg-[#0f6b3a]",
  gray: "bg-[#0f6b3a]",
};
