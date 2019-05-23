import axios from "axios";

import {
  postUserCredentials,
  postNewUserCredentials,
  postGoogleCredentials,
  postFacebookCredentials
} from "../../data/appStatus";
import { getQuestionsList } from "./questions";
import { parseUserServerData } from "../mappers/appStatus";
import { setCookie, deleteCookie } from "../../features/Cookies";

export const APP_UPDATE_STATUS = "APP_UPDATE_STATUS";
export const APP_REGISTER_USER = "APP_REGISTER_USER";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";

export const API_URL = "http://localhost:8000";
export const userLogIn = (email, password) => dispatch => {
  dispatch(showLoader());

  axios
    .post(
      `${API_URL}/api/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(({ data }) => {
      handleSignInResponse(data.success, dispatch);
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(showToast(error));
    });

  // postUserCredentials({ username, password })
  //   .then(response => {
  //     handleSignInResponse(response, dispatch)
  //   })
  //   .catch(error => {
  //     dispatch(hideLoader())
  //     dispatch(showToast(error))
  //   })
};

export const userLogOut = () => {
  deleteCookie("id");
  deleteCookie("type");
  deleteCookie("token");
  window.location.assign(process.env.PUBLIC_URL);
};

export const userSignUp = (email, password, c_password, name) => dispatch => {
  dispatch(showLoader());

  axios
    .post(
      `${API_URL}/api/register`,
      { email, password, c_password, name },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(({ data }) => {
      dispatch(
        showToast({ message: "Conta criada com sucesso!" })
      );
      dispatch(hideLoader());
      handleSignInResponse(data.success, dispatch);
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(showToast(error));
    });

  // postNewUserCredentials({ username, password })
  //   .then(() => {
  //     dispatch(
  //       showToast({ message: "Konto utworzone, możesz się zalogować!" })
  //     );
  //     dispatch(hideLoader());
  //   })
  //   .catch(error => {
  //     dispatch(showToast(error));
  //     dispatch(hideLoader());
  //   });
};

export const googleSignIn = (email, token) => dispatch => {
  postGoogleCredentials({ email, token })
    .then(response => {
      handleSignInResponse(response, dispatch);
    })
    .catch(error => {
      dispatch(showToast(error));
    });
};

export const facebookSignIn = (id, email) => dispatch => {
  postFacebookCredentials({ id, email })
    .then(response => {
      handleSignInResponse(response, dispatch);
    })
    .catch(error => {
      dispatch(showToast(error));
    });
};

const handleSignInResponse = ({ token, user }, dispatch) => {
  setCookie("token", token, 60);
  window.localStorage.setItem('userLogged', JSON.stringify(user))
  dispatch(updateAppStatus(user))
  dispatch(getQuestionsList());
};

export const updateAppStatus = (user) => ({
  type:    APP_UPDATE_STATUS,
  user
})

export const showToast = ({ message }) => ({
  type: SHOW_TOAST,
  payload: {
    message
  }
});

export const hideToast = () => ({
  type: HIDE_TOAST
});

export const showLoader = () => ({
  type: SHOW_LOADER
});

export const hideLoader = () => ({
  type: HIDE_LOADER
});
