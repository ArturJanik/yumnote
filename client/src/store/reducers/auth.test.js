import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      token: null,
      error: null,
      loading: false,
      currentUser: null,
      currentUserTimezone: 'Etc/UTC',
      authRedirectPath: '/',
      authCheckFinished: false
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      username: 'some-username',
      timezone: 'some-timezone'
    })).toEqual({
      ...initialState,
      token: 'some-token',
      currentUser: 'some-username',
      currentUserTimezone: 'some-timezone'
    });
  });
});