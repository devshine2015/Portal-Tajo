import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import drvrDevTheme from 'configs/theme';
import phrases, { locales } from 'configs/phrases';
import { BASE_URL } from 'configs';
import { TranslationProvider } from 'utils/i18n';

const handleRouting = (isAuthenticated, router) => {
  if (!isAuthenticated()) {
    router.replace(`${BASE_URL}/login`);
  } else {
    router.replace(`${BASE_URL}/`);
  }
};

class App extends React.Component {
  componentWillMount() {
    const { isAuthenticated } = this.props.route.auth;

    handleRouting(isAuthenticated, this.context.router);
  }

  render() {
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
  router: PropTypes.object,
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
