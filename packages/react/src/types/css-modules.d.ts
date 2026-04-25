// Ambient declaration for CSS Modules so tsup's dts builder can resolve
// the imported `styles` object. Each .module.css file exports a flat
// string-keyed map of class names.
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
