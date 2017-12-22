import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
});

/* ------------          REDUCER         ------------------ */

export default function reducer(currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchCurrentUser = () => dispatch => {
  axios.get('/api/auth/me')
    .then(res => dispatch(setCurrentUser(res.data)));
};

export const signup = (user) => dispatch => {
  axios.post('/api/auth/signup', user)
    .then(user => {
      dispatch(setCurrentUser(user.data));
    })
    .catch(err => console.error(`Logging in: ${user.email} unsuccessful`, err));

}

export const login = (user) => dispatch => {
  axios.post('/api/auth/login', user)
    .then(user => {
      dispatch(setCurrentUser(user.data));
    })
    .catch(err => console.error(`Logging in: ${user.email} unsuccessful`, err));
};

export const logout = (user) => (dispatch) => {
  axios.post('/api/auth/logout')
  .then(() => dispatch(setCurrentUser({})))
    .catch(err => console.error(`Logging out: ${user.email} unsuccessful`, err));
};
