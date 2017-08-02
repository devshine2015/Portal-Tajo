import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import drvrDevTheme from 'configs/theme';
import phrases, { locales } from 'configs/phrases';
import { TranslationProvider } from 'utils/i18n';

class App extends React.Component {
  componentWillMount() {
    const { isAuthenticated } = this.props.route.auth;

    if (!isAuthenticated()) this.props.router.replace('/login');
  }

  render() {
    const { isAuthenticated } = this.props.route.auth;

    if (isAuthenticated()) {
      console.log('authenticated');
    }

    return (
      <TranslationProvider
        phrases={phrases}
        locales={locales}
        locale={this.props.locale}
      >
        <MuiThemeProvider muiTheme={drvrDevTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </TranslationProvider>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string,
  route: PropTypes.shape({
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

App.defaultProps = {
  locale: 'en',
};

export default App;
