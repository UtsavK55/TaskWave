import {config} from '@theme/themeConfig';
import {TextStyle, ViewStyle} from 'react-native';

function hasProperty<Config, KeyPath extends string>(
  configuration: Config,
  property: KeyPath,
): configuration is HasProperty<Config, KeyPath> & Config {
  const parts = property.split('.');

  let currentObj: any = configuration;

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (!(part in currentObj)) {
      return false;
    }

    currentObj = currentObj[part];
  }

  return true;
}

export const generateConfig = (variant: Variant) => {
  const {variants, ...defaultConfig} = config;
  const variantConfig = variant !== 'default' ? variants[variant] : null;

  const fontColors = {
    ...defaultConfig.fonts.colors,
    ...(variantConfig && hasProperty(variantConfig, 'fonts.colors')
      ? variantConfig.fonts.colors
      : {}),
  };
  const backgroundColors = {
    ...defaultConfig.backgrounds,
    ...(variantConfig && hasProperty(variantConfig, 'backgrounds')
      ? variantConfig.backgrounds
      : {}),
  };
  const borderColors = {
    ...defaultConfig.borders.colors,
    ...(variantConfig && hasProperty(variantConfig, 'borders.colors')
      ? variantConfig.borders.colors
      : {}),
  };
  const colors = {
    ...defaultConfig.colors,
    ...(variantConfig && hasProperty(variantConfig, 'colors')
      ? variantConfig.colors
      : {}),
  };

  return {
    colors,
    fonts: {
      sizes: defaultConfig.fonts.sizes,
      colors: fontColors,
    },
    gutters: defaultConfig.gutters,
    backgrounds: backgroundColors,
    borders: {
      widths: defaultConfig.borders.widths,
      radius: defaultConfig.borders.radius,
      colors: borderColors,
    },
  } as const satisfies FulfilledThemeConfiguration;
};

export const generateBackgrounds = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.backgrounds ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          backgroundColor: value,
        },
      });
    },
    {} as Backgrounds,
  );
};

export const generateBorderColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.borders.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          borderColor: value,
        },
      });
    },
    {} as BorderColors,
  );
};

//Generates border radius styles from configuration

export const generateBorderRadius = () => {
  return config.borders.radius.reduce((acc, radius) => {
    return Object.assign(acc, {
      [`rounded_${radius}`]: {
        borderRadius: radius,
      },
      [`roundedTop_${radius}`]: {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      },
      [`roundedBottom_${radius}`]: {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      },
      [`roundedBottomRight_${radius}`]: {
        borderBottomRightRadius: radius,
      },
      [`roundedTopLeft_${radius}`]: {
        borderTopLeftRadius: radius,
      },
    });
  }, {} as BorderRadius & BorderTopRadius & BorderBottomRadius);
};

//Generates border width styles from configuration

export const generateBorderWidths = () => {
  return config.borders.widths.reduce((acc, width) => {
    return Object.assign(acc, {
      [`w_${width}`]: {
        borderWidth: width,
      },
      [`wTop_${width}`]: {
        borderTopWidth: width,
      },
      [`wBottom_${width}`]: {
        borderBottomWidth: width,
      },
      [`wLeft_${width}`]: {
        borderLeftWidth: width,
      },
      [`wRight_${width}`]: {
        borderRightWidth: width,
      },
    });
  }, {} as BorderWidths);
};

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: 'semibold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  alignCenter: {
    textAlign: 'center',
  },
} as const satisfies Record<string, TextStyle>;

export const generateGutters = (configuration: UnionConfiguration): Gutters => {
  return configuration.gutters.reduce((acc: number, curr: number) => {
    return Object.assign(acc, {
      [`margin_${curr}`]: {
        margin: curr,
      },
      [`marginBottom_${curr}`]: {
        marginBottom: curr,
      },
      [`marginTop_${curr}`]: {
        marginTop: curr,
      },
      [`marginRight_${curr}`]: {
        marginRight: curr,
      },
      [`marginLeft_${curr}`]: {
        marginLeft: curr,
      },
      [`marginVertical_${curr}`]: {
        marginVertical: curr,
      },
      [`marginHorizontal_${curr}`]: {
        marginHorizontal: curr,
      },
      [`padding_${curr}`]: {
        padding: curr,
      },
      [`paddingBottom_${curr}`]: {
        paddingBottom: curr,
      },
      [`paddingTop_${curr}`]: {
        paddingTop: curr,
      },
      [`paddingRight_${curr}`]: {
        paddingRight: curr,
      },
      [`paddingLeft_${curr}`]: {
        paddingLeft: curr,
      },
      [`paddingVertical_${curr}`]: {
        paddingVertical: curr,
      },
      [`paddingHorizontal_${curr}`]: {
        paddingHorizontal: curr,
      },
      [`gap_${curr}`]: {
        gap: curr,
      },
    });
  }, {} as Gutters);
};

export const staticGutterStyles = {} as const satisfies Record<
  string,
  ViewStyle
>;
