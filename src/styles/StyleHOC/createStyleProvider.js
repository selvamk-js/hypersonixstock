import * as React from 'react';

function createStyleProvider(defaultStyles, StyleContext) {
  return class StyleProvider extends React.Component {
    static defaultProps = {
      styles: defaultStyles,
    };

    render() {
      return (
        <StyleContext.Provider value={this.props.styles}>
          {this.props.children}
        </StyleContext.Provider>
      );
    }
  };
}

export default createStyleProvider;
