import type { MAOContact } from "../types";

export const MAO_CONTACTS: Record<string, MAOContact[]> = {
  "Region VI – Western Visayas": [
    { office: "Iloilo City MAO", contact: "Engr. Maria C. Santos", phone: "+63 33 336 0013", fb: "fb.com/IloiloCityMAO", address: "Gen. Luna St., Iloilo City, 5000" },
    { office: "Barotac Nuevo MAO", contact: "Agri. Tech. Juan B. Reyes", phone: "+63 33 323 4567", address: "Municipal Hall, Barotac Nuevo, Iloilo" },
    { office: "Dumangas MAO", contact: "Agri. Tech. Rosa M. Diaz", phone: "+63 33 320 1234", address: "Poblacion, Dumangas, Iloilo" },
    { office: "Bacolod City MAO", contact: "Engr. Arthur G. Lopez", phone: "+63 34 433 2145", fb: "fb.com/BacolodMAO", address: "City Agriculture Office, Bacolod City, Negros Occidental" },
    { office: "Roxas City MAO", contact: "Agri. Tech. Jose P. Villanueva", phone: "+63 36 621 0589", address: "Roxas City Hall, Roxas City, Capiz" },
    { office: "Kalibo MAO", contact: "Agri. Tech. Evelyn S. Menez", phone: "+63 36 268 4122", address: "Municipal Hall, Kalibo, Aklan" },
  ],
  "Region VII – Central Visayas": [
    { office: "Cebu City MAO", contact: "Engr. Pedro L. Villanueva", phone: "+63 32 255 6789", fb: "fb.com/CebuCityMAO", address: "City Hall Complex, Osmeña Blvd., Cebu City" },
    { office: "Danao City MAO", contact: "Agri. Tech. Lita A. Cruz", phone: "+63 32 200 3456", address: "Danao City Hall, Cebu" },
    { office: "Tagbilaran City MAO", contact: "Engr. Roberto T. Garcia", phone: "+63 38 411 3290", address: "Tagbilaran City Hall, Bohol" },
    { office: "Dumaguete City MAO", contact: "Agri. Tech. Sandra L. Reyes", phone: "+63 35 225 1674", fb: "fb.com/DumagueteAgriculture", address: "Dumaguete City Hall, Negros Oriental" },
    { office: "Talisay City MAO", contact: "Agri. Tech. Mario D. Beltran", phone: "+63 32 272 5812", address: "Talisay City Hall, Cebu" },
  ],
  "Region I – Ilocos": [
    { office: "Laoag City MAO", contact: "Engr. Ben A. Marcos", phone: "+63 77 771 3456", address: "City Hall, Laoag City, 2900" },
    { office: "Vigan City MAO", contact: "Agri. Tech. Gloria T. Abad", phone: "+63 77 722 1234", address: "Heritage City of Vigan, Ilocos Sur" },
    { office: "San Fernando City MAO", contact: "Engr. Ramon F. Ferrer", phone: "+63 72 888 1354", fb: "fb.com/CSFAgric", address: "San Fernando City Hall, La Union" },
    { office: "Batac City MAO", contact: "Agri. Tech. Melissa C. Aguinaldo", phone: "+63 77 792 3122", address: "City Government of Batac, Ilocos Norte" },
    { office: "Urdaneta City MAO", contact: "Engr. Daniel S. Ramos", phone: "+63 75 568 2049", address: "Urdaneta City Hall, Pangasinan" },
    { office: "Candon City MAO", contact: "Agri. Tech. Felix M. Valdez", phone: "+63 77 742 6128", address: "Candon City Hall, Ilocos Sur" },
  ],
  "Region V – Bicol": [
    { office: "Legazpi City MAO", contact: "Engr. Carlos R. Luna", phone: "+63 52 480 7890", address: "City Hall, Legazpi City, 4500" },
    { office: "Naga City MAO", contact: "Agri. Tech. Ana P. Torres", phone: "+63 54 472 3456", address: "City Hall, Naga City, 4400" },
    { office: "Sorsogon City MAO", contact: "Engr. Manuel K. Alcantara", phone: "+63 56 211 4059", address: "Sorsogon City Hall, Sorsogon" },
    { office: "Masbate City MAO", contact: "Agri. Tech. Teresa H. Diaz", phone: "+63 56 333 2241", address: "Masbate City Hall, Masbate" },
    { office: "Daet MAO", contact: "Agri. Tech. Ramon J. Pineda", phone: "+63 54 721 1680", address: "Municipal Hall of Daet, Camarines Norte" },
    { office: "Ligao City MAO", contact: "Engr. Jose S. Belmonte", phone: "+63 52 485 1290", fb: "fb.com/LigaoCityAgriculture", address: "Ligao City Hall, Albay" },
  ],
};

export const DEFAULT_MAO: MAOContact[] = [
  { office: "DA National Hotline", contact: "Information Desk", phone: "1800-10-2345", fb: "fb.com/DA.Philippines", address: "Elliptical Road, Diliman, Quezon City" },
  { office: "DA Regional Operations Center", contact: "Operations Officer", phone: "+63 2 8920 4030", address: "DA Building, Diliman, QC 1100" },
];
