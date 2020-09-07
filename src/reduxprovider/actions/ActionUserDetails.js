import * as ActionTypes from './index';

export function userDetails(data) {
  return {
    type: ActionTypes.USER_DETAILS,
    data,
  };
}
export function userDetailsAPI(userData) {
  return (dispatch) => {
    fetch('http://122.168.195.75:3000/api/userLogin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data == 200) {
          dispatch(userDetails(res));
        } else {
          dispatch(userDetails(res));
          alert(res.message);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
}
