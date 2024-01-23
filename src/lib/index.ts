export const HOST = 'http://localhost:5173';

export function generateImportURL(
    fonts: { family: string; weights?: string[] }[],
) {
    return `${HOST}/css2?fonts=${fonts
        .map(
            (font) =>
                `${font.family}${font.weights ? `:${font.weights.join(",")}` : ""
                }`,
        )
        .join(";")}&display=swap`;
}