import type { MAOContact } from "../types";

export const MAO_CONTACTS: Record<string, MAOContact[]> = {
  "Region VI – Western Visayas": [
    { office: "Iloilo City MAO", contact: "Engr. Maria C. Santos", phone: "+63 33 336 0013", fb: "fb.com/IloiloCityMAO", address: "Gen. Luna St., Iloilo City, 5000" },
    { office: "Barotac Nuevo MAO", contact: "Agri. Tech. Juan B. Reyes", phone: "+63 33 323 4567", address: "Municipal Hall, Barotac Nuevo, Iloilo" },
    { office: "Dumangas MAO", contact: "Agri. Tech. Rosa M. Diaz", phone: "+63 33 320 1234", address: "Poblacion, Dumangas, Iloilo" },
  ],
  "Region VII – Central Visayas": [
    { office: "Cebu City MAO", contact: "Engr. Pedro L. Villanueva", phone: "+63 32 255 6789", fb: "fb.com/CebuCityMAO", address: "City Hall Complex, Osmeña Blvd., Cebu City" },
    { office: "Danao City MAO", contact: "Agri. Tech. Lita A. Cruz", phone: "+63 32 200 3456", address: "Danao City Hall, Cebu" },
  ],
  "Region I – Ilocos": [
    { office: "Laoag City MAO", contact: "Engr. Ben A. Marcos", phone: "+63 77 771 3456", address: "City Hall, Laoag City, 2900" },
    { office: "Vigan City MAO", contact: "Agri. Tech. Gloria T. Abad", phone: "+63 77 722 1234", address: "Heritage City of Vigan, Ilocos Sur" },
  ],
  "Region V – Bicol": [
    { office: "Legazpi City MAO", contact: "Engr. Carlos R. Luna", phone: "+63 52 480 7890", address: "City Hall, Legazpi City, 4500" },
    { office: "Naga City MAO", contact: "Agri. Tech. Ana P. Torres", phone: "+63 54 472 3456", address: "City Hall, Naga City, 4400" },
  ],
};

export const DEFAULT_MAO: MAOContact[] = [
  { office: "DA National Hotline", contact: "Information Desk", phone: "1800-10-2345", fb: "fb.com/DA.Philippines", address: "Elliptical Road, Diliman, Quezon City" },
  { office: "DA Regional Operations Center", contact: "Operations Officer", phone: "+63 2 8920 4030", address: "DA Building, Diliman, QC 1100" },
];
