import type { RequestEvent, RequestHandler } from './$types';
import registeredFonts from '$lib/fonts';
import { HOST } from '$lib';


/**
 * Parses the fonts query parameter into an object with 'family' and 'weights' keys for each url
 * argument.	
 * 
 * @param params URLSearchParams object
 * @returns 
 */
function parseQueryParams(params: URLSearchParams) {
  const fontsParam = params.get('fonts');

  if (!fontsParam) {
    throw new Error('Fonts parameter is required in the query parameters.');
  }
  // split the fonts parameter into individual font queries
  const fontQueries: {
    family: string;
    weight: string | null;
    filename: string;
  }[] = [];
  
  fontsParam.split(';').forEach((fontDefinition) => {
    // Split each font definition into family and weights
    const [family, weightsParam] = fontDefinition.split(':');
    let weights: string[] = [''];

    if (weightsParam) {
      weights = weightsParam.split(',');

      // check for invalid weights
      if (weights.some((weight) => !['regular', 'bold', 'light'].includes(weight.toLowerCase()))) {
        throw new Error(`Invalid font weight in font definition '${fontDefinition}'.`);
      }
    }

    for (const weight of weights) {
      const filename = `${family}${weight ? `-${weight}`: ''}`;
      if (!registeredFonts.includes(filename)) {
        throw new Error(`Font family '${filename}' is not registered.`);
      }
  
      fontQueries.push({ family, weight, filename });
    }
  });

  // Check for duplicate entries
  const fonts = Array.from(new Set(fontQueries.map(font => font.family)))
    .map(family => fontQueries.find(font => font.family === family)!);

  return { fonts };
}

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
  try {
    var parseResult = parseQueryParams(url.searchParams);
  }
  catch (e: any) {
    return new Response(e.message, {
      status: 400,
    });
  }

  return new Response(parseResult.fonts.map((font) => fontFaceCSS(font.family, font.weight, font.filename)).join('\n'), {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

/**
 * Generates the CSS for a font face.
 * We do not need to check the existence of the font file here because the request is already
 * constrained to registered fonts.
 * 
 * @param family family name
 * @param weight weight name
 * @param display font-display value
 * @returns Font face CSS for the given family, weight and display value.
 */
function fontFaceCSS(family: string, weight: string | null, filename: string) {
  return `@font-face {
  font-family: '${family}';
  font-weight: ${weight || 'normal'};
  font-style: normal;
  font-display: 'swap';
  src: url('${HOST}/fonts/${encodeURI(family)}/${encodeURI(filename)}.ttf') format('truetype');
  unicode-range: U+1000-109F, U+200C-200D, U+25CC, U+A9E0-A9FE, U+AA60-AA7F, U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}`;
}
