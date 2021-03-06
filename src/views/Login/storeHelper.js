import { userLogIn, userSignUp, googleSignIn, facebookSignIn, showToast } from '../../store/actions/appStatus'

export const mapStoreToProps = ({ appStatus }) => ({
  loading: appStatus.loading,
})

export const mapDispatchToProps = (dispatch) => ({
  onLogIn:         (email, password) => dispatch(userLogIn(email, password)),
  onSignUp:        (email, password, c_password, name) => dispatch(userSignUp(email, password, c_password, name)),
  onGoogleLogIn:   (email, token) => dispatch(googleSignIn(email, token)),
  onFacebookLogIn: (id, email) => dispatch(facebookSignIn(id, email)),
  throwError:      (message) => dispatch(showToast({ message })),
})
