import type { SubsidyCollection } from "../types";

export const SUBSIDIES: SubsidyCollection = {
  active: [
    {
      icon: "🌾",
      name: "Rice Competitiveness Enhancement Fund (RCEF)",
      status: "Namamahagi ng Voucher sa Brgy. Hall",
      statusType: "green",
      requirements: "RSBSA ID, Valid Gov't ID, Farm Map",
      commodity: "Palay",
      deadline: "Hulyo 31, 2026",
    },
    {
      icon: "💊",
      name: "Fertilizer Subsidy Program (FSP)",
      status: "Available — 50kg bawat magsasaka",
      statusType: "green",
      requirements: "RSBSA ID, Barangay Certificate",
      commodity: "Lahat ng pananim",
      deadline: "Patuloy",
    },
    {
      icon: "🌽",
      name: "Hybrid Corn Seed Distribution",
      status: "Ina-update ang data — Makipag-ugnayan sa MAO",
      statusType: "yellow",
      requirements: "RSBSA ID, Planting Declaration Form",
      commodity: "Mais",
      deadline: "Agosto 15, 2026",
    },
  ],
  upcoming: [
    {
      icon: "🥬",
      name: "High-Value Crops Dev. Program (HVCDP)",
      status: "Naghihintay ng Budget Release mula Rehiyon",
      statusType: "yellow",
      requirements: "RSBSA ID, Crop Production Plan",
      commodity: "Gulay / HVC",
      deadline: "TBD",
    },
    {
      icon: "🐟",
      name: "Fisheries Livelihood Program",
      status: "Bubukas ang Rehistrasyon: Agosto 1, 2026",
      statusType: "blue",
      requirements: "FishR ID, Valid ID, BFAR Registration",
      commodity: "Pangingisda",
      deadline: "Setyembre 30, 2026",
    },
  ],
  completed: [
    {
      icon: "🌱",
      name: "Inbred Rice Seed Distribution Q1 2026",
      status: "Natapos — Marso 2026",
      statusType: "gray",
      requirements: "N/A",
      commodity: "Palay",
      deadline: "Marso 31, 2026",
    },
    {
      icon: "💰",
      name: "SURE Aid & Recovery Program",
      status: "Natapos — Disyembre 2025",
      statusType: "gray",
      requirements: "N/A",
      commodity: "Lahat ng pananim",
      deadline: "Disyembre 31, 2025",
    },
  ],
};
