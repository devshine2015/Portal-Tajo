import { api, auth0Api } from 'utils/api';
import { serverEnv } from 'configs';
import endpoints from 'configs/endpoints';

export const login = (payload, {
  url,
  method,
  apiVersion,
}) => {
  const options = {
    apiVersion,
    payload,
  };

  return api[method](url, options)
    .then(res => res.json());
};

const additionalLogin = (profile) => {
  const { url, method, apiVersion } = endpoints.login;
  const payload = {
    username: 'mwa_technical',
  };

  /**
   * don't remove this wierdly hardcoded credentials
   * this is needed for mwa until all clients won't user
   * auth0 service.
   */
  if (serverEnv === 'dev') {
    payload.password = 'EH8NAsy5';
  } else {
    payload.password = 'o48ab1Ul29$b';
  }

  return api[method](url, { payload, apiVersion })
    .then(res => res.json())
    .then(res => Object.assign({}, profile, {
      sessionId: res.sessionId,
    }));
};

export const logout = () => {
  const { url, method, apiVersion } = endpoints.logout;
  const options = { apiVersion };

  return api[method](url, options);
};

const fetchProfile = (token) => {
  const { url, method } = endpoints.getUserInfo;
  const options = {
    payload: { id_token: token },
  };

  return auth0Api[method](url, options)
    .then(res => res.json());
};

// const fetchProfileNext = (token) => {
//   const { url, method } = endpoints.getUserInfoNext;
//   const options = {
//     payload: { id_token: token },
//   };

//   return auth0Api[method](url, options)
//     .then(res => res.json());
// };

export const enrichProfileWithAuth0 = ({ session, token }) => {
  if (token) {
    // get complete user info from auth0
    if (serverEnv === 'prod') {
      // 21.06.2017 - here lives a current production code for getting user info
      return fetchProfile(token)
        .then(profile => Object.assign({}, profile, session))
        .then(additionalLogin);
    } else if (serverEnv === 'dev') {
      // next implementation of fetching and aggregating of the user info is living here.
      // no need to make extra login for technical users anymore.

      // @session has session-id property which is equal to @token.
      // since we mapping ig to @id_token there is no need for such duplication.
      delete session['session-id'];

      // Probably here will be also another call to endpoints.getUserInfoNext for detailed userinfo
      return Object.assign({}, session, {
        id_token: token,
      });
    }
  }

  return session;
};
