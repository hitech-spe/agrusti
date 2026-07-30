// Centralized Business Information Configuration for Antonio Agrusti SRLS

export interface BusinessInfo {
  name: string;
  legalName: string;
  vatNumber: string;
  taxCode: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    region: string;
    country: string;
    full: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  foundingYear: number;
  openingHours: {
    weekdays: string;
    saturday: string;
    rawWeekdays: string;
    rawSaturday: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Antonio Agrusti SRLS',
  legalName: 'Antonio Agrusti S.R.L.S.',
  vatNumber: '08343750722',
  taxCode: '08343750722',
  phone: '+393331234567',
  phoneFormatted: '+39 333 1234567',
  email: 'info@antonioagrustisrls.it',
  address: {
    street: 'Via per Alberobello, km 2',
    city: 'Noci',
    province: 'BA',
    postalCode: '70015',
    region: 'Puglia',
    country: 'IT',
    full: 'Via per Alberobello, km 2, 70015 Noci (Bari) — Puglia, Italia'
  },
  geo: {
    latitude: 40.7925,
    longitude: 17.1264
  },
  foundingYear: 2014,
  openingHours: {
    weekdays: 'Lun - Ven: 08:00 - 18:00',
    saturday: 'Sab: 08:00 - 13:00',
    rawWeekdays: 'Mo,Tu,We,Th,Fr 08:00-18:00',
    rawSaturday: 'Sa 08:00-13:00'
  },
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  }
};
