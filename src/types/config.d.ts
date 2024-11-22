import type {config} from '@src/theme/themeConfig';
import type generateConfig from '@theme/generateConfig';

declare global {
  type Variant = keyof typeof config.variants | 'default';

  type ThemeState = {
    variant: Variant;
  };

  type FulfilledThemeConfiguration = {
    readonly backgrounds: Record<string, string>;
    borders: {
      readonly colors: Record<string, string>;
      radius: readonly number[];
      widths: readonly number[];
    };
    readonly colors: Record<string, string>;
    fonts: {
      readonly colors: Record<string, string>;
      sizes: readonly number[];
    };
    gutters: readonly number[];
  };

  type VariantThemeConfiguration = {
    readonly backgrounds: FulfilledThemeConfiguration['backgrounds'];
    borders: {
      readonly colors: FulfilledThemeConfiguration['borders']['colors'];
    };
    readonly colors: FulfilledThemeConfiguration['colors'];
    fonts: {
      readonly colors: FulfilledThemeConfiguration['fonts']['colors'];
    };
  };

  type ThemeConfiguration = FulfilledThemeConfiguration & {
    variants: {
      [key: PropertyKey]: AllPartial<VariantThemeConfiguration>;
    };
  };

  type UnionConfiguration = ReturnType<typeof generateConfig>;
}
