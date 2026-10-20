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
  vatNumber: '03426610733',
  taxCode: '03426610733',
  phone: '+393895010842',
  phoneFormatted: '+39 389 501 0842',
  email: 'antagrust@yahoo.it',
  address: {
    street: 'Via Risorgimento, 267/A',
    city: 'Mottola',
    province: 'TA',
    postalCode: '74017',
    region: 'Puglia',
    country: 'IT',
    full: 'Via Risorgimento, 267/A, 74017 Mottola (Taranto) — Puglia, Italia'
  },
  geo: {
    latitude: 40.6358,
    longitude: 17.0371
  },
  foundingYear: 2014,
  openingHours: {
    weekdays: 'Lun - Ven: 17:00 - 19:00 (Su appuntamento)',
    saturday: 'Sabato chiuso',
    rawWeekdays: 'Mo,Tu,We,Th,Fr 17:00-19:00',
    rawSaturday: ''
  },
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  }
};
