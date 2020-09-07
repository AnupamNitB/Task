import AsyncStorage from '@react-native-community/async-storage';

export function parseJSON(response) {
  return response.data;
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (!response.data.success && response.data.error) {
      // this.handleLogoutRedirect();
      const error = new Error(response.data.error.message);
      error.response = response;
      throw error;
    } else {
      return response;
    }
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
export async function logOut(navigation) {
  await AsyncStorage.removeItem('token');
  navigation.navigate('Login');
}
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}
export async function storeToken(token) {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('error', error);
  }
}
