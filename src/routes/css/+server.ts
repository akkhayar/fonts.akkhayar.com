import type { RequestEvent, RequestHandler } from './$types'


const fontPath: { [key: string]: string } = {
  'Ayar': 'ayar/Ayar-KG7o.ttf',
  'Ayar Juno': 'ayar-juno/AyarJuno-2LO8.ttf',
  'Padauk': 'padauk/Padauk-2j7v.ttf',
  'U4 Bahan': 'u4/U4Bahan-Z9o3.ttf'
}

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
  let families = url.searchParams.get('families');
  if (!families) {
    return new Response('No families specified', {
      status: 400,
    });
  }

  const defs = [...new Set(families.split(','))].map(fam => getFontStyles(fam, url.searchParams.get('display'))).join('\n');

  return new Response(defs, {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

function getFontStyles(font: string, display: string | null) {
  const fp = fontPath[font];
  return `/* burmese */
@font-face {
  font-family: '${font}';
  font-style: normal;
  font-display: ${display || 'swap'};
  src: url('http://localhost:5173/s/${fp}') format('truetype');
  unicode-range: U+1000-109F, U+200C-200D, U+25CC, U+A9E0-A9FE, U+AA60-AA7F, U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;
}
