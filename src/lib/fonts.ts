// load all .ttf fonts from static
const fontFiles: { [key: string]: any } = import.meta.glob(
  "../../static/fonts/**/*.ttf"
);
export default Object.keys(fontFiles).map((key) =>
  key.split("/").pop()!.replace(".ttf", "")
);
