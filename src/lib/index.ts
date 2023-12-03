export const HOST = 'https://fonts.akkhayar.com';

export function generateImportURL(fonts: { family: string, weights?: number[] }[]) {
  return `${HOST}/css2?fonts=${fonts.map((font) => `${font.family}${font.weights ? `:${font.weights.join(',')}` : ''}`).join(';')}&display=swap`;
}
