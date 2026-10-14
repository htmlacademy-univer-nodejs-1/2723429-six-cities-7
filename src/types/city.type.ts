
export const Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export type City = typeof Cities[number];

export function isCity(city: string): City {
  const found = Cities.find((el) => el === city);
  if (!found) {
    throw new Error('City is not found.');
  }
  return found;
}
