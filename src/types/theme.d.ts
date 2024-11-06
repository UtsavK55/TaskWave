import type layout from '@theme/layout';

declare global {
  type Theme = {
    backgrounds: Backgrounds;
    borders: Borders;
    colors: Colors;
    fonts: Fonts;
    gutters: Gutters;
    layout: typeof layout;
    variant: Variant;
  };
}
