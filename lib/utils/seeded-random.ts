/**
 * Deterministic pseudo-random number generator (mulberry32).
 * Used to generate realistic, stable mock data without relying on
 * external services or producing different output on every render.
 */
export function createSeededRandom(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededPick<T>(random: () => number, items: readonly T[]): T {
  return items[Math.floor(random() * items.length)];
}

export function seededInt(random: () => number, min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

export function seededFloat(
  random: () => number,
  min: number,
  max: number,
  precision = 1
): number {
  const value = random() * (max - min) + min;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function stringToSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
