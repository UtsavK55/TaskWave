import type {config} from '@src/theme/themeConfig';
import type {staticFontStyles} from '@theme/fonts';

declare global {
  type FontSizesKeys = `size_${ArrayValue<typeof config.fonts.sizes>}`;

  type FontSizes = {
    [key in FontSizesKeys]: {
      fontSize: ToNumber<RemoveBeforeSeparator<key>>;
    };
  };

  type FontColorsKeys = `${keyof UnionConfiguration['fonts']['colors']}`;

  type FontColors = {
    [key in FontColorsKeys]: RemoveBeforeSeparator<key> extends keyof UnionConfiguration['fonts']['colors']
      ? {
          color: UnionConfiguration['fonts']['colors'][RemoveBeforeSeparator<key>];
        }
      : never;
  };

  type Fonts = FontSizes & FontColors & typeof staticFontStyles;
}
