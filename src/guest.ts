// Personalized guest links: {origin}/{guestName}?p={prefixKey}
// "Dear" is the default and is omitted from the URL, e.g. https://yourdomain.com/Sanjaya

export const PREFIXES = [
  { key: 'mr', label: 'Mr.' },
  { key: 'mrs', label: 'Mrs.' },
  { key: 'miss', label: 'Miss' },
  { key: 'mr-mrs', label: 'Mr. & Mrs.' },
  { key: 'family', label: 'Family' },
  { key: 'dear', label: 'Dear' },
] as const;

export type PrefixKey = (typeof PREFIXES)[number]['key'];

const LEGACY_LABELS: Record<string, PrefixKey> = {
  'mr.': 'mr',
  'mrs.': 'mrs',
  miss: 'miss',
  'mr. & mrs.': 'mr-mrs',
  family: 'family',
  dear: 'dear',
};

const isPrefixKey = (value: string): value is PrefixKey =>
  PREFIXES.some((p) => p.key === value);

// "Dear" is never part of the display name — the greeting adds it.
export function formatDisplayName(prefix: PrefixKey, guestName: string): string {
  const name = guestName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  switch (prefix) {
    case 'family':
      return `${name} and Family`;
    case 'dear':
      return name;
    default:
      return `${PREFIXES.find((p) => p.key === prefix)!.label} ${name}`;
  }
}

export function buildInviteLink(baseUrl: string, prefix: PrefixKey, guestName: string): string {
  const name = guestName.trim().replace(/\s+/g, ' ');
  const link = `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(name)}`;
  return prefix === 'dear' ? link : `${link}?p=${prefix}`;
}

// Reads the guest's display name from the current URL (also supports old ?prefix=&name= links)
export function getGuestDisplayName(location: Location = window.location): string | null {
  const params = new URLSearchParams(location.search);

  const legacyName = params.get('name');
  if (legacyName) {
    const legacyPrefix = LEGACY_LABELS[(params.get('prefix') || '').toLowerCase()] ?? 'dear';
    return formatDisplayName(legacyPrefix, legacyName) || null;
  }

  const segment = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.includes('/') || segment.toLowerCase() === 'admin') return null;

  let name: string;
  try {
    name = decodeURIComponent(segment);
  } catch {
    return null;
  }

  const p = (params.get('p') || 'dear').toLowerCase();
  return formatDisplayName(isPrefixKey(p) ? p : 'dear', name) || null;
}
