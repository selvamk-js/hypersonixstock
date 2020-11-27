import * as React from 'react';
import deepmerge from 'deepmerge';
import hoistNonReactStatics from 'hoist-non-react-statics';

const createWithStyle = (StyleProvider, StyleContext) =>
  function withStyle(Comp) {
    class ThemedComponent extends React.Component {
      _previous = { a: StyleProvider, b: StyleContext, result: null };

      _merge = (a, b) => {
        const previous = this._previous;

        if (previous && previous.a === a && previous.b === b) {
          return previous.result;
        }

        const result = a && b && a !== b ? deepmerge(a, b) : a || b;

        this._previous = { a, b, result };

        return result;
      };

      render() {
        const { _reactThemeProviderForwardedRef, ...rest } = this.props;

        return (
          <StyleContext.Consumer>
            {(styles) => (
              <Comp
                {...rest}
                styles={this._merge(styles, rest.styles)}
                ref={_reactThemeProviderForwardedRef}
              />
            )}
          </StyleContext.Consumer>
        );
      }
    }

    const ResultComponent = React.forwardRef((props, ref) => (
      <ThemedComponent {...props} _reactThemeProviderForwardedRef={ref} />
    ));

    ResultComponent.displayName = `withStyle(${Comp.displayName || Comp.name})`;

    hoistNonReactStatics(ResultComponent, Comp);

    return ResultComponent;
  };

export default createWithStyle;
