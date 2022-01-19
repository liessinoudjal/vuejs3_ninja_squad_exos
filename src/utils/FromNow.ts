import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export default function fromNow(date: string) {
  const d = parseISO(date);
  return formatDistanceToNowStrict(d, { addSuffix: true });
}
