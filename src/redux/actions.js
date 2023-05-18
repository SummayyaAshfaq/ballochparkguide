export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_APP_THEME = 'SET_APP_THEME';
export const SET_MAP_THEME = 'SET_MAP_THEME';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const SET_ROUTE = 'SET_ROUTE';
export const SET_NAVPLACE = 'SET_NAVPLACE';

export const setUserID = id => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: id,
  });
};
export const setToken = token => dispatch => {
  dispatch({
    type: SET_USER_TOKEN,
    payload: token,
  });
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setTheme = theme => dispatch => {
  dispatch({
    type: SET_APP_THEME,
    payload: theme,
  });
};
export const setMapTheme = maptheme => dispatch => {
  dispatch({
    type: SET_MAP_THEME,
    payload: maptheme,
  });
};
export const setLOCID = locationid => dispatch => {
  dispatch({
    type: SET_LOCATION_ID,
    payload: locationid,
  });
};
export const setRoute = routeid => dispatch => {
  dispatch({
    type: SET_ROUTE,
    payload: routeid,
  });
};

export const setNavPlace = navplace => dispatch => {
  dispatch({
    type: SET_NAVPLACE,
    payload: navplace,
  });
};

///////////parking///////////////
export const SET_CAR_PLATE = 'SET_CAR_PLATE';
export const SET_CAR_COLOR = 'SET_CAR_COLOR';

export const setCarPlate = car_plate => dispatch => {
  dispatch({
    type: SET_CAR_PLATE,
    payload: car_plate,
  });
};

export const setCarColor = car_color => dispatch => {
  dispatch({
    type: SET_CAR_COLOR,
    payload: car_color,
  });
};

///////////parking status///////////////
export const SET_CAR_PARKING_STATUS = 'SET_CAR_PARKING_STATUS';

export const setCarParkingStatus = car_parking_status => dispatch => {
    dispatch({
      type: SET_CAR_PARKING_STATUS,
      payload: car_parking_status,
    });
  };