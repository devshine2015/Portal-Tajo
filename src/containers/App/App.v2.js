import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import drvrDevTheme from 'configs/theme';
import phrases, { locales } from 'configs/phrases';
import { BASE_URL } from 'configs';
import { TranslationProvider } from 'utils/i18n';

class App extends React.Component {
  componentWillMount() {
    const { isAuthenticated } = this.props.route.auth;

    if (!isAuthenticated()) this.context.router.replace(`${BASE_URL}/login`);
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

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  locale: PropTypes.string,
  route: PropTypes.shape({
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

App.defaultProps = {
  locale: 'en',
};

export default App;
