import {
  api,
  auth0Api,
} from 'utils/api';
import {
  isFeatureSupported,
  serverEnv,
} from 'configs';
import endpoints from 'configs/endpoints';
import verifyToken from './tokenHelpers';
import {
  getAuthenticationString,
  getIdToken,
} from './profileUtils';

const getExtraPassword = (fleet) => {
  switch (fleet) {
    case 'mwa': return serverEnv === 'dev' ? 'EH8NAsy5' : 'o48ab1Ul29$b';
    case 'cc': return 'xPNX3E';
    default: return false;
  }
};

const needSeveralLoginCalls = () => !isFeatureSupported('auth0Full') && isFeatureSupported('extraPath');
const buildExtraPayload = () => {
  const fleet = isFeatureSupported('extraPath');

  return {
    username: `${fleet}_technical`,
    password: getExtraPassword(fleet),
  };
};

const deprecatedAuth0Login = async (username, password) => {
  const { url, method, apiVersion } = endpoints.extraLogin;
  const options = {
    apiVersion,
    payload: {
      username,
      password,
    },
  };

  return api[method](url, options)
    .then(res => res.json());
};

const normalLogin = async (payload) => {
  const { url, method, apiVersion } = endpoints.login;
  const options = {
    apiVersion,
    payload,
  };

  return api[method](url, options)
    .then(res => res.json());
};

const fetchProfile = async (idToken) => {
  const { url, method, extName } = endpoints.getUserInfo;
  const options = {
    extName,
    payload: { id_token: idToken },
  };

  return auth0Api[method](url, options)
    .then(res => res.json());
};

export const login = async (username, password) => {
  try {
    let session = {};
    let profile = {};
    let idToken = {};

    if (needSeveralLoginCalls()) {
      session = await normalLogin(buildExtraPayload());
      idToken = await deprecatedAuth0Login(username, password);
      profile = await fetchProfile(getIdToken(idToken));
    } else {
      session = await normalLogin({ username, password });
    }

    const result = Object.assign({}, profile, idToken, session);
    const token = getAuthenticationString(result, isFeatureSupported('auth0Full'));

    if (!verifyToken(token)) throw new Error('Token is invalid');

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = async (accessToken) => {
  const { url, method, apiVersion } = endpoints.logout(accessToken);
  const options = { apiVersion };

  try {
    const result = await api[method](url, options);

    return result.status === 200;
  } catch (err) {
    console.error(err);

    throw Error(err);
  }
};
