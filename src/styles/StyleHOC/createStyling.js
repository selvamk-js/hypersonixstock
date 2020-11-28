import * as React from 'react';
import deepmerge from 'deepmerge';
import createStyleProvider from './createStyleProvider';
import createWithStyle from './createWithStyle';

export default function createStyling(defaultStyles) {
  const StyleContext = React.createContext(defaultStyles);

  const StyleProvider = createStyleProvider(defaultStyles, StyleContext);

  const withStyle = createWithStyle(StyleProvider, StyleContext);

  const useStyles = overrides => {
    const styles = React.useContext(StyleContext);
    const result = React.useMemo(
      () =>
        styles && overrides
          ? deepmerge(styles, overrides)
          : styles || overrides,
      [styles, overrides]
    );

    return result;
  };

  return {
    StyleContext,
    StyleProvider,
    withStyle,
    useStyles,
  };
}
