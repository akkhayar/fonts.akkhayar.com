import type { RequestEvent, RequestHandler } from './$types';
import registeredFonts from '$lib/fonts';


function parseFontQueryParams(params: URLSearchParams) {
  const fontsParam = params.get('fonts');

  if (!fontsParam) {
    throw new Error('Fonts parameter is required in the query parameters.');
  }

  // Split the fonts parameter into individual font definitions
  const fontDefinitions = fontsParam.split(';').map((fontDefinition) => {
    // Split each font definition into family and weights
    const [family, weightsParam] = fontDefinition.split(':');

    if (!registeredFonts.includes(family)) {
      throw new Error(`Font family '${family}' is not registered.`);
    }

    // Parse weights as an array of numbers
    const weights = weightsParam ? weightsParam.split(',').map((weight) => parseInt(weight, 10)) : undefined;

    return { family, weights };
  });

  // Check for duplicate entries
  const uniqueFontDefinitions = Array.from(new Set(fontDefinitions.map(font => font.family)))
    .map(family => fontDefinitions.find(font => font.family === family)!);

  return { fonts: uniqueFontDefinitions };
}

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
  try {
    var parseResult = parseFontQueryParams(url.searchParams);
  }
  catch (e: any) {
    return new Response(e.message, {
      status: 400,
    });
  }

  return new Response(parseResult.fonts.map((font) => fontFaceCSS(font.family, font.weights?.join(','), null)).join('\n'), {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

function fontFaceCSS(family: string, weight: string | undefined, display: string | null) {
  const firstName = family.split(' ')[0].toLowerCase();

  return `@font-face {
  font-family: '${family}';
  font-weight: ${weight || 'normal'};
  font-style: normal;
  font-display: ${display || 'swap'};
  src: url('http://localhost:5173/s/${firstName}/${weight ? `${weight}/` : ''}${encodeURI(family)}.ttf') format('truetype');
  unicode-range: U+1000-109F, U+200C-200D, U+25CC, U+A9E0-A9FE, U+AA60-AA7F, U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}`;
}
