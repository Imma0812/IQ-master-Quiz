import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function calculatePercentile(iq) {
  const z = (iq - 100) / 15;
  return Math.round((1 - (1 / (1 + Math.pow(z, 2)))) * 100);
}
