interface MapLocaleTo {
  [locale: string]: string
}

export const lngName: MapLocaleTo = {
  en: 'english',
  pt: 'português',
};
Object.freeze(lngName);

export const lngFlag: MapLocaleTo = {
  en: '🇬🇧',
  pt: '🇵🇹',
};
Object.freeze(lngFlag);
