import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  if (!dateString) return null;
  // dateString may already be a full ISO string or a plain date string like '2020-01-01'
  // parseISO handles both, but we guard against non-string values just in case
  const safeString = typeof dateString === 'string' ? dateString : String(dateString);
  const date = parseISO(safeString);
  return <time dateTime={safeString}>{format(date, 'LLLL d, yyyy')}</time>;
}
