import { LOCAL_STORAGE_SESSION_KEY } from 'configs';
import drvrStorage from 'utils/drvrStorage';

export default async function () {
  const initialState = {};
  let idToken = null;

  try {
    // pre-load profile from storage and use it for initial state
    const session = await drvrStorage.load(LOCAL_STORAGE_SESSION_KEY);
    initialState.session = session.profile;
    idToken = session.profile.id_token;
  } catch (error) {
    console.warn(error);
  }

  return {
    initialState,
    idToken,
  };
}
