export const ALLOWED_AIRLINE_CODES = ['UA', 'DL', 'AA', 'NK', 'F9'];

export const ALLOWED_AIRLINE_NAMES = [
  'United Airlines',
  'Delta Air Lines',
  'American Airlines',
  'Spirit Airlines',
  'Frontier Airlines',
];

export function isAllowedAirline(name?: string | null, code?: string | null) {
  const normCode = (code || '').toUpperCase().trim();
  const normName = (name || '').trim();
  return (
    (normCode && ALLOWED_AIRLINE_CODES.includes(normCode)) ||
    (normName && ALLOWED_AIRLINE_NAMES.includes(normName))
  );
}


