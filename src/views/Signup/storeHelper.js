import { userLogIn, userSignUp, googleSignIn, facebookSignIn, showToast } from '../../store/actions/appStatus'

export const mapStoreToProps = ({ appStatus }) => ({
  loading: appStatus.loading,
})

export const mapDispatchToProps = (dispatch) => ({
  onLogIn:         (username, password) => dispatch(userLogIn(username, password)),
  onSignUp:        (username, password, name) => dispatch(userSignUp(username, password, name)),
  onGoogleLogIn:   (email, token) => dispatch(googleSignIn(email, token)),
  onFacebookLogIn: (id, email) => dispatch(facebookSignIn(id, email)),
  throwError:      (message) => dispatch(showToast({ message })),
})
