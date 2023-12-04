const fontFiles: { [key: string]: any} = import.meta.glob("../../static/s/**/*.ttf");
export default Object.keys(fontFiles).map((key) => key.split('/').pop()!.replace('.ttf', ''));
